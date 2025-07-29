import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { isUserAdmin } from '../lib/supabase';

export const useAdmin = () => {
  const { user, isAuthenticated } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!isAuthenticated || !user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const adminStatus = await isUserAdmin();
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error('Errore nel controllo admin:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, isAuthenticated]);

  return { isAdmin, loading };
};