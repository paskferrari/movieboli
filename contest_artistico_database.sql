-- Script SQL per le tabelle del Contest Artistico MOVIEBOLI 2025
-- Questo script crea le tabelle necessarie per gestire i voti del contest artistico

-- Tabella per le opere d'arte del contest
CREATE TABLE IF NOT EXISTS contest_opere (
    id SERIAL PRIMARY KEY,
    nome_film_ispirato VARCHAR(255) NOT NULL,
    autore VARCHAR(255) NOT NULL,
    link_photo TEXT NOT NULL,
    descrizione TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabella per i voti del contest artistico
CREATE TABLE IF NOT EXISTS contest_voti (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    opera_id INTEGER NOT NULL REFERENCES contest_opere(id) ON DELETE CASCADE,
    voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraint per assicurare che ogni utente possa votare solo una volta
    UNIQUE(user_id)
);

-- Indici per migliorare le performance
CREATE INDEX IF NOT EXISTS idx_contest_voti_user_id ON contest_voti(user_id);
CREATE INDEX IF NOT EXISTS idx_contest_voti_opera_id ON contest_voti(opera_id);
CREATE INDEX IF NOT EXISTS idx_contest_voti_voted_at ON contest_voti(voted_at);

-- Trigger per aggiornare automaticamente updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contest_opere_updated_at BEFORE UPDATE ON contest_opere
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contest_voti_updated_at BEFORE UPDATE ON contest_voti
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Inserimento delle opere d'arte dal JSON
INSERT INTO contest_opere (nome_film_ispirato, autore, link_photo) VALUES
('Deadpool & Wolverine', 'Enrico Mancino', 'https://i.ibb.co/XxChwXqt/Enrico-Mancino-opera-ispirata-al-film-Deadpool-Wolverine.jpg'),
('Marilyn (ispirato a film iconici su Marilyn Monroe)', 'Francesco Carbone (Effe Legno)', 'https://i.ibb.co/0V8GPxBn/Francesco-Carbone-Effe-Legno-Marilyn.jpg'),
('Adventures of Buratino', 'Gaia Sebastiani', 'https://i.ibb.co/vx3qspCL/Gaia-Sebastiani-adventures-of-buratino.jpg'),
('American Hustle', 'Samuele Laezza', 'https://i.ibb.co/QjYKr5Pr/Samuele-Laezza-American-Hustle.jpg'),
('Joker', 'Davide Stabile', 'https://i.ibb.co/7J1FwyYV/Davide-stabile-Joker.png'),
('Climax', 'Giulia Buratti', 'https://i.ibb.co/p6yQBC11/Giulia-Buratti-opera-ispirata-al-Film-Climax.jpg'),
('Léon', 'Ilaria Di Benedetto', 'https://i.ibb.co/DP84bZdw/Ilaria-Di-Benedetto-film-Leon.jpg')
ON CONFLICT DO NOTHING;

-- View per ottenere statistiche sui voti
CREATE OR REPLACE VIEW contest_statistiche AS
SELECT 
    o.id,
    o.nome_film_ispirato,
    o.autore,
    o.link_photo,
    COUNT(v.id) as numero_voti,
    ROUND((COUNT(v.id) * 100.0 / NULLIF((SELECT COUNT(*) FROM contest_voti), 0)), 2) as percentuale_voti
FROM contest_opere o
LEFT JOIN contest_voti v ON o.id = v.opera_id
GROUP BY o.id, o.nome_film_ispirato, o.autore, o.link_photo
ORDER BY numero_voti DESC, o.autore;

-- Funzione per ottenere il voto di un utente
CREATE OR REPLACE FUNCTION get_user_contest_vote(user_uuid UUID)
RETURNS TABLE(
    opera_id INTEGER,
    nome_film_ispirato VARCHAR(255),
    autore VARCHAR(255),
    voted_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.opera_id,
        o.nome_film_ispirato,
        o.autore,
        v.voted_at
    FROM contest_voti v
    JOIN contest_opere o ON v.opera_id = o.id
    WHERE v.user_id = user_uuid;
END;
$$ LANGUAGE plpgsql;

-- Funzione per salvare/aggiornare il voto di un utente
CREATE OR REPLACE FUNCTION save_contest_vote(user_uuid UUID, new_opera_id INTEGER)
RETURNS BOOLEAN AS $$
BEGIN
    -- Inserisce o aggiorna il voto dell'utente
    INSERT INTO contest_voti (user_id, opera_id)
    VALUES (user_uuid, new_opera_id)
    ON CONFLICT (user_id) 
    DO UPDATE SET 
        opera_id = EXCLUDED.opera_id,
        updated_at = NOW();
    
    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- Policy RLS (Row Level Security) per Supabase
ALTER TABLE contest_opere ENABLE ROW LEVEL SECURITY;
ALTER TABLE contest_voti ENABLE ROW LEVEL SECURITY;

-- Policy per lettura delle opere (tutti possono leggere)
CREATE POLICY "Tutti possono leggere le opere del contest" ON contest_opere
    FOR SELECT USING (true);

-- Policy per lettura dei propri voti
CREATE POLICY "Gli utenti possono leggere i propri voti" ON contest_voti
    FOR SELECT USING (auth.uid() = user_id);

-- Policy per inserimento/aggiornamento dei propri voti
CREATE POLICY "Gli utenti possono inserire i propri voti" ON contest_voti
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Gli utenti possono aggiornare i propri voti" ON contest_voti
    FOR UPDATE USING (auth.uid() = user_id);

-- Policy per eliminazione dei propri voti
CREATE POLICY "Gli utenti possono eliminare i propri voti" ON contest_voti
    FOR DELETE USING (auth.uid() = user_id);

-- Commenti per documentazione
COMMENT ON TABLE contest_opere IS 'Tabella contenente le opere d\'arte del contest MOVIEBOLI 2025';
COMMENT ON TABLE contest_voti IS 'Tabella contenente i voti degli utenti per il contest artistico. Ogni utente può votare una sola opera.';
COMMENT ON COLUMN contest_voti.user_id IS 'ID dell\'utente che ha espresso il voto (riferimento a auth.users)';
COMMENT ON COLUMN contest_voti.opera_id IS 'ID dell\'opera votata (riferimento a contest_opere)';
COMMENT ON VIEW contest_statistiche IS 'Vista che mostra le statistiche dei voti per ogni opera del contest';