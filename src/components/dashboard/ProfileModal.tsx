'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { UserProfileResponse } from '@/types/api';
import { getUserProfile } from '@/lib/api/user';
import { useToast } from '@/context/ToastContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: UserProfileResponse | null;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, userProfile: propUserProfile }) => {
  // State internal modal
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(propUserProfile || null);
  const [loading, setLoading] = useState(false);
  const { showError } = useToast();

  // Update userProfile ketika prop berubah
  useEffect(() => {
    if (propUserProfile) {
      setUserProfile(propUserProfile);
    }
  }, [propUserProfile]);

  // Fetch data jika modal terbuka tapi data tidak ada
  useEffect(() => {
    const fetchUserProfile = async () => {
      // Hanya fetch jika modal terbuka DAN data belum ada
      if (!propUserProfile && isOpen && !userProfile) { 
        setLoading(true);
        try {
          const response = await getUserProfile();
          console.log('ProfileModal - getUserProfile response:', response);
          setUserProfile(response);
        } catch (error) {
          console.error('ProfileModal - Error fetching user profile:', error);
          if (error instanceof Error) {
            showError(error.message);
          } else {
            showError('Gagal memuat data profile');
          }
        } finally {
          setLoading(false);
        }
      } else if (propUserProfile) {
        // Jika data dari props sudah ada, gunakan itu
        setUserProfile(propUserProfile);
      }
    };

    fetchUserProfile();
  }, [propUserProfile, isOpen, showError, userProfile]); // userProfile ditambahkan

  if (!isOpen) return null;

  // --- PERBAIKAN UTAMA DI SINI ---
  // Mengakses objek 'user' dari dalam 'data'
  const profileData = userProfile?.data?.user;
  // --- AKHIR PERBAIKAN ---


  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-2xl">
        <div className="bg-gradient-to-br from-[#7971BC] to-[#50488A] rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with Avatar */}
          <div className="bg-gradient-to-r from-[#0EFF95] to-[#00D9D9] p-6 sm:p-8 flex items-center gap-4 sm:gap-6">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
              {profileData?.profile_picture ? (
                <Image
                  src={profileData.profile_picture}
                  alt="Profile"
                  fill
                  sizes="(max-width: 640px) 64px, 80px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00F5A0] to-[#00D4AA] text-white font-bold text-xl">
                  {/* PERBAIKAN: Menggunakan full_name */}
                  {loading ? '...' : (profileData?.full_name?.charAt(0)?.toUpperCase() || profileData?.username?.charAt(0)?.toUpperCase() || 'U')}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-[#363256]/20 rounded-lg mb-2"></div>
                  <div className="h-6 bg-[#363256]/20 rounded-lg w-2/3"></div>
                </div>
              ) : (
                <>
                  {/* PERBAIKAN: Menggunakan full_name */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#363256] truncate">
                    {profileData?.full_name || profileData?.username || 'User'}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-[#363256]/80 capitalize">
                    {profileData?.status || 'Status tidak tersedia'}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-white text-sm sm:text-base font-medium mb-2">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  // PERBAIKAN: Menggunakan full_name
                  value={loading ? 'Loading...' : (profileData?.full_name || 'Tidak tersedia')}
                  readOnly
                  className="w-full bg-white text-[#363256] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EFF95] text-sm sm:text-base"
                />
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-white text-sm sm:text-base font-medium mb-2">Username</label>
                <input
                  id="username"
                  type="text"
                  value={loading ? 'Loading...' : (profileData?.username || 'Tidak tersedia')}
                  readOnly
                  className="w-full bg-white text-[#363256] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EFF95] text-sm sm:text-base"
                />
              </div>

              {/* Umur */}
              <div>
                <label htmlFor="age" className="block text-white text-sm sm:text-base font-medium mb-2">Umur</label>
                <input
                  id="age"
                  type="text"
                  value={loading ? 'Loading...' : (profileData?.age?.toString() || 'Tidak tersedia')}
                  readOnly
                  className="w-full bg-white text-[#363256] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EFF95] text-sm sm:text-base"
                />
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-white text-sm sm:text-base font-medium mb-2">Status</label>
                <input
                  id="status"
                  type="text"
                  value={loading ? 'Loading...' : (profileData?.status || 'Tidak tersedia')}
                  readOnly
                  className="w-full bg-white text-[#363256] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EFF95] text-sm sm:text-base capitalize"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-white text-sm sm:text-base font-medium mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  value={loading ? 'Loading...' : (profileData?.email || 'Tidak tersedia')}
                  readOnly
                  className="w-full bg-white text-[#363256] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EFF95] text-sm sm:text-base"
                />
              </div>

              {/* Origin (Nama) */}
              <div>
                <label htmlFor="originName" className="block text-white text-sm sm:text-base font-medium mb-2">Asal Kota</label>
                <input
                  id="originName"
                  type="text"
                  // PERBAIKAN: Menggunakan origin_name
                  value={loading ? 'Loading...' : (profileData?.origin_name || 'Tidak tersedia')}
                  readOnly
                  className="w-full bg-white text-[#363256] px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EFF95] text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-[#0EFF95] to-[#00D9D9] text-[#363256] font-bold px-8 sm:px-12 py-3 rounded-full hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;