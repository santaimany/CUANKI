'use client';
import React from 'react';

interface GoalItemProps {
  id: string;
  name: string;
  target: number;
  targetDate: string;
  currentAmount: number;
  icon?: string;
}

interface GoalListProps {
  goals?: GoalItemProps[];
}

const GoalList: React.FC<GoalListProps> = ({ goals }) => {
  const defaultGoals: GoalItemProps[] = [
    {
      id: '1',
      name: 'Beli motor W175',
      target: 60000,
      targetDate: '10 November 2026',
      currentAmount: 60000,
    },
  ];

  const displayGoals = goals || defaultGoals;

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
      {displayGoals.map((goal) => {
        const percentage = calculatePercentage(goal.currentAmount, goal.target);

        return (
          <div
            key={goal.id}
            className="bg-[#7971BC] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                {/* Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#50488A] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                </div>

                {/* Name & Target Date */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold truncate">{goal.name}</h3>
                  <p className="text-white/80 text-xs sm:text-sm md:text-base">Target : {goal.targetDate}</p>
                </div>
              </div>

              {/* Amount */}
              <div className="text-left sm:text-right w-full sm:w-auto flex-shrink-0">
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                  Rp {goal.currentAmount.toLocaleString('id-ID')}/Rp {formatTarget(goal.target)}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
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

export default GoalList;
