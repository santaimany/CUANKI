'use client';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoadingScreen from '../commons/LoadingScreen';

interface WithAuthOptions {
  requireAuth?: boolean;
  requireOnboarding?: boolean;
  redirectTo?: string;
}

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  return function AuthenticatedComponent(props: P) {
    const { isLoading, isAuthenticated, hasCompletedOnboarding } = useAuth(options);

    if (isLoading) {
      return (
        <LoadingScreen />
      );
    }

    if (!isAuthenticated) {
      return null; // useAuth hook will handle redirect
    }

    if (options.requireOnboarding && !hasCompletedOnboarding) {
      return null; // useAuth hook will handle redirect to onboarding
    }

    return <WrappedComponent {...props} />;
  };
}
