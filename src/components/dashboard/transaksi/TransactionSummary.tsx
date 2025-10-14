'use client';
import React, { useState } from 'react';
import AddTransactionModal, { TransactionFormData } from './AddTransactionModal';

interface TransactionSummaryProps {
  income?: number;
  expense?: number;
  onAddTransaction?: (data: TransactionFormData, type: 'income' | 'expense') => void;
}

const TransactionSummary: React.FC<TransactionSummaryProps> = ({
  income = 60000,
  expense = 70000,
  onAddTransaction,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'income' | 'expense'>('income');

  const handleOpenModal = (type: 'income' | 'expense') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: TransactionFormData) => {
    if (onAddTransaction) {
      onAddTransaction(data, modalType);
    }
    console.log('Transaction added:', { ...data, type: modalType });
  };
  return (
    <>
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        onSubmit={handleSubmit}
      />

      <div className="bg-gradient-to-tl from-[#7971BC]  to-[#373456] rounded-2xl p-6 text-white">
        <h2 className="text-6xl font-semibold mb-6">Transaksi anda hari ini:</h2>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#00F5A0] to-[#00E68F] h-3 rounded-full transition-all duration-300"
              style={{ width: `${(income / (income + expense)) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Amount Display */}
        <div className="text-right mb-6">
          <span className="text-2xl font-bold">Rp {income.toLocaleString('id-ID')}/Rp {expense.toLocaleString('id-ID')}</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-4 text-2xl">
          <button 
            onClick={() => handleOpenModal('income')}
            className="bg-gradient-to-r from-[#A3FFD6] to-[#0EFF95] border-b-2 border-white cursor-pointer text-black font-semibold py-4 px-6 rounded-3xl hover:bg-[#00E68F] transition-colors"
          >
            + pendapatan
          </button>
          <button 
            onClick={() => handleOpenModal('expense')}
            className="bg-[#DF4000] text-white font-semibold py-4 px-6 rounded-3xl hover:bg-[#FF5530] transition-colors border-b-2 border-white cursor-pointer"
          >
            - pengeluaran
          </button>
        </div>
      </div>
    </>
  );
};

export default TransactionSummary;
