import React, { createContext, useContext, useEffect, useState } from 'react'
import { signUp, signIn, signOut, getCurrentUser, onAuthStateChange } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Stato esplicito

  useEffect(() => {
    // Ottieni la sessione iniziale
    const getInitialSession = async () => {
      try {
        const user = await getCurrentUser()
        console.log('🔍 Initial user:', user)
        setUser(user)
        setSession(user ? { user } : null)
        setIsAuthenticated(!!user) // Aggiorna esplicitamente
      } catch (error) {
        if (error.message !== 'Auth session missing!') {
          console.error('Error in getInitialSession:', error)
        }
        setUser(null)
        setSession(null)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Ascolta i cambiamenti di autenticazione
    let subscription = null
    try {
      const authListener = onAuthStateChange(
        async (event, session) => {
          console.log('🔍 Auth state changed:', event, session)
          const user = session?.user ?? null
          setSession(session)
          setUser(user)
          setIsAuthenticated(!!user) // Aggiorna esplicitamente
          setLoading(false)
        }
      )
      
      subscription = authListener?.data?.subscription
    } catch (error) {
      console.error('Error setting up auth listener:', error)
    }

    return () => {
      if (subscription?.unsubscribe) {
        subscription.unsubscribe()
      }
    }
  }, [])

  // Funzione di registrazione
  const signUpUser = async (email, password, userData = {}) => {
    try {
      setLoading(true)
      const data = await signUp(email, password, userData)
      return { data, error: null }
    } catch (error) {
      console.error('Error signing up:', error)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Funzione di login CORRETTA
  const signInUser = async (email, password) => {
    try {
      setLoading(true)
      const data = await signIn(email, password)
      
      // Aggiorna IMMEDIATAMENTE lo stato locale
      if (data?.user) {
        console.log('🔍 Login successful, updating state:', data.user)
        setUser(data.user)
        setSession(data.session || { user: data.user })
        setIsAuthenticated(true) // IMPORTANTE: aggiorna subito
      }
      
      return { data, error: null }
    } catch (error) {
      console.error('Error signing in:', error)
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Funzione di logout
  const signOutUser = async () => {
    try {
      setLoading(true)
      await signOut()
      setUser(null)
      setSession(null)
      setIsAuthenticated(false)
      return { error: null }
    } catch (error) {
      console.error('Error signing out:', error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    session,
    loading,
    isAuthenticated, // Usa lo stato esplicito
    signUp: signUpUser,
    signIn: signInUser,
    signOut: signOutUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext