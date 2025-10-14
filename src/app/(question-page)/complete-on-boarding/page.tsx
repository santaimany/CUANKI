'use client';

import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { setOnboardingCompleted } from '@/lib/utils/auth';
import { getAdvice, type AdviceResponse } from '@/lib/services/onboardingService';

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
  const [adviceData, setAdviceData] = useState<AdviceResponse | null>(null);
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(true);

  const handleCardClick = (cardIndex: number) => {
    if (flippedCard === cardIndex) {
      setFlippedCard(null);
    } else {
      setFlippedCard(cardIndex);
    }
  };

  const handleToDashboard = () => {
    // Set flag onboarding completed
    setOnboardingCompleted(true);
    // Redirect ke dashboard/homepage
    window.location.href = '/';
  };

  // Fetch advice saat component mount
  useEffect(() => {
    async function fetchAdvice() {
      try {
        const response = await getAdvice();
        console.log('🎯 Advice Response:', response);
        console.log('📊 Cards:', response.cards);
        setAdviceData(response);
      } catch (error) {
        console.error('❌ Error fetching advice:', error);
      } finally {
        setIsLoadingAdvice(false);
      }
    }
    fetchAdvice();
  }, []);

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
  
    <div ref={mainRef} className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
      <div className="relative flex items-center justify-center w-full h-64 sm:h-72 md:h-96">
      
        <div 
          ref={leftCardRef} 
          onClick={() => handleCardClick(0)}
          className="absolute w-32 h-48 sm:w-40 sm:h-56 md:w-48 md:h-64 lg:w-64 lg:h-80 transform -rotate-[15deg] sm:-rotate-[20deg] -translate-x-16 sm:-translate-x-20 md:-translate-x-24 lg:-translate-x-66 translate-y-4 sm:translate-y-6 md:translate-y-8 p-2 sm:p-3 md:p-4 cursor-pointer"
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
            className="absolute inset-0 bg-gradient-to-br from-[#00F5A0] to-[#00D9D9] rounded-2xl sm:rounded-3xl p-2 sm:p-3 md:p-4 overflow-auto flex flex-col"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: flippedCard === 0 ? 'rotateY(0deg)' : 'rotateY(180deg)',
              transition: 'transform 0.8s'
            }}
          >
            <h3 className="text-[#363256] text-xs sm:text-sm md:text-base lg:text-xl font-bold mb-1 sm:mb-2">
              {isLoadingAdvice ? 'Loading...' : (adviceData?.cards?.[0]?.title || 'AI Analytics')}
            </h3>
            <p className="text-[#363256] text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs leading-relaxed">
              {isLoadingAdvice ? 'Loading advice...' : (adviceData?.cards?.[0]?.content || 'No advice available')}
            </p>
          </div>
        </div>

        {/* Center Card */}
        <div 
          ref={centerCardRef} 
          onClick={() => handleCardClick(1)}
          className="absolute z-10 w-36 h-52 sm:w-44 sm:h-60 md:w-52 md:h-68 lg:w-64 lg:h-80 transform scale-105 sm:scale-110 p-2 sm:p-3 md:p-4 shadow-black/20 cursor-pointer"
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
            className="absolute inset-0 bg-gradient-to-br from-[#00F5A0] to-[#00D9D9] rounded-2xl sm:rounded-3xl p-2 sm:p-3 md:p-4 overflow-auto flex flex-col"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: flippedCard === 1 ? 'rotateY(0deg)' : 'rotateY(180deg)',
              transition: 'transform 0.8s'
            }}
          >
            <h3 className="text-[#363256] text-xs sm:text-sm md:text-base lg:text-xl font-bold mb-1 sm:mb-2">
              {isLoadingAdvice ? 'Loading...' : (adviceData?.cards?.[1]?.title || 'Recommendations')}
            </h3>
            <p className="text-[#363256] text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs leading-relaxed">
              {isLoadingAdvice ? 'Loading recommendations...' : (adviceData?.cards?.[1]?.content || 'No recommendations available')}
            </p>
          </div>
        </div>

        {/* Right Card */}
        <div 
          ref={rightCardRef} 
          onClick={() => handleCardClick(2)}
          className="absolute w-32 h-48 sm:w-40 sm:h-56 md:w-48 md:h-64 lg:w-64 lg:h-80 transform rotate-[15deg] sm:rotate-[20deg] translate-x-16 sm:translate-x-20 md:translate-x-24 lg:translate-x-66 translate-y-4 sm:translate-y-6 md:translate-y-8 p-2 sm:p-3 md:p-4 cursor-pointer"
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
            className="absolute inset-0 bg-gradient-to-br from-[#00F5A0] to-[#00D9D9] rounded-2xl sm:rounded-3xl p-2 sm:p-3 md:p-4 overflow-auto flex flex-col"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: flippedCard === 2 ? 'rotateY(0deg)' : 'rotateY(180deg)',
              transition: 'transform 0.8s'
            }}
          >
            <h3 className="text-[#363256] text-xs sm:text-sm md:text-base lg:text-xl font-bold mb-1 sm:mb-2">
              {isLoadingAdvice ? 'Loading...' : (adviceData?.cards?.[2]?.title || 'Financial Summary')}
            </h3>
            <p className="text-[#363256] text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs leading-relaxed">
              {isLoadingAdvice ? 'Loading summary...' : (adviceData?.cards?.[2]?.content || 'Complete your onboarding to get personalized financial insights!')}
            </p>
          </div>
        </div>
      </div>

      <button 
        onClick={handleToDashboard}
        className="bg-[#00F5A0] text-[#363256] font-semibold px-8 sm:px-12 md:px-16 lg:px-20 py-3 sm:py-3.5 md:py-4 rounded-xl text-sm sm:text-base shadow-md transition transform hover:bg-white active:scale-95"
      >
        To Dashboard
      </button>
      <h1 ref={textRef} className="text-[#0EFF95] text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold text-center max-w-xs sm:max-w-md md:max-w-lg leading-tight px-4">
        Semua sudah siap, yuk kita mampir ke dashboard kamu!
      </h1>
    </div>
  );
}