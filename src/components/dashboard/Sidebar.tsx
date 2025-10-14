"use client";
// Impor hook dan GSAP
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

import CuankiLogo from "@/assets/landingpage/logo/cuanki-logo.svg";
import HomeIcon from "@/assets/dashboard/icons/homepage-icon.svg";

const TransaksiIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg> );
const TabunganIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm3 0a1 1 0 011-1h1a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" /></svg> );
const GoalsIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 10a3 3 0 116 0 3 3 0 01-6 0z" clipRule="evenodd" /><path d="M10 11a1 1 0 100-2 1 1 0 000 2z" /></svg> );
const ProfileIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg> );

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const pathname = usePathname();

  const indicatorRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  // PENAMBAHAN: Ref untuk menandai render pertama kali
  const isInitialLoad = useRef(true);

  const menuItems = React.useMemo(() => [
    { name: 'Homepage', path: '/dashboard', icon: <Image src={HomeIcon} alt="Homepage" width={24} height={24} /> },
    { name: 'Transaksi', path: '/dashboard/transaksi', icon: <TransaksiIcon/> },
    { name: 'Aset', path: '/dashboard/aset', icon: <TabunganIcon/> },
    { name: 'Goals', path: '/dashboard/goals', icon: <GoalsIcon/> },
  ], []);

  const mobileMenuItems = React.useMemo(() => [
    { name: 'Homepage', path: '/dashboard', icon: <Image src={HomeIcon} alt="Homepage" width={24} height={24} /> },
    { name: 'Transaksi', path: '/dashboard/transaksi', icon: <TransaksiIcon/> },
    { name: 'Aset', path: '/dashboard/aset', icon: <TabunganIcon/> },
    { name: 'Goals', path: '/dashboard/goals', icon: <GoalsIcon/> },
    { name: 'Profile', path: '/dashboard/profile', icon: <ProfileIcon/> },
  ], []);

  // MODIFIKASI: useEffect kini memiliki logika berbeda untuk animasi awal
  useEffect(() => {
    const activeIndex = menuItems.findIndex(item => item.path === pathname);
    const activeItemEl = itemsRef.current[activeIndex];

    if (activeItemEl && indicatorRef.current) {
      if (isInitialLoad.current) {
        // --- Animasi Pertama Kali (Kiri ke Kanan) ---
        gsap.set(indicatorRef.current, { // Atur posisi vertikal secara instan
          top: activeItemEl.offsetTop,
          height: activeItemEl.offsetHeight,
        });
        
        gsap.fromTo(indicatorRef.current, 
          { x: '-100%', opacity: 0 }, // Dari: posisi kiri & transparan
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" } // Ke: posisi normal & terlihat
        );

        isInitialLoad.current = false; // Tandai bahwa animasi awal sudah selesai
      } else {
        // --- Animasi Selanjutnya (Atas ke Bawah) ---
        gsap.to(indicatorRef.current, {
          top: activeItemEl.offsetTop,
          height: activeItemEl.offsetHeight,
          duration: 0.6,
          ease: "power3.inOut"
        });
      }
    }
  }, [pathname, menuItems]);

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#50488A] border-t border-white/10 z-50">
        <div className="flex justify-around items-center py-3">
          {mobileMenuItems.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors duration-200
                  ${isActive ? 'text-[#00F5A0]' : 'text-white/60'}`}
              >
                <div className="w-6 h-6">{item.icon}</div>
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-screen py-4">
        <div className={`h-full w-64 ml-4 flex flex-col bg-[#50488A] rounded-3xl ${className}`}>
          <div className="bg-[#2E2A4A] text-center pt-12 pb-10 rounded-3xl">
            <div className="flex justify-center mb-6 ml-4">
              <Image src={CuankiLogo} alt="Cuanki Logo" width={52} height={52} className="w-full h-auto" />
            </div>
            <div className='ml-4 text-left'>
              <h2 className="text-[#00F5A0] text-3xl font-semibold">Financial</h2>
              <h2 className="text-white text-3xl font-bold">Dashboard</h2>
            </div>
          </div>

          <div className="bg-[#50488A] flex-grow flex flex-col justify-between rounded-b-4xl">
            <nav className="mt-10 px-6">
              <ul className="space-y-4 relative">
                <div ref={indicatorRef} className="absolute -left-6 w-full bg-[#363256] rounded-r-full opacity-0">
                    <div className="absolute -top-6  h-6 w-6 bg-[#50488A] shadow-[0px_12px_0_0_#363256] rounded-bl-2xl"></div>
                    <div className="absolute -bottom-6  h-6 w-6 bg-[#50488A] shadow-[0px_-12px_0_0_#363256] rounded-tl-2xl"></div>
                </div>

                {menuItems.map((item, index) => {
                  const isActive = pathname === item.path;
                  return (
                    <li key={item.path} ref={el => { itemsRef.current[index] = el; }} className="relative z-10">
                      <Link
                        href={item.path}
                        className={`flex items-center gap-4 py-3 text-lg font-medium transition-colors duration-200 w-full pl-10 pr-4
                          ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-6">
              <button className="w-full bg-[#00F5A0] text-[#363256] font-semibold py-3 px-4 rounded-full hover:bg-[#00e68f] transition-colors duration-200">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;