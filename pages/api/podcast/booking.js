export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { eventoId, datiPrenotazione, eventoDettagli } = req.body;

    // Validazione dei dati
    if (!datiPrenotazione.nome || !datiPrenotazione.email || !datiPrenotazione.telefono) {
      return res.status(400).json({ message: 'Dati mancanti' });
    }

    // Invio email di prenotazione
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

Ospiti: ${eventoDettagli.ospiti.join(', ')}
    `;

    // Configurazione email (usando nodemailer)
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'moviebolibooking@gmail.com',
      subject: `Nuova prenotazione podcast - ${eventoDettagli.titolo}`,
      text: emailContent
    });

    res.status(200).json({ success: true, message: 'Prenotazione inviata con successo' });
  } catch (error) {
    console.error('Errore invio prenotazione:', error);
    res.status(500).json({ message: 'Errore interno del server' });
  }
}