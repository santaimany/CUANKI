'use client';

import React, { useState } from 'react';
import UserProfileHeader from '@/components/dashboard/UserProfile';
import AIReminder from '@/components/dashboard/transaksi/AIReminder';
import TransactionSummary from '@/components/dashboard/transaksi/TransactionSummary';
import TransactionTabs from '@/components/dashboard/transaksi/TransactionTabs';
import SearchAndFilter from '@/components/dashboard/transaksi/SearchAndFilter';
import TransactionList from '@/components/dashboard/transaksi/TransactionList';
import MonthlyExpensesSummary from '@/components/dashboard/transaksi/MonthlyExpensesSummary';

const TransaksiPage = () => {
  const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
      {/* Left Section - Main Content (3 columns) */}
      <div className="lg:col-span-3 space-y-6">
        {/* Transaction Summary Card */}
        <TransactionSummary />
        {/* Tabs and Search */}
        <div className="flex items-center justify-between">
          <TransactionTabs onTabChange={setTransactionType} />
          <SearchAndFilter />
        </div>
        {/* Transaction List */}
        <TransactionList filterType={transactionType} />
      </div> 
      <div className="lg:col-span-1 flex flex-col gap-6">
        <UserProfileHeader />
        <AIReminder />
        <MonthlyExpensesSummary />
      </div>
    </div>
  );
};

export default TransaksiPage;
