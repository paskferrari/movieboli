    -- Script SQL per aggiornare il database podcast
    -- 1. Ridurre i posti disponibili da 45 a 25 per tutti gli eventi podcast
    -- 2. Eliminare l'evento "Episodio Live: Il Cinema Contemporaneo"

    -- IMPORTANTE: Eseguire questo script sul database Supabase

    -- 1. Prima eliminiamo tutte le prenotazioni per l'evento da rimuovere
    DELETE FROM podcast_prenotazioni 
    WHERE evento_id = 'podcast-pierluigi-gigante-2025';

    -- 2. Eliminiamo gli analytics per l'evento da rimuovere
    DELETE FROM podcast_analytics 
    WHERE evento_id = 'podcast-pierluigi-gigante-2025';

    -- 3. Eliminiamo i log dei posti per l'evento da rimuovere
    DELETE FROM podcast_posti_log 
    WHERE evento_id = 'podcast-pierluigi-gigante-2025';

    -- 4. Eliminiamo l'evento "Episodio Live: Il Cinema Contemporaneo"
    DELETE FROM podcast_eventi 
    WHERE evento_id = 'podcast-pierluigi-gigante-2025';

    -- 5. Aggiorniamo i posti totali e disponibili per tutti gli eventi rimanenti
    -- Riduciamo da 45 a 25 posti, mantenendo le proporzioni
    UPDATE podcast_eventi 
    SET 
        posti_totali = 25,
        posti_disponibili = CASE 
            -- Se l'evento è sold out, mantieni 0 posti disponibili
            WHEN stato_evento = 'sold_out' THEN 0
            -- Altrimenti calcola proporzionalmente i nuovi posti disponibili
            ELSE GREATEST(0, 25 - posti_prenotati)
        END,
        -- Aggiorna lo stato se necessario
        stato_evento = CASE 
            WHEN posti_prenotati >= 25 THEN 'sold_out'
            ELSE stato_evento
        END,
        ultimo_aggiornamento_posti = NOW()
    WHERE evento_id IN (
        'podcast-mixed-by-erry-2025',
        'podcast-mario-martone-2025', 
        'podcast-alessandro-rak-2025'
    );

    -- 6. Log delle modifiche effettuate
    INSERT INTO podcast_posti_log (evento_id, posti_prima, posti_dopo, tipo_modifica, note)
    SELECT 
        evento_id,
        45 as posti_prima,
        25 as posti_dopo,
        'riduzione_amministrativa' as tipo_modifica,
        'Riduzione posti da 45 a 25 per evento podcast' as note
    FROM podcast_eventi 
    WHERE evento_id IN (
        'podcast-mixed-by-erry-2025',
        'podcast-mario-martone-2025', 
        'podcast-alessandro-rak-2025'
    );

    -- 7. Verifica finale - Mostra lo stato aggiornato degli eventi
    SELECT 
        evento_id,
        titolo,
        data_evento,
        posti_totali,
        posti_prenotati,
        posti_disponibili,
        stato_evento
    FROM podcast_eventi 
    ORDER BY data_evento;

    -- NOTA: Dopo aver eseguito questo script, aggiornare anche:
    -- 1. Il file seed.js per rimuovere l'evento eliminato
    -- 2. Il file admin.js per rimuovere i riferimenti all'evento
    -- 3. Verificare altri file che potrebbero referenziare l'evento eliminato