'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CuankiLogo from '@/assets/landingpage/logo/cuanki-logo-white.svg';

const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

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

    // Auto-hide after 2.5 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
      
      // Complete hide after fade animation
      setTimeout(() => {
        handleContinue();
      }, 300);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    localStorage.setItem('hasSeenSplash', 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-[#363256] to-[#50488A] transition-opacity duration-300 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Logo Container - Simple centered */}
      <div className="flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-8 animate-pulse">
          <Image
            src={CuankiLogo}
            alt="Cuanki"
            width={192}
            height={192}
            className="w-full h-full object-contain filter drop-shadow-lg"
            priority
          />
        </div>

        {/* App Name */}
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide drop-shadow-lg">
          Cuanki
        </h1>

        {/* Loading indicator */}
        <div className="mt-8 flex space-x-2">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
