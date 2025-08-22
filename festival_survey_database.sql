-- Creazione tabella user_roles se non esiste
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'user', 'moderator')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Indici per user_roles
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);

-- RLS per user_roles
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Policy: Gli utenti possono vedere solo i propri ruoli
CREATE POLICY "Users can view their own roles" ON user_roles
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Solo gli admin possono inserire/aggiornare ruoli
CREATE POLICY "Admins can manage all roles" ON user_roles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Creazione tabella per il sondaggio del festival
CREATE TABLE IF NOT EXISTS festival_survey (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Dati demografici
  eta INTEGER,
  genere TEXT CHECK (genere IN ('Maschio', 'Femmina', 'Altro')),
  residenza TEXT,
  stato_regione TEXT,
  professione TEXT,
  titolo_studio TEXT CHECK (titolo_studio IN ('Scuola dell''obbligo', 'Diploma', 'Laurea', 'Altro')),
  
  -- Esperienza logistica
  mezzo_trasporto TEXT CHECK (mezzo_trasporto IN ('Auto', 'Treno', 'Bus', 'Aereo', 'Altro')),
  visitato_citta TEXT CHECK (visitato_citta IN ('Sì', 'No')),
  
  -- Partecipazione al Festival
  film_visti TEXT CHECK (film_visti IN ('1', '2', '3')),
  corti_visti TEXT CHECK (corti_visti IN ('1-2', '3-5', '6-8')),
  interviste_viste TEXT CHECK (interviste_viste IN ('Nessuna', '1-2', '3 o più')),
  conosce_macine TEXT CHECK (conosce_macine IN ('Sì', 'No')),
  puntate_live TEXT CHECK (puntate_live IN ('Nessuna', '1-2', '3 o più')),
  
  -- Comunicazione e feedback
  come_conosciuto TEXT CHECK (come_conosciuto IN ('Passaparola', 'Amici/parenti', 'Social', 'Giornali', 'TV', 'Altro')),
  newsletter TEXT CHECK (newsletter IN ('Sì', 'No')),
  
  -- Metadati
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indici per migliorare le performance
CREATE INDEX IF NOT EXISTS idx_festival_survey_user_id ON festival_survey(user_id);
CREATE INDEX IF NOT EXISTS idx_festival_survey_submitted_at ON festival_survey(submitted_at);
CREATE INDEX IF NOT EXISTS idx_festival_survey_created_at ON festival_survey(created_at);

-- Trigger per aggiornare updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_festival_survey_updated_at BEFORE UPDATE
    ON festival_survey FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) policies
ALTER TABLE festival_survey ENABLE ROW LEVEL SECURITY;

-- Policy: Gli utenti possono inserire solo i propri sondaggi
CREATE POLICY "Users can insert their own survey responses" ON festival_survey
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Gli utenti possono vedere solo i propri sondaggi
CREATE POLICY "Users can view their own survey responses" ON festival_survey
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Gli utenti possono aggiornare solo i propri sondaggi
CREATE POLICY "Users can update their own survey responses" ON festival_survey
    FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Gli admin possono vedere tutti i sondaggi
CREATE POLICY "Admins can view all survey responses" ON festival_survey
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Policy: Gli admin possono aggiornare tutti i sondaggi
CREATE POLICY "Admins can update all survey responses" ON festival_survey
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Policy: Gli admin possono eliminare tutti i sondaggi
CREATE POLICY "Admins can delete all survey responses" ON festival_survey
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM user_roles 
            WHERE user_id = auth.uid() 
            AND role = 'admin'
        )
    );

-- Funzione per ottenere statistiche del sondaggio (solo per admin)
CREATE OR REPLACE FUNCTION get_survey_statistics()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    -- Verifica che l'utente sia admin
    IF NOT EXISTS (
        SELECT 1 FROM user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin'
    ) THEN
        RAISE EXCEPTION 'Access denied. Admin role required.';
    END IF;
    
    SELECT json_build_object(
        'total_responses', COUNT(*),
        'demographics', json_build_object(
            'age_distribution', (
                SELECT json_object_agg(age_range, count)
                FROM (
                    SELECT 
                        CASE 
                            WHEN eta < 18 THEN 'Under 18'
                            WHEN eta BETWEEN 18 AND 25 THEN '18-25'
                            WHEN eta BETWEEN 26 AND 35 THEN '26-35'
                            WHEN eta BETWEEN 36 AND 50 THEN '36-50'
                            WHEN eta > 50 THEN 'Over 50'
                            ELSE 'Unknown'
                        END as age_range,
                        COUNT(*) as count
                    FROM festival_survey
                    GROUP BY age_range
                ) age_stats
            ),
            'gender_distribution', (
                SELECT json_object_agg(genere, count)
                FROM (
                    SELECT genere, COUNT(*) as count
                    FROM festival_survey
                    WHERE genere IS NOT NULL
                    GROUP BY genere
                ) gender_stats
            )
        ),
        'participation', json_build_object(
            'films_watched', (
                SELECT json_object_agg(film_visti, count)
                FROM (
                    SELECT film_visti, COUNT(*) as count
                    FROM festival_survey
                    WHERE film_visti IS NOT NULL
                    GROUP BY film_visti
                ) film_stats
            ),
            'shorts_watched', (
                SELECT json_object_agg(corti_visti, count)
                FROM (
                    SELECT corti_visti, COUNT(*) as count
                    FROM festival_survey
                    WHERE corti_visti IS NOT NULL
                    GROUP BY corti_visti
                ) short_stats
            )
        ),
        'discovery', (
            SELECT json_object_agg(come_conosciuto, count)
            FROM (
                SELECT come_conosciuto, COUNT(*) as count
                FROM festival_survey
                WHERE come_conosciuto IS NOT NULL
                GROUP BY come_conosciuto
            ) discovery_stats
        ),
        'newsletter_interest', (
            SELECT json_object_agg(newsletter, count)
            FROM (
                SELECT newsletter, COUNT(*) as count
                FROM festival_survey
                WHERE newsletter IS NOT NULL
                GROUP BY newsletter
            ) newsletter_stats
        )
    ) INTO result
    FROM festival_survey;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Commenti per documentazione
COMMENT ON TABLE festival_survey IS 'Tabella per memorizzare le risposte al sondaggio di gradimento del festival';
COMMENT ON FUNCTION get_survey_statistics() IS 'Funzione per ottenere statistiche aggregate del sondaggio (solo admin)';