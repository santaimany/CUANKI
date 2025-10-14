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
    <div className="bg-gradient-to-tl from-[#7971BC] to-[#373456] rounded-3xl p-8 mb-6 relative">
      {/* Edit Icon */}
      <button className="absolute top-6 right-6 w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>

      <div className="space-y-6">
        {/* Title */}
        <h2 className="text-white text-4xl font-bold">Goals utama kamu :</h2>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full h-8 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00F5A0] to-[#00D9D9] rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Goal Name & Amount */}
        <div className='flex justify-between'>
          <h3 className="text-white text-2xl font-semibold mb-2">{goalName}</h3>
          <p className="text-white/90 text-xl">
            Rp {currentAmount.toLocaleString('id-ID')}/Rp {(targetAmount / 1000).toFixed(0)}t
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoalHeader;
