'use client';
import React from 'react';
import { Goal } from '@/lib/services/goalsService';

interface DeleteConfirmModalProps {
  goal: Goal | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  goal,
  isOpen,
  onClose,
  onConfirm,
  isLoading = false
}) => {
  if (!isOpen || !goal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#363256] rounded-3xl w-full max-w-sm">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h2 className="text-white text-xl font-bold mb-2">Hapus Goal</h2>
          <p className="text-white/70 text-sm mb-4">
            Apakah Anda yakin ingin menghapus goal ini?
          </p>
          
          {/* Goal Info */}
          <div className="bg-[#4A4462] rounded-xl p-4 mb-6">
            <h3 className="text-white font-bold text-lg mb-2">{goal.goal_name}</h3>
            <p className="text-white/60 text-sm mb-1">Target: {goal.formatted.target_amount}</p>
            <p className="text-white/60 text-sm">Progress: {goal.formatted.progress_percentage}</p>
          </div>
          
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
            <p className="text-red-400 text-xs">
              ⚠️ Tindakan ini tidak dapat dibatalkan. Semua data terkait goal ini akan dihapus secara permanen.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="p-6 pt-0 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-white/10 text-white font-medium py-3 rounded-xl hover:bg-white/20 transition-colors"
            disabled={isLoading}
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Menghapus...' : 'Hapus Goal'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;