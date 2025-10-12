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
     
        <div className="flex justify-end mb-6">
          <UserProfile />
        </div>

        <p className='text-white text-2xl font-bold'>Kategori aset kamu</p>
        <div className="flex gap-6">
            
          <div className="flex-1 space-y-6">
         
            <AssetSummary totalAmount={7000000} />

            <AssetCards showButtons={false} />

            <AssetProgress />
          </div>

          <div className="w-80 flex-shrink-0 space-y-4">
            <AIReminder />
            
         
            <div className="flex flex-col bg-[#50488A] p-6 rounded-4xl gap-3">
              <button className="w-full bg-gradient-to-r from-[#A3FFD6] to-[#0EFF95] border-b-2 border-white text-black font-bold py-4 rounded-3xl hover:shadow-lg transition-all">
                + Tambah aset
              </button>
              <button className="w-full bg-[#DF4000] border-b-2  text-white font-bold py-4 rounded-3xl hover:shadow-lg transition-all">
                - Hapus aset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
