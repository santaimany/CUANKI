'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GreetingUsersResponse, UserProfileResponse } from '@/types/api';
import { getUserGreeting, getUserProfile } from '@/lib/api/user';
import { useAuth } from '@/hooks/useAuthActions';
import LoadingScreen from '@/components/commons/LoadingScreen';
import { useToast } from '@/context/ToastContext';
import TourAnchor from '@/components/tour/TourAnchor';

export default function ProfilePage() {
  const [userData, setUserData] = useState<GreetingUsersResponse | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const { showError } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const [greetingData, profileData] = await Promise.all([
          getUserGreeting(),
          getUserProfile()
        ]);
        setUserData(greetingData);
        setUserProfile(profileData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        if (error instanceof Error) {
          showError(error.message);
        } else {
          showError('Gagal memuat data profile');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [showError]);

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      logout();
    }
  };

    if (loading) {
    return (
      <div className="pb-20 md:pb-0 flex items-center justify-center min-h-screen">
        <LoadingScreen  />
      </div>
    );
  }

  // --- PERBAIKAN UTAMA DI SINI ---
  // Mengakses data sesuai struktur interface { data: { user: { ... } } }
  
  // Ambil objek 'user' dari sumber prioritas (UserProfile)
  const profileData = userProfile?.data?.user;
  const greetingUser = userData?.data?.user;
  // Ambil objek 'user' dari sumber fallback (Greeting)

  // Prioritaskan 'full_name' dari profile, fallback ke 'name' dari greeting
  const fullName = profileData?.full_name ?? greetingUser?.name ?? 'User';
  const username = profileData?.username ?? greetingUser?.username ?? 'user';
  const email = profileData?.email ?? 'Email tidak tersedia';
  const age = profileData?.age ?? greetingUser?.age ?? null;
  const status = profileData?.status ?? greetingUser?.status ?? 'Status tidak tersedia';
  const profilePicture = profileData?.profile_picture;
  // Mengambil 'origin_name' alih-alih 'origin_id'
  const originName = profileData?.origin_name || 'Tidak tersedia';
  // --- AKHIR PERBAIKAN ---

  return (
    <div className="min-h-screen bg-[#363256] pb-20 md:pb-6">
      <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
        {/* Header (Sudah benar, menggunakan 'fullName' dan 'username' yang baru) */}
        <TourAnchor id="profile-header" variant="main" className="bg-gradient-to-r from-[#0EFF95] to-[#00D9D9] rounded-3xl p-6 sm:p-8 flex items-center gap-4 sm:gap-6 mb-6">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
            {profilePicture ? (
              <Image
                src={profilePicture}
                alt="Profile"
                fill
                sizes="(max-width: 640px) 64px, 80px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00F5A0] to-[#00D4AA] text-white font-bold text-xl">
                {fullName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#363256] truncate">{fullName}</h2>
            <p className="text-base sm:text-lg md:text-xl text-[#363256]/80">@{username}</p>
          </div>
        </TourAnchor>

        {/* Form Content */}
        <TourAnchor id="profile-details" variant="main" className="bg-gradient-to-br from-[#7971BC] to-[#50488A] rounded-3xl shadow-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-white text-sm sm:text-base font-medium mb-2" htmlFor="profile-full-name">Full Name</label>
              <input
                type="text"
                value={fullName}
                readOnly
                id="profile-full-name"
                className="w-full bg-white text-[#363256] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EFF95] text-sm sm:text-base"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-white text-sm sm:text-base font-medium mb-2" htmlFor="profile-username">Username</label>
              <input
                type="text"
                value={username}
                readOnly
                id="profile-username"
                className="w-full bg-white text-[#363256] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EFF95] text-sm sm:text-base"
              />
            </div>

            {/* PERBAIKAN: Mengganti Origin ID dengan Origin Name */}
            <div>
              <label className="block text-white text-sm sm:text-base font-medium mb-2" htmlFor="profile-origin">Asal Kota</label>
              <input
                type="text"
                value={originName}
                readOnly
                id="profile-origin"
                className="w-full bg-white text-[#363256] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EFF95] text-sm sm:text-base"
              />
            </div>

            {/* Umur */}
            <div>
              <label className="block text-white text-sm sm:text-base font-medium mb-2" htmlFor="profile-age">Umur</label>
              <input
                type="text"
                value={age ? age.toString() : 'Tidak tersedia'}
                readOnly
                id="profile-age"
                className="w-full bg-white text-[#363256] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EFF95] text-sm sm:text-base"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-white text-sm sm:text-base font-medium mb-2" htmlFor="profile-status">Status</label>
              <input
                type="text"
                value={status}
                readOnly
                id="profile-status"
                className="w-full bg-white text-[#363256] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EFF95] text-sm sm:text-base capitalize"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-white text-sm sm:text-base font-medium mb-2" htmlFor="profile-email">Email</label>
              <input
                type="email"
                value={email}
                readOnly
                id="profile-email"
                className="w-full bg-white text-[#363256] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EFF95] text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <TourAnchor id="profile-actions" variant="main" className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-center">
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-[#E85D5D] to-[#C54545] text-white font-bold px-6 sm:px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
              Keluar
            </button>

            {/* Save Button */}
            <button
              className="bg-gradient-to-r from-[#0EFF95] to-[#00D9D9] text-[#363256] font-bold px-8 sm:px-12 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 text-sm sm:text-base"
            >
              Simpan
            </button>
          </TourAnchor>
        </TourAnchor>
      </div>
    </div>
  );
}