-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.contest_opere (
  id integer NOT NULL DEFAULT nextval('contest_opere_id_seq'::regclass),
  nome_film_ispirato character varying NOT NULL,
  autore character varying NOT NULL,
  link_photo text NOT NULL,
  descrizione text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT contest_opere_pkey PRIMARY KEY (id)
);
CREATE TABLE public.contest_voti (
  id integer NOT NULL DEFAULT nextval('contest_voti_id_seq'::regclass),
  user_id uuid NOT NULL UNIQUE,
  opera_id integer NOT NULL,
  voted_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT contest_voti_pkey PRIMARY KEY (id),
  CONSTRAINT contest_voti_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT contest_voti_opera_id_fkey FOREIGN KEY (opera_id) REFERENCES public.contest_opere(id)
);
CREATE TABLE public.festival_survey (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  eta integer,
  genere text CHECK (genere = ANY (ARRAY['Maschio'::text, 'Femmina'::text, 'Altro'::text])),
  residenza text,
  stato_regione text,
  professione text,
  titolo_studio text CHECK (titolo_studio = ANY (ARRAY['Scuola dell''obbligo'::text, 'Diploma'::text, 'Laurea'::text, 'Altro'::text])),
  mezzo_trasporto text CHECK (mezzo_trasporto = ANY (ARRAY['Auto'::text, 'Treno'::text, 'Bus'::text, 'Aereo'::text, 'Altro'::text])),
  visitato_citta text CHECK (visitato_citta = ANY (ARRAY['Sì'::text, 'No'::text])),
  film_visti text CHECK (film_visti = ANY (ARRAY['1'::text, '2'::text, '3'::text])),
  corti_visti text CHECK (corti_visti = ANY (ARRAY['1-2'::text, '3-5'::text, '6-8'::text])),
  interviste_viste text CHECK (interviste_viste = ANY (ARRAY['Nessuna'::text, '1-2'::text, '3 o più'::text])),
  conosce_macine text CHECK (conosce_macine = ANY (ARRAY['Sì'::text, 'No'::text])),
  puntate_live text CHECK (puntate_live = ANY (ARRAY['Nessuna'::text, '1-2'::text, '3 o più'::text])),
  come_conosciuto text CHECK (come_conosciuto = ANY (ARRAY['Passaparola'::text, 'Amici/parenti'::text, 'Social'::text, 'Giornali'::text, 'TV'::text, 'Altro'::text])),
  newsletter text CHECK (newsletter = ANY (ARRAY['Sì'::text, 'No'::text])),
  submitted_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT festival_survey_pkey PRIMARY KEY (id),
  CONSTRAINT festival_survey_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
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
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
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
CREATE TABLE public.user_roles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  role text NOT NULL CHECK (role = ANY (ARRAY['admin'::text, 'user'::text, 'moderator'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_roles_pkey PRIMARY KEY (id),
  CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.votes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  film_id text NOT NULL,
  rating numeric NOT NULL CHECK (rating >= 0.5 AND rating <= 5.0 AND (rating * 2::numeric) = floor(rating * 2::numeric)),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT votes_pkey PRIMARY KEY (id),
  CONSTRAINT votes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);