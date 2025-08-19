import { createClient } from '@supabase/supabase-js';
import { isUserAdmin } from '../../lib/supabase';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  // Verifica autenticazione admin
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    return res.status(403).json({ message: 'Accesso negato. Solo amministratori.' });
  }

  const { method } = req;

  switch (method) {
    case 'GET':
      return await getPrenotazioni(req, res);
    case 'POST':
      return await createPrenotazione(req, res);
    case 'PUT':
      return await updatePrenotazione(req, res);
    case 'DELETE':
      return await deletePrenotazione(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

// GET - Recupera tutte le prenotazioni
async function getPrenotazioni(req, res) {
  try {
    const { data: prenotazioni, error } = await supabase
      .from('podcast_prenotazioni')
      .select(`
        *,
        podcast_eventi (
          titolo,
          data,
          orario,
          luogo,
          posti_totali
        )
      `)
      .order('data_prenotazione', { ascending: false });

    if (error) throw error;

    // Statistiche aggiuntive
    const { data: eventi, error: eventiError } = await supabase
      .from('podcast_eventi')
      .select('evento_id, titolo, posti_disponibili, posti_totali');

    if (eventiError) throw eventiError;

    return res.status(200).json({
      success: true,
      prenotazioni: prenotazioni || [],
      eventi: eventi || [],
      statistiche: {
        totalePrenotazioni: prenotazioni?.length || 0,
        prenotazioniOggi: prenotazioni?.filter(p => 
          new Date(p.data_prenotazione).toDateString() === new Date().toDateString()
        ).length || 0
      }
    });
  } catch (error) {
    console.error('Errore nel recupero prenotazioni:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Errore nel recupero delle prenotazioni' 
    });
  }
}

// POST - Crea nuova prenotazione
async function createPrenotazione(req, res) {
  try {
    const { evento_id, nome, email, telefono, note } = req.body;

    // Validazione
    if (!evento_id || !nome || !email || !telefono) {
      return res.status(400).json({ 
        success: false, 
        message: 'Dati mancanti: evento_id, nome, email e telefono sono obbligatori' 
      });
    }

    // Verifica disponibilità posti
    const { data: evento, error: eventoError } = await supabase
      .from('podcast_eventi')
      .select('posti_disponibili')
      .eq('evento_id', evento_id)
      .single();

    if (eventoError || !evento || evento.posti_disponibili <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Evento non trovato o posti esauriti' 
      });
    }

    // Crea prenotazione
    const { data: prenotazione, error: prenotazioneError } = await supabase
      .from('podcast_prenotazioni')
      .insert({
        evento_id,
        nome,
        email,
        telefono,
        note: note || '',
        data_prenotazione: new Date().toISOString(),
        stato: 'confermata'
      })
      .select()
      .single();

    if (prenotazioneError) throw prenotazioneError;

    // Aggiorna posti disponibili
    const { error: updateError } = await supabase
      .from('podcast_eventi')
      .update({ posti_disponibili: evento.posti_disponibili - 1 })
      .eq('evento_id', evento_id);

    if (updateError) {
      // Rollback
      await supabase
        .from('podcast_prenotazioni')
        .delete()
        .eq('id', prenotazione.id);
      throw updateError;
    }

    return res.status(201).json({
      success: true,
      message: 'Prenotazione creata con successo',
      prenotazione
    });
  } catch (error) {
    console.error('Errore nella creazione prenotazione:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Errore nella creazione della prenotazione' 
    });
  }
}

// PUT - Aggiorna prenotazione
async function updatePrenotazione(req, res) {
  try {
    const { id, nome, email, telefono, note, stato } = req.body;

    if (!id) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID prenotazione mancante' 
      });
    }

    const { data: prenotazione, error } = await supabase
      .from('podcast_prenotazioni')
      .update({
        nome,
        email,
        telefono,
        note,
        stato,
        data_modifica: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: 'Prenotazione aggiornata con successo',
      prenotazione
    });
  } catch (error) {
    console.error('Errore nell\'aggiornamento prenotazione:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Errore nell\'aggiornamento della prenotazione' 
    });
  }
}

// DELETE - Elimina prenotazione
async function deletePrenotazione(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID prenotazione mancante' 
      });
    }

    // Recupera info prenotazione prima di eliminarla
    const { data: prenotazione, error: getError } = await supabase
      .from('podcast_prenotazioni')
      .select('evento_id')
      .eq('id', id)
      .single();

    if (getError) throw getError;

    // Elimina prenotazione
    const { error: deleteError } = await supabase
      .from('podcast_prenotazioni')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    // Ripristina posto disponibile
    const { error: updateError } = await supabase
      .rpc('increment_posti_disponibili', { 
        evento_id_param: prenotazione.evento_id 
      });

    if (updateError) {
      console.warn('Errore nel ripristino posti:', updateError);
    }

    return res.status(200).json({
      success: true,
      message: 'Prenotazione eliminata con successo'
    });
  } catch (error) {
    console.error('Errore nell\'eliminazione prenotazione:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Errore nell\'eliminazione della prenotazione' 
    });
  }
}