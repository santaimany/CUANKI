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
  // Format current date as DD/MM/YYYY for display
  const formatDateForDisplay = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleDateString('id-ID', { month: 'long' });
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [formData, setFormData] = useState<TransactionFormData>({
    date: new Date().toISOString().split('T')[0],
    category: '',
    amount: 0,
    notes: '',
    source: '',
  });

  const [displayDate, setDisplayDate] = useState(formatDateForDisplay(new Date()));

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
    
    if (name === 'date') {
      const selectedDate = new Date(value);
      setDisplayDate(formatDateForDisplay(selectedDate));
    }
    
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
        className="bg-gradient-to-br from-[#6B5CE7] to-[#5A4FCF] rounded-3xl p-8 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={onClose}
            className="text-white hover:text-white/80 transition-colors mr-4"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-white text-3xl font-bold">
            {type === 'income' ? 'Pendapatan' : 'Pengeluaran'}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date */}
          <div>
            <label className="text-white/70 text-sm mb-2 block">Tanggal</label>
            <div className="relative">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-white rounded-2xl px-4 py-4 text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-[#00F5A0] [&::-webkit-calendar-picker-indicator]:hidden"
                required
              />
              <div className="absolute inset-0 px-4 py-4 pointer-events-none text-gray-800 text-lg">
                {displayDate}
              </div>
            </div>
          </div>

          {/* Category - Only for Expense */}
          {type === 'expense' && (
            <div>
              <label className="text-white/70 text-sm mb-2 block">Kategori</label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-white rounded-2xl px-4 py-4 pr-20 text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-[#00F5A0] appearance-none"
                  required
                >
                  <option value="">Pilih kategori</option>
                  {expenseCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {/* Edit Icon */}
                <div className="absolute right-12 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
                {/* Dropdown Icon */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Amount */}
          <div>
            <label className="text-white/70 text-sm mb-2 block">Total</label>
            <input
              type="number"
              name="amount"
              value={formData.amount || ''}
              onChange={handleChange}
              placeholder="Rp 10.000,00"
              className="w-full bg-white rounded-2xl px-4 py-4 text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-[#00F5A0]"
              required
              min="0"
              step="0.01"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="text-white/70 text-sm mb-2 block">Notes</label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder={type === 'income' ? 'Minggu 1' : 'Deskripsi transaksi'}
              className="w-full bg-white rounded-2xl px-4 py-4 text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-[#00F5A0]"
              required
            />
          </div>

          {/* Source */}
          <div>
            <label className="text-white/70 text-sm mb-2 block">Asal</label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              placeholder="BCA - Kebutuhan"
              className="w-full bg-white rounded-2xl px-4 py-4 text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-[#00F5A0]"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#00F5A0] hover:bg-[#00E68F] text-[#363256] font-bold text-xl py-4 px-6 rounded-full transition-colors mt-6"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
