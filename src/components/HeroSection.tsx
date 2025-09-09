'use client'

import React from 'react';
import Image from 'next/image';

import heroImage from '@/assets/landingpage/image/image-kiri.svg'; 

const HeroSection = () => {
  return (
  
    <section className="bg-gradient-to-r from-[#363256] to-[#50488A] min-h-screen w-full overflow-hidden relative">
      
      <div className="absolute top-0 left-0 h-full w-1/2 hidden lg:flex items-center justify-center">
        <div className="transform scale-110 lg:scale-110 lg:-translate-x-12 xl:-translate-x-20">
          <Image
            src={heroImage}
            alt="Smart Financial Solution"
            width={800} 
            height={800} 
            className="w-full h-auto drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      <div className="w-full min-h-screen flex items-center justify-center lg:justify-end">
      
        <div className="relative z-10 text-white flex flex-col items-start lg:items-end w-full lg:w-1/2 px-8 lg:px-0 lg:-translate-x-16 xl:-translate-x-24">
          
          <div className="flex flex-col items-start lg:items-end" style={{ gap: 'clamp(1.5rem, 4vh, 2.5rem)' }}>
            
            <button 
              className="border border-[#0EFF95] text-[#0EFF95] font-semibold rounded-full hover:bg-[#0EFF95] hover:text-[#363256] transition-colors duration-300"
              style={{
                fontSize: 'clamp(1.25rem, 4vw, 1.875rem)',
                padding: 'clamp(0.5rem, 2vh, 0.75rem) clamp(1.5rem, 5vw, 2.5rem)',
              }}
            >
              Register
            </button>
            
            <h1 
              className="leading-tight text-left lg:text-right"
              style={{ fontSize: 'clamp(2.75rem, 10vw, 7rem)' }}
            >
              <span className="text-[#0EFF95] font-bold">Smart</span> <span className="font-bold">solution</span>
              <br />
              for your smart
              <br />
              <span className="text-[#0EFF95] font-bold">financial</span>
            </h1>
            
            <p 
              className="leading-relaxed max-w-xl text-left lg:text-right"
              style={{ fontSize: 'clamp(1.125rem, 4vw, 2.25rem)' }}
            >
              Exposing your inventory to incidents is a thing of the past.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;