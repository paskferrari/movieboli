import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Verifica che le variabili di ambiente siano configurate
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variabili di ambiente Supabase mancanti. Controlla NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY nel file .env.local')
}

// Crea il client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Funzioni di autenticazione
export const signUp = async (email, password, userData = {}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })
  if (error) throw error
  return data
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback)
}

// Funzione per verificare se l'utente è admin
export const isUserAdmin = async () => {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return false
    }
    
    // 1. Controllo email speciale admin
    if (user.email === 'amministratoreunico@movieboli.com') {
      return true
    }
    
    // 2. Controllo user_metadata
    if (user.user_metadata?.role === 'admin') {
      return true
    }
    
    // 3. Controllo app_metadata
    if (user.app_metadata?.role === 'admin') {
      return true
    }
    
    // 4. Query diretta al database per raw_user_meta_data
    try {
      const { data: userData, error: userError } = await supabase
        .from('auth.users')
        .select('raw_user_meta_data, raw_app_meta_data')
        .eq('id', user.id)
        .single()
      
      if (!userError && userData) {
        if (userData?.raw_user_meta_data?.role === 'admin' || 
            userData?.raw_app_meta_data?.role === 'admin') {
          return true
        }
      }
    } catch (dbError) {
      console.warn('Errore accesso database per controllo admin:', dbError.message)
    }
    
    return false
    
  } catch (error) {
    console.error('Errore durante controllo admin:', error)
    return false
  }
}

// Dati dei film
const filmData = [
  { id: 'dieci-secondi', titolo: 'DIECI SECONDI', regista: 'Roberta Palmieri' },
  { id: 'appuntamento-mezzogiorno', titolo: 'APPUNTAMENTO A MEZZOGIORNO', regista: 'Antonio Passaro' },
  { id: 'place-under-sun', titolo: 'Place under the sun', regista: 'Vlad Bolgarin' },
  { id: 'fathers-letters', titolo: "Father's Letters", regista: 'Alexey Evstigneev' },
  { id: 'sharing-caring', titolo: 'SHARING IS CARING', regista: 'Vincenzo Mauro' },
  { id: 'ya-hanouni', titolo: 'Ya Hanouni', regista: 'Lyna Tadount, Sofian Chouaib' },
  { id: 'jus-orange', titolo: "Jus d'orange", regista: 'Alexandre Athané' },
  { id: 'rock-tensions', titolo: 'The Rock Tensions', regista: 'Markus Lehtokumpu' }
]

// Funzioni per gestire i voti
export const saveVote = async (userId, filmId, rating) => {
  const { data, error } = await supabase
    .from('votes')
    .upsert({
      user_id: userId,
      film_id: filmId,
      rating: rating,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,film_id'
    })
  
  if (error) throw error
  return data
}

export const getUserVotes = async (userId) => {
  const { data, error } = await supabase
    .from('votes')
    .select('*')
    .eq('user_id', userId)
  
  if (error) throw error
  return data || []
}

export const getFilmVoteStats = async (filmId) => {
  const { data, error } = await supabase
    .from('votes')
    .select('rating')
    .eq('film_id', filmId)
  
  if (error) throw error
  
  const votes = data || []
  const totalVotes = votes.length
  const averageRating = totalVotes > 0 
    ? votes.reduce((sum, vote) => sum + vote.rating, 0) / totalVotes 
    : 0
  
  const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
    rating,
    count: votes.filter(vote => vote.rating === rating).length
  }))
  
  return {
    filmId,
    totalVotes,
    averageRating: Math.round(averageRating * 100) / 100,
    ratingDistribution
  }
}

export const getAllVotesStats = async () => {
  const { data, error } = await supabase
    .from('votes')
    .select('*')
  
  if (error) throw error
  
  const votes = data || []
  const stats = {}
  
  filmData.forEach(film => {
    const filmVotes = votes.filter(vote => vote.film_id === film.id)
    const totalVotes = filmVotes.length
    const averageRating = totalVotes > 0 
      ? filmVotes.reduce((sum, vote) => sum + vote.rating, 0) / totalVotes 
      : 0
    
    stats[film.id] = {
      ...film,
      totalVotes,
      averageRating: Math.round(averageRating * 100) / 100,
      ratingDistribution: [1, 2, 3, 4, 5].map(rating => ({
        rating,
        count: filmVotes.filter(vote => vote.rating === rating).length
      }))
    }
  })
  
  return stats
}

export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
  
  if (error) throw error
  return data || []
}
// ... existing code ...

// Funzione per statistiche avanzate (solo admin)
export const getAdvancedVotesStats = async () => {
  if (isDemoMode) {
    // Demo mode - simula statistiche avanzate
    const totalVotes = demoVotes.length;
    const uniqueUsers = [...new Set(demoVotes.map(vote => vote.user_id))].length;
    const avgRating = demoVotes.reduce((sum, vote) => sum + vote.rating, 0) / totalVotes;
    
    // Trend temporali (ultimi 7 giorni)
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayVotes = demoVotes.filter(vote => {
        const voteDate = new Date(vote.created_at);
        return voteDate.toDateString() === date.toDateString();
      });
      last7Days.push({
        date: date.toISOString().split('T')[0],
        votes: dayVotes.length,
        avgRating: dayVotes.length > 0 ? dayVotes.reduce((sum, vote) => sum + vote.rating, 0) / dayVotes.length : 0
      });
    }
    
    return {
      totalVotes,
      uniqueUsers,
      averageRating: Math.round(avgRating * 10) / 10,
      trendsData: last7Days,
      topFilms: filmData.slice(0, 3).map(film => ({
        id: film.id,
        title: film.titolo,
        votes: demoVotes.filter(vote => vote.film_id === film.id).length
      }))
    };
  }
  
  if (!supabase) {
    console.error('Supabase non configurato. Controlla il file .env.local');
    return null;
  }
  
  try {
    const { data, error } = await supabase
      .from('votes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    const totalVotes = data.length;
    const uniqueUsers = [...new Set(data.map(vote => vote.user_id))].length;
    const avgRating = data.reduce((sum, vote) => sum + vote.rating, 0) / totalVotes;
    
    return {
      totalVotes,
      uniqueUsers,
      averageRating: Math.round(avgRating * 10) / 10,
      trendsData: [],
      topFilms: []
    };
  } catch (error) {
    console.error('Errore nel recupero delle statistiche avanzate:', error);
    return null;
  }
};

// Funzione per sottoscrizione agli aggiornamenti in tempo reale
export const subscribeToVoteUpdates = (callback) => {
  if (isDemoMode) {
    // Demo mode - simula aggiornamenti
    const interval = setInterval(() => {
      // Simula un nuovo voto ogni 30 secondi
      if (Math.random() > 0.7) {
        const randomFilm = filmData[Math.floor(Math.random() * filmData.length)];
        const newVote = {
          id: `demo-vote-${Date.now()}`,
          user_id: `demo-user-${Math.floor(Math.random() * 100)}`,
          film_id: randomFilm.id,
          rating: Math.floor(Math.random() * 5) + 1,
          created_at: new Date().toISOString()
        };
        demoVotes.push(newVote);
        callback(newVote);
      }
    }, 30000);
    
    return {
      unsubscribe: () => clearInterval(interval)
    };
  }
  
  if (!supabase) {
    console.error('Supabase non configurato. Controlla il file .env.local');
    return { unsubscribe: () => {} };
  }
  
  const subscription = supabase
    .channel('votes_changes')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'votes'
    }, callback)
    .subscribe();
  
  return {
    unsubscribe: () => subscription.unsubscribe()
  };
};
export default supabase