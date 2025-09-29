'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import CardKiri from '@/assets/getstarted/image/card-kiri.svg';
import CardTengah from '@/assets/getstarted/image/card-tengah.svg';
import CardKanan from '@/assets/getstarted/image/card-kanan.svg';
import OnboardingBackgroundLayout from '@/components/onboarding/OnboardingBackgroundLayout';

export default function GetStartedPage() {
  const router = useRouter();
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef = useRef<HTMLDivElement | null>(null);
  const centerCardRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    gsap.set([leftCardRef.current, rightCardRef.current], { x: 0, opacity: 0, scale: 0.8 });
    gsap.set(centerCardRef.current, { scale: 0, opacity: 0 });
    gsap.set(contentRef.current, { opacity: 0, y: 30 });

    tl.to(centerCardRef.current, { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' })
      .to([leftCardRef.current, rightCardRef.current], { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .to(leftCardRef.current, { x: '-50vw', duration: 0.8, ease: 'power3.out' }, '-=0.2')
      .to(rightCardRef.current, { x: '50vw', duration: 0.8, ease: 'power3.out' }, '-=0.8')
      .to(contentRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');

    return () => {
      // ensure we don't return tl.kill() (which returns the timeline) as effect cleanup
      tl.kill();
    };
  }, []);

  const handleGetStarted = () => router.push('/onboarding');

  return (
    <OnboardingBackgroundLayout>
      {/* decorative background cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div ref={leftCardRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[55vh] md:w-[500px] md:h-[70vh] lg:w-[600px] lg:h-[75vh]">
          <Image src={CardKiri} alt="Left decorative" fill className="object-contain" />
        </div>
        <div ref={rightCardRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[55vh] md:w-[550px] md:h-[70vh] lg:w-[700px] lg:h-[75vh]">
          <Image src={CardKanan} alt="Right decorative" fill className="object-contain" />
        </div>
      </div>

      {/* main content */}
      <div className="relative z-20 w-full flex items-center justify-center">
        <div ref={centerCardRef} className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl h-[100vh] flex items-center justify-center">
          <Image src={CardTengah} alt="Center card" fill className="object-contain" />

          <div ref={contentRef} className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-6xl font-bold text-[#50488A] mb-4 sm:mb-6 md:mb-8 leading-tight max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              Are you ready to start building your financial ladder?
            </h1>

            <button onClick={handleGetStarted} className="bg-[#50488A] hover:bg-[#2A2442] text-white px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              Let&apos;s get started!
            </button>
          </div>
        </div>
      </div>
    </OnboardingBackgroundLayout>
  );
}