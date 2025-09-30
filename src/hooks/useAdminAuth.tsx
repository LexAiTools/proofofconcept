import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';

export function useAdminAuth() {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      console.log('[useAdminAuth] Starting check - authLoading:', authLoading, 'user:', user?.id);
      
      if (authLoading) {
        console.log('[useAdminAuth] Still loading auth, returning');
        return;
      }

      if (!user) {
        console.log('[useAdminAuth] No user, redirecting to signin');
        navigate('/signin');
        return;
      }

      try {
        console.log('[useAdminAuth] Checking admin role for user:', user.id);
        const { data, error } = await supabase
          .from('user_roles' as any)
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        console.log('[useAdminAuth] Query result - data:', data, 'error:', error);

        if (error) throw error;

        if (data) {
          console.log('[useAdminAuth] User is admin!');
          setIsAdmin(true);
        } else {
          console.log('[useAdminAuth] User is NOT admin, redirecting to home');
          setIsAdmin(false);
          navigate('/');
        }
      } catch (error) {
        console.error('[useAdminAuth] Error checking admin status:', error);
        setIsAdmin(false);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, authLoading, navigate]);

  return { isAdmin, loading: loading || authLoading };
}
