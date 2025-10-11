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
    <div className="space-y-4">
      {displaySavings.map((saving) => {
        const percentage = calculatePercentage(saving.current, saving.target);
        
        return (
          <div
            key={saving.id}
            className="bg-gradient-to-br from-[#7971BC] to-[#6B5CE7] rounded-3xl p-6 shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#5A4FCF] rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4.586A2 2 0 003.414 12L7 15.586V17a1 1 0 102 0v-1.586l3.586-3.586A2 2 0 0014 10.586V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white text-2xl font-bold">{saving.name}</h3>
                  <p className="text-white/80 text-base">{saving.source}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-white text-xl font-bold">
                  Rp {saving.current.toLocaleString('id-ID')}/Rp {formatTarget(saving.target)}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-4 bg-white/30 rounded-full overflow-hidden">
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
