import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metodo non consentito' });
  }

  try {
    // Prima elimina tutte le vecchie analytics (per rispettare i vincoli FK)
    const { error: deleteAnalyticsError } = await supabase
      .from('podcast_analytics')
      .delete()
      .neq('id', 0); // Elimina tutti i record

    if (deleteAnalyticsError) {
      console.warn('Errore eliminazione analytics:', deleteAnalyticsError);
      // Non bloccare per errori analytics
    }

    // Poi elimina tutte le vecchie prenotazioni
    const { error: deletePrenotazioniError } = await supabase
      .from('podcast_prenotazioni')
      .delete()
      .neq('id', 0); // Elimina tutti i record

    if (deletePrenotazioniError) {
      console.error('Errore eliminazione prenotazioni:', deletePrenotazioniError);
      throw deletePrenotazioniError;
    }

    // Infine elimina tutti i vecchi eventi podcast
    const { error: deleteEventiError } = await supabase
      .from('podcast_eventi')
      .delete()
      .neq('evento_id', 'dummy'); // Elimina tutti i record

    if (deleteEventiError) {
      console.error('Errore eliminazione eventi:', deleteEventiError);
      throw deleteEventiError;
    }

    return res.status(200).json({
      success: true,
      message: 'Database pulito con successo. Ora puoi eseguire il seed.'
    });

  } catch (error) {
    console.error('Errore nel cleanup database:', error);
    return res.status(500).json({
      success: false,
      message: 'Errore nel cleanup del database',
      error: error.message
    });
  }
}