import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        return await getUserVote(req, res);
      case 'POST':
        return await saveUserVote(req, res);
      case 'DELETE':
        return await deleteUserVote(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// GET: Recupera il voto dell'utente autenticato
async function getUserVote(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token di autenticazione mancante' });
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  
  if (authError || !user) {
    return res.status(401).json({ error: 'Token non valido' });
  }

  try {
    // Recupera il voto dell'utente
    const { data: voto, error } = await supabase
      .from('contest_voti')
      .select(`
        opera_id,
        voted_at,
        contest_opere (
          nome_film_ispirato,
          autore,
          link_photo
        )
      `)
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      throw error;
    }

    return res.status(200).json({ 
      hasVoted: !!voto,
      voto: voto || null 
    });
  } catch (error) {
    console.error('Errore nel recupero del voto:', error);
    return res.status(500).json({ error: 'Errore nel recupero del voto' });
  }
}

// POST: Salva o aggiorna il voto dell'utente
async function saveUserVote(req, res) {
  const { opera_id } = req.body;
  
  if (!opera_id) {
    return res.status(400).json({ error: 'ID opera mancante' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token di autenticazione mancante' });
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  
  if (authError || !user) {
    return res.status(401).json({ error: 'Token non valido' });
  }

  try {
    // Verifica che l'opera esista
    const { data: opera, error: operaError } = await supabase
      .from('contest_opere')
      .select('id')
      .eq('id', opera_id)
      .single();

    if (operaError || !opera) {
      return res.status(404).json({ error: 'Opera non trovata' });
    }

    // Salva o aggiorna il voto usando upsert
    const { data, error } = await supabase
      .from('contest_voti')
      .upsert(
        {
          user_id: user.id,
          opera_id: opera_id,
          updated_at: new Date().toISOString()
        },
        {
          onConflict: 'user_id'
        }
      )
      .select();

    if (error) {
      throw error;
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Voto salvato con successo',
      voto: data[0]
    });
  } catch (error) {
    console.error('Errore nel salvataggio del voto:', error);
    return res.status(500).json({ error: 'Errore nel salvataggio del voto' });
  }
}

// DELETE: Elimina il voto dell'utente
async function deleteUserVote(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token di autenticazione mancante' });
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  
  if (authError || !user) {
    return res.status(401).json({ error: 'Token non valido' });
  }

  try {
    const { error } = await supabase
      .from('contest_voti')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Voto eliminato con successo'
    });
  } catch (error) {
    console.error('Errore nell\'eliminazione del voto:', error);
    return res.status(500).json({ error: 'Errore nell\'eliminazione del voto' });
  }
}