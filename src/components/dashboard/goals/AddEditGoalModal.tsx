'use client';
import React, { useState, useEffect } from 'react';
import { Goal, CreateGoalRequest, UpdateGoalRequest } from '@/lib/services/goalsService';
import { getSavingsAllocation, type AvailableAllocation } from '@/lib/services/bankService';

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
    account_allocation_id: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingAllocationId, setLoadingAllocationId] = useState(false);
  const [allocationDetails, setAllocationDetails] = useState<AvailableAllocation | null>(null);

  const isEditMode = !!editGoal;

  // Fetch savings allocation when modal opens for add mode
  useEffect(() => {
    const fetchAllocationDetails = async () => {
      if (!isEditMode && isOpen) {
        setLoadingAllocationId(true);
        try {
          const allocation = await getSavingsAllocation();
          if (allocation) {
            setAllocationDetails(allocation);
            setFormData(prev => ({ ...prev, account_allocation_id: allocation.allocation_id }));
          } else {
            setAllocationDetails(null);
            setErrors(prev => ({ 
              ...prev, 
              account_allocation_id: 'Tidak ada rekening tabungan ditemukan. Silakan tambahkan rekening tabungan terlebih dahulu.' 
            }));
          }
        } catch (error) {
          console.error('Error fetching allocation details:', error);
          setAllocationDetails(null);
          setErrors(prev => ({ 
            ...prev, 
            account_allocation_id: 'Gagal mengambil data rekening tabungan' 
          }));
        } finally {
          setLoadingAllocationId(false);
        }
      }
    };

    if (isEditMode && editGoal) {
      setFormData({
        goal_name: editGoal.goal_name,
        target_amount: editGoal.target_amount.toString(),
        target_deadline: editGoal.target_deadline || '',
        account_allocation_id: editGoal.account_info.allocation_id
      });
      setErrors({});
      setAllocationDetails(null);
    } else if (isOpen) {
      setFormData({
        goal_name: '',
        target_amount: '',
        target_deadline: '',
        account_allocation_id: 0
      });
      setErrors({});
      setAllocationDetails(null);
      fetchAllocationDetails();
    }
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
      console.error('Error saving goal:', error);
      // Error will be handled by parent component
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Format number to currency string (1.000.000)
  const formatCurrency = (value: string): string => {
    // Remove non-numeric characters
    const numericValue = value.replaceAll(/\D/g, '');
    
    if (!numericValue) return '';
    
    // Format with thousand separators
    return new Intl.NumberFormat('id-ID').format(Number(numericValue));
  };

  // Handle currency input change
  const handleCurrencyChange = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replaceAll(/\D/g, '');
    
    // Update form data with numeric value
    setFormData(prev => ({ ...prev, target_amount: numericValue }));
    
    // Clear error if exists
    if (errors.target_amount) {
      setErrors(prev => ({ ...prev, target_amount: '' }));
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
              Target Amount *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 font-medium">
                Rp
              </span>
              <input
                id="target_amount"
                type="text"
                inputMode="numeric"
                value={formatCurrency(formData.target_amount)}
                onChange={(e) => handleCurrencyChange(e.target.value)}
                className="w-full bg-[#4A4462] text-white rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00F5A0] border border-white/10"
                placeholder="8.000.000"
                disabled={isLoading || loadingAllocationId}
              />
            </div>
            {errors.target_amount && (
              <p className="text-red-400 text-xs mt-1">{errors.target_amount}</p>
            )}
            {formData.target_amount && (
              <p className="text-white/40 text-xs mt-1">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0,
                }).format(Number(formData.target_amount))}
              </p>
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

          {/* Account Allocation Info - Only for Add Mode */}
          {!isEditMode && (
            <div>
              <div className="block text-white text-sm font-medium mb-2">
                Rekening Tujuan
              </div>
              <div className="w-full bg-[#4A4462] rounded-xl px-4 py-3 border border-white/10">
                {(() => {
                  if (loadingAllocationId) {
                    return (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#00F5A0]"></div>
                        <span className="text-white/60">Memuat rekening tabungan...</span>
                      </div>
                    );
                  }
                  
                  if (allocationDetails && formData.account_allocation_id > 0) {
                    return (
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-[#00F5A0] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">{allocationDetails.bank_name}</p>
                            <p className="text-white/60 text-sm">{allocationDetails.type}</p>
                            <p className="text-[#00F5A0] text-sm font-medium mt-1">
                              Saldo: {allocationDetails.formatted_balance}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  
                  return (
                    <div className="text-center py-2">
                      <span className="text-white/60">Tidak ada rekening tabungan</span>
                    </div>
                  );
                })()}
              </div>
              {errors.account_allocation_id && (
                <p className="text-red-400 text-xs mt-1">{errors.account_allocation_id}</p>
              )}
              <p className="text-white/40 text-xs mt-1">
                Goal akan otomatis terhubung dengan rekening tabungan Anda
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/10 text-white font-medium py-3 rounded-xl hover:bg-white/20 transition-colors"
              disabled={isLoading || loadingAllocationId}
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#00F5A0] text-[#363256] font-bold py-3 rounded-xl hover:bg-[#00e68f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || loadingAllocationId || (!isEditMode && formData.account_allocation_id === 0)}
            >
              {(() => {
                if (isLoading) return 'Menyimpan...';
                if (loadingAllocationId) return 'Memuat...';
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