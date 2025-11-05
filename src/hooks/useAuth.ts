'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserGreeting } from '@/lib/api/user';

interface UseAuthOptions {
  requireAuth?: boolean;
  requireOnboarding?: boolean;
  redirectTo?: string;
}

export function useAuth(options: UseAuthOptions = {}) {
  const {
    requireAuth = true,
    requireOnboarding = true,
    redirectTo,
  } = options;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists
        const token = localStorage.getItem('token');
        
        if (!token) {
          setIsAuthenticated(false);
          setIsLoading(false);
          
          if (requireAuth) {
            router.push(redirectTo || '/login');
          }
          return;
        }

        // Verify token by fetching user data
        try {
          const userData = await getUserGreeting();
          
          setIsAuthenticated(true);
          
          // Check onboarding status based on required fields
          // User has completed onboarding if all these fields are filled
          const user = userData.data.user;
          const onboardingComplete = !!(
            user.username && 
            user.age !== null && 
            user.origin_id !== null && 
            user.status !== null
          );
          
          setHasCompletedOnboarding(onboardingComplete);

          // Redirect logic
          if (requireOnboarding && !onboardingComplete) {
            router.push('/get-started');
            return;
          }

          setIsLoading(false);
        } catch (error) {
        
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setIsLoading(false);
          
          if (requireAuth) {
            router.push(redirectTo || '/login');
          }
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [requireAuth, requireOnboarding, redirectTo, router]);

  return {
    isLoading,
    isAuthenticated,
    hasCompletedOnboarding,
  };
}
