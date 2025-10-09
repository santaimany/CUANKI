'use client';

import React from 'react';

const AIReminder = () => {
  return (
    <div className="bg-gradient-to-br from-[#6B73FF] to-[#9C88FF] rounded-2xl p-6 text-white shadow-lg">
      {/* Header with AI Icon */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          {/* AI Sparkle Icon */}
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold">AI Reminder</h3>
      </div>

      {/* Message */}
      <p className="text-white/90 text-sm leading-relaxed mb-4">
        Halo! Jangan lupa catat pengeluaran kamu hari ini ya. Konsisten mencatat membantu kamu lebih aware dengan keuangan! 💪
      </p>

      {/* Action Button */}
      <button className="w-full bg-[#00F5A0] hover:bg-[#00D68F] text-[#363256] font-semibold py-3 px-4 rounded-full transition-colors duration-200 flex items-center justify-center gap-2">
        <span>Catat Sekarang</span>
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M13 7l5 5m0 0l-5 5m5-5H6" 
          />
        </svg>
      </button>
    </div>
  );
};

export default AIReminder;
