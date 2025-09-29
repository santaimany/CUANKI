'use client';
import React from 'react';
import Image from 'next/image';
import IconKananAtas from '@/assets/getstarted/icons/icon-kanan-atas.svg';
import IconKiriAtas from '@/assets/getstarted/icons/icon-kiri-atas.svg';
import IconKananBawah from '@/assets/getstarted/icons/icon-kanan-bawah.svg';
import IconKiriBawah from '@/assets/getstarted/icons/icon-kiri-bawah.svg';

type Props = {
  children: React.ReactNode;
  className?: string;
  showIcons?: boolean;
};

export default function OnboardingBackgroundLayout({ children, className = '', showIcons = true }: Props) {
  return (
    <div className={`min-h-screen bg-gradient-to-r from-[#363256] to-[#50488A] relative overflow-hidden ${className}`}>
      {showIcons && (
        <>
          <div className="absolute top-4 left-4 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
            <Image src={IconKiriAtas} alt="" fill className="object-contain" />
          </div>
          <div className="absolute top-4 right-4 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
            <Image src={IconKananAtas} alt="" fill className="object-contain" />
          </div>
          <div className="absolute bottom-4 left-4 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
            <Image src={IconKiriBawah} alt="" fill className="object-contain" />
          </div>
          <div className="absolute bottom-4 right-4 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
            <Image src={IconKananBawah} alt="" fill className="object-contain" />
          </div>
        </>
      )}

      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
