'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CuankiLogo from '@/assets/landingpage/logo/cuanki-logo-white.svg';

const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Check for testing parameter
    const urlParams = new URLSearchParams(globalThis.location?.search);
    const showSplash = urlParams.get('splash') === 'true';
    
    // Detect if app is running as PWA
    const isPWAMode = globalThis.matchMedia('(display-mode: standalone)').matches || 
                     (globalThis.navigator as Navigator & { standalone?: boolean }).standalone === true ||
                     document.referrer.includes('android-app://');

    // Show splash screen for PWA mode OR testing mode
    if (!isPWAMode && !showSplash) {
      return;
    }

    // Check if user has seen splash before (skip for testing)
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    if (hasSeenSplash && !showSplash) {
      return;
    }

    // Show splash screen
    setIsVisible(true);

    // Animation sequence
    const timer = setTimeout(() => {
      setIsAnimating(false);
      
      // Auto-hide after animation for PWA
      const redirectTimer = setTimeout(() => {
        handleContinue();
      }, 2500);

      return () => clearTimeout(redirectTimer);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    localStorage.setItem('hasSeenSplash', 'true');
    setIsVisible(false);
  };

  const handleSkip = () => {
    handleContinue();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#6B5DD6] via-[#6F64A7] to-[#50488A] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#00F5A0]/20 rounded-full blur-lg"></div>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-8 right-8 text-white/60 hover:text-white text-sm font-medium transition-colors z-10"
      >
        Skip
      </button>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-full px-8 text-center">
        {/* Logo Container */}
        <div 
          className={`relative mb-12 transition-all duration-1500 ease-out ${
            isAnimating 
              ? 'scale-75 opacity-0 translate-y-8' 
              : 'scale-100 opacity-100 translate-y-0'
          }`}
        >
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 bg-[#00F5A0]/10 rounded-full blur-2xl animate-pulse"></div>
            
            {/* Inner Glow Ring */}
            <div className="absolute inset-4 bg-[#00F5A0]/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            
            {/* Logo Background Circle */}
            <div className="absolute inset-8 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"></div>
            
            {/* Logo */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={CuankiLogo}
                alt="Cuanki Logo"
                width={140}
                height={140}
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 filter drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div 
          className={`transition-all duration-1500 delay-500 ease-out ${
            isAnimating 
              ? 'opacity-0 translate-y-8' 
              : 'opacity-100 translate-y-0'
          }`}
        >
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-wide drop-shadow-lg">
            Cuanki
          </h1>
          <p className="text-white/90 text-lg sm:text-xl md:text-2xl mb-12 max-w-lg leading-relaxed font-light">
            Kelola keuangan pribadi Anda dengan mudah dan cerdas
          </p>
        </div>

        {/* CTA Button */}
        <div 
          className={`transition-all duration-1500 delay-1000 ease-out ${
            isAnimating 
              ? 'opacity-0 translate-y-8' 
              : 'opacity-100 translate-y-0'
          }`}
        >
          <button
            onClick={handleContinue}
            className="bg-[#00F5A0] hover:bg-[#00E090] text-[#363256] font-bold px-12 py-4 sm:px-14 sm:py-5 rounded-2xl text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-[#00F5A0]/25 border border-[#00F5A0]/20"
          >
            Mulai Sekarang
          </button>
          
          {/* Small helper text */}
          <p className="text-white/60 text-sm mt-4">
            Tap untuk melanjutkan
          </p>
        </div>

        {/* Loading Indicator */}
        <div 
          className={`mt-12 transition-all duration-1500 delay-1200 ease-out ${
            isAnimating 
              ? 'opacity-0' 
              : 'opacity-100'
          }`}
        >
          <div className="flex space-x-3">
            <div className="w-3 h-3 bg-[#00F5A0]/80 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-[#00F5A0]/60 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-[#00F5A0]/40 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#50488A] to-transparent"></div>
    </div>
  );
};

export default SplashScreen;
