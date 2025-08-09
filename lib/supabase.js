import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Modalità demo se le variabili non sono configurate
const isDemoMode = !supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('demo-project')

export { isDemoMode }

if (isDemoMode) {
  console.warn('⚠️ MODALITÀ DEMO: Configurare Supabase per l\'autenticazione reale')
}

// Usa valori demo se non configurati
const finalUrl = supabaseUrl || 'https://demo-project.supabase.co'
const finalKey = supabaseAnonKey || 'demo-key'

export const supabase = createClient(finalUrl, finalKey)


// Demo user per modalità demo
const demoUser = {
  id: 'demo-user-123',
  email: 'demo@movieboli.com',
  user_metadata: { 
    full_name: 'Mario Rossi',
    firstName: 'Mario',
    lastName: 'Rossi',
    age: 25,
    gender: 'Preferisco non rispondere',
    role: 'user'
  }
}

// Demo admin user
const demoAdmin = {
  id: 'demo-admin-456',
  email: 'admin@movieboli.com',
  user_metadata: { 
    full_name: 'Admin Movieboli',
    firstName: 'Admin',
    lastName: 'Movieboli',
    age: 30,
    gender: 'M',
    role: 'admin'
  }
}

// Per testare la dashboard, usa l'admin demo
let currentDemoUser = demoAdmin; // Cambiato in demoAdmin per testare come admin

let demoSession = null
let demoAuthCallbacks = []

// Funzioni di autenticazione
export const signUp = async (email, password, userData = {}) => {
  if (isDemoMode) {
    // Simulazione registrazione
    const newUser = {
      ...demoUser,
      id: `demo-user-${Date.now()}`,
      email,
      user_metadata: {
        full_name: `${userData.firstName || 'Demo'} ${userData.lastName || 'User'}`,
        firstName: userData.firstName || 'Demo',
        lastName: userData.lastName || 'User',
        age: userData.age || 25,
        gender: userData.gender || 'Preferisco non rispondere',
        role: 'user'
      }
    }
    
    // Simula un ritardo di rete
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    demoSession = { user: newUser, access_token: 'demo-token' }
    demoAuthCallbacks.forEach(callback => callback('SIGNED_IN', demoSession))
    return { user: demoSession.user, session: demoSession }
  }
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        ...userData,
        role: 'user'
      }
    }
  })
  
  if (error) throw error
  return data
}

export const signIn = async (email, password) => {
  if (isDemoMode) {
    // Simula login demo - usa admin se email contiene 'admin'
    const user = email.includes('admin') ? demoAdmin : demoUser;
    currentDemoUser = user;
    demoSession = { user: { ...user, email }, access_token: 'demo-token' }
    demoAuthCallbacks.forEach(callback => callback('SIGNED_IN', demoSession))
    return { user: demoSession.user, session: demoSession }
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  return data
}

export const signOut = async () => {
  if (isDemoMode) {
    demoSession = null
    demoAuthCallbacks.forEach(callback => callback('SIGNED_OUT', null))
    return
  }
  
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  if (isDemoMode) {
    return demoSession?.user || currentDemoUser || null
  }
  
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export const onAuthStateChange = (callback) => {
  if (isDemoMode) {
    demoAuthCallbacks.push(callback)
    // Chiama immediatamente con lo stato corrente
    callback(demoSession ? 'SIGNED_IN' : 'SIGNED_OUT', demoSession)
    return {
      data: { subscription: { unsubscribe: () => {
        demoAuthCallbacks = demoAuthCallbacks.filter(cb => cb !== callback)
      }}}
    }
  }
  
  return supabase.auth.onAuthStateChange(callback)
}

// Simulazione database per modalità demo con dati realistici
const filmData = [
  { id: 'dieci-secondi', titolo: 'DIECI SECONDI', regista: 'Roberta Palmieri' },
  { id: 'appuntamento-mezzogiorno', titolo: 'APPUNTAMENTO A MEZZOGIORNO', regista: 'Antonio Passaro' },
  { id: 'place-under-sun', titolo: 'Place under the sun', regista: 'Vlad Bolgarin' },
  { id: 'fathers-letters', titolo: "Father's Letters", regista: 'Alexey Evstigneev' },
  { id: 'sharing-caring', titolo: 'SHARING IS CARING', regista: 'Vincenzo Mauro' },
  { id: 'ya-hanouni', titolo: 'Ya Hanouni', regista: 'Lyna Tadount, Sofian Chouaib' },
  { id: 'jus-orange', titolo: "Jus d'orange", regista: 'Alexandre Athané' },
  { id: 'rock-tensions', titolo: 'The Rock Tensions', regista: 'Markus Lehtokumpu' }
];

// Genera voti demo realistici
let demoVotes = [];
const generateDemoVotes = () => {
  const users = [demoUser.id, demoAdmin.id, 'demo-user-001', 'demo-user-002', 'demo-user-003', 'demo-user-004', 'demo-user-005'];
  
  filmData.forEach(film => {
    // Genera tra 15-35 voti per film per simulare un festival attivo
    const numVotes = Math.floor(Math.random() * 21) + 15;
    
    for (let i = 0; i < numVotes; i++) {
      const userId = users[Math.floor(Math.random() * users.length)];
      // Distribuzione realistica dei voti (più voti alti)
      const weights = [0.05, 0.1, 0.2, 0.35, 0.3]; // 1-5 stelle
      let rating = 5;
      const rand = Math.random();
      let cumulative = 0;
      for (let j = 0; j < weights.length; j++) {
        cumulative += weights[j];
        if (rand <= cumulative) {
          rating = j + 1;
          break;
        }
      }
      
      demoVotes.push({
        id: `demo-vote-${film.id}-${i}`,
        user_id: userId,
        film_id: film.id,
        rating: rating,
        created_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      });
    }
  });
};

// Genera i voti demo all'avvio
generateDemoVotes();

// Funzioni per la gestione dei voti
export const saveVote = async (userId, filmId, rating) => {
  if (isDemoMode) {
    // Simulazione salvataggio voto
    const existingVoteIndex = demoVotes.findIndex(
      vote => vote.user_id === userId && vote.film_id === filmId
    )
    
    const voteData = {
      id: `demo-vote-${Date.now()}`,
      user_id: userId,
      film_id: filmId,
      rating: rating,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    if (existingVoteIndex >= 0) {
      demoVotes[existingVoteIndex] = { ...demoVotes[existingVoteIndex], ...voteData }
    } else {
      demoVotes.push(voteData)
    }
    
    console.log('📊 Voto salvato (demo):', voteData)
    return [voteData]
  }
  
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
  if (isDemoMode) {
    // Simulazione recupero voti utente
    const userVotes = demoVotes.filter(vote => vote.user_id === userId)
    console.log('📊 Voti utente (demo):', userVotes)
    return userVotes
  }
  
  const { data, error } = await supabase
    .from('votes')
    .select('*')
    .eq('user_id', userId)
  
  if (error) throw error
  return data || []
}

export const getFilmVoteStats = async (filmId) => {
  if (isDemoMode) {
    // Simulazione statistiche film
    const filmVotes = demoVotes.filter(vote => vote.film_id === filmId)
    if (filmVotes.length === 0) {
      return {
        totalVotes: 0,
        averageRating: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      }
    }
    
    const totalVotes = filmVotes.length
    const averageRating = filmVotes.reduce((sum, vote) => sum + vote.rating, 0) / totalVotes
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    
    filmVotes.forEach(vote => {
      ratingDistribution[vote.rating]++
    })
    
    return { totalVotes, averageRating: Math.round(averageRating * 10) / 10, ratingDistribution }
  }
  
  const { data, error } = await supabase
    .from('votes')
    .select('rating')
    .eq('film_id', filmId)
  
  if (error) {
    console.error('Errore nel recupero delle statistiche:', error)
    return null
  }
  
  if (!data || data.length === 0) {
    return {
      totalVotes: 0,
      averageRating: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    }
  }
  
  const totalVotes = data.length
  const averageRating = data.reduce((sum, vote) => sum + vote.rating, 0) / totalVotes
  const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  
  data.forEach(vote => {
    ratingDistribution[vote.rating]++
  })
  
  return {
    totalVotes,
    averageRating: Math.round(averageRating * 10) / 10,
    ratingDistribution
  }
}

// Verifica se l'utente corrente è un admin
export const isUserAdmin = async () => {
  if (isDemoMode) {
    return currentDemoUser?.user_metadata?.role === 'admin';
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    // Controlla il ruolo dai metadati dell'utente invece che dalla tabella
    // per evitare ricorsione nelle policy RLS
    return user.user_metadata?.role === 'admin' || user.app_metadata?.role === 'admin';
  } catch (error) {
    console.error('Errore nel controllo ruolo admin:', error);
    return false;
  }
};

// Funzione per ottenere tutte le statistiche (solo admin)
export const getAllVotesStats = async () => {
  if (isDemoMode) {
    // Demo mode - simula statistiche complete
    const stats = {}
    const filmIds = [...new Set(demoVotes.map(vote => vote.film_id))]
    
    for (const filmId of filmIds) {
      stats[filmId] = await getFilmVoteStats(filmId)
    }
    
    return stats
  }
  
  const { data, error } = await supabase
    .from('votes')
    .select('film_id, rating')
  
  if (error) {
    console.error('Errore nel recupero di tutte le statistiche:', error)
    return null
  }
  
  const stats = {}
  const filmIds = [...new Set(data.map(vote => vote.film_id))]
  
  for (const filmId of filmIds) {
    const filmVotes = data.filter(vote => vote.film_id === filmId)
    const totalVotes = filmVotes.length
    const averageRating = filmVotes.reduce((sum, vote) => sum + vote.rating, 0) / totalVotes
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    
    filmVotes.forEach(vote => {
      ratingDistribution[vote.rating]++
    })
    
    stats[filmId] = {
      totalVotes,
      averageRating: Math.round(averageRating * 10) / 10,
      ratingDistribution
    }
  }
  
  return stats
}

// Funzione per ottenere tutti gli utenti (solo admin)
export const getAllUsers = async () => {
  if (isDemoMode) {
    // Demo mode - simula lista utenti realistica
    const demoUsers = [
      {
        id: demoUser.id,
        email: demoUser.email,
        full_name: demoUser.user_metadata.full_name,
        age: demoUser.user_metadata.age,
        gender: demoUser.user_metadata.gender,
        role: demoUser.user_metadata.role,
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: demoAdmin.id,
        email: demoAdmin.email,
        full_name: demoAdmin.user_metadata.full_name,
        age: demoAdmin.user_metadata.age,
        gender: demoAdmin.user_metadata.gender,
        role: demoAdmin.user_metadata.role,
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'demo-user-001',
        email: 'giulia.rossi@email.com',
        full_name: 'Giulia Rossi',
        age: 28,
        gender: 'F',
        role: 'user',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'demo-user-002',
        email: 'marco.bianchi@email.com',
        full_name: 'Marco Bianchi',
        age: 35,
        gender: 'M',
        role: 'user',
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'demo-user-003',
        email: 'sara.verdi@email.com',
        full_name: 'Sara Verdi',
        age: 22,
        gender: 'F',
        role: 'user',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'demo-user-004',
        email: 'luca.neri@email.com',
        full_name: 'Luca Neri',
        age: 31,
        gender: 'M',
        role: 'user',
        created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'demo-user-005',
        email: 'anna.ferrari@email.com',
        full_name: 'Anna Ferrari',
        age: 26,
        gender: 'F',
        role: 'user',
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    
    return demoUsers;
  }
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Errore nel recupero degli utenti:', error)
    return null
  }
  
  return data
}

// Funzioni avanzate per statistiche real-time
export const getAdvancedVotesStats = async () => {
  if (isDemoMode) {
    // Simula statistiche avanzate per demo
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const recentVotes = demoVotes.filter(vote => new Date(vote.created_at) > last24h);
    const weeklyVotes = demoVotes.filter(vote => new Date(vote.created_at) > lastWeek);
    
    // Calcola trend per ogni film
    const filmTrends = {};
    filmData.forEach(film => {
      const filmVotes = demoVotes.filter(v => v.film_id === film.id);
      const recentFilmVotes = recentVotes.filter(v => v.film_id === film.id);
      const weeklyFilmVotes = weeklyVotes.filter(v => v.film_id === film.id);
      
      const avgRating = filmVotes.length > 0 ? 
        filmVotes.reduce((sum, v) => sum + v.rating, 0) / filmVotes.length : 0;
      const recentAvgRating = recentFilmVotes.length > 0 ? 
        recentFilmVotes.reduce((sum, v) => sum + v.rating, 0) / recentFilmVotes.length : avgRating;
      
      filmTrends[film.id] = {
        totalVotes: filmVotes.length,
        recentVotes: recentFilmVotes.length,
        weeklyVotes: weeklyFilmVotes.length,
        avgRating: Number(avgRating.toFixed(2)),
        recentAvgRating: Number(recentAvgRating.toFixed(2)),
        trend: recentAvgRating > avgRating ? 'up' : recentAvgRating < avgRating ? 'down' : 'stable',
        trendPercentage: avgRating > 0 ? Number(((recentAvgRating - avgRating) / avgRating * 100).toFixed(1)) : 0
      };
    });
    
    // Attività recente
    const recentActivity = demoVotes
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10)
      .map(vote => {
        const film = filmData.find(f => f.id === vote.film_id);
        const user = vote.user_id === demoAdmin.id ? demoAdmin : 
                    vote.user_id === demoUser.id ? demoUser : 
                    { user_metadata: { full_name: `Utente ${vote.user_id.slice(-3)}` } };
        
        return {
          id: vote.id,
          type: 'vote',
          user_name: user.user_metadata.full_name,
          film_title: film?.titolo || 'Film Sconosciuto',
          rating: vote.rating,
          timestamp: vote.created_at,
          description: `Ha votato "${film?.titolo}" con ${vote.rating} stelle`
        };
      });
    
    return {
      totalVotes: demoVotes.length,
      totalUsers: 7, // Numero di utenti demo
      votesLast24h: recentVotes.length,
      votesLastWeek: weeklyVotes.length,
      averageRating: Number((demoVotes.reduce((sum, v) => sum + v.rating, 0) / demoVotes.length).toFixed(2)),
      filmTrends,
      recentActivity,
      lastUpdated: new Date().toISOString(),
      peakHours: [
        { hour: 18, votes: Math.floor(Math.random() * 15) + 5 },
        { hour: 19, votes: Math.floor(Math.random() * 20) + 10 },
        { hour: 20, votes: Math.floor(Math.random() * 25) + 15 },
        { hour: 21, votes: Math.floor(Math.random() * 30) + 20 }
      ]
    };
  }
  
  // Implementazione reale con Supabase
  try {
    const { data: votes, error: votesError } = await supabase
      .from('votes')
      .select(`
        *,
        user_profiles!inner(full_name)
      `)
      .order('created_at', { ascending: false });
    
    if (votesError) throw votesError;
    
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const recentVotes = votes.filter(vote => new Date(vote.created_at) > last24h);
    const weeklyVotes = votes.filter(vote => new Date(vote.created_at) > lastWeek);
    
    // Calcola statistiche per film
    const filmStats = {};
    votes.forEach(vote => {
      if (!filmStats[vote.film_id]) {
        filmStats[vote.film_id] = {
          votes: [],
          recentVotes: [],
          weeklyVotes: []
        };
      }
      
      filmStats[vote.film_id].votes.push(vote);
      if (new Date(vote.created_at) > last24h) {
        filmStats[vote.film_id].recentVotes.push(vote);
      }
      if (new Date(vote.created_at) > lastWeek) {
        filmStats[vote.film_id].weeklyVotes.push(vote);
      }
    });
    
    const filmTrends = {};
    Object.keys(filmStats).forEach(filmId => {
      const { votes: filmVotes, recentVotes: recentFilmVotes } = filmStats[filmId];
      
      const avgRating = filmVotes.length > 0 ? 
        filmVotes.reduce((sum, v) => sum + v.rating, 0) / filmVotes.length : 0;
      const recentAvgRating = recentFilmVotes.length > 0 ? 
        recentFilmVotes.reduce((sum, v) => sum + v.rating, 0) / recentFilmVotes.length : avgRating;
      
      filmTrends[filmId] = {
        totalVotes: filmVotes.length,
        recentVotes: recentFilmVotes.length,
        avgRating: Number(avgRating.toFixed(2)),
        recentAvgRating: Number(recentAvgRating.toFixed(2)),
        trend: recentAvgRating > avgRating ? 'up' : recentAvgRating < avgRating ? 'down' : 'stable',
        trendPercentage: avgRating > 0 ? Number(((recentAvgRating - avgRating) / avgRating * 100).toFixed(1)) : 0
      };
    });
    
    // Attività recente
    const recentActivity = votes.slice(0, 10).map(vote => ({
      id: vote.id,
      type: 'vote',
      user_name: vote.user_profiles.full_name,
      film_id: vote.film_id,
      rating: vote.rating,
      timestamp: vote.created_at,
      description: `Ha votato con ${vote.rating} stelle`
    }));
    
    const { data: userCount } = await supabase
      .from('user_profiles')
      .select('id', { count: 'exact', head: true });
    
    return {
      totalVotes: votes.length,
      totalUsers: userCount || 0,
      votesLast24h: recentVotes.length,
      votesLastWeek: weeklyVotes.length,
      averageRating: votes.length > 0 ? Number((votes.reduce((sum, v) => sum + v.rating, 0) / votes.length).toFixed(2)) : 0,
      filmTrends,
      recentActivity,
      lastUpdated: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Errore nel recupero delle statistiche avanzate:', error);
    throw error;
  }
};

// Funzione per sottoscrivere agli aggiornamenti in tempo reale
export const subscribeToVoteUpdates = (callback) => {
  if (isDemoMode) {
    // Simula aggiornamenti in tempo reale per demo
    const interval = setInterval(() => {
      // Simula un nuovo voto occasionale
      if (Math.random() < 0.1) { // 10% di probabilità ogni 5 secondi
        const randomFilm = filmData[Math.floor(Math.random() * filmData.length)];
        const randomRating = Math.floor(Math.random() * 5) + 1;
        const randomUser = ['demo-user-001', 'demo-user-002', 'demo-user-003'][Math.floor(Math.random() * 3)];
        
        const newVote = {
          id: `demo-vote-${Date.now()}`,
          user_id: randomUser,
          film_id: randomFilm.id,
          rating: randomRating,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        demoVotes.push(newVote);
        
        callback({
          eventType: 'INSERT',
          new: newVote,
          old: null
        });
      }
    }, 5000); // Controlla ogni 5 secondi
    
    return {
      unsubscribe: () => clearInterval(interval)
    };
  }
  
  // Implementazione reale con Supabase
  const subscription = supabase
    .channel('votes_changes')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'votes'
    }, callback)
    .subscribe();
  
  return {
    unsubscribe: () => supabase.removeChannel(subscription)
  };
};

// Funzioni helper per demo mode
const generateVotingTrends = () => {
  const last7Days = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    last7Days.push({
      date: date.toISOString().split('T')[0],
      votes: Math.floor(Math.random() * 20) + 5
    })
  }
  return last7Days
}

const getTopFilms = () => {
  const filmStats = {}
  demoVotes.forEach(vote => {
    if (!filmStats[vote.film_id]) {
      filmStats[vote.film_id] = { totalVotes: 0, totalRating: 0 }
    }
    filmStats[vote.film_id].totalVotes++
    filmStats[vote.film_id].totalRating += vote.rating
  })
  
  return Object.entries(filmStats)
    .map(([filmId, stats]) => ({
      filmId,
      totalVotes: stats.totalVotes,
      averageRating: stats.totalRating / stats.totalVotes,
      title: filmData.find(f => f.id === filmId)?.titolo || filmId
    }))
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 5)
}

const getRecentActivity = () => {
  return demoVotes
    .slice(-10)
    .reverse()
    .map(vote => ({
      ...vote,
      filmTitle: filmData.find(f => f.id === vote.film_id)?.titolo || vote.film_id,
      timeAgo: getTimeAgo(vote.created_at)
    }))
}

const getHourlyStats = () => {
  const hours = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    votes: Math.floor(Math.random() * 10)
  }))
  return hours
}

const getDemographicBreakdown = () => {
  return {
    ageGroups: {
      '13-18': Math.floor(Math.random() * 20) + 5,
      '19-25': Math.floor(Math.random() * 30) + 10,
      '26-35': Math.floor(Math.random() * 25) + 8,
      '36-50': Math.floor(Math.random() * 15) + 5,
      '50+': Math.floor(Math.random() * 10) + 2
    },
    gender: {
      'M': Math.floor(Math.random() * 30) + 15,
      'F': Math.floor(Math.random() * 35) + 20,
      'Altro': Math.floor(Math.random() * 5) + 1,
      'Preferisco non rispondere': Math.floor(Math.random() * 8) + 3
    }
  }
}

const generateRandomVote = () => {
  const filmIds = filmData.map(f => f.id)
  return {
    id: `demo-vote-${Date.now()}`,
    user_id: `demo-user-${Math.floor(Math.random() * 100)}`,
    film_id: filmIds[Math.floor(Math.random() * filmIds.length)],
    rating: Math.floor(Math.random() * 5) + 1,
    created_at: new Date().toISOString()
  }
}

const getTimeAgo = (dateString) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  
  if (diffMins < 1) return 'Ora'
  if (diffMins < 60) return `${diffMins}m fa`
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h fa`
  return `${Math.floor(diffMins / 1440)}g fa`
}

export default supabase