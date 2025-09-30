'use client';

import React, { useLayoutEffect, useRef } from 'react'; // Ganti useEffect dengan useLayoutEffect
import Image from 'next/image';
import { gsap } from 'gsap';

// Asumsi path import ini sudah benar
import CardKiri from '@/assets/getstarted/image/card-kiri.svg';
import CardTengah from '@/assets/getstarted/image/card-tengah.svg';
import CardKanan from '@/assets/getstarted/image/card-kanan.svg';

export default function OnboardingCompletePage() {
  const mainRef = useRef(null); // Ref utama untuk context
  const leftCardRef = useRef(null);
  const centerCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const textRef = useRef(null);


  // Gunakan useLayoutEffect untuk animasi agar tidak ada "flicker"
  useLayoutEffect(() => {

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl
        // a. Munculkan kartu tengah
        .from(centerCardRef.current, {
          autoAlpha: 0,
          scale: 0.5,
          duration: 0.8,
          ease: 'back.out(1.7)',
        })
        // b. Munculkan kartu kiri & kanan dari tengah
        .from([leftCardRef.current, rightCardRef.current], {
          autoAlpha: 0,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 0.8,
          duration: 1.2,
          ease: 'power3.out',
        }, "-=0.6")
        // c. Munculkan teks
        .from(textRef.current, {
          autoAlpha: 0,
          y: 30,
          duration: 0.6,
          ease: 'power2.out',
        }, "-=0.8")
      
    }, mainRef); // Lingkupi context ke elemen utama


    return () => ctx.revert(); 
    
  }, []); // Hanya berjalan sekali saat komponen mount

  return (
    // Tambahkan ref utama di sini
    <div ref={mainRef} className="min-h-screen flex flex-col items-center justify-center p-6 gap-10 md:gap-12">
      <div className="relative flex items-center justify-center w-full h-72 md:h-96">
        <div ref={leftCardRef} className="absolute w-48 h-64 md:w-64 md:h-80 transform -rotate-[20deg] -translate-x-24 translate-y-8 md:-translate-x-66 p-4">
          <Image src={CardKiri} alt="Card Pattern Left" fill className="object-contain" />
        </div>
        <div ref={centerCardRef} className="absolute z-10 w-52 h-68 md:w-64 md:h-80 transform scale-110 p-4 shadow-black/20">
          <Image src={CardTengah} alt="Card Pattern Center" fill className="object-contain" />
        </div>
        <div ref={rightCardRef} className="absolute w-48 h-64 md:w-64 md:h-80 transform rotate-[20deg] translate-x-24 translate-y-8 md:translate-x-66 p-4">
          <Image src={CardKanan} alt="Card Pattern Right" fill className="object-contain" />
        </div>
      </div>

      <button  className="bg-[#00F5A0] text-[#363256] font-semibold px-20 py-4 rounded-xl text-base shadow-md transition transform hover:bg-white active:scale-95">
        To Dashboard
      </button>
      <h1 ref={textRef} className="text-[#0EFF95] text-2xl md:text-4xl font-semibold text-center max-w-lg leading-tight">
        Semua sudah siap, yuk kita mampir ke dashboard kamu!
      </h1>
    </div>
  );
}