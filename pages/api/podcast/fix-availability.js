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
    // Aggiorna i dati corretti basati sull'analisi delle prenotazioni reali
    const updates = [
      {
        evento_id: 'podcast-mario-martone-2025',
        posti_disponibili: 0,
        posti_prenotati: 27,
        stato_evento: 'sold_out'
      },
      {
        evento_id: 'podcast-mixed-by-erry-2025',
        posti_disponibili: 4,
        posti_prenotati: 21,
        stato_evento: 'attivo'
      },
      {
        evento_id: 'podcast-alessandro-rak-2025',
        posti_disponibili: 20,
        posti_prenotati: 5,
        stato_evento: 'attivo'
      }
    ];

    const results = [];

    for (const update of updates) {
      const { data, error } = await supabase
        .from('podcast_eventi')
        .update({
          posti_disponibili: update.posti_disponibili,
          posti_prenotati: update.posti_prenotati,
          stato_evento: update.stato_evento,
          ultimo_aggiornamento_posti: new Date().toISOString()
        })
        .eq('evento_id', update.evento_id)
        .select();

      if (error) {
        console.error(`Errore aggiornamento ${update.evento_id}:`, error);
        throw error;
      }

      results.push({ evento_id: update.evento_id, updated: data?.length > 0 });
    }

    return res.status(200).json({
      success: true,
      message: 'Disponibilità posti aggiornata con successo!',
      updates: results
    });

  } catch (error) {
    console.error('Errore nell\'aggiornamento disponibilità:', error);
    return res.status(500).json({
      success: false,
      message: 'Errore nell\'aggiornamento della disponibilità',
      error: error.message
    });
  }
}