import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Recupera le statistiche dei voti usando la view creata nel database
    const { data: statistiche, error } = await supabase
      .from('contest_statistiche')
      .select('*')
      .order('numero_voti', { ascending: false });

    if (error) {
      throw error;
    }

    // Recupera il numero totale di voti
    const { data: totaleVoti, error: totaleError } = await supabase
      .from('contest_voti')
      .select('id', { count: 'exact' });

    if (totaleError) {
      throw totaleError;
    }

    // Recupera il numero totale di opere
    const { data: totaleOpere, error: opereError } = await supabase
      .from('contest_opere')
      .select('id', { count: 'exact' });

    if (opereError) {
      throw opereError;
    }

    return res.status(200).json({
      statistiche: statistiche || [],
      totale_voti: totaleVoti?.length || 0,
      totale_opere: totaleOpere?.length || 0,
      aggiornato_il: new Date().toISOString()
    });
  } catch (error) {
    console.error('Errore nel recupero delle statistiche:', error);
    return res.status(500).json({ error: 'Errore nel recupero delle statistiche' });
  }
}