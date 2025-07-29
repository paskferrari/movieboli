-- Script SQL per configurare Supabase per MOVIEBOLI Festival 2025
-- Esegui questo script nel SQL Editor di Supabase

-- 1. Abilita Row Level Security (RLS) per sicurezza
-- Questo è già abilitato di default per auth.users

-- 2. Crea la tabella per i profili utente estesi
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  age INTEGER CHECK (age >= 13 AND age <= 120),
  gender TEXT CHECK (gender IN ('M', 'F', 'Altro', 'Preferisco non rispondere')),
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Crea la tabella per i voti
CREATE TABLE IF NOT EXISTS public.votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  film_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraint per evitare voti duplicati dello stesso utente per lo stesso film
  UNIQUE(user_id, film_id)
);

-- 4. Abilita RLS per le tabelle
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- 5. Crea le policy per user_profiles
-- Gli utenti possono vedere e modificare solo il proprio profilo
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Policy per admin - possono vedere tutti i profili
CREATE POLICY "Admins can view all profiles" ON public.user_profiles
  FOR SELECT USING (
    (auth.jwt() ->> 'role') = 'admin'
  );

CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 6. Crea le policy per votes
-- Policy per i voti - gli utenti possono vedere e modificare solo i propri voti
CREATE POLICY "Users can view own votes" ON public.votes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own votes" ON public.votes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own votes" ON public.votes
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy per admin - possono vedere tutti i voti
CREATE POLICY "Admins can view all votes" ON public.votes
  FOR SELECT USING (
    (auth.jwt() ->> 'role') = 'admin'
  );

CREATE POLICY "Users can delete own votes" ON public.votes
  FOR DELETE USING (auth.uid() = user_id);

-- 7. Crea una funzione per aggiornare automaticamente updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Crea i trigger per aggiornare updated_at
CREATE TRIGGER handle_updated_at_user_profiles
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_votes
  BEFORE UPDATE ON public.votes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 9. Crea una funzione per creare automaticamente il profilo utente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Crea il trigger per creare automaticamente il profilo
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 11. Crea una vista per le statistiche dei voti (opzionale)
CREATE OR REPLACE VIEW public.vote_statistics AS
SELECT 
  film_id,
  COUNT(*) as total_votes,
  AVG(rating::DECIMAL) as average_rating,
  COUNT(CASE WHEN rating = 5 THEN 1 END) as five_stars,
  COUNT(CASE WHEN rating = 4 THEN 1 END) as four_stars,
  COUNT(CASE WHEN rating = 3 THEN 1 END) as three_stars,
  COUNT(CASE WHEN rating = 2 THEN 1 END) as two_stars,
  COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star
FROM public.votes
GROUP BY film_id;

-- 12. Permetti a tutti di leggere le statistiche (opzionale)
GRANT SELECT ON public.vote_statistics TO anon, authenticated;

-- Fine dello script
-- Dopo aver eseguito questo script, il database sarà pronto per l'autenticazione e i voti