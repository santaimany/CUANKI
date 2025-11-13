'use client';
import React from 'react';
import type { DisplayTransaction } from '@/types/transaction'; // Asumsi Anda punya file /types/transactions.ts

interface TransactionItemProps {
  transaction: DisplayTransaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { category, description, amount, time, source } = transaction;
  const isExpense = amount < 0;
  const displayCategory = category || 'Tanpa kategori';
  const displaySource = source ? `From ${source}` : 'Sumber tidak diketahui';

  return (
    <div className="bg-[#7971BC] rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 hover:bg-[#6B5CE7]/40 transition-colors">
 
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/10 rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-white font-semibold text-sm sm:text-base md:text-lg lg:text-xl truncate">{displayCategory}</h4>
          <p className="text-white/70 text-xs sm:text-sm md:text-base lg:text-lg truncate">{description}</p>
       
        </div>
      </div>

  
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 sm:gap-0 w-full sm:w-auto">
        <div className="text-white text-xs sm:text-sm md:text-base sm:mb-10 lg:text-xl sm:mr-5">
          {time}
        </div>
        <div className="text-left sm:text-right">
       
          <div className="flex bg-white rounded-full p-1.5 sm:p-2 items-center justify-center gap-1 sm:gap-2">
            <span className={`text-xs sm:text-sm md:text-base lg:text-xl font-bold ${
              isExpense ? 'text-[#FF6B47]' : 'text-[#00F5A0]'
            }`}>
              {isExpense ? '-' : '+'}Rp {Math.abs(amount).toLocaleString('id-ID')}
            </span>
          </div>
          
          <div className="text-white/50 text-xs sm:text-sm md:text-base lg:text-lg mt-1 truncate">{displaySource}</div>
        </div>
        
      </div>
    </div>
  );
};

export default TransactionItem;