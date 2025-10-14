// components/UserProfileHeader.jsx atau nama file yang sesuai
import React from 'react';

const UserProfileHeader = () => {
  return (
    <div className="bg-[#6F64A7] rounded-xl p-4 flex items-center justify-between text-white shadow-lg">
      {/* Kiri: Ikon Notifikasi */}
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent">
        <svg
          className="w-7 h-7"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
      </div>

      {/* Tengah: Avatar, Nama Pengguna, Dropdown */}
      <div className="flex items-center gap-3">
        {/* Gambar Avatar */}
        <div className="relative w-12 h-12 rounded-full bg-teal-300 flex items-center justify-center overflow-hidden">
          {/* <Image
            src={UserAvatar} // Pastikan path ini benar
            alt="User Avatar"
            layout="fill" // Mengisi div parent
            objectFit="cover" // Memastikan gambar terlihat baik
            className="rounded-full"
          /> */}
        </div>
        
        {/* Nama Pengguna */}
        <span className="text-xl font-semibold">AndrianFaikha</span>

        {/* Ikon Dropdown */}
        <svg
          className="w-5 h-5 ml-1"
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
  );
};

export default UserProfileHeader;