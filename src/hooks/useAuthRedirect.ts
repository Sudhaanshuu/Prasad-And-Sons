import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function useAuthRedirect(redirectTo: string = '/') {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      window.location.href = redirectTo;
    }
  }, [user, loading, redirectTo]);

  return { user, loading };
}
