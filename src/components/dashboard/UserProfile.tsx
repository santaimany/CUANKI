'use client';
import React, { useState } from 'react';
import ProfileModal from './ProfileModal';
import { GreetingUsersResponse } from '@/types/api';

interface UserProfileHeaderProps {
  userData?: GreetingUsersResponse | null;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = userData?.data?.user?.username || 'User';

  return (
    <>
      <div className="bg-[#6F64A7] rounded-xl p-3 sm:p-4 flex items-center justify-between text-white shadow-lg">
        {/* Kiri: Ikon Notifikasi */}
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-transparent">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </div>

        {/* Tengah: Avatar, Nama Pengguna, Dropdown */}
        <div 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setIsModalOpen(true)}
        >
        {/* Gambar Avatar */}
        <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-teal-300 flex items-center justify-center overflow-hidden">
          {/* <Image
            src={UserAvatar} // Pastikan path ini benar
            alt="User Avatar"
            layout="fill" // Mengisi div parent
            objectFit="cover" // Memastikan gambar terlihat baik
            className="rounded-full"
          /> */}
        </div>
        
        {/* Nama Pengguna */}
        <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">{username}</span>

        {/* Ikon Dropdown */}
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 sm:ml-1"
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
      </div>
    </div>

      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default UserProfileHeader;