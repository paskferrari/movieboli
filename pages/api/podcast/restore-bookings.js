import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metodo non consentito' });
  }

  try {
    // Leggi il file delle prenotazioni reali
    const filePath = path.join(process.cwd(), 'logTabellaPrenotazioni.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const prenotazioniReali = JSON.parse(fileContent);

    // Mappa gli ID vecchi ai nuovi
    const eventIdMapping = {
      '22-agosto': 'podcast-mixed-by-erry-2025',
      '23-agosto-sera': 'podcast-mario-martone-2025',
      '24-agosto': 'podcast-alessandro-rak-2025'
    };

    // Filtra solo le prenotazioni per eventi podcast e mappa agli ID corretti
    const prenotazioniPodcast = prenotazioniReali
      .filter(p => {
        const eventoId = p.evento_id || p.eventoId;
        return eventoId && (
          eventoId.startsWith('podcast-') || 
          eventIdMapping[eventoId]
        );
      })
      .map(p => {
        const eventoId = p.evento_id || p.eventoId;
        const mappedEventoId = eventIdMapping[eventoId] || eventoId;
        
        return {
          evento_id: mappedEventoId,
          nome: p.nome || 'Nome non disponibile',
          email: p.email || 'email@example.com',
          telefono: p.telefono || '+39 000 0000000',
          note: p.note || '',
          data_prenotazione: p.data_prenotazione || p.dataPrenotazione || new Date().toISOString(),
          stato: p.stato || 'confermata'
        };
      });

    console.log(`Trovate ${prenotazioniPodcast.length} prenotazioni podcast da inserire`);

    // Inserisci le prenotazioni nel database
    const { data: prenotazioniInserite, error: insertError } = await supabase
      .from('podcast_prenotazioni')
      .insert(prenotazioniPodcast)
      .select();

    if (insertError) {
      console.error('Errore inserimento prenotazioni:', insertError);
      throw insertError;
    }

    // Conta le prenotazioni per evento
    const conteggioPerEvento = {};
    prenotazioniPodcast.forEach(p => {
      conteggioPerEvento[p.evento_id] = (conteggioPerEvento[p.evento_id] || 0) + 1;
    });

    return res.status(200).json({
      success: true,
      message: 'Prenotazioni ripristinate con successo!',
      data: {
        prenotazioni_inserite: prenotazioniInserite?.length || 0,
        conteggio_per_evento: conteggioPerEvento
      }
    });

  } catch (error) {
    console.error('Errore nel ripristino prenotazioni:', error);
    return res.status(500).json({
      success: false,
      message: 'Errore nel ripristino delle prenotazioni',
      error: error.message
    });
  }
}