'use client';
import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import LoadingScreen from '@/components/commons/LoadingScreen';
import TourManager from '@/components/tour/TourManager';
import TourHelpButton from '@/components/tour/TourHelpButton';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading, isAuthenticated, hasCompletedOnboarding } = useAuth({
    requireAuth: true,
    requireOnboarding: true,
  });

  if (isLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (!isAuthenticated || !hasCompletedOnboarding) {
    return null; // useAuth hook handles redirect
  }

  return (
    <div className="bg-[#363256] min-h-screen">
      <TourManager />
      <TourHelpButton />
      {/* Sidebar - Hidden on mobile by default, shown via toggle */}
      <Sidebar />
      
      {/* Main Content - Full width on mobile, with left margin on desktop for fixed sidebar */}
      <main className="p-4 sm:p-6 md:p-8 md:ml-72">
        {children}
      </main>
    </div>
  );
}