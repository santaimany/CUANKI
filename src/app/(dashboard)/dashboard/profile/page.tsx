'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GreetingUsersResponse } from '@/types/api';
import { getUserGreeting } from '@/lib/api/user';

export default function ProfilePage() {
  const [userData, setUserData] = useState<GreetingUsersResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserGreeting();
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#363256] pb-20 md:pb-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0EFF95]"></div>
      </div>
    );
  }

  const fullName = userData?.data?.user?.name || 'User';
  const username = userData?.data?.user?.username || 'user';

  return (
    <div className="min-h-screen bg-[#363256] pb-20 md:pb-6">
      <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
        {/* Header with Avatar */}
        <div className="bg-gradient-to-r from-[#0EFF95] to-[#00D9D9] rounded-3xl p-6 sm:p-8 flex items-center gap-4 sm:gap-6 mb-6">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
            <Image
              src="/assets/avatar-placeholder.png"
              alt="Profile"
              fill
              className="object-cover"
              onError={(e) => {
                // Fallback to gradient background if image fails
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#363256]">{fullName}</h2>
            <p className="text-base sm:text-lg md:text-xl text-[#363256]/80">@{username}</p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-gradient-to-br from-[#7971BC] to-[#50488A] rounded-3xl shadow-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-white text-sm sm:text-base font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                readOnly
                className="w-full bg-white text-[#363256] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EFF95] text-sm sm:text-base"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-white text-sm sm:text-base font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                readOnly
                className="w-full bg-white text-[#363256] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EFF95] text-sm sm:text-base"
              />
            </div>

            {/* Asal */}
            <div>
              <label className="block text-white text-sm sm:text-base font-medium mb-2">Asal</label>
              <input
                type="text"
                value="Malang"
                readOnly
                className="w-full bg-white text-[#363256] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EFF95] text-sm sm:text-base"
              />
            </div>

            {/* Umur */}
            <div>
              <label className="block text-white text-sm sm:text-base font-medium mb-2">Umur</label>
              <input
                type="text"
                value="20"
                readOnly
                className="w-full bg-white text-[#363256] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EFF95] text-sm sm:text-base"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-white text-sm sm:text-base font-medium mb-2">Status</label>
              <input
                type="text"
                value="Pelajar"
                readOnly
                className="w-full bg-white text-[#363256] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EFF95] text-sm sm:text-base"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-white text-sm sm:text-base font-medium mb-2">Email</label>
              <input
                type="email"
                value="Andrian@gmail.com"
                readOnly
                className="w-full bg-white text-[#363256] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EFF95] text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              className="bg-gradient-to-r from-[#0EFF95] to-[#00D9D9] text-[#363256] font-bold px-8 sm:px-12 py-3 rounded-full hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
