'use client';
import React from 'react';
import AssetSummary from '@/components/dashboard/aset/AssetSummary';
import AssetCards from '@/components/dashboard/aset/AssetCards';
import AssetProgress from '@/components/dashboard/aset/AssetProgress';
import UserProfile from '@/components/dashboard/UserProfile';
import AIReminder from '@/components/dashboard/AIReminder';

export default function AsetPage() {
  return (
    <div className="min-h-screen bg-[#363256] p-6">
      <div className=" mx-auto">
        {/* Header with User Profile */}
        <div className="flex justify-end mb-6">
          <UserProfile />
        </div>

        <p className='text-white text-2xl font-bold'>Kategori aset kamu</p>
        <div className="flex gap-6">
            
          {/* Left Section - Main Content (wider) */}
          <div className="flex-1 space-y-6">
            {/* Asset Summary with Pie Chart */}
            <AssetSummary totalAmount={7000000} />

            {/* Asset Cards with Pagination */}
            <AssetCards />

            {/* Saving Progress Cards */}
            <AssetProgress />
          </div>

          {/* Right Section - AI Reminder (narrower, fixed width) */}
          <div className="w-80 flex-shrink-0">
           <AIReminder />
          </div>
        </div>
      </div>
    </div>
  );
}
