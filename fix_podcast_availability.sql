-- Script SQL per correggere i posti disponibili degli eventi podcast
-- Basato sull'analisi delle prenotazioni reali nel database

-- EVENTO MARIO MARTONE: 27 prenotazioni su 25 posti = SOLD OUT
UPDATE podcast_eventi SET
  posti_prenotati = 27,
  posti_disponibili = 0,
  stato_evento = 'sold_out',
  ultimo_aggiornamento_posti = NOW()
WHERE evento_id = 'podcast-mario-martone-2025';

-- EVENTO MIXED BY ERRY: 21 prenotazioni su 25 posti = 4 disponibili
UPDATE podcast_eventi SET
  posti_prenotati = 21,
  posti_disponibili = 4,
  stato_evento = 'attivo',
  ultimo_aggiornamento_posti = NOW()
WHERE evento_id = 'podcast-mixed-by-erry-2025';

-- EVENTO ALESSANDRO RAK: 5 prenotazioni su 25 posti = 20 disponibili
UPDATE podcast_eventi SET
  posti_prenotati = 5,
  posti_disponibili = 20,
  stato_evento = 'attivo',
  ultimo_aggiornamento_posti = NOW()
WHERE evento_id = 'podcast-alessandro-rak-2025';

-- Verifica finale
SELECT 
  evento_id,
  titolo,
  posti_totali,
  posti_prenotati,
  posti_disponibili,
  stato_evento,
  ultimo_aggiornamento_posti
FROM podcast_eventi 
WHERE evento_id IN (
  'podcast-mario-martone-2025',
  'podcast-mixed-by-erry-2025', 
  'podcast-alessandro-rak-2025'
)
ORDER BY evento_id;