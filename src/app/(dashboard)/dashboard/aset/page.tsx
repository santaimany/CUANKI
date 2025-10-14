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
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          {/* Title */}
          <h1 className="text-white text-5xl font-bold">Kategori aset kamu</h1>
          
          {/* User Profile */}
          <UserProfile />
        </div>

        {/* Main Content - 2 Column Layout */}
        <div className="flex gap-6">
          {/* Left Column - Main Content */}
          <div className="flex-1 space-y-6">
            {/* Asset Summary with Pie Chart */}
            <AssetSummary totalAmount={7000000} />

            {/* Asset Cards with Pagination */}
            <AssetCards showButtons={false} />

            {/* Saving Progress */}
            <AssetProgress />
          </div>

          {/* Right Column - AI Reminder & Buttons */}
          <div className="w-80 flex-shrink-0 space-y-4">
            {/* AI Reminder */}
            <AIReminder />
            
            {/* Action Buttons */}
            <div className="flex flex-col bg-[#50488A] p-6 rounded-4xl gap-3">
              <button className="w-full bg-gradient-to-r from-[#A3FFD6] to-[#0EFF95] border-b-2 border-white text-black font-bold py-4 rounded-3xl hover:shadow-lg transition-all">
                + Tambah aset
              </button>
              <button className="w-full bg-[#DF4000] border-b-2 border-[#8B2800] text-white font-bold py-4 rounded-3xl hover:shadow-lg transition-all">
                - Hapus aset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
