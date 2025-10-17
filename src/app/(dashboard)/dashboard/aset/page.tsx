'use client';
import React, { useState } from 'react';
import AssetSummary from '@/components/dashboard/aset/AssetSummary';
import AssetCards from '@/components/dashboard/aset/AssetCards';
import AssetProgress from '@/components/dashboard/aset/AssetProgress';
import UserProfile from '@/components/dashboard/UserProfile';
import AIReminder from '@/components/dashboard/AIReminder';
import { UserAccount } from '@/types/api';

export default function AsetPage() {
  const [accounts, setAccounts] = useState<UserAccount[]>([]);

  const handleAccountsChange = (updatedAccounts: UserAccount[]) => {
    setAccounts(updatedAccounts);
  };

  return (
    <div className="min-h-screen bg-[#363256] pb-20 md:pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 h-full p-3 sm:p-4 md:p-6 pb-20 md:pb-6">
        {/* Left Column - Main Content (3 columns) */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">
          {/* Title */}
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Kategori aset kamu
          </h1>
          
          {/* Asset Summary with Pie Chart */}
          <AssetSummary accounts={accounts} />

          {/* Asset Cards with Pagination and Action Buttons */}
          <AssetCards showButtons={true} onAccountsChange={handleAccountsChange} />

          {/* Saving Progress */}
          <AssetProgress />
        </div>

        {/* Right Column - User Profile & AI Reminder - Hidden on mobile, shown on lg+ */}
        <div className="hidden lg:flex lg:col-span-1 flex-col gap-6">
          <UserProfile />
          <AIReminder page="asset" />
        </div>
      </div>
    </div>
  );
}
