import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let debounceTimeout: NodeJS.Timeout;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('useAuth: auth state changed', { event, hasSession: !!session });
        
        // Debounce state updates to prevent rapid changes
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
          setIsInitialized(true);
        }, 50);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('useAuth: initial session check', { hasSession: !!session });
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      setIsInitialized(true);
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(debounceTimeout);
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) throw error;

      toast.success('Konto utworzone! Zalogowano automatycznie.');
      console.log('Sign up successful, user created');
      return { data, error: null };
    } catch (error: any) {
      toast.error(error.message || 'Błąd podczas rejestracji');
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Zalogowano pomyślnie!');
      console.log('Sign in successful');
      return { data, error: null };
    } catch (error: any) {
      toast.error(error.message || 'Błąd podczas logowania');
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signInWithOAuth = async (provider: 'google' | 'azure') => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      toast.error(error.message || 'Błąd podczas logowania');
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success('Wylogowano pomyślnie');
      console.log('Sign out successful');
      return { error: null };
    } catch (error: any) {
      toast.error(error.message || 'Błąd podczas wylogowania');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithOAuth,
    signOut,
  };
}
