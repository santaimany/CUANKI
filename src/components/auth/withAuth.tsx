'use client';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';

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
        <div className="min-h-screen bg-[#363256] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0EFF95] mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading...</p>
          </div>
        </div>
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
