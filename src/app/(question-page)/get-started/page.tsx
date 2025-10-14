'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import CardKiri from '@/assets/getstarted/image/card-kiri.svg';
import CardTengah from '@/assets/getstarted/image/card-tengah.svg';
import CardKanan from '@/assets/getstarted/image/card-kanan.svg';

export default function GetStartedPage() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef = useRef<HTMLDivElement | null>(null);
  const centerCardRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Ref kembali ke tombol

  // Animasi masuk saat komponen dimuat
  useEffect(() => {
    const tl = gsap.timeline();
    const isMobile = window.innerWidth < 768;
    
    gsap.set([leftCardRef.current, rightCardRef.current], { x: 0, opacity: 0, scale: 0.8 });
    gsap.set(centerCardRef.current, { scale: 0, opacity: 0 });
    gsap.set(contentRef.current, { opacity: 0, y: 30 });

    tl.to(centerCardRef.current, { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' })
      .to([leftCardRef.current, rightCardRef.current], { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .to(leftCardRef.current, { x: isMobile ? '-30vw' : '-50vw', duration: 0.8, ease: 'power3.out' }, '-=0.2')
      .to(rightCardRef.current, { x: isMobile ? '30vw' : '50vw', duration: 0.8, ease: 'power3.out' }, '-=0.8')
      .to(contentRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
    
    return () => {
      tl.kill();
    };
  }, []);

  // Animasi keluar saat tombol diklik (tidak berubah)
  const handleGetStarted = () => {
    if (isExiting) return;
    setIsExiting(true);

    const tlExit = gsap.timeline({
      onComplete: () => router.push('/onboarding'),
    });

    tlExit
      .to(contentRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' })
      .to([leftCardRef.current, rightCardRef.current], { x: 0, opacity: 0, scale: 0.8, duration: 0.7, ease: 'power3.in' }, '-=0.1')
      .to(centerCardRef.current, { scale: 0, opacity: 0, duration: 1.5, ease: 'back.in(1.7)' }, '-=0.5');
  };

  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div ref={leftCardRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[50vh] sm:w-[280px] sm:h-[55vh] md:w-[500px] md:h-[70vh] lg:w-[600px] lg:h-[75vh]">
          <Image src={CardKiri} alt="Left decorative" fill className="object-contain" />
        </div>
        <div ref={rightCardRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[50vh] sm:w-[280px] sm:h-[55vh] md:w-[550px] md:h-[70vh] lg:w-[700px] lg:h-[75vh]">
          <Image src={CardKanan} alt="Right decorative" fill className="object-contain" />
        </div>
      </div>

      <div className="relative z-20 w-full flex items-center justify-center px-4">
        <div ref={centerCardRef} className="relative w-full max-w-[90vw] sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-3xl h-[100vh] max-h-[100vh] flex items-center justify-center">
          <Image src={CardTengah} alt="Center card" fill className="object-contain" />
          <div ref={contentRef} className="absolute inset-0 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 text-center">
            <h1 className="text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-6xl font-bold text-[#50488A] mb-4 sm:mb-6 md:mb-8 leading-tight max-w-[80%] sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
              Are you ready to start building your financial ladder?
            </h1>
            <button
              ref={buttonRef}
              onClick={handleGetStarted}
              disabled={isExiting}
              className="bg-[#50488A] hover:bg-black text-white px-5 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold text-xs sm:text-sm md:text-base transition-colors duration-200 shadow-lg hover:shadow-xl transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Let&apos;s get started!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}