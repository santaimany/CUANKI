'use client';
import React from 'react';
import { Goal } from '@/types/api';

interface GoalListProps {
  goals?: Goal[];
}

const GoalList: React.FC<GoalListProps> = ({ goals = [] }) => {
  if (goals.length === 0) {
    return (
      <div className="bg-[#7971BC] rounded-2xl sm:rounded-3xl p-8 text-center">
        <p className="text-white/70 text-lg">Belum ada goals</p>
      </div>
    );
  }

  const getIconForGoalType = (type: string) => {
    if (type === 'emergency') {
      return (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
      </svg>
    );
  };

  return (
    <div className="space-y-4">
      {goals.map((goal, index) => {
        const percentage = goal.progress_percentage || 0;

        return (
          <div
            key={`${goal.type}-${index}`}
            className="bg-[#7971BC] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                {/* Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#50488A] rounded-full flex items-center justify-center flex-shrink-0">
                  {getIconForGoalType(goal.type)}
                </div>

                {/* Name & Target Date */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold truncate">
                    {goal.goal_name}
                  </h3>
                  {goal.target_date && (
                    <p className="text-white/80 text-xs sm:text-sm md:text-base">
                      Target : {goal.formatted?.target_date || goal.target_date}
                    </p>
                  )}
                </div>
              </div>

              {/* Amount */}
              <div className="text-left sm:text-right w-full sm:w-auto flex-shrink-0">
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                  {goal.formatted?.current_amount || `Rp ${goal.current_amount?.toLocaleString('id-ID')}`}/
                  {goal.formatted?.target_amount || `Rp ${goal.target_amount?.toLocaleString('id-ID')}`}
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

            {/* Additional Info for Saving Goals */}
            {goal.type === 'saving' && goal.monthly_saving_needed && (
              <div className="mt-3 text-white/80 text-xs sm:text-sm">
                <p>Menabung per bulan: {goal.formatted?.monthly_saving_needed}</p>
                {goal.days_remaining && (
                  <p>Sisa waktu: {goal.formatted?.days_remaining}</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GoalList;
