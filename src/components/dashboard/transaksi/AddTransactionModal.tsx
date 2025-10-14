'use client';

import React, { useState } from 'react';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'income' | 'expense';
  onSubmit: (data: TransactionFormData) => void;
}

export interface TransactionFormData {
  date: string;
  category?: string;
  amount: number;
  notes: string;
  source: string;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  type,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    date: new Date().toISOString().split('T')[0],
    category: '',
    amount: 0,
    notes: '',
    source: '',
  });

  const expenseCategories = [
    'Makanan',
    'Transportasi',
    'Hiburan',
    'Belanja',
    'Tagihan',
    'Kesehatan',
    'Pendidikan',
    'Lainnya',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: '',
      amount: 0,
      notes: '',
      source: '',
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[#5B4E96] rounded-3xl p-6 w-full max-w-sm shadow-2xl"
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
              className="w-full bg-white rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#00F5A0] cursor-pointer"
            />
          </div>

          {/* Category - Only for Expense */}
          {type === 'expense' && (
            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-white rounded-xl px-4 py-3 pr-16 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#00F5A0] appearance-none"
                required
              >
                <option value="">Makanan</option>
                {expenseCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
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
            className="w-full bg-white rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#00F5A0]"
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
            className="w-full bg-white rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#00F5A0]"
            required
          />

          {/* Source */}
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="BCA - Kebutuhan"
            className="w-full bg-white rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#00F5A0]"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#00F5A0] hover:bg-[#00E68F] text-[#363256] font-bold text-base py-3 px-6 rounded-full transition-colors mt-4"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
