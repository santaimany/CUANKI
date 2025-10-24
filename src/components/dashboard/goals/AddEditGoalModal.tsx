'use client';
import React, { useState, useEffect } from 'react';
import { Goal, CreateGoalRequest, UpdateGoalRequest } from '@/lib/services/goalsService';

interface AddEditGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goalData: CreateGoalRequest | UpdateGoalRequest) => Promise<void>;
  editGoal?: Goal | null;
  isLoading?: boolean;
}

const AddEditGoalModal: React.FC<AddEditGoalModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editGoal,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    goal_name: '',
    target_amount: '',
    target_deadline: '',
    account_allocation_id: 1
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditMode = !!editGoal;

  useEffect(() => {
    if (isEditMode && editGoal) {
      setFormData({
        goal_name: editGoal.goal_name,
        target_amount: editGoal.target_amount.toString(),
        target_deadline: editGoal.target_deadline || '',
        account_allocation_id: editGoal.account_info.allocation_id
      });
    } else {
      setFormData({
        goal_name: '',
        target_amount: '',
        target_deadline: '',
        account_allocation_id: 1
      });
    }
    setErrors({});
  }, [isEditMode, editGoal, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.goal_name.trim()) {
      newErrors.goal_name = 'Nama goal harus diisi';
    }

    if (!formData.target_amount.trim()) {
      newErrors.target_amount = 'Target amount harus diisi';
    } else if (Number.isNaN(Number(formData.target_amount)) || Number(formData.target_amount) <= 0) {
      newErrors.target_amount = 'Target amount harus berupa angka positif';
    }

    if (!isEditMode && !formData.account_allocation_id) {
      newErrors.account_allocation_id = 'Account allocation harus dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const goalData = {
        goal_name: formData.goal_name.trim(),
        target_amount: Number(formData.target_amount),
        target_deadline: formData.target_deadline || '',
        ...(isEditMode ? {} : { account_allocation_id: formData.account_allocation_id })
      };

      await onSave(goalData);
      onClose();
    } catch (error) {

    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#363256] rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-white text-xl font-bold">
              {isEditMode ? 'Edit Goal' : 'Tambah Goal Baru'}
            </h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
              disabled={isLoading}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Goal Name */}
          <div>
            <label htmlFor="goal_name" className="block text-white text-sm font-medium mb-2">
              Nama Goal *
            </label>
            <input
              id="goal_name"
              type="text"
              value={formData.goal_name}
              onChange={(e) => handleChange('goal_name', e.target.value)}
              className="w-full bg-[#4A4462] text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00F5A0] border border-white/10"
              placeholder="Contoh: iPhone 15, Liburan Bali"
              disabled={isLoading}
            />
            {errors.goal_name && (
              <p className="text-red-400 text-xs mt-1">{errors.goal_name}</p>
            )}
          </div>

          {/* Target Amount */}
          <div>
            <label htmlFor="target_amount" className="block text-white text-sm font-medium mb-2">
              Target Amount (Rp) *
            </label>
            <input
              id="target_amount"
              type="number"
              value={formData.target_amount}
              onChange={(e) => handleChange('target_amount', e.target.value)}
              className="w-full bg-[#4A4462] text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00F5A0] border border-white/10"
              placeholder="8000000"
              min="1"
              disabled={isLoading}
            />
            {errors.target_amount && (
              <p className="text-red-400 text-xs mt-1">{errors.target_amount}</p>
            )}
          </div>

          {/* Target Deadline */}
          <div>
            <label htmlFor="target_deadline" className="block text-white text-sm font-medium mb-2">
              Target Deadline (Opsional)
            </label>
            <input
              id="target_deadline"
              type="date"
              value={formData.target_deadline}
              onChange={(e) => handleChange('target_deadline', e.target.value)}
              className="w-full bg-[#4A4462] text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00F5A0] border border-white/10"
              disabled={isLoading}
              style={{ colorScheme: 'dark' }}
            />
          </div>

          {/* Account Allocation - Only for Add Mode */}
          {!isEditMode && (
            <div>
              <label htmlFor="account_allocation_id" className="block text-white text-sm font-medium mb-2">
                Account Allocation *
              </label>
              <select
                id="account_allocation_id"
                value={formData.account_allocation_id}
                onChange={(e) => handleChange('account_allocation_id', Number(e.target.value))}
                className="w-full bg-[#4A4462] text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00F5A0] border border-white/10"
                disabled={isLoading}
              >
                <option value={1}>Kebutuhan</option>
                <option value={2}>Keinginan</option>
                <option value={3}>Tabungan</option>
                <option value={4}>Investasi</option>
                <option value={5}>Dana Darurat</option>
              </select>
              {errors.account_allocation_id && (
                <p className="text-red-400 text-xs mt-1">{errors.account_allocation_id}</p>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/10 text-white font-medium py-3 rounded-xl hover:bg-white/20 transition-colors"
              disabled={isLoading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#00F5A0] text-[#363256] font-bold py-3 rounded-xl hover:bg-[#00e68f] transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {(() => {
                if (isLoading) return 'Menyimpan...';
                if (isEditMode) return 'Update';
                return 'Simpan';
              })()}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditGoalModal;