'use client';
import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth } from '@/hooks/useAuth';

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
      <div className="min-h-screen bg-[#363256] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0EFF95] mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !hasCompletedOnboarding) {
    return null; // useAuth hook handles redirect
  }

  return (
    <div className="flex flex-col md:flex-row bg-[#363256] min-h-screen">
      {/* Sidebar - Hidden on mobile by default, shown via toggle */}
      <Sidebar />
      
      {/* Main Content - Full width on mobile, flex-1 on desktop */}
      <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}