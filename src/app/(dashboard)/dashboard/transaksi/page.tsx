'use client';

import React, { useState } from 'react';
import UserProfileHeader from '@/components/dashboard/UserProfile';
import AIReminder from '@/components/dashboard/AIReminder';
import TransactionSummary from '@/components/dashboard/transaksi/TransactionSummary';
import TransactionTabs from '@/components/dashboard/transaksi/TransactionTabs';
import SearchAndFilter from '@/components/dashboard/transaksi/SearchAndFilter';
import TransactionList from '@/components/dashboard/transaksi/TransactionList';
import MonthlyExpensesSummary from '@/components/dashboard/transaksi/MonthlyExpensesSummary';

const TransaksiPage = () => {
  const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 h-full pb-20 md:pb-0">
      {/* Left Section - Main Content (3 columns) */}
      <div className="lg:col-span-3 space-y-4 sm:space-y-6">
        {/* Transaction Summary Card */}
        <TransactionSummary />
        
        {/* Monthly Expenses Summary - Mobile only */}
        <div className="block lg:hidden">
          <MonthlyExpensesSummary />
        </div>
        
        {/* Tabs and Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <TransactionTabs onTabChange={setTransactionType} />
          <SearchAndFilter onSearch={setSearchQuery} />
        </div>
        {/* Transaction List */}
        <TransactionList filterType={transactionType} searchQuery={searchQuery} />
      </div> 
      <div className="hidden lg:flex lg:col-span-1 flex-col gap-6">
        <UserProfileHeader />
        <AIReminder page="transaction" />
        <MonthlyExpensesSummary />
      </div>
      
      {/* AI Reminder Floating Button - Mobile only */}
      <div className="block lg:hidden">
        <AIReminder page="transaction" isFloating={true} />
      </div>
    </div>
  );
};

export default TransaksiPage;
