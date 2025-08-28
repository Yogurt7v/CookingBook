'use client';
import { useAuthStore } from '@/store/auth-store';
import { useIngredientsStore } from '@/store/ingredients-store';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function AppLoader({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { loadIngredients } = useIngredientsStore();
  const { isAuth, setAuthState } = useAuthStore();

  useEffect(() => {
    setAuthState(status, session);
  }, [status, session, setAuthState]);

  useEffect(() => {
    if (isAuth) {
      loadIngredients();
    }
  }, [isAuth, loadIngredients]);

  return <>{children}</>;
}
