'use client';

import React, { useLayoutEffect, useRef, useState } from 'react'; // Ganti useEffect dengan useLayoutEffect
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
  
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const handleCardClick = (cardIndex: number) => {
    if (flippedCard === cardIndex) {
      setFlippedCard(null);
    } else {
      setFlippedCard(cardIndex);
    }
  };


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
  
    <div ref={mainRef} className="min-h-screen flex flex-col items-center justify-center p-6 gap-10 md:gap-12">
      <div className="relative flex items-center justify-center w-full h-72 md:h-96">
        {/* Left Card */}
        <div 
          ref={leftCardRef} 
          onClick={() => handleCardClick(0)}
          className="absolute w-48 h-64 md:w-64 md:h-80 transform -rotate-[20deg] -translate-x-24 translate-y-8 md:-translate-x-66 p-4 cursor-pointer"
          style={{ 
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Front Face */}
          <div 
            className="absolute inset-0"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: flippedCard === 0 ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.8s'
            }}
          >
            <Image src={CardKiri} alt="Card Pattern Left" fill className="object-contain" />
          </div>
          {/* Back Face */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#00F5A0] to-[#00D9D9] rounded-3xl p-4 overflow-auto flex flex-col"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: flippedCard === 0 ? 'rotateY(0deg)' : 'rotateY(180deg)',
              transition: 'transform 0.8s'
            }}
          >
            <h3 className="text-[#363256] text-base md:text-xl font-bold mb-2">AI Analytics</h3>
            <p className="text-[#363256] text-[10px] md:text-xs leading-relaxed">
              Oke, jadi dengan budget Rp 120.000, hal yang paling urgent kamu prioritaskan untuk 3 minggu pertama terlebih dahulu adalah transportasi (80.000), baru sisanya untuk makan (40.000). Mungkin kamu juga bisa makan lebih hemat (cari warteg, masak sendiri, dll). Dengan pengeluaran tersebut, target yang kamu bisa capai dalam 3 minggu adalah Rp 33.000, mengingat lifestyle kamu yang ketat.
            </p>
          </div>
        </div>

        {/* Center Card */}
        <div 
          ref={centerCardRef} 
          onClick={() => handleCardClick(1)}
          className="absolute z-10 w-52 h-68 md:w-64 md:h-80 transform scale-110 p-4 shadow-black/20 cursor-pointer"
          style={{ 
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Front Face */}
          <div 
            className="absolute inset-0"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: flippedCard === 1 ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.8s'
            }}
          >
            <Image src={CardTengah} alt="Card Pattern Center" fill className="object-contain" />
          </div>
          {/* Back Face */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#00F5A0] to-[#00D9D9] rounded-3xl p-4 overflow-auto flex flex-col"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: flippedCard === 1 ? 'rotateY(0deg)' : 'rotateY(180deg)',
              transition: 'transform 0.8s'
            }}
          >
            <h3 className="text-[#363256] text-base md:text-xl font-bold mb-2">AI Analytics</h3>
            <p className="text-[#363256] text-[10px] md:text-xs leading-relaxed">
              Analisis menunjukkan pola pengeluaran yang efisien. Dengan manajemen yang baik, kamu bisa menghemat lebih banyak untuk masa depan dan mencapai target finansial lebih cepat.
            </p>
          </div>
        </div>

        {/* Right Card */}
        <div 
          ref={rightCardRef} 
          onClick={() => handleCardClick(2)}
          className="absolute w-48 h-64 md:w-64 md:h-80 transform rotate-[20deg] translate-x-24 translate-y-8 md:translate-x-66 p-4 cursor-pointer"
          style={{ 
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Front Face */}
          <div 
            className="absolute inset-0"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: flippedCard === 2 ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.8s'
            }}
          >
            <Image src={CardKanan} alt="Card Pattern Right" fill className="object-contain" />
          </div>
          {/* Back Face */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#00F5A0] to-[#00D9D9] rounded-3xl p-4 overflow-auto flex flex-col"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: flippedCard === 2 ? 'rotateY(0deg)' : 'rotateY(180deg)',
              transition: 'transform 0.8s'
            }}
          >
            <h3 className="text-[#363256] text-base md:text-xl font-bold mb-2">AI Analytics</h3>
            <p className="text-[#363256] text-[10px] md:text-xs leading-relaxed">
              Rekomendasi fokus pada investasi jangka panjang. Pertimbangkan untuk mulai berinvestasi sejak dini untuk keuntungan maksimal di masa depan.
            </p>
          </div>
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