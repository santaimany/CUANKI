'use client';
import React, { useState, useEffect } from 'react';
import { getMonthlyExpenses, updateMonthlyExpense, createMonthlyExpense } from '@/lib/services/dashboardService';
import { getExpenseCategories } from '@/lib/api/user';
import type { MonthlyExpenseItem, ExpenseCategory } from '@/types/api';
import { useToast } from '@/context/ToastContext';

interface MonthlyExpensesSummaryProps {
  onRefresh?: () => void;
}

const MonthlyExpensesSummary: React.FC<MonthlyExpensesSummaryProps> = () => {
  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<{ amount: number; note: string }>({ 
    amount: 0,
    note: ''
  });
  const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyExpenseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<{
    total_budget: number;
    total_used: number;
    total_remaining: number;
    month_name: string;
  } | null>(null);
  
  // State for add new expense modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    expense_category_id: 0,
    total_amount: 0,
    note: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const { showError, showSuccess } = useToast();

  // Fetch monthly expenses data
  useEffect(() => {
    const fetchMonthlyExpenses = async () => {
      setLoading(true);
      try {
        const response = await getMonthlyExpenses();
        setMonthlyExpenses(response.data.monthly_expenses);
        setSummary({
          total_budget: response.data.total_budget,
          total_used: response.data.total_used,
          total_remaining: response.data.total_remaining,
          month_name: response.data.month_name,
        });
      } catch (error) {
        console.error('Error fetching monthly expenses:', error);
        if (error instanceof Error) {
          showError(error.message);
        } else {
          showError('Gagal memuat pengeluaran bulanan');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyExpenses();
  }, [showError]);

  // Fetch expense categories when modal opens
  useEffect(() => {
    const fetchCategories = async () => {
      if (showAddModal) {
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

    fetchCategories();
  }, [showAddModal, showError]);

  const handleEditClick = (expense: MonthlyExpenseItem) => {
    setEditForm({
      amount: Number.parseInt(expense.total_amount),
      note: expense.note || '',
    });
    setEditingExpenseId(expense.id);
  };

  const handleSaveEdit = async () => {
    if (!editingExpenseId) return;
    
    if (editForm.amount > 0) {
      try {
        await updateMonthlyExpense(editingExpenseId, {
          total_amount: editForm.amount,
          note: editForm.note,
        });
        
        // Refresh data after update
        const response = await getMonthlyExpenses();
        setMonthlyExpenses(response.data.monthly_expenses);
        setSummary({
          total_budget: response.data.total_budget,
          total_used: response.data.total_used,
          total_remaining: response.data.total_remaining,
          month_name: response.data.month_name,
        });
        
        showSuccess('Pengeluaran berhasil diupdate!');
      } catch (error) {
        console.error('Error updating expense:', error);
        if (error instanceof Error) {
          showError(error.message);
        } else {
          showError('Gagal mengupdate pengeluaran');
        }
      }
    }
    setEditingExpenseId(null);
  };

  const handleAddExpense = async () => {
    if (!addForm.expense_category_id || addForm.total_amount <= 0) {
      showError('Mohon isi semua field dengan benar');
      return;
    }

    setIsSubmitting(true);
    try {
      await createMonthlyExpense({
        expense_category_id: addForm.expense_category_id,
        total_amount: addForm.total_amount,
        note: addForm.note
      });

      // Refresh data after adding
      const response = await getMonthlyExpenses();
      setMonthlyExpenses(response.data.monthly_expenses);
      setSummary({
        total_budget: response.data.total_budget,
        total_used: response.data.total_used,
        total_remaining: response.data.total_remaining,
        month_name: response.data.month_name,
      });

      // Reset form and close modal
      setAddForm({
        expense_category_id: 0,
        total_amount: 0,
        note: ''
      });
      setShowAddModal(false);
      showSuccess('Pengeluaran bulanan berhasil ditambahkan!');
    } catch (error) {
      console.error('Error adding expense:', error);
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('Gagal menambahkan pengeluaran bulanan');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6">
      <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">
        Pengeluaran Bulanan {summary ? `- ${summary.month_name}` : ''}
      </h3>
      
      {summary && (
        <div className="mb-4 p-4 bg-[#50488A] rounded-xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-white/70 text-xs">Total Budget</p>
              <p className="text-white font-semibold">Rp {summary.total_budget.toLocaleString('id-ID')}</p>
            </div>
            <div>
              <p className="text-white/70 text-xs">Terpakai</p>
              <p className="text-white font-semibold">Rp {summary.total_used.toLocaleString('id-ID')}</p>
            </div>
            <div>
              <p className="text-white/70 text-xs">Sisa</p>
              <p className="text-white font-semibold">Rp {summary.total_remaining.toLocaleString('id-ID')}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        {loading ? (
          <div className="text-white text-center">Loading...</div>
        ) : (
          monthlyExpenses.map((expense) => (
            <div 
              key={expense.id}
              className="bg-[#50488A] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 ease-in-out"
            >
            {/* Main Card - Clickable Header */}
            <button
              type="button"
              className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer text-left"
              onClick={() => handleEditClick(expense)}
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#7971BC] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-white font-medium text-sm sm:text-base truncate">{expense.category.name}</h4>
                  <p className="text-white/70 text-xs sm:text-sm truncate">{expense.formatted.total_amount}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-xs sm:text-sm">
                  {expense.usage_percentage}%
                </span>
                {expense.is_over_budget ? (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#00F5A0] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </button>

            {/* Accordion Content - Edit Form */}
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                editingExpenseId === expense.id 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-3 sm:pt-4 bg-[#7971BC]">
                <div className="space-y-3 sm:space-y-4">
                  <h5 className="text-white text-sm sm:text-base md:text-lg font-medium">Berapa yang kamu keluarkan?</h5>
                  
                  {/* Amount Input with underline */}
                  <div>
                    <input
                      type="text"
                      value={editForm.amount === 0 ? '' : editForm.amount.toLocaleString('id-ID')}
                      onChange={(e) => {
                        const numericValue = e.target.value.replaceAll(/\D/g, '');
                        setEditForm({ ...editForm, amount: Number(numericValue) });
                      }}
                      placeholder="200.000"
                      className="w-full bg-transparent border-b-2 border-white text-white text-lg sm:text-xl md:text-2xl font-light pb-2 focus:outline-none focus:border-[#00F5A0] placeholder-white/50"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingExpenseId(null);
                      }}
                      className="flex-1 bg-white/10 text-white font-medium py-2 sm:py-3 rounded-xl hover:bg-white/20 transition-colors text-xs sm:text-sm"
                    >
                      Batal
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveEdit();
                      }}
                      className="flex-1 bg-[#00F5A0] text-black font-medium py-2 sm:py-3 rounded-xl hover:bg-[#00E68F] transition-colors text-xs sm:text-sm"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))
        )}
      </div>
      
      {/* Add Button */}
      <button 
        onClick={() => setShowAddModal(true)}
        className="w-full bg-[#00F5A0] text-black font-bold py-3 sm:py-4 rounded-2xl sm:rounded-3xl border-b-2 border-white hover:bg-[#00E68F] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        <span>Atur Pengeluaran Bulanan</span>
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Add New Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#3D3B7A] rounded-2xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-white text-xl font-semibold mb-6">Tambah Pengeluaran Bulanan</h3>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAddExpense(); }}>
                {/* Category Selection */}
                <div>
                  <label htmlFor="category-select" className="block text-white text-sm font-medium mb-2">
                    Kategori Pengeluaran
                  </label>
                  <select
                    id="category-select"
                    value={addForm.expense_category_id || ''}
                    onChange={(e) => setAddForm({ ...addForm, expense_category_id: Number(e.target.value) })}
                    className="w-full bg-[#50488A] text-white p-3 rounded-xl border border-white/20 focus:outline-none focus:border-[#00F5A0]"
                    required
                    disabled={loadingCategories}
                  >
                    <option value="">
                      {loadingCategories ? 'Loading...' : 'Pilih Kategori'}
                    </option>
                    {expenseCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount Input */}
                <div>
                  <label htmlFor="amount" className="block text-white text-sm font-medium mb-2">
                    Jumlah Budget
                  </label>
                  <input
                    id="amount"
                    type="text"
                    value={addForm.total_amount === 0 ? '' : addForm.total_amount.toLocaleString('id-ID')}
                    onChange={(e) => {
                      const numericValue = e.target.value.replaceAll(/\D/g, '');
                      setAddForm({ ...addForm, total_amount: Number(numericValue) });
                    }}
                    placeholder="500.000"
                    className="w-full bg-[#50488A] text-white p-3 rounded-xl border border-white/20 focus:outline-none focus:border-[#00F5A0]"
                    required
                  />
                </div>

                {/* Note Input */}
                <div>
                  <label htmlFor="note" className="block text-white text-sm font-medium mb-2">
                    Catatan
                  </label>
                  <textarea
                    id="note"
                    value={addForm.note}
                    onChange={(e) => setAddForm({ ...addForm, note: e.target.value })}
                    placeholder="Catatan tambahan (opsional)"
                    className="w-full bg-[#50488A] text-white p-3 rounded-xl border border-white/20 focus:outline-none focus:border-[#00F5A0] resize-none"
                    rows={3}
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setAddForm({
                        expense_category_id: 0,
                        total_amount: 0,
                        note: ''
                      });
                    }}
                    className="flex-1 bg-white/10 text-white font-medium py-3 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#00F5A0] text-black font-medium py-3 rounded-xl hover:bg-[#00E68F] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyExpensesSummary;
