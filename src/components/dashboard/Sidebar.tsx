"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CuankiLogo from "@/assets/landingpage/logo/cuanki-logo.svg";
import HomeIcon from "@/assets/dashboard/icons/homepage-icon.svg";
import TransaksiIcon from "@/assets/dashboard/icons/transaksi-icon.svg";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: 'Homepage',
      path: '/dashboard',
      icon: (
        <Image
          src={HomeIcon}
          alt="Homepage"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      ),
    },
    {
      name: 'Transaksi',
      path: '/dashboard/transaksi',
      icon: (
        <Image
          src={TransaksiIcon}
          alt="Transaksi"
            width={24}
            height={24}
            className="w-6 h-6"

        />
      ),
    },
    {
      name: 'Tabungan',
      path: '/dashboard/tabungan',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm3 0a1 1 0 011-1h1a1 1 0 110 2H8a1 1 S0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Goals',
      path: '/dashboard/goals',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 10a3 3 0 116 0 3 3 0 01-6 0z" clipRule="evenodd" />
            <path d="M10 11a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
      ),
    },
  ];

  return (
    // Container utama tidak perlu rounding
    <div className={`h-screen w-64 flex flex-col ${className}`}>
      {/* Header dengan background dan rounding top-right */}
      <div className="bg-gradient-to-tl from-[#7971BC] to-[#373456] text-center pt-12 pb-10 rounded-tr-4xl">
        <div className="flex justify-center mb-6 ml-4">
          <Image
            src={CuankiLogo}
            alt="Cuanki Logo"
            width={52}
            height={52}
            className="w-full h-auto" // Ukuran yang sesuai
          />
        </div>
        <div className='ml-4 text-left'>
          <h2 className="text-[#00F5A0] text-4xl font-semibold">Financial</h2>
          <h2 className="text-white text-4xl font-semibold">Dashboard</h2>
        </div>
      </div>

      {/* Konten Sisa (Menu dan Logout) dengan background dan rounding bottom-right */}
      <div className="bg-gradient-to-b from-[#363256] to-[#50488A] flex-grow flex flex-col justify-between rounded-br-4xl">
        {/* Menu Items */}
        <nav className="mt-10 px-6">
          <ul className="space-y-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-[#6F64A7] text-white'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-6">
          <button className="w-full bg-[#00F5A0] text-[#363256] font-semibold py-3 px-4 rounded-full hover:bg-[#00e68f] transition-colors duration-200">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;