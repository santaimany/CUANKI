'use client';
import React, { useEffect, useState } from 'react';
import UserProfileHeader from '@/components/dashboard/UserProfile';
import GoalsProgress from '@/components/dashboard/homepage/GoalsProgress';
import BudgetSisa from '@/components/dashboard/homepage/BudgetSisa';
import BalanceOverview from '@/components/dashboard/homepage/BalanceOverview';
import SavingsChart from '@/components/dashboard/SavingsChart';
import CalendarView from '@/components/dashboard/homepage/CalendarView'; 
import DailyExpenseSummary from '@/components/dashboard/homepage/DailyExpenseSummary';
import MyAccounts from '@/components/dashboard/homepage/card/MyAccount';
import TransactionHistoryList from '@/components/dashboard/homepage/TransactionHistory';
import { GreetingUsersResponse, UserProfileResponse } from '@/types/api';
import { getUserGreeting, getUserProfile } from '@/lib/api/user';
import Loading from '@/app/loading';
import LoadingScreen from '@/components/commons/LoadingScreen';

const DashboardPage = () => {
  const [userData, setUserData] = useState<GreetingUsersResponse | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTransactions, setRefreshTransactions] = useState(0);

  // Function to trigger transaction refresh
  const handleTransactionRefresh = () => {
    setRefreshTransactions(prev => prev + 1);
    // Also refresh user data to update balance
    fetchGreeting();
  };

  const fetchGreeting = async () => {
    try {
      const data = await getUserGreeting();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching greeting:', error);
      setError('Failed to load dashboard data');
    }
  };

  const fetchUserProfile = async () => {
    try {
      const data = await getUserProfile();
      console.log('Dashboard - getUserProfile response:', data);
      setUserProfile(data);
    } catch (error) {
      console.error('Dashboard - Error fetching user profile:', error);
      // Don't set error for profile as it's not critical
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          fetchGreeting(),
          fetchUserProfile()
        ]);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  if (loading) {
    return (
      <div className="pb-20 md:pb-0 flex items-center justify-center min-h-screen">
        <LoadingScreen  />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pb-20 md:pb-0 flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="pb-20 md:pb-0">
 
      {/* --- MOBILE LAYOUT (Tidak Berubah) --- */}
      <div className="md:hidden flex flex-col gap-4">
        <BalanceOverview userData={userData} onRefresh={handleTransactionRefresh} />
        <GoalsProgress />
        <BudgetSisa />
        <MyAccounts />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalendarView />
          <DailyExpenseSummary />
        </div>
        
        <SavingsChart />
        <TransactionHistoryList key={refreshTransactions} onRefresh={handleTransactionRefresh} />
      </div>

      {/* --- DESKTOP LAYOUT (DIUBAH) --- */}
      <div 
        className="hidden md:grid gap-6 h-full"
        style={{
          // Ini adalah "peta" visual dari layout Anda.
          // Setiap kata adalah nama 'grid-area'.
          gridTemplateAreas: `
            "balance  balance  balance  profile"
            "balance  balance  balance  accounts"
            "goals    goals    budget   accounts"
            "calendar expenses expenses transactions"
            "chart    chart    chart    transactions"
            "chart    chart    chart    transactions"
          `,
          // 3 kolom pertama fleksibel, kolom terakhir sedikit lebih lebar.
          gridTemplateColumns: '1fr 1fr 1fr 1.25fr',
          // 5 baris pertama ukurannya otomatis, baris terakhir (chart/transaksi)
          // akan mengisi sisa ruang vertikal.
          gridTemplateRows: 'auto auto auto auto auto 1fr' 
        }}
      >
        {/* Sekarang kita hanya perlu menetapkan 'gridArea' ke setiap komponen.
          Tidak perlu lagi pusing dengan col-span/row-start.
        */}
        
        <div style={{ gridArea: 'balance' }}>
          <BalanceOverview userData={userData} onRefresh={handleTransactionRefresh} />
        </div>

        <div style={{ gridArea: 'profile' }}>
          <UserProfileHeader userData={userData} userProfile={userProfile} />
        </div>
     
        <div style={{ gridArea: 'accounts' }}>
          <MyAccounts />
        </div>
        
        <div style={{ gridArea: 'goals' }}>
          <GoalsProgress />
        </div>

        <div style={{ gridArea: 'budget' }}>
          <BudgetSisa/>
        </div>

        <div style={{ gridArea: 'calendar' }}>
            <CalendarView />
        </div>
          
        <div style={{ gridArea: 'expenses' }}>
            <DailyExpenseSummary />
        </div>
     
        <div style={{ gridArea: 'transactions' }}>
          <TransactionHistoryList key={refreshTransactions} onRefresh={handleTransactionRefresh} />
        </div>

        <div style={{ gridArea: 'chart' }}>
          <SavingsChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;