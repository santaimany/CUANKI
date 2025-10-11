'use client';
import React from 'react';
import AssetSummary from '@/components/dashboard/aset/AssetSummary';
import AssetCards from '@/components/dashboard/aset/AssetCards';
import AssetProgress from '@/components/dashboard/aset/AssetProgress';
import UserProfile from '@/components/dashboard/UserProfile';

export default function AsetPage() {
  return (
    <div className="min-h-screen bg-[#363256] p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header with User Profile */}
        <div className="flex justify-end mb-6">
          <UserProfile />
        </div>

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
            <div className="bg-gradient-to-br from-[#7971BC] to-[#6B5CE7] rounded-3xl p-6 shadow-lg sticky top-6">
              <button className="w-full bg-[#00F5A0] text-black font-bold py-4 px-6 rounded-2xl mb-6 flex items-center justify-center gap-2 hover:shadow-lg transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                AI Reminder
              </button>

              <div className="text-white/90 text-center leading-relaxed">
                <p>
                  Melihat tabungan mu sudah cukup rapih, alangkah baik kamu untuk selalu konsisten dalam mencatat pengeluarannya :)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
