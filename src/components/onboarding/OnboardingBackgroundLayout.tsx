'use client';
import React from 'react';
import Image from 'next/image';
import IconKananAtas from '@/assets/getstarted/icons/icon-kanan-atas.svg';
import IconKiriAtas from '@/assets/getstarted/icons/icon-kiri-atas.svg';
import IconKananBawah from '@/assets/getstarted/icons/icon-kanan-bawah.svg';
import IconKiriBawah from '@/assets/getstarted/icons/icon-kiri-bawah.svg';
import smileBg from '@/assets/landingpage/background/smile-bg.svg';


type Props = {
  children: React.ReactNode;
  className?: string;
  showIcons?: boolean;
};

export default function OnboardingBackgroundLayout({ children, className = '', showIcons = true }: Props) {
  return (
    // 1. Hapus kelas gradient dari sini untuk menghindari konflik
    <div 
      className={`min-h-screen relative overflow-hidden ${className}`}
      style={{
        // 2. Gabungkan gambar dan gradient. Gambar pertama ada di lapisan atas.
        backgroundImage: `url(${smileBg.src})`,
        
        // 3. Atur properti untuk setiap lapisan (dipisahkan koma)
        backgroundSize: 'auto 150%, cover',      // Ukuran untuk 'smileBg', lalu untuk 'gradient'
        backgroundPosition: 'left center, center', // Posisi untuk 'smileBg', lalu untuk 'gradient'
        backgroundRepeat: 'no-repeat',             // Berlaku untuk semua lapisan
      }}
    >
      {/* Konten ikon dan children tetap sama */}
      <div className="absolute inset-0 z-0">
        {showIcons && (
          <>
            <div className="absolute top-15 -left-8 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
              <Image src={IconKiriAtas} alt="" fill className="object-contain" />
            </div>
            <div className="absolute -top-5 -right-10 w-16 h-16 md:w-20 md:h-20 lg:w-36 lg:h-36">
              <Image src={IconKananAtas} alt="" fill className="object-contain" />
            </div>
            <div className="absolute bottom-0 left-15 w-16 h-16 md:w-20 md:h-20 lg:w-34 lg:h-34">
              <Image src={IconKiriBawah} alt="" fill className="object-contain" />
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16 md:w-20 md:h-20 lg:w-34 lg:h-34">
              <Image src={IconKananBawah} alt="" fill className="object-contain" />
            </div>
          </>
        )}
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}