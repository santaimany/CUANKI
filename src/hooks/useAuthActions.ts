'use client';

import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const { showSuccess, showError } = useToast();
  const router = useRouter();

  const logout = (showNotification = true) => {
    try {
      // Clear all auth-related data
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('onboarding_completed');
      
      if (showNotification) {
        showSuccess('Anda telah logout');
      }
      
      // Redirect to login page
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    } catch (error) {
   
      showError('Terjadi kesalahan saat logout');
    }
  };

  const checkAuth = (): boolean => {
    if (globalThis.window === undefined) return false;
    const token = localStorage.getItem('token');
    return !!token;
  };

  const forceLogin = (message?: string) => {
    if (message) {
      showError(message);
    }
    logout(false); 
  };

  return {
    logout,
    checkAuth,
    forceLogin,
  };
};