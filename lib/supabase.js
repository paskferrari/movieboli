import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Modalità demo se le variabili non sono configurate
const isDemoMode = !supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('demo-project')

if (isDemoMode) {
  console.warn('⚠️ MODALITÀ DEMO: Configurare Supabase per l\'autenticazione reale')
}

// Usa valori demo se non configurati
const finalUrl = supabaseUrl || 'https://demo-project.supabase.co'
const finalKey = supabaseAnonKey || 'demo-key'

export const supabase = isDemoMode ? null : createClient(finalUrl, finalKey)

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

export default supabase