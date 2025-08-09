import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { isUserAdmin } from '../lib/supabase';

export const useAdmin = () => {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const checkTimeoutRef = useRef(null);
  const mountedRef = useRef(true);
  const hasCheckedRef = useRef(false);

  // Debug: log dello stato corrente
  console.log('🔍 [useAdmin] Current state:', { isAdmin, loading, user: user?.email });

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const checkAdminStatus = async () => {
      // Evita controlli multipli per lo stesso utente
      if (hasCheckedRef.current && user?.id) {
        return;
      }

      console.log('🔍 [useAdmin] Checking admin status...');
      console.log('🔍 [useAdmin] Auth loading:', authLoading);
      console.log('🔍 [useAdmin] User:', user);
      
      // Aspetta che l'autenticazione sia completata
      if (authLoading) {
        console.log('🔍 [useAdmin] Still loading auth, waiting...');
        return;
      }
      
      if (!user) {
        console.log('🔍 [useAdmin] No user, setting admin to false');
        if (mountedRef.current) {
          setIsAdmin(false);
          setLoading(false);
          setError(null);
          hasCheckedRef.current = true;
        }
        return;
      }

      try {
        if (mountedRef.current) {
          setLoading(true);
          setError(null);
        }
        
        console.log('🔍 [useAdmin] Calling isUserAdmin...');
        const adminStatus = await isUserAdmin();
        
        console.log('🔍 [useAdmin] Admin status result:', adminStatus);
        console.log('🔍 [useAdmin] Setting isAdmin to:', adminStatus);
        
        if (mountedRef.current) {
          setIsAdmin(adminStatus);
          setLoading(false);
          hasCheckedRef.current = true;
          console.log('🔍 [useAdmin] State updated - isAdmin:', adminStatus, 'loading:', false);
        }
      } catch (err) {
        console.error('❌ [useAdmin] Error checking admin status:', err);
        if (mountedRef.current) {
          setError(err);
          setIsAdmin(false);
          setLoading(false);
          hasCheckedRef.current = true;
        }
      }
    };

    // Reset del flag quando cambia l'utente
    if (user?.id) {
      hasCheckedRef.current = false;
    }

    // Esegui il controllo
    checkAdminStatus();
    
    // Timeout di sicurezza per evitare loading infinito
    if (checkTimeoutRef.current) {
      clearTimeout(checkTimeoutRef.current);
    }
    
    checkTimeoutRef.current = setTimeout(() => {
      if (mountedRef.current && loading && !hasCheckedRef.current) {
        console.warn('⚠️ [useAdmin] Timeout reached, setting loading to false');
        setLoading(false);
        hasCheckedRef.current = true;
      }
    }, 10000);

  }, [user?.id, authLoading]); // Dipendenze corrette: solo user.id e authLoading

  return { isAdmin, loading, error };
};