'use client';

import React, { useState, useEffect } from 'react';
import UserProfileHeader from '@/components/dashboard/UserProfile';
import AIReminder from '@/components/dashboard/AIReminder';
import TransactionSummary from '@/components/dashboard/transaksi/TransactionSummary';
import TransactionTabs from '@/components/dashboard/transaksi/TransactionTabs';
import SearchAndFilter from '@/components/dashboard/transaksi/SearchAndFilter';
import TransactionList from '@/components/dashboard/transaksi/TransactionList';
import MonthlyExpensesSummary from '@/components/dashboard/transaksi/MonthlyExpensesSummary';
import LoadingScreen from '@/components/commons/LoadingScreen';
import { GreetingUsersResponse, UserProfileResponse } from '@/types/api';
import { getUserGreeting, getUserProfile } from '@/lib/api/user';
import { useToast } from '@/context/ToastContext';
import TourAnchor from '@/components/tour/TourAnchor';

const TransaksiPage = () => {
  const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshKey, setRefreshKey] = useState(0); // Key untuk trigger refresh
  const [userData, setUserData] = useState<GreetingUsersResponse | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { showError } = useToast();

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [greetingData, profileData] = await Promise.all([
          getUserGreeting(),
          getUserProfile()
        ]);
        setUserData(greetingData);
        setUserProfile(profileData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        if (error instanceof Error) {
          showError(error.message);
        } else {
          showError('Gagal memuat data user');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [showError]);

  // Function untuk refresh semua komponen transaction
  const handleRefreshTransactions = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="pb-20 md:pb-0 flex items-center justify-center min-h-screen">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 h-full pb-20 md:pb-0">
      {/* Left Section - Main Content (3 columns) */}
      <div className="lg:col-span-3 space-y-4 sm:space-y-6">
        {/* Transaction Summary Card */}
        <TourAnchor id="transactions-summary" variant="main">
          <TransactionSummary onRefresh={handleRefreshTransactions} />
        </TourAnchor>
        
        {/* Monthly Expenses Summary - Mobile only */}
        <TourAnchor id="transactions-monthly" variant="mobile" className="block lg:hidden">
          <MonthlyExpensesSummary />
        </TourAnchor>
        
        {/* Tabs and Search */}
        <TourAnchor id="transactions-tabs" variant="main" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <TransactionTabs onTabChange={setTransactionType} />
          <TourAnchor id="transactions-search" variant="main" className="w-full sm:w-auto">
            <SearchAndFilter onSearch={setSearchQuery} />
          </TourAnchor>
        </TourAnchor>
        {/* Transaction List */}
        <TourAnchor id="transactions-list" variant="main">
          <TransactionList 
            filterType={transactionType} 
            searchQuery={searchQuery} 
            onRefresh={handleRefreshTransactions}
            key={refreshKey} 
          />
        </TourAnchor>
      </div> 
      <TourAnchor id="transactions-profile" variant="desktop" className="hidden lg:flex lg:col-span-1 flex-col gap-6">
        <UserProfileHeader userData={userData} userProfile={userProfile}  key={refreshKey}  />
        <TourAnchor id="transactions-reminder" variant="desktop">
          <AIReminder page="transaction" />
        </TourAnchor>
        <TourAnchor id="transactions-monthly" variant="desktop">
          <MonthlyExpensesSummary />
        </TourAnchor>
      </TourAnchor>
      
      {/* AI Reminder Floating Button - Mobile only */}
      <TourAnchor id="transactions-reminder" variant="mobile" className="block lg:hidden">
        <AIReminder page="transaction" isFloating={true} />
      </TourAnchor>
    </div>
  );
};

export default TransaksiPage;
