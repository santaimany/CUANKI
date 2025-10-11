'use client';
import React, { useState } from 'react';

interface TransactionTabsProps {
  onTabChange?: (tab: 'expense' | 'income') => void;
}

const TransactionTabs: React.FC<TransactionTabsProps> = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');

  const handleTabClick = (tab: 'expense' | 'income') => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={() => handleTabClick('expense')}
        className={`px-8 py-3 rounded-full font-semibold text-2xl transition-all duration-200 ${
          activeTab === 'expense'
            ? 'bg-[#50488A] text-white shadow-lg'
            : 'bg-transparent text-white/70 hover:text-white'
        }`}
      >
        Pengeluaran
      </button>
      <button
        onClick={() => handleTabClick('income')}
        className={`px-8 py-3 rounded-full font-semibold text-2xl transition-all duration-200 ${
          activeTab === 'income'
            ? 'bg-[#50488A] text-white shadow-lg'
            : 'bg-transparent text-white/70 hover:text-white'
        }`}
      >
        Pendapatan
      </button>
    </div>
  );
};

export default TransactionTabs;
