import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#363256] h-screen">
      <Sidebar />
      {/* UserProfileHeader dihapus dari sini */}
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
}