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
      {/* Mobile Layout: Stack vertically - No UserProfile */}
      <div className="md:hidden flex flex-col gap-4">
        <BalanceOverview userData={userData} onRefresh={handleTransactionRefresh} />
        <GoalsProgress />
        <BudgetSisa />
        <MyAccounts />
        
        {/* Calendar and Daily Expense side by side on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalendarView />
          <DailyExpenseSummary />
        </div>
        
        <SavingsChart />
        <TransactionHistoryList key={refreshTransactions} onRefresh={handleTransactionRefresh} />
      </div>

      {/* Desktop Layout: Complex Grid */}
      <div className="hidden md:grid grid-cols-4 gap-6 h-full">
        {/* BalanceOverview: Baris 1-2, Kolom 1-3 */}
        <div className="col-span-3 row-span-2">
          <BalanceOverview userData={userData} onRefresh={handleTransactionRefresh} />
        </div>

        {/* UserProfileHeader: Baris 1, Kolom 4 */}
        <div className="col-span-1 row-span-1">
          <UserProfileHeader userData={userData} userProfile={userProfile} />
        </div>

        {/* MyAccounts: Baris 2-3, Kolom 4 */}
        <div className="col-start-4 row-start-2 row-span-2">
          <MyAccounts />
        </div>
        
        {/* GoalsProgress: Baris 3, Kolom 1-2 */}
        <div className="col-span-2 row-start-3">
          <GoalsProgress />
        </div>

        {/* Streak: Baris 3, Kolom 3 */}
        <div className="col-start-3 row-start-3">
          <BudgetSisa/>
        </div>

          {/* CalendarView: Left side */}
          <div className="col-span-1">
            <CalendarView />
          </div>
          
          {/* DailyExpenseSummary: Right side */}
          <div className="col-span-2">
            <DailyExpenseSummary />
          </div>
     

      

        {/* TransactionHistoryList: Baris 4-6, Kolom 4 */}
        <div className="col-start-4 row-start-4 row-span-3">
          <TransactionHistoryList key={refreshTransactions} onRefresh={handleTransactionRefresh} />
        </div>

        {/* SavingsChart: Baris 6, Kolom 1-3 */}
        <div className="col-span-3 row-start-5">
          <SavingsChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;