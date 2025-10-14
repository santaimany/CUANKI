'use client';
import React from 'react';

interface GoalHeaderProps {
  goalName: string;
  currentAmount: number;
  targetAmount: number;
}

const GoalHeader: React.FC<GoalHeaderProps> = ({ goalName, currentAmount, targetAmount }) => {
  const percentage = Math.min((currentAmount / targetAmount) * 100, 100);

  return (
    <div className="bg-gradient-to-tl from-[#7971BC] to-[#373456] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 relative">
      {/* Edit Icon */}
      <button className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>

      <div className="space-y-3 sm:space-y-4 md:space-y-6">
        {/* Title */}
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold pr-12 sm:pr-14">Goals utama kamu :</h2>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full h-6 sm:h-7 md:h-8 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00F5A0] to-[#00D9D9] rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Goal Name & Amount */}
        <div className='flex flex-col sm:flex-row justify-between gap-2 sm:gap-4'>
          <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">{goalName}</h3>
          <p className="text-white/90 text-base sm:text-lg md:text-xl whitespace-nowrap">
            Rp {currentAmount.toLocaleString('id-ID')}/Rp {(targetAmount / 1000).toFixed(0)}t
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoalHeader;
