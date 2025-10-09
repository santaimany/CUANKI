'use client';
import React from 'react';

interface TransactionSummaryProps {
  income?: number;
  expense?: number;
}

const TransactionSummary: React.FC<TransactionSummaryProps> = ({
  income = 60000,
  expense = 70000,
}) => {
  return (
    <div className="bg-gradient-to-br from-[#6B73FF] to-[#9C88FF] rounded-2xl p-6 text-white">
      <h2 className="text-2xl font-semibold mb-6">Transaksi anda hari ini:</h2>
      
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
        <span className="text-lg">Rp {income.toLocaleString('id-ID')}/Rp {expense.toLocaleString('id-ID')}</span>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="flex-1 bg-[#00F5A0] text-black font-semibold py-3 px-6 rounded-full hover:bg-[#00E68F] transition-colors">
          + pendapatan
        </button>
        <button className="flex-1 bg-[#FF6B47] text-white font-semibold py-3 px-6 rounded-full hover:bg-[#FF5530] transition-colors">
          - pengeluaran
        </button>
      </div>
    </div>
  );
};

export default TransactionSummary;
