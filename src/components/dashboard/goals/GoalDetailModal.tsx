'use client';
import React, { useState } from 'react';
import { Goal } from '@/lib/services/goalsService';

interface GoalDetailModalProps {
  goal: Goal | null;
  isOpen: boolean;
  onClose: () => void;
}

const GoalDetailModal: React.FC<GoalDetailModalProps> = ({ goal, isOpen, onClose }) => {
  if (!isOpen || !goal) return null;

  const progressPercentage = goal.progress_percentage || 0;

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
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getStatus = () => {
    if (goal.is_achieved) return 'Tercapai ✅';
    if (goal.is_overdue) return 'Terlambat ⚠️';
    if (goal.days_remaining <= 7) return 'Mendekati deadline ⏰';
    return 'Dalam progress 📈';
  };

  const currentAmount = Number.parseFloat(goal.current_amount);
  const progressText = `${formatCurrency(currentAmount)} / ${formatCurrency(goal.target_amount)}`;
  const progressPercentageText = `${progressPercentage.toFixed(1)}%`;
  const targetDeadline = formatDate(goal.target_deadline);
  const status = getStatus();
  const targetAmountFormatted = formatCurrency(goal.target_amount);
  const currentAmountFormatted = formatCurrency(currentAmount);
  const remainingAmountFormatted = goal.remaining_amount ? formatCurrency(goal.remaining_amount) : null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#363256] rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-xl font-bold">Detail Goal</h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Goal Name */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-2">{goal.goal_name}</h3>
            <p className="text-white/60 text-sm">{status}</p>
          </div>

          {/* Progress Section */}
          <div className="bg-[#4A4462] rounded-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white/80 text-sm">Progress</span>
              <span className="text-[#00F5A0] font-bold">{progressPercentageText}</span>
            </div>
            
            <div className="relative w-full h-4 bg-white/20 rounded-full overflow-hidden mb-3">
              <div
                className="absolute top-0 left-0 h-full bg-[#00F5A0] rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            
            <p className="text-white text-lg font-bold text-center">
              {progressText}
            </p>
          </div>

          {/* Financial Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#4A4462] rounded-xl p-3">
              <p className="text-white/60 text-xs mb-1">Target Amount</p>
              <p className="text-white font-bold">{targetAmountFormatted}</p>
            </div>
            <div className="bg-[#4A4462] rounded-xl p-3">
              <p className="text-white/60 text-xs mb-1">Current Amount</p>
              <p className="text-white font-bold">{currentAmountFormatted}</p>
            </div>
            {remainingAmountFormatted && (
              <div className="bg-[#4A4462] rounded-xl p-3">
                <p className="text-white/60 text-xs mb-1">Remaining</p>
                <p className="text-white font-bold">{remainingAmountFormatted}</p>
              </div>
            )}
            {goal.target_deadline && (
              <div className="bg-[#4A4462] rounded-xl p-3">
                <p className="text-white/60 text-xs mb-1">Target Date</p>
                <p className="text-white font-bold">{targetDeadline}</p>
              </div>
            )}
          </div>

          {/* Time Information */}
          {goal.days_remaining > 0 && (
            <div className="bg-[#4A4462] rounded-xl p-4">
              <p className="text-white/60 text-sm mb-1">Waktu Tersisa</p>
              <p className="text-white text-lg font-bold">
                {Math.ceil(goal.days_remaining)} hari
              </p>
            </div>
          )}

          {/* Account Information */}
          {goal.account_info && (
            <div className="bg-[#4A4462] rounded-xl p-4">
              <p className="text-white/60 text-sm mb-2">Account Information</p>
              <div className="space-y-1">
                <p className="text-white font-medium">{goal.account_info.bank_name}</p>
                {goal.account_info.account_name && (
                  <p className="text-white/80 text-sm">{goal.account_info.account_name}</p>
                )}
                <p className="text-white/60 text-xs">
                  {goal.account_info.allocation_type} • ID: {goal.account_info.allocation_id}
                </p>
                {goal.account_info.current_balance && (
                  <p className="text-[#00F5A0] text-sm font-medium">
                    Balance: Rp {parseFloat(goal.account_info.current_balance).toLocaleString('id-ID')}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Achievement Status */}
          {goal.is_achieved && (
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-center">
              <div className="text-green-400 text-4xl mb-2">🎉</div>
              <p className="text-green-400 font-bold">Goal Tercapai!</p>
              <p className="text-white/60 text-sm">Selamat! Anda telah mencapai target ini.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full bg-[#00F5A0] text-[#363256] font-bold py-3 rounded-xl hover:bg-[#00e68f] transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalDetailModal;