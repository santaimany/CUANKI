'use client';

import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { getAdvice, type AdviceResponse } from '@/lib/services/onboardingService';
import { queueNextTour } from '@/lib/tour/utils';

// Asumsi path import ini sudah benar
import CardKiri from '@/assets/getstarted/image/card-kiri.svg';
import CardTengah from '@/assets/getstarted/image/card-tengah.svg';
import CardKanan from '@/assets/getstarted/image/card-kanan.svg';

export default function OnboardingCompletePage() {
  const mainRef = useRef(null);
  const leftCardRef = useRef(null);
  const centerCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const textRef = useRef(null);
  
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [adviceData, setAdviceData] = useState<AdviceResponse | null>(null);
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(true);
  const [cardOrder, setCardOrder] = useState([0, 1, 2]); // Track card order: [left, center, right]
  const [isAnimating, setIsAnimating] = useState(false);

  const cardImages = [CardKiri, CardTengah, CardKanan];
  const cardAlts = ["Card Pattern Left", "Card Pattern Center", "Card Pattern Right"];

  const handleCardClick = (position: number) => {
    if (isAnimating) return;
    
    // If clicking center card, just flip it
    if (position === 1) {
      setFlippedCard(flippedCard === cardOrder[1] ? null : cardOrder[1]);
      return;
    }

    // Swap with center card
    setIsAnimating(true);
    
    const refs = [leftCardRef, centerCardRef, rightCardRef];
    const clickedCardEl = refs[position].current;
    const centerCardEl = refs[1].current;
    
    // Store which card will be in center after swap
    const cardMovingToCenter = cardOrder[position];

    const tl = gsap.timeline({
      onComplete: () => {
        // Update card order
        const newOrder = [...cardOrder];
        [newOrder[position], newOrder[1]] = [newOrder[1], newOrder[position]];
        setCardOrder(newOrder);
        setIsAnimating(false);
        
        // Reset transforms
        gsap.set([clickedCardEl, centerCardEl], { 
          x: 0, 
          y: 0,
          clearProps: 'all'
        });
        
        // Auto-flip the new center card
        setTimeout(() => {
          setFlippedCard(cardMovingToCenter);
        }, 100);
      }
    });

    // Unflip current center card first
    setFlippedCard(null);

    // Animate swap with smoother transitions
    tl.to([clickedCardEl, centerCardEl], {
      scale: 1,
      duration: 0.3,
      ease: 'power1.inOut'
    })
    .to(clickedCardEl, {
      x: position === 0 ? '20%' : '-5%',
      y: '-5%',
      rotation: 0,
      duration: 0.7,
      ease: 'power2.inOut'
    }, '-=0.2')
    .to(centerCardEl, {
      x: position === 0 ? '-85%' : '92%',
      y: '5%',
      rotation: position === 0 ? -17.5 : 17.5,
      scale: 0.9,
      duration: 0.7,
      ease: 'power2.inOut'
    }, '-=0.7')
    .to([clickedCardEl, centerCardEl], {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.2');
  };

  const handleToDashboard = () => {
    queueNextTour('dashboard-home');
    const win = (typeof globalThis === 'object' && 'window' in globalThis)
      ? (globalThis as typeof globalThis & { window?: Window }).window
      : undefined;

    win?.location.assign('/dashboard');
  };

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
        .from(centerCardRef.current, {
          autoAlpha: 0,
          scale: 0.5,
          duration: 0.8,
          ease: 'back.out(1.7)',
        })
        .from([leftCardRef.current, rightCardRef.current], {
          autoAlpha: 0,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 0.8,
          duration: 1.2,
          ease: 'power3.out',
        }, "-=0.6")
        .call(() => {
          setFlippedCard(1);
        }, undefined, "+=0.3")
        .from(textRef.current, {
          autoAlpha: 0,
          y: 30,
          duration: 0.6,
          ease: 'power2.out',
        }, "-=0.5");
      
    }, mainRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
      <div className="relative flex items-center justify-center w-full h-64 sm:h-72 md:h-96 lg:h-[500px] xl:h-[550px]">
        
        {/* Left Card */}
        <div 
          ref={leftCardRef} 
          onClick={() => handleCardClick(0)}
          className="absolute w-32 h-48 sm:w-40 sm:h-56 md:w-56 md:h-72 lg:w-72 lg:h-96 xl:w-80 xl:h-[450px] transform -rotate-[15deg] sm:-rotate-[20deg] -translate-x-16 sm:-translate-x-20 md:-translate-x-28 lg:-translate-x-80 xl:-translate-x-96 translate-y-4 sm:translate-y-6 md:translate-y-8 lg:translate-y-10 p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div 
            className="absolute inset-0"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: flippedCard === cardOrder[0] ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.8s'
            }}
          >
            <Image src={cardImages[cardOrder[0]]} alt={cardAlts[cardOrder[0]]} fill className="object-contain" />
          </div>
          <div 
            className="absolute inset-0 bg-gradient-to-br  from-[#00F5A0] to-[#00D9D9] rounded-2xl sm:rounded-3xl p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 overflow-auto flex flex-col"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: flippedCard === cardOrder[0] ? 'rotateY(0deg)' : 'rotateY(180deg)',
              transition: 'transform 0.8s'
            }}
          >
            <h3 className="text-[#363256] text-xs sm:text-sm md:text-base lg:text-xl justify-center xl:text-2xl font-bold mb-1 sm:mb-2 lg:mb-3">
              {isLoadingAdvice ? 'Loading...' : (adviceData?.cards?.[cardOrder[0]]?.title || 'AI Analytics')}
            </h3>
            <p className="text-[#363256] text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm leading-relaxed">
              {isLoadingAdvice ? 'Loading advice...' : (adviceData?.cards?.[cardOrder[0]]?.content || 'No advice available')}
            </p>
          </div>
        </div>

        {/* Center Card */}
        <div 
          ref={centerCardRef} 
          onClick={() => handleCardClick(1)}
          className="absolute z-10 w-36 h-52 sm:w-44 sm:h-60 md:w-60 md:h-80 lg:w-80 lg:h-[450px] xl:w-96 xl:h-[500px] transform scale-105 sm:scale-110 p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 shadow-black/20 cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div 
            className="absolute inset-0"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: flippedCard === cardOrder[1] ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.8s'
            }}
          >
            <Image src={cardImages[cardOrder[1]]} alt={cardAlts[cardOrder[1]]} fill className="object-contain" />
          </div>
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#00F5A0] to-[#00D9D9] rounded-2xl sm:rounded-3xl p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 overflow-auto flex flex-col"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: flippedCard === cardOrder[1] ? 'rotateY(0deg)' : 'rotateY(180deg)',
              transition: 'transform 0.8s'
            }}
          >
            <h3 className="text-[#363256] text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl font-bold mb-1 sm:mb-2 lg:mb-3">
              {isLoadingAdvice ? 'Loading...' : (adviceData?.cards?.[cardOrder[1]]?.title || 'Recommendations')}
            </h3>
            <p className="text-[#363256] text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm leading-relaxed">
              {isLoadingAdvice ? 'Loading recommendations...' : (adviceData?.cards?.[cardOrder[1]]?.content || 'No recommendations available')}
            </p>
          </div>
        </div>

        {/* Right Card */}
        <div 
          ref={rightCardRef} 
          onClick={() => handleCardClick(2)}
          className="absolute w-32 h-48 sm:w-40 sm:h-56 md:w-56 md:h-72 lg:w-72 lg:h-96 xl:w-80 xl:h-[450px] transform rotate-[15deg] sm:rotate-[20deg] translate-x-16 sm:translate-x-20 md:translate-x-28 lg:translate-x-80 xl:translate-x-96 translate-y-4 sm:translate-y-6 md:translate-y-8 lg:translate-y-10 p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div 
            className="absolute inset-0"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: flippedCard === cardOrder[2] ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              transition: 'transform 0.8s'
            }}
          >
            <Image src={cardImages[cardOrder[2]]} alt={cardAlts[cardOrder[2]]} fill className="object-contain" />
          </div>
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#00F5A0] to-[#00D9D9] rounded-2xl sm:rounded-3xl p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 overflow-auto flex flex-col"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: flippedCard === cardOrder[2] ? 'rotateY(0deg)' : 'rotateY(180deg)',
              transition: 'transform 0.8s'
            }}
          >
            <h3 className="text-[#363256] text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl font-bold mb-1 sm:mb-2 lg:mb-3">
              {isLoadingAdvice ? 'Loading...' : (adviceData?.cards?.[cardOrder[2]]?.title || 'Financial Summary')}
            </h3>
            <p className="text-[#363256] text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm leading-relaxed">
              {isLoadingAdvice ? 'Loading summary...' : (adviceData?.cards?.[cardOrder[2]]?.content || 'Complete your onboarding to get personalized financial insights!')}
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