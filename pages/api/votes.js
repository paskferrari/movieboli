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
        return await getUserVotes(req, res);
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

// GET: Recupera i voti dell'utente
async function getUserVotes(req, res) {
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
    const { data: votes, error } = await supabase
      .from('votes')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }

    return res.status(200).json({ 
      success: true, 
      votes: votes || [] 
    });
  } catch (error) {
    console.error('Errore nel recupero dei voti:', error);
    return res.status(500).json({ error: 'Errore nel recupero dei voti' });
  }
}

// POST: Salva/aggiorna il voto dell'utente
async function saveUserVote(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token di autenticazione mancante' });
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  
  if (authError || !user) {
    return res.status(401).json({ error: 'Token non valido' });
  }

  const { film_id, rating } = req.body;

  // Nuova validazione per scala 1-10 con mezzi voti
  if (!film_id || !rating || rating < 0.5 || rating > 10 || (rating * 2) !== Math.floor(rating * 2)) {
    return res.status(400).json({ 
      error: 'Rating deve essere un valore tra 0.5 e 10.0 con incrementi di 0.5' 
    });
  }

  try {
    const { data, error } = await supabase
      .from('votes')
      .upsert({
        user_id: user.id,
        film_id: film_id,
        rating: rating,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return res.status(200).json({ 
      success: true, 
      vote: data,
      message: 'Voto salvato con successo'
    });
  } catch (error) {
    console.error('Errore nel salvataggio del voto:', error);
    return res.status(500).json({ error: 'Errore nel salvataggio del voto' });
  }
}

// DELETE: Elimina il voto dell'utente per un film specifico
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

  const { film_id } = req.body;

  if (!film_id) {
    return res.status(400).json({ error: 'ID film mancante' });
  }

  try {
    const { error } = await supabase
      .from('votes')
      .delete()
      .eq('user_id', user.id)
      .eq('film_id', film_id);

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