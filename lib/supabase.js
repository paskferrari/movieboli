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
  if (isDemoMode) {
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
    
    // Se rating è 0, rimuovi il voto
    if (rating === 0) {
      const index = demoVotes.findIndex(
        vote => vote.user_id === userId && vote.film_id === filmId
      )
      if (index >= 0) {
        demoVotes.splice(index, 1)
      }
      return []
    }
  }
  
  if (!supabase) {
    throw new Error('Supabase non configurato. Controlla il file .env.local')
  }
  
  // Se rating è 0, elimina il voto
  if (rating === 0) {
    const { error } = await supabase
      .from('votes')
      .delete()
      .eq('user_id', userId)
      .eq('film_id', filmId)
    
    if (error) throw error
    return []
  }
  
  // Altrimenti salva/aggiorna il voto
  const { data, error } = await supabase
    .from('votes')
    .upsert({
      user_id: userId,
      film_id: filmId,
      rating: rating,
      updated_at: new Date().toISOString()
    })
    .select()
  
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
  const subscription = supabase
    .channel('votes')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'votes'
    }, (payload) => {
      callback(payload.new);
    })
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
};

// Nuova funzione per ottenere tutti i voti con dettagli
export const getAllVotesDetailed = async () => {
  if (!supabase) {
    throw new Error('Supabase non configurato. Controlla il file .env.local');
  }
  
  try {
    // Prima otteniamo tutti i voti
    const { data: votes, error: votesError } = await supabase
      .from('votes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (votesError) throw votesError;
    
    if (!votes || votes.length === 0) {
      return [];
    }
    
    // Poi otteniamo i profili utente per gli user_id presenti nei voti
    const userIds = [...new Set(votes.map(vote => vote.user_id))];
    
    const { data: profiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('id, full_name, email, age, gender')
      .in('id', userIds);
    
    if (profilesError) {
      console.warn('Errore nel recupero profili utente:', profilesError);
      // Restituiamo i voti senza i profili se c'è un errore
      return votes.map(vote => ({
        ...vote,
        user_profiles: {
          id: vote.user_id,
          full_name: 'Utente Sconosciuto',
          email: 'N/A',
          age: null,
          gender: null
        }
      }));
    }
    
    // Combiniamo i dati manualmente
    const votesWithProfiles = votes.map(vote => {
      const userProfile = profiles?.find(profile => profile.id === vote.user_id);
      return {
        ...vote,
        user_profiles: userProfile || {
          id: vote.user_id,
          full_name: 'Utente Sconosciuto',
          email: 'N/A',
          age: null,
          gender: null
        }
      };
    });
    
    return votesWithProfiles;
  } catch (error) {
    console.error('Errore nel recupero dei voti dettagliati:', error);
    return [];
  }
};

// Funzione per statistiche aggregate per la dashboard
export const getVotesDashboardStats = async () => {
  if (!supabase) {
    throw new Error('Supabase non configurato. Controlla il file .env.local');
  }
  
  try {
    const { data: votes, error } = await supabase
      .from('votes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    if (!votes || votes.length === 0) {
      return {
        totalVotes: 0,
        averageRating: 0,
        filmStats: {},
        recentVotes: [],
        ratingDistribution: [],
        votesPerDay: []
      };
    }
    
    // Calcola statistiche per film
    const filmStats = {};
    filmData.forEach(film => {
      const filmVotes = votes.filter(vote => vote.film_id === film.id);
      const totalVotes = filmVotes.length;
      const averageRating = totalVotes > 0 
        ? filmVotes.reduce((sum, vote) => sum + vote.rating, 0) / totalVotes 
        : 0;
      
      filmStats[film.id] = {
        ...film,
        totalVotes,
        averageRating: Math.round(averageRating * 100) / 100,
        ratingDistribution: [1, 2, 3, 4, 5].map(rating => ({
          rating,
          count: filmVotes.filter(vote => vote.rating === rating).length
        }))
      };
    });
    
    // Distribuzione generale dei rating
    const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
      rating,
      count: votes.filter(vote => vote.rating === rating).length,
      percentage: Math.round((votes.filter(vote => vote.rating === rating).length / votes.length) * 100)
    }));
    
    // Voti per giorno (ultimi 7 giorni)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();
    
    const votesPerDay = last7Days.map(date => {
      const dayVotes = votes.filter(vote => 
        vote.created_at.split('T')[0] === date
      );
      return {
        date,
        count: dayVotes.length,
        averageRating: dayVotes.length > 0 
          ? Math.round((dayVotes.reduce((sum, vote) => sum + vote.rating, 0) / dayVotes.length) * 100) / 100
          : 0
      };
    });
    
    return {
      totalVotes: votes.length,
      averageRating: Math.round((votes.reduce((sum, vote) => sum + vote.rating, 0) / votes.length) * 100) / 100,
      filmStats,
      recentVotes: votes.slice(0, 10),
      ratingDistribution,
      votesPerDay
    };
  } catch (error) {
    console.error('Errore nel recupero delle statistiche dashboard:', error);
    return {
      totalVotes: 0,
      averageRating: 0,
      filmStats: {},
      recentVotes: [],
      ratingDistribution: [],
      votesPerDay: []
    };
  }
};
export default supabase;