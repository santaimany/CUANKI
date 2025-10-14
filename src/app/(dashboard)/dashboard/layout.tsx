import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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