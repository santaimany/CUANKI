'use client';

import React from 'react';

const AIReminder = () => {
  return (
    
    <div className="bg-[#50488A] rounded-2xl">

      <div className="flex items-center bg-[#0EFF95] p-4 rounded-2xl gap-3  ">
        <div className="flex items-center justify-center flex-2 ">

        <div className="w-10 h-auto text-[#50488A]  rounded-full items-center ">
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
        <h3 className="text-xl text-[#50488A]  font-bold">AI Reminder</h3>

        </div>
      </div>

    <div className=" bg-[#50488A] rounded-xl p-6 text-white shadow-lg">
      <p className="text-white/90 text-md text-right leading-relaxed mb-4">
        Halo! Jangan lupa catat pengeluaran kamu hari ini ya. Konsisten mencatat membantu kamu lebih aware dengan keuangan! 💪
      </p>
    </div>
    </div>
    
    
  );
};

export default AIReminder;
