'use client';
import React from 'react';
import { Goal } from '@/lib/services/goalsService';

interface GoalListProps {
  goals?: Goal[];
  onRefresh?: () => void;
  onEdit?: (goal: Goal) => void;
  onDelete?: (goal: Goal) => void;
}

const GoalList: React.FC<GoalListProps> = ({ 
  goals = [], 
  onRefresh, 
  onEdit, 
  onDelete 
}) => {
  if (goals.length === 0) {
    return (
      <div className="bg-[#7971BC] rounded-2xl sm:rounded-3xl p-8 text-center">
        <p className="text-white/70 text-lg">Belum ada goals</p>
        {onRefresh && (
          <button 
            onClick={onRefresh}
            className="mt-4 bg-[#00F5A0] text-[#363256] px-4 py-2 rounded-lg font-medium hover:bg-[#00e68f] transition-colors"
          >
            Refresh
          </button>
        )}
      </div>
    );
  }

  const getIconForGoalType = (goalName: string) => {
    const name = goalName.toLowerCase();
    if (name.includes('emergency') || name.includes('darurat')) {
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
        
        // Format data safely in case formatted object is missing
        const formatCurrency = (amount: number | string) => {
          const numAmount = typeof amount === 'string' ? Number.parseFloat(amount) : amount;
          return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(numAmount);
        };

        const formatDate = (dateString: string) => {
          try {
            return new Date(dateString).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            });
          } catch {
            return dateString;
          }
        };

        const getStatus = () => {
          if (goal.is_achieved) return 'Tercapai';
          if (goal.is_overdue) return 'Terlambat';
          if (goal.days_remaining <= 7) return 'Mendekati deadline';
          return 'Dalam progress';
        };

        const currentAmount = Number.parseFloat(goal.current_amount);
        const progressText = `${formatCurrency(currentAmount)} / ${formatCurrency(goal.target_amount)}`;
        const progressPercentage = `${percentage.toFixed(1)}%`;
        const targetDeadline = formatDate(goal.target_deadline);
        const status = getStatus();

        return (
          <div
            key={`${goal.id}-${index}`}
            className="bg-[#7971BC] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                {/* Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#50488A] rounded-full flex items-center justify-center flex-shrink-0">
                  {getIconForGoalType(goal.goal_name)}
                </div>

                {/* Name & Target Date */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold truncate">
                    {goal.goal_name}
                  </h3>
                  {goal.target_deadline && (
                    <p className="text-white/80 text-xs sm:text-sm md:text-base">
                      Target: {targetDeadline}
                    </p>
                  )}
                  <p className="text-white/60 text-xs sm:text-sm">
                    {status}
                  </p>
                </div>
              </div>

              {/* Amount & Actions */}
              <div className="text-left sm:text-right w-full sm:w-auto flex-shrink-0">
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1">
                  {progressText}
                </p>
                <p className="text-[#00F5A0] text-xs sm:text-sm font-medium mb-3">
                  {progressPercentage}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(goal)}
                      className="bg-[#6B73FF] text-white p-2.5 rounded-lg hover:bg-[#5A63E6] hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg group"
                      title="Edit Goal"
                    >
                      <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(goal)}
                      className="bg-red-500 text-white p-2.5 rounded-lg hover:bg-red-600 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg group"
                      title="Hapus Goal"
                    >
                      <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-3 sm:h-3.5 md:h-4 bg-white/30 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#00F5A0] rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* Additional Info */}
            <div className="mt-3 text-white/80 text-xs sm:text-sm">
              {goal.remaining_amount > 0 && (
                <p>Sisa: {goal.formatted.remaining_amount || `Rp ${goal.remaining_amount.toLocaleString('id-ID')}`}</p>
              )}
              {goal.days_remaining > 0 && (
                <p>Hari tersisa: {Math.ceil(goal.days_remaining)} hari</p>
              )}
              {goal.is_achieved && (
                <p className="text-[#00F5A0] font-medium">✅ Goal tercapai!</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GoalList;
