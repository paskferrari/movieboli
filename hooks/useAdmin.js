import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { isUserAdmin } from '../lib/supabase'

export const useAdmin = () => {
  const { user, loading: authLoading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const mountedRef = useRef(true)
  const hasCheckedRef = useRef(false)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    const checkAdminStatus = async () => {
      // Evita controlli multipli per lo stesso utente
      if (hasCheckedRef.current && user?.id) {
        return
      }

      // Aspetta che l'autenticazione sia completata
      if (authLoading) {
        return
      }
      
      if (!user) {
        if (mountedRef.current) {
          setIsAdmin(false)
          setLoading(false)
          setError(null)
          hasCheckedRef.current = true
        }
        return
      }

      try {
        if (mountedRef.current) {
          setLoading(true)
          setError(null)
        }
        
        const adminStatus = await isUserAdmin()
        
        if (mountedRef.current) {
          setIsAdmin(adminStatus)
          setLoading(false)
          hasCheckedRef.current = true
        }
      } catch (err) {
        console.error('Errore controllo admin:', err)
        if (mountedRef.current) {
          setError(err)
          setIsAdmin(false)
          setLoading(false)
          hasCheckedRef.current = true
        }
      }
    }

    // Reset del flag quando cambia l'utente
    if (user?.id) {
      hasCheckedRef.current = false
    }

    checkAdminStatus()
  }, [user?.id, authLoading])

  return { isAdmin, loading, error }
}