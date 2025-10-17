'use client';

import React, { useState, useEffect } from 'react';
import { getExpenseCategories } from '@/lib/api/user';
import { ExpenseCategory } from '@/types/api';
import { useToast } from '@/context/ToastContext';
import { getUserAccounts, addExpense, addIncome } from '@/lib/services/dashboardService';
import type { UserAccount } from '@/types/api';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'income' | 'expense';
  onSubmit?: () => void; // Optional callback after successful submission
}

export interface TransactionFormData {
  date: string;
  categoryId?: number;
  amount: number;
  notes: string;
  accountAllocationId: number;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  type,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    date: new Date().toISOString().split('T')[0],
    categoryId: undefined,
    amount: 0,
    notes: '',
    accountAllocationId: 0,
  });

  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([]);
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    if (isOpen) {
      // Fetch user accounts
      const fetchUserAccounts = async () => {
        setLoadingAccounts(true);
        try {
          const accountsResponse = await getUserAccounts();
          setUserAccounts(accountsResponse.data.accounts);
        } catch (error) {
          console.error('Error fetching user accounts:', error);
          showError('Gagal memuat akun pengguna');
        } finally {
          setLoadingAccounts(false);
        }
      };

      // Fetch expense categories if needed
      const fetchCategories = async () => {
        if (type === 'expense') {
          setLoadingCategories(true);
          try {
            const categories = await getExpenseCategories();
            setExpenseCategories(categories);
          } catch (error) {
            console.error('Error fetching categories:', error);
            showError('Gagal memuat kategori pengeluaran');
          } finally {
            setLoadingCategories(false);
          }
        }
      };

      fetchUserAccounts();
      fetchCategories();
    }
  }, [isOpen, type, showError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.amount || formData.amount <= 0) {
      showError('Jumlah harus lebih besar dari 0');
      return;
    }
    
    if (!formData.notes.trim()) {
      showError('Deskripsi tidak boleh kosong');
      return;
    }
    
    if (!formData.accountAllocationId || formData.accountAllocationId === 0) {
      showError('Pilih akun terlebih dahulu');
      return;
    }
    
    if (type === 'expense' && !formData.categoryId) {
      showError('Kategori harus dipilih');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (type === 'expense') {
        await addExpense({
          tanggal: formData.date,
          total: formData.amount,
          notes: formData.notes,
          kategori: formData.categoryId!,
          bank_allocation_id: formData.accountAllocationId,
        });
      } else {
        await addIncome({
          tanggal: formData.date,
          total: formData.amount,
          notes: formData.notes,
          bank_allocation_id: formData.accountAllocationId,
        });
      }
      
      showSuccess(`${type === 'income' ? 'Pendapatan' : 'Pengeluaran'} berhasil ditambahkan`);
      
      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        categoryId: undefined,
        amount: 0,
        notes: '',
        accountAllocationId: 0,
      });
      
      // Call optional callback
      if (onSubmit) {
        onSubmit();
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving transaction:', error);
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('Gagal menyimpan transaksi');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'amount') {
      setFormData(prev => ({
        ...prev,
        amount: Number.parseFloat(value) || 0,
      }));
    } else if (name === 'notes') {
      setFormData(prev => ({
        ...prev,
        notes: value,
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[#5B4E96] rounded-3xl p-4 sm:p-6 w-full max-w-sm shadow-2xl 
                   max-h-[90vh] overflow-y-auto modal-content
                   mx-auto my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center mb-4">
          <button
            onClick={onClose}
            className="text-white hover:text-white/80 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-white text-xl font-semibold ml-4">
            {type === 'income' ? 'Pendapatan' : 'Pengeluaran'}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Date */}
          <div className="relative">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  date: e.target.value,
                }));
              }}
              className="w-full bg-white rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00F5A0] cursor-pointer mobile-input
                         [&::-webkit-datetime-edit]:text-gray-800
                         [&::-webkit-datetime-edit-fields-wrapper]:text-gray-800
                         [&::-webkit-datetime-edit-text]:text-gray-800
                         [&::-webkit-datetime-edit-month-field]:text-gray-800
                         [&::-webkit-datetime-edit-day-field]:text-gray-800
                         [&::-webkit-datetime-edit-year-field]:text-gray-800
                         [&::-webkit-calendar-picker-indicator]:opacity-60
                         [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />
          </div>

          {/* Category - Only for Expense */}
          {type === 'expense' && (
            <div className="relative">
              <select
                name="categoryId"
                value={formData.categoryId || ''}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    categoryId: e.target.value ? Number(e.target.value) : undefined
                  }));
                }}
                className="w-full bg-white rounded-xl px-4 py-3 pr-16 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00F5A0] mobile-input"
                required
                disabled={loadingCategories}
              >
                <option value="">
                  {loadingCategories ? 'Loading...' : 'Pilih Kategori'}
                </option>
                {expenseCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {/* Edit Icon */}
              <div className="absolute right-10 top-1/2 -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
              {/* Dropdown Icon - Hidden but functional */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}

          {/* Amount */}
          <input
            type="number"
            name="amount"
            value={formData.amount || ''}
            onChange={handleChange}
            placeholder="Rp 10.000,00"
            className="w-full bg-white rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00F5A0] mobile-input"
            required
            min="0"
            step="0.01"
          />

          {/* Notes */}
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder={type === 'income' ? 'Minggu 1' : 'Deskripsi'}
            className="w-full bg-white rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00F5A0] mobile-input"
            required
          />

          {/* Account Selection */}
          <div className="relative">
            <select
              name="accountAllocationId"
              value={formData.accountAllocationId || ''}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  accountAllocationId: Number(e.target.value) || 0
                }));
              }}
              className="w-full bg-white rounded-xl px-4 py-3 pr-16 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00F5A0] mobile-input"
              required
              disabled={loadingAccounts}
            >
              <option value="">
                {loadingAccounts ? 'Loading...' : 'Pilih Akun'}
              </option>
              {userAccounts.map((account) => (
                <option key={account.account_allocation_id} value={account.account_allocation_id}>
                  {account.label} - {account.formatted_balance}
                </option>
              ))}
            </select>
            {/* Edit Icon */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2">
              <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
            {/* Dropdown Icon - Hidden but functional */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || loadingCategories || loadingAccounts}
            className="w-full bg-[#00F5A0] hover:bg-[#00E68F] text-[#363256] font-bold text-base py-3 px-6 rounded-full transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
