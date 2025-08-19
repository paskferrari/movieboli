import { createClient } from '@supabase/supabase-js';
import { isUserAdmin } from '../../../lib/supabase';

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

  switch (req.method) {
    case 'GET':
      return getPrenotazioni(req, res);
    case 'POST':
      return createPrenotazione(req, res);
    case 'PUT':
      return updatePrenotazione(req, res);
    case 'DELETE':
      return deletePrenotazione(req, res);
    default:
      return res.status(405).json({ message: 'Metodo non consentito' });
  }
}

// GET - Recupera tutte le prenotazioni con analytics
async function getPrenotazioni(req, res) {
  try {
    // Recupera prenotazioni con eventi correlati
    const { data: prenotazioni, error } = await supabase
      .from('podcast_prenotazioni')
      .select(`
        *,
        podcast_eventi (
          evento_id,
          titolo,
          data_evento,
          orario,
          luogo,
          posti_totali,
          posti_disponibili,
          posti_prenotati,
          stato_evento,
          descrizione
        )
      `)
      .order('data_prenotazione', { ascending: false });

    if (error) throw error;

    // Recupera tutti gli eventi
    const { data: eventi, error: eventiError } = await supabase
      .from('podcast_eventi')
      .select('*')
      .order('data_evento', { ascending: true });

    if (eventiError) throw eventiError;

    // Recupera analytics
    const { data: analytics, error: analyticsError } = await supabase
      .from('podcast_analytics')
      .select('*')
      .order('timestamp_evento', { ascending: false })
      .limit(100);

    if (analyticsError) console.warn('Errore analytics:', analyticsError);

    // Calcola statistiche dettagliate
    const oggi = new Date().toISOString().split('T')[0];
    const prenotazioniOggi = prenotazioni?.filter(p => 
      p.data_prenotazione?.split('T')[0] === oggi
    ).length || 0;

    const totalePostiPrenotati = eventi?.reduce((sum, evento) => 
      sum + (evento.posti_prenotati || 0), 0) || 0;
    
    const totalePostiDisponibili = eventi?.reduce((sum, evento) => 
      sum + (evento.posti_disponibili || 0), 0) || 0;

    const eventiAttivi = eventi?.filter(e => e.stato_evento === 'attivo').length || 0;
    const eventiSoldOut = eventi?.filter(e => e.stato_evento === 'sold_out').length || 0;

    // Analytics per tipo di evento
    const analyticsPerTipo = analytics?.reduce((acc, item) => {
      acc[item.tipo_evento] = (acc[item.tipo_evento] || 0) + 1;
      return acc;
    }, {}) || {};

    const statistiche = {
      totalePrenotazioni: prenotazioni?.length || 0,
      prenotazioniOggi,
      totaleEventi: eventi?.length || 0,
      eventiAttivi,
      eventiSoldOut,
      totalePostiPrenotati,
      totalePostiDisponibili,
      percentualeOccupazione: totalePostiPrenotati > 0 ? 
        Math.round((totalePostiPrenotati / (totalePostiPrenotati + totalePostiDisponibili)) * 100) : 0,
      analyticsPerTipo,
      ultimaAttivita: analytics?.[0]?.timestamp_evento || null
    };

    return res.status(200).json({
      success: true,
      prenotazioni: prenotazioni || [],
      eventi: eventi || [],
      analytics: analytics || [],
      statistiche
    });
  } catch (error) {
    console.error('Errore nel recupero prenotazioni:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Errore nel recupero delle prenotazioni',
      error: error.message
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
      .select('*')
      .eq('evento_id', evento_id)
      .single();

    if (eventoError || !evento) {
      return res.status(404).json({ 
        success: false, 
        message: 'Evento non trovato' 
      });
    }

    if (evento.posti_disponibili <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Posti esauriti per questo evento' 
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
        stato: 'confermata',
        fonte_prenotazione: 'admin'
      })
      .select()
      .single();

    if (prenotazioneError) throw prenotazioneError;

    // Aggiorna contatori posti
    const nuoviPostiDisponibili = evento.posti_disponibili - 1;
    const nuoviPostiPrenotati = (evento.posti_prenotati || 0) + 1;
    const nuovoStato = nuoviPostiDisponibili === 0 ? 'sold_out' : evento.stato_evento;

    const { error: updateError } = await supabase
      .from('podcast_eventi')
      .update({ 
        posti_disponibili: nuoviPostiDisponibili,
        posti_prenotati: nuoviPostiPrenotati,
        stato_evento: nuovoStato,
        ultimo_aggiornamento_posti: new Date().toISOString()
      })
      .eq('evento_id', evento_id);

    if (updateError) {
      // Rollback prenotazione
      await supabase
        .from('podcast_prenotazioni')
        .delete()
        .eq('id', prenotazione.id);
      throw updateError;
    }

    // Log analytics
    await supabase
      .from('podcast_analytics')
      .insert({
        evento_id,
        tipo_evento: 'prenotazione_creata_admin',
        dati_aggiuntivi: {
          prenotazione_id: prenotazione.id,
          posti_rimasti: nuoviPostiDisponibili
        }
      });

    // Log modifica posti
    await supabase
      .from('podcast_posti_log')
      .insert({
        evento_id,
        posti_prima: evento.posti_disponibili,
        posti_dopo: nuoviPostiDisponibili,
        tipo_modifica: 'prenotazione_admin',
        note: `Prenotazione creata da admin per ${nome}`
      });

    return res.status(201).json({
      success: true,
      message: 'Prenotazione creata con successo',
      prenotazione,
      postiRimasti: nuoviPostiDisponibili
    });
  } catch (error) {
    console.error('Errore nella creazione prenotazione:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Errore nella creazione della prenotazione',
      error: error.message
    });
  }
}

// PUT - Aggiorna prenotazione
async function updatePrenotazione(req, res) {
  try {
    const { id } = req.query;
    const { nome, email, telefono, note, stato } = req.body;

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
        stato
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Log analytics
    await supabase
      .from('podcast_analytics')
      .insert({
        evento_id: prenotazione.evento_id,
        tipo_evento: 'prenotazione_modificata_admin',
        dati_aggiuntivi: {
          prenotazione_id: id,
          modifiche: { nome, email, telefono, note, stato }
        }
      });

    return res.status(200).json({
      success: true,
      message: 'Prenotazione aggiornata con successo',
      prenotazione
    });
  } catch (error) {
    console.error('Errore nell\'aggiornamento prenotazione:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Errore nell\'aggiornamento della prenotazione',
      error: error.message
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

    // Recupera prenotazione prima di eliminarla
    const { data: prenotazione, error: getError } = await supabase
      .from('podcast_prenotazioni')
      .select('*, podcast_eventi(*)')
      .eq('id', id)
      .single();

    if (getError || !prenotazione) {
      return res.status(404).json({ 
        success: false, 
        message: 'Prenotazione non trovata' 
      });
    }

    // Elimina prenotazione
    const { error: deleteError } = await supabase
      .from('podcast_prenotazioni')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    // Aggiorna contatori posti se la prenotazione era confermata
    if (prenotazione.stato === 'confermata') {
      const evento = prenotazione.podcast_eventi;
      const nuoviPostiDisponibili = evento.posti_disponibili + 1;
      const nuoviPostiPrenotati = Math.max(0, (evento.posti_prenotati || 0) - 1);
      const nuovoStato = evento.stato_evento === 'sold_out' ? 'attivo' : evento.stato_evento;

      await supabase
        .from('podcast_eventi')
        .update({ 
          posti_disponibili: nuoviPostiDisponibili,
          posti_prenotati: nuoviPostiPrenotati,
          stato_evento: nuovoStato,
          ultimo_aggiornamento_posti: new Date().toISOString()
        })
        .eq('evento_id', prenotazione.evento_id);

      // Log modifica posti
      await supabase
        .from('podcast_posti_log')
        .insert({
          evento_id: prenotazione.evento_id,
          posti_prima: evento.posti_disponibili,
          posti_dopo: nuoviPostiDisponibili,
          tipo_modifica: 'cancellazione_admin',
          note: `Prenotazione eliminata da admin per ${prenotazione.nome}`
        });
    }

    // Log analytics
    await supabase
      .from('podcast_analytics')
      .insert({
        evento_id: prenotazione.evento_id,
        tipo_evento: 'prenotazione_eliminata_admin',
        dati_aggiuntivi: {
          prenotazione_eliminata: {
            id: prenotazione.id,
            nome: prenotazione.nome,
            email: prenotazione.email
          }
        }
      });

    return res.status(200).json({
      success: true,
      message: 'Prenotazione eliminata con successo'
    });
  } catch (error) {
    console.error('Errore nell\'eliminazione prenotazione:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Errore nell\'eliminazione della prenotazione',
      error: error.message
    });
  }
}