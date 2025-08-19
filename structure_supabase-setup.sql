-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.podcast_analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  evento_id character varying,
  tipo_evento character varying NOT NULL,
  timestamp_evento timestamp without time zone DEFAULT now(),
  dati_aggiuntivi jsonb,
  ip_address inet,
  user_agent text,
  CONSTRAINT podcast_analytics_pkey PRIMARY KEY (id),
  CONSTRAINT podcast_analytics_evento_id_fkey FOREIGN KEY (evento_id) REFERENCES public.podcast_eventi(evento_id)
);
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
  posti_prenotati integer DEFAULT 0,
  ultimo_aggiornamento_posti timestamp without time zone DEFAULT now(),
  stato_evento character varying DEFAULT 'attivo'::character varying CHECK (stato_evento::text = ANY (ARRAY['attivo'::character varying, 'sold_out'::character varying, 'cancellato'::character varying, 'completato'::character varying]::text[])),
  CONSTRAINT podcast_eventi_pkey PRIMARY KEY (id)
);
CREATE TABLE public.podcast_posti_log (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  evento_id character varying,
  posti_prima integer,
  posti_dopo integer,
  tipo_modifica character varying,
  timestamp_modifica timestamp without time zone DEFAULT now(),
  note text,
  CONSTRAINT podcast_posti_log_pkey PRIMARY KEY (id),
  CONSTRAINT podcast_posti_log_evento_id_fkey FOREIGN KEY (evento_id) REFERENCES public.podcast_eventi(evento_id)
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
  ip_address inet,
  user_agent text,
  fonte_prenotazione character varying DEFAULT 'web'::character varying,
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