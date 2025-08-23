import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Modalità demo DISABILITATA - utilizziamo solo dati reali del database
const isDemoMode = false;

// Dati demo per i voti (aggiungi dopo filmData)
// Rimuovi completamente il blocco demoVotes (linee 9-26)
// const demoVotes = [...]; // <-- RIMUOVI TUTTO QUESTO BLOCCO

// Verifica che le variabili di ambiente siano configurate
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variabili di ambiente Supabase mancanti. Controlla NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY nel file .env.local')
}

// Crea il client Supabase normale
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export { isDemoMode }
// Crea un client separato con service role per operazioni admin
const supabaseServiceRole = typeof window === 'undefined' ? 
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  ) : null;

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
  console.log('🔍 [DEBUG] isDemoMode:', isDemoMode);
  
  // In modalità demo, considera admin gli utenti con email specifica
  if (isDemoMode) {
    const user = await getCurrentUser();
    console.log('🔍 [DEBUG] User in demo mode:', user?.email);
    const isAdmin = user && (user.email === 'admin@movieboli.com' || user.email === 'amministratoreunico@movieboli.com');
    console.log('🔍 [DEBUG] Is admin result:', isAdmin);
    return isAdmin;
  }
  
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      console.log('❌ [isUserAdmin] Nessun utente autenticato');
      return false
    }
    
    console.log('🔍 [isUserAdmin] Controllo admin per:', user.email);
    console.log('🔍 [isUserAdmin] User metadata:', user.user_metadata);
    console.log('🔍 [isUserAdmin] App metadata:', user.app_metadata);
    
    // 1. Controllo email speciale admin
    if (user.email === 'amministratoreunico@movieboli.com') {
      console.log('✅ [isUserAdmin] Admin riconosciuto tramite email speciale');
      return true
    }
    
    // 2. Controllo user_metadata (questo dovrebbe funzionare ora)
    if (user.user_metadata?.role === 'admin') {
      console.log('✅ [isUserAdmin] Admin riconosciuto tramite user_metadata');
      return true
    }
    
    // 3. Controllo app_metadata (questo dovrebbe funzionare ora)
    if (user.app_metadata?.role === 'admin') {
      console.log('✅ [isUserAdmin] Admin riconosciuto tramite app_metadata');
      return true
    }
    
    console.log('❌ [isUserAdmin] Utente non è admin');
    return false
    
  } catch (error) {
    console.error('❌ [isUserAdmin] Errore durante controllo admin:', error)
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
    .from('user_profiles')  // Cambia da 'profiles' a 'user_profiles'
    .select('*')
  
  if (error) throw error
  return data || []
}

// Funzione per statistiche avanzate (solo admin)
export const getAdvancedVotesStats = async () => {
  // Rimuovi completamente il blocco if (isDemoMode) che usa demoVotes
  
  if (!supabase) {
    console.error('Supabase non configurato. Controlla il file .env.local');
    return {
      totalVotes: 0,
      uniqueUsers: 0,
      averageRating: 0,
      trendsData: [],
      topFilms: []
    };
  }

  try {
    const { data, error } = await supabase
      .from('votes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    if (!data || data.length === 0) {
      return {
        totalVotes: 0,
        uniqueUsers: 0,
        averageRating: 0,
        trendsData: [],
        topFilms: []
      };
    }
    
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
    return {
      totalVotes: 0,
      uniqueUsers: 0,
      averageRating: 0,
      trendsData: [],
      topFilms: []
    };
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
// Funzione per ottenere statistiche dettagliate con filtri
export const getDetailedVotesStats = async (filters = {}) => {
  const { dateFrom, dateTo, filmId, minRating, maxRating } = filters;
  
  try {
    let query = supabase.from('votes').select('*');
    
    if (dateFrom) {
      query = query.gte('created_at', dateFrom);
    }
    if (dateTo) {
      query = query.lte('created_at', dateTo);
    }
    if (filmId) {
      query = query.eq('film_id', filmId);
    }
    if (minRating) {
      query = query.gte('rating', minRating);
    }
    if (maxRating) {
      query = query.lte('rating', maxRating);
    }
    
    const { data: filteredVotes, error } = await query;
    
    if (error) throw error;
    
    const stats = {};
    filmData.forEach(film => {
      const filmVotes = filteredVotes.filter(vote => vote.film_id === film.id);
      const totalVotes = filmVotes.length;
      const averageRating = totalVotes > 0
        ? filmVotes.reduce((sum, vote) => sum + vote.rating, 0) / totalVotes
        : 0;
      
      stats[film.id] = {
        ...film,
        totalVotes,
        averageRating: Math.round(averageRating * 100) / 100,
        ratingDistribution: [1, 2, 3, 4, 5].map(rating => ({
          rating,
          count: filmVotes.filter(vote => vote.rating === rating).length
        })),
        votes: filmVotes
      };
    });
    
    return {
      filmStats: stats,
      totalVotes: filteredVotes.length,
      averageRating: filteredVotes.length > 0 ? filteredVotes.reduce((sum, vote) => sum + vote.rating, 0) / filteredVotes.length : 0,
      recentVotes: filteredVotes.slice(-10).reverse()
    };
  } catch (error) {
    console.error('Errore nel recupero delle statistiche dettagliate:', error);
    return {
      filmStats: {},
      totalVotes: 0,
      averageRating: 0,
      recentVotes: []
    };
  }
};
export default supabase;