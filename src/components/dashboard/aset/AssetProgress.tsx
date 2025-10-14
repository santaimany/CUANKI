'use client';
import React from 'react';

interface SavingGoal {
  id: string;
  name: string;
  source: string;
  current: number;
  target: number;
  icon?: string;
}

interface AssetProgressProps {
  savings?: SavingGoal[];
}

const AssetProgress: React.FC<AssetProgressProps> = ({ savings }) => {
  const defaultSavings: SavingGoal[] = [
    {
      id: '1',
      name: 'Tabungan',
      source: 'From BSI',
      current: 60000,
      target: 150000,
    },
  ];

  const displaySavings = savings || defaultSavings;

  const calculatePercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatTarget = (target: number) => {
    if (target >= 1000) {
      return `${(target / 1000).toFixed(0)}t`;
    }
    return target.toLocaleString('id-ID');
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {displaySavings.map((saving) => {
        const percentage = calculatePercentage(saving.current, saving.target);
        
        return (
          <div
            key={saving.id}
            className="bg-[#7971BC] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#50488A] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4.586A2 2 0 003.414 12L7 15.586V17a1 1 0 102 0v-1.586l3.586-3.586A2 2 0 0014 10.586V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold truncate">{saving.name}</h3>
                  <p className="text-white/80 text-xs sm:text-sm md:text-base truncate">{saving.source}</p>
                </div>
              </div>
              
              <div className="text-left sm:text-right">
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                  Rp {saving.current.toLocaleString('id-ID')}/Rp {formatTarget(saving.target)}
                </p>
              </div>
            </div>

            <div className="relative w-full h-3 sm:h-3.5 md:h-4 bg-white/30 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#00F5A0] rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AssetProgress;
