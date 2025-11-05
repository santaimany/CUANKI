'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ProfileModal from './ProfileModal';
import { GreetingUsersResponse, StreakData, UserProfileResponse } from '@/types/api';
import { getUserProfile } from '@/lib/api/user';
import { getStreak } from '@/lib/services/dashboardService';
import { useToast } from '@/context/ToastContext';

// Lottie animation URLs
const FIRE_ACTIVE_ANIMATION = "https://lottie.host/25052bc2-7469-40a5-a6d6-9e6a7713fefe/MkdRgn9F6G.json"; // Fire nyala - bergerak animasi
const FIRE_INACTIVE_ANIMATION = "https://lottie.host/992cfa87-8aba-4f6b-8b35-167db683d58e/gIO625Txek.json"; // Fire mati - abu-abu/tidak bergerak

interface UserProfileHeaderProps {
  userData?: GreetingUsersResponse | null;
  userProfile?: UserProfileResponse | null;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ userData, userProfile: propUserProfile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(propUserProfile || null);
  const [loadingStreak, setLoadingStreak] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const { showError } = useToast();
  
  // --- PERBAIKAN UTAMA DI SINI ---
  // Kode yang error/salah tempel telah dihapus dan diganti dengan yang benar.
  
  // 1. Ambil objek 'user' dari masing-masing prop
  const userFromProfile = userProfile?.data?.user;


  // 2. Tentukan nilai fallback dengan prioritas
  // 'full_name' dari profile, fallback ke 'name' dari greeting
  const name = userFromProfile?.full_name || 'User'; 
  const username = userFromProfile?.username || 'user';
  const profilePicture = userFromProfile?.profile_picture;
  // --- AKHIR PERBAIKAN ---

  console.log('UserProfileHeader - propUserProfile:', propUserProfile);
  console.log('UserProfileHeader - userProfile state:', userProfile);
  console.log('UserProfileHeader - userData:', userData);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!propUserProfile) { // Only fetch if not provided as prop
        console.log('UserProfileHeader - Fetching user profile...');
        setLoadingProfile(true);
        try {
          const response = await getUserProfile();
          console.log('UserProfileHeader - getUserProfile response:', response);
          setUserProfile(response);
        } catch (error) {
          console.error('UserProfileHeader - Error fetching user profile:', error);
          if (error instanceof Error) {
            showError(error.message);
          } else {
            showError('Gagal memuat data profile');
          }
        } finally {
          setLoadingProfile(false);
        }
      } else {
        console.log('UserProfileHeader - Using propUserProfile:', propUserProfile);
        setUserProfile(propUserProfile);
      }
    };

    fetchUserProfile();
  }, [propUserProfile, showError]);

  // Fetch streak data
  useEffect(() => {
    const fetchStreak = async () => {
      setLoadingStreak(true);
      try {
        const response = await getStreak();
        setStreakData(response.data);
      } catch (error) {
        console.error('Error fetching streak:', error);
        if (error instanceof Error) {
          showError(error.message);
        } else {
          showError('Gagal memuat streak data');
        }
      } finally {
        setLoadingStreak(false);
      }
    };

    fetchStreak();
  }, [showError]);

  return (
    <>
      <div className="bg-[#6F64A7] rounded-xl p-3 sm:p-4 flex items-center justify-between text-white shadow-lg">
        {/* Kiri: Ikon Notifikasi */}
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-transparent flex-shrink-0">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </div>

        {/* Streak Indicator dengan Lottie Animation */}
        <div className="flex items-center gap-1 relative group flex-shrink-0">
          <div className="relative w-6 h-6 sm:w-8 sm:h-8">
            {loadingStreak ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              </div>
            ) : (
              <DotLottieReact
                src={streakData?.is_active_today ? FIRE_ACTIVE_ANIMATION : FIRE_INACTIVE_ANIMATION}
                loop={streakData?.is_active_today}
                autoplay={streakData?.is_active_today}
                className="w-full h-full transition-all duration-300"
              />
            )}
          </div>
          
          {streakData && (
            <>
              <span className="text-xs sm:text-sm font-bold text-orange-300">
                {streakData.current_streak}
              </span>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                {streakData.is_active_today 
                  ? `🔥 Streak aktif: ${streakData.current_streak} hari` 
                  : `❄️ Streak padam: ${streakData.current_streak} hari`
                }
              </div>
            </>
          )}
        </div>

        {/* Tengah: Avatar, Nama Pengguna, Dropdown */}
        <button 
          type="button"
          className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none min-w-0"
          onClick={() => setIsModalOpen(true)}
        >
        {/* Gambar Avatar */}
        <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-teal-300 flex items-center justify-center overflow-hidden flex-shrink-0">
          {profilePicture ? (
            <Image
              src={profilePicture}
              alt="User Avatar"
              fill
              sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
              className="object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00F5A0] to-[#00D4AA] text-white font-semibold text-xs sm:text-sm">
              {/* Menggunakan 'name' yang sudah didefinisikan di atas */}
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        {/* Nama Pengguna */}
        <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px]">
          {loadingProfile ? (
            <div className="w-16 h-4 bg-white/20 rounded animate-pulse"></div>
          ) : (
            username // Menggunakan 'name' yang sudah didefinisikan di atas
          )}
        </span>

        {/* Ikon Dropdown */}
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 sm:ml-1 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>

      <ProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        userProfile={userProfile}
      />
    </>
  );
};

export default UserProfileHeader;