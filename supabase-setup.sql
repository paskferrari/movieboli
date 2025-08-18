-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.podcast_eventi (
  id integer NOT NULL DEFAULT nextval('podcast_eventi_id_seq'::regclass),
  evento_id character varying NOT NULL UNIQUE,
  titolo character varying NOT NULL,
  data_evento date NOT NULL,
  orario time without time zone NOT NULL,
  luogo character varying NOT NULL,
  posti_totali integer DEFAULT 45,
  posti_disponibili integer DEFAULT 45,
  created_at timestamp without time zone DEFAULT now(),
  updated_at timestamp without time zone DEFAULT now(),
  descrizione text,
  CONSTRAINT podcast_eventi_pkey PRIMARY KEY (id)
);
CREATE TABLE public.podcast_prenotazioni (
  id integer NOT NULL DEFAULT nextval('podcast_prenotazioni_id_seq'::regclass),
  evento_id character varying,
  nome character varying NOT NULL,
  email character varying NOT NULL,
  telefono character varying NOT NULL,
  note text,
  data_prenotazione timestamp without time zone DEFAULT now(),
  stato character varying DEFAULT 'confermata'::character varying,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT podcast_prenotazioni_pkey PRIMARY KEY (id),
  CONSTRAINT podcast_prenotazioni_evento_id_fkey FOREIGN KEY (evento_id) REFERENCES public.podcast_eventi(evento_id)
);
CREATE TABLE public.site_content (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  key character varying NOT NULL UNIQUE,
  value text NOT NULL,
  description text,
  category character varying,
  page character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT site_content_pkey PRIMARY KEY (id)
);
CREATE TABLE public.site_images (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  key character varying NOT NULL UNIQUE,
  url text NOT NULL,
  alt_text text,
  description text,
  category character varying,
  page character varying,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT site_images_pkey PRIMARY KEY (id)
);
CREATE TABLE public.user_profiles (
  id uuid NOT NULL,
  email text UNIQUE,
  full_name text,
  age integer CHECK (age >= 13 AND age <= 120),
  gender text CHECK (gender = ANY (ARRAY['M'::text, 'F'::text, 'Altro'::text, 'Preferisco non rispondere'::text])),
  role text DEFAULT 'user'::text CHECK (role = ANY (ARRAY['user'::text, 'admin'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT user_profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.votes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  film_id text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT votes_pkey PRIMARY KEY (id),
  CONSTRAINT votes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
-- ... existing code ...


-- 13. Abilita RLS per le tabelle podcast
ALTER TABLE public.podcast_eventi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.podcast_prenotazioni ENABLE ROW LEVEL SECURITY;

-- 14. Policy per podcast_eventi
-- Permetti a tutti di leggere gli eventi (per visualizzare i posti disponibili)
CREATE POLICY "Everyone can view podcast events" ON public.podcast_eventi
  FOR SELECT USING (true);

-- Solo admin possono modificare gli eventi
CREATE POLICY "Only admins can modify podcast events" ON public.podcast_eventi
  FOR ALL USING (
    (auth.jwt() ->> 'role') = 'admin'
  );

-- 15. Policy per podcast_prenotazioni
-- Permetti a tutti di inserire prenotazioni (utenti anonimi possono prenotare)
CREATE POLICY "Everyone can insert podcast bookings" ON public.podcast_prenotazioni
  FOR INSERT WITH CHECK (true);

-- Gli utenti autenticati possono vedere le proprie prenotazioni tramite email
CREATE POLICY "Users can view own bookings" ON public.podcast_prenotazioni
  FOR SELECT USING (
    auth.uid() IS NOT NULL AND 
    email = (auth.jwt() ->> 'email')
  );

-- Admin possono vedere tutte le prenotazioni
CREATE POLICY "Admins can view all bookings" ON public.podcast_prenotazioni
  FOR SELECT USING (
    (auth.jwt() ->> 'role') = 'admin'
  );

-- Admin possono modificare/cancellare prenotazioni
CREATE POLICY "Admins can modify bookings" ON public.podcast_prenotazioni
  FOR ALL USING (
    (auth.jwt() ->> 'role') = 'admin'
  );

-- 16. Inserisci i dati iniziali degli eventi podcast
INSERT INTO public.podcast_eventi (evento_id, titolo, data_evento, orario, luogo, descrizione, posti_totali, posti_disponibili)
VALUES 
  ('23-agosto-mattina', 'Podcast con Mario Martone - Sessione Mattina', '2025-08-23', '10:00', 'Piazza del Popolo, Eboli', 'Incontro con il regista Mario Martone per parlare del suo ultimo film e della sua carriera cinematografica.', 45, 45),
  ('23-agosto-sera', 'Podcast con Mario Martone - Sessione Sera', '2025-08-23', '21:00', 'Piazza del Popolo, Eboli', 'Seconda sessione dell\'incontro con Mario Martone, con focus sui progetti futuri e Q&A con il pubblico.', 45, 45)
ON CONFLICT (evento_id) DO NOTHING;

-- Fine delle modifiche per podcast