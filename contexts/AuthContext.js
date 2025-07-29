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

  useEffect(() => {
    // Ottieni la sessione iniziale
    const getInitialSession = async () => {
      try {
        const user = await getCurrentUser()
        setUser(user)
        setSession(user ? { user } : null)
      } catch (error) {
        console.error('Error in getInitialSession:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Ascolta i cambiamenti di autenticazione
    const { data: { subscription } } = onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session)
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      subscription?.unsubscribe()
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

  // Funzione di login
  const signInUser = async (email, password) => {
    try {
      setLoading(true)
      const data = await signIn(email, password)
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
    signUp: signUpUser,
    signIn: signInUser,
    signOut: signOutUser,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext