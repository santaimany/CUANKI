"use client";

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-[#363256] to-[#50488A] flex items-center justify-center z-50">
      <div className="w-64 h-64">
        <DotLottieReact
          src="https://lottie.host/ac0ce15b-a6fc-4644-a2ae-5be8efcfb864/pVUhkciYuU.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
