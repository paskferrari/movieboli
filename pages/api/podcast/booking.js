import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Endpoint per ottenere i posti disponibili
    try {
      const { data: eventi, error } = await supabase
        .from('podcast_eventi')
        .select('evento_id, posti_disponibili, posti_totali');

      if (error) throw error;

      const postiDisponibili = {};
      eventi.forEach(evento => {
        postiDisponibili[evento.evento_id] = evento.posti_disponibili;
      });

      return res.status(200).json({ postiDisponibili });
    } catch (error) {
      console.error('Errore nel recupero posti:', error);
      return res.status(500).json({ message: 'Errore nel recupero dei posti disponibili' });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { eventoId, datiPrenotazione, eventoDettagli } = req.body;

    // Validazione dei dati
    if (!datiPrenotazione.nome || !datiPrenotazione.email || !datiPrenotazione.telefono) {
      return res.status(400).json({ message: 'Dati mancanti' });
    }

    // Verifica disponibilità posti
    const { data: evento, error: eventoError } = await supabase
      .from('podcast_eventi')
      .select('posti_disponibili, posti_totali')
      .eq('evento_id', eventoId)
      .single();

    if (eventoError) {
      console.error('Errore nel recupero evento:', eventoError);
      return res.status(500).json({ message: 'Errore nel controllo disponibilità' });
    }

    if (!evento || evento.posti_disponibili <= 0) {
      return res.status(400).json({ message: 'Posti esauriti per questo evento' });
    }

    // Inizia transazione per prenotazione
    const { data: prenotazione, error: prenotazioneError } = await supabase
      .from('podcast_prenotazioni')
      .insert({
        evento_id: eventoId,
        nome: datiPrenotazione.nome,
        email: datiPrenotazione.email,
        telefono: datiPrenotazione.telefono,
        note: datiPrenotazione.note || '',
        data_prenotazione: new Date().toISOString(),
        stato: 'confermata'
      })
      .select()
      .single();

    if (prenotazioneError) {
      console.error('Errore inserimento prenotazione:', prenotazioneError);
      return res.status(500).json({ message: 'Errore nella creazione della prenotazione' });
    }

    // Aggiorna posti disponibili
    const { error: updateError } = await supabase
      .from('podcast_eventi')
      .update({ posti_disponibili: evento.posti_disponibili - 1 })
      .eq('evento_id', eventoId);

    if (updateError) {
      console.error('Errore aggiornamento posti:', updateError);
      // Rollback: elimina la prenotazione se l'aggiornamento fallisce
      await supabase
        .from('podcast_prenotazioni')
        .delete()
        .eq('id', prenotazione.id);
      return res.status(500).json({ message: 'Errore nell\'aggiornamento dei posti disponibili' });
    }

    // Invio email di conferma
    const emailContent = `
Nuova prenotazione podcast:

Evento: ${eventoDettagli.titolo}
Data: ${eventoDettagli.data} alle ${eventoDettagli.orario}
Luogo: ${eventoDettagli.luogo}

Dati prenotazione:
- Nome: ${datiPrenotazione.nome}
- Email: ${datiPrenotazione.email}
- Telefono: ${datiPrenotazione.telefono}
- Note: ${datiPrenotazione.note || 'Nessuna nota'}

Ospiti: ${eventoDettagli.ospiti ? eventoDettagli.ospiti.join(', ') : 'Da confermare'}

Posti rimanenti: ${evento.posti_disponibili - 1}
Codice prenotazione: ${prenotazione.id}
    `;

    // Configurazione email
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email all'organizzatore
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'moviebolibooking@gmail.com',
      subject: `Nuova prenotazione podcast - ${eventoDettagli.titolo}`,
      text: emailContent
    });

    // Email di conferma al cliente
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: datiPrenotazione.email,
      subject: `Conferma prenotazione - ${eventoDettagli.titolo}`,
      text: `Ciao ${datiPrenotazione.nome},

    La tua prenotazione per "${eventoDettagli.titolo}" è stata confermata!

    Dettagli evento:
    - Data: ${eventoDettagli.data} alle ${eventoDettagli.orario}
    - Luogo: ${eventoDettagli.luogo}
    - Ospiti: ${eventoDettagli.ospiti ? eventoDettagli.ospiti.join(', ') : 'Da confermare'}
    
    Codice prenotazione: ${prenotazione.id}
    
    Ti aspettiamo!
    
    Il team di MovieBoli`
    });

    res.status(200).json({ 
      success: true, 
      message: 'Prenotazione confermata con successo',
      codicePrenotazione: prenotazione.id,
      postiRimanenti: evento.posti_disponibili - 1
    });
  } catch (error) {
    console.error('Errore invio prenotazione:', error);
    res.status(500).json({ message: 'Errore interno del server' });
  }
}