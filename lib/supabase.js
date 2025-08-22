import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Debug temporaneo
console.log('🔍 DEBUG Supabase URL:', supabaseUrl)
console.log('🔍 DEBUG Supabase Key:', supabaseAnonKey ? 'PRESENTE' : 'MANCANTE')
console.log('🔍 DEBUG URL includes demo-project:', supabaseUrl?.includes('demo-project'))

// Controlla se le variabili di ambiente sono configurate
const isDemoMode = !supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your_supabase_project_url_here');
console.log('🔍 DEBUG isDemoMode:', isDemoMode)

export { isDemoMode }

if (isDemoMode) {
  console.warn('⚠️ MODALITÀ DEMO: Configurare Supabase nel file .env.local per l\'autenticazione reale')
} else {
  console.log('✅ MODALITÀ PRODUZIONE: Supabase configurato correttamente')
}

// Usa valori di fallback per la modalità demo
const finalUrl = isDemoMode ? 'https://demo.supabase.co' : supabaseUrl
const finalKey = isDemoMode ? 'demo-key' : supabaseAnonKey

// Crea il client Supabase solo se non siamo in modalità demo
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
let currentDemoUser = demoAdmin;

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
  
  if (!supabase) {
    throw new Error('Supabase non configurato. Controlla il file .env.local')
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
    // Simula login demo - usa admin se email contiene 'admin' o 'amministratore'
    const isAdminEmail = email.includes('admin') || 
                        email.includes('amministratore') || 
                        email === 'amministratoreunico@movieboli.com';
    const user = isAdminEmail ? demoAdmin : demoUser;
    currentDemoUser = user;
    demoSession = { 
      user: { ...user, email }, 
      access_token: 'demo-token' 
    }
    
    console.log('🔍 Demo login successful:', demoSession.user)
    console.log('🔍 Is admin email:', isAdminEmail)
    
    // Chiama IMMEDIATAMENTE i callback
    setTimeout(() => {
      demoAuthCallbacks.forEach(callback => {
        try {
          callback('SIGNED_IN', demoSession)
        } catch (error) {
          console.error('Error in auth callback:', error)
        }
      })
    }, 100)
    
    return { user: demoSession.user, session: demoSession }
  }
  
  if (!supabase) {
    throw new Error('Supabase non configurato. Controlla il file .env.local')
  }
  
  console.log('🔍 Attempting login with:', email);
  console.log('🔍 isDemoMode:', isDemoMode);
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    console.log('🔍 Supabase login response:', { data, error });
    
    if (error) {
      console.error('❌ Login error:', error.message);
      throw error;
    }
    
    if (data.user) {
      console.log('✅ Login successful for user:', data.user.email);
      console.log('🔍 User metadata:', data.user.user_metadata);
    }
    
    return data;
  } catch (error) {
    console.error('❌ Login failed:', error);
    throw error;
  }
}

export const signOut = async () => {
  if (isDemoMode) {
    demoSession = null
    demoAuthCallbacks.forEach(callback => callback('SIGNED_OUT', null))
    return
  }
  
  if (!supabase) {
    throw new Error('Supabase non configurato. Controlla il file .env.local')
  }
  
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  if (isDemoMode) {
    return demoSession?.user || currentDemoUser || null
  }
  
  if (!supabase) {
    throw new Error('Supabase non configurato. Controlla il file .env.local')
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
  
  if (!supabase) {
    throw new Error('Supabase non configurato. Controlla il file .env.local')
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
  
  if (!supabase) {
    throw new Error('Supabase non configurato. Controlla il file .env.local')
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
  
  if (!supabase) {
    throw new Error('Supabase non configurato. Controlla il file .env.local')
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
  
  if (!supabase) {
    console.error('Supabase non configurato. Controlla il file .env.local')
    return {
      totalVotes: 0,
      averageRating: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    }
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

// Verifica se l'utente corrente è un admin - FUNZIONE CORRETTA
export const isUserAdmin = async () => {
  console.log('🔍 [isUserAdmin] Inizio controllo admin');
  
  try {
    const user = await getCurrentUser();
    console.log('🔍 [isUserAdmin] User ottenuto:', user);
    
    if (!user) {
      console.log('❌ [isUserAdmin] Nessun utente autenticato');
      return false;
    }
    
    console.log('🔍 [isUserAdmin] Email utente:', user.email);
    console.log('🔍 [isUserAdmin] User metadata:', user.user_metadata);
    console.log('🔍 [isUserAdmin] App metadata:', user.app_metadata);
    
    // 1. Controllo email speciale
    if (user.email === 'amministratoreunico@movieboli.com') {
      console.log('✅ [isUserAdmin] Admin riconosciuto tramite email speciale');
      return true;
    }
    
    // 2. Controllo user_metadata
    if (user.user_metadata?.role === 'admin') {
      console.log('✅ [isUserAdmin] Admin riconosciuto tramite user_metadata');
      return true;
    }
    
    // 3. Controllo app_metadata
    if (user.app_metadata?.role === 'admin') {
      console.log('✅ [isUserAdmin] Admin riconosciuto tramite app_metadata');
      return true;
    }
    
    // 4. Query diretta al database per raw_user_meta_data
    if (!isDemoMode) {
      try {
        console.log('🔍 [isUserAdmin] Controllo database per raw_user_meta_data');
        const { data: userData, error: userError } = await supabase
          .from('auth.users')
          .select('raw_user_meta_data, raw_app_meta_data')
          .eq('id', user.id)
          .single();
        
        if (userError) {
          console.log('⚠️ [isUserAdmin] Errore query database:', userError.message);
        } else {
          console.log('🔍 [isUserAdmin] Dati database:', userData);
          
          if (userData?.raw_user_meta_data?.role === 'admin' || 
              userData?.raw_app_meta_data?.role === 'admin') {
            console.log('✅ [isUserAdmin] Admin riconosciuto tramite database');
            return true;
          }
        }
      } catch (dbError) {
        console.log('⚠️ [isUserAdmin] Errore accesso database:', dbError.message);
      }
    }
    
    console.log('❌ [isUserAdmin] Utente non è admin');
    return false;
    
  } catch (error) {
    console.error('❌ [isUserAdmin] Errore durante controllo admin:', error);
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
  
  if (!supabase) {
    console.error('Supabase non configurato. Controlla il file .env.local')
    return null
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
  
  if (!supabase) {
    console.error('Supabase non configurato. Controlla il file .env.local')
    return null
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