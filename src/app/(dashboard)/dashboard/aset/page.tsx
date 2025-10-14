'use client';
import React from 'react';
import AssetSummary from '@/components/dashboard/aset/AssetSummary';
import AssetCards from '@/components/dashboard/aset/AssetCards';
import AssetProgress from '@/components/dashboard/aset/AssetProgress';
import UserProfile from '@/components/dashboard/UserProfile';
import AIReminder from '@/components/dashboard/AIReminder';

export default function AsetPage() {
  return (
    <div className="min-h-screen bg-[#363256] pb-20 md:pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 h-full p-3 sm:p-4 md:p-6 pb-20 md:pb-6">
        {/* Left Column - Main Content (3 columns) */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">
          {/* Title */}
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Kategori aset kamu</h1>
          
          {/* Asset Summary with Pie Chart */}
          <AssetSummary totalAmount={7000000} />

          {/* Asset Cards with Pagination */}
          <AssetCards showButtons={false} />

          {/* Action Buttons - Show on mobile */}
          <div className="flex flex-col sm:flex-row lg:hidden gap-2 sm:gap-3">
            <button className="w-full bg-gradient-to-r from-[#A3FFD6] to-[#0EFF95] border-b-2 border-white text-black font-bold py-3 sm:py-4 text-sm sm:text-base rounded-2xl sm:rounded-3xl hover:shadow-lg transition-all">
              + Tambah aset
            </button>
            <button className="w-full bg-[#DF4000] border-b-2 border-[#8B2800] text-white font-bold py-3 sm:py-4 text-sm sm:text-base rounded-2xl sm:rounded-3xl hover:shadow-lg transition-all">
              - Hapus aset
            </button>
          </div>

          {/* Saving Progress */}
          <AssetProgress />
        </div>

        {/* Right Column - User Profile, AI Reminder & Buttons - Hidden on mobile, shown on lg+ */}
        <div className="hidden lg:flex lg:col-span-1 flex-col gap-6">
          <UserProfile />
          <AIReminder />
          
          {/* Action Buttons */}
          <div className="flex flex-col bg-[#50488A] p-4 sm:p-6 rounded-2xl sm:rounded-4xl gap-2 sm:gap-3">
            <button className="w-full bg-gradient-to-r from-[#A3FFD6] to-[#0EFF95] border-b-2 border-white text-black font-bold py-3 sm:py-4 text-sm sm:text-base rounded-2xl sm:rounded-3xl hover:shadow-lg transition-all">
              + Tambah aset
            </button>
            <button className="w-full bg-[#DF4000] border-b-2 border-[#8B2800] text-white font-bold py-3 sm:py-4 text-sm sm:text-base rounded-2xl sm:rounded-3xl hover:shadow-lg transition-all">
              - Hapus aset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
