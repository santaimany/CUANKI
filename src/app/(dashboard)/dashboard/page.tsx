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
import LoadingScreen from '@/components/commons/LoadingScreen';
import TourAnchor from '@/components/tour/TourAnchor';

const DashboardPage = () => {
  const [userData, setUserData] = useState<GreetingUsersResponse | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTransactions, setRefreshTransactions] = useState(0);

  const handleTransactionRefresh = () => {
    setRefreshTransactions(prev => prev + 1);
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
      <TourAnchor
        id="dashboard-welcome"
        style={{ position: 'fixed', top: '50%', left: '50%', width: 1, height: 1, pointerEvents: 'none' }}
        aria-hidden="true"
      />
 
      {/* --- 1. MOBILE LAYOUT ( --- */}
     
      <div className="lg:hidden flex flex-col gap-4">
        <TourAnchor id="dashboard-balance" variant="mobile">
          <BalanceOverview userData={userData} onRefresh={handleTransactionRefresh} />
        </TourAnchor>
        <TourAnchor id="dashboard-goals" variant="mobile">
          <GoalsProgress />
        </TourAnchor>
        <TourAnchor id="dashboard-budget" variant="mobile">
          <BudgetSisa />
        </TourAnchor>
        <TourAnchor id="dashboard-accounts" variant="mobile">
          <MyAccounts />
        </TourAnchor>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TourAnchor id="dashboard-calendar" variant="mobile">
            <CalendarView />
          </TourAnchor>
          <TourAnchor id="dashboard-expenses" variant="mobile">
            <DailyExpenseSummary />
          </TourAnchor>
        </div>
        
        <TourAnchor id="dashboard-savings" variant="mobile">
          <SavingsChart />
        </TourAnchor>
        <TourAnchor id="dashboard-transactions" variant="mobile">
          <TransactionHistoryList key={refreshTransactions} onRefresh={handleTransactionRefresh} />
        </TourAnchor>
      </div>

      {/* --- 2. TABLET LAYOUT --- */}
 
      <div className="hidden lg:grid xl:hidden grid-cols-2 gap-4 p-4">
        <TourAnchor id="dashboard-balance" variant="tablet" className="col-span-2">
          <BalanceOverview userData={userData} onRefresh={handleTransactionRefresh} />
        </TourAnchor>
        <TourAnchor id="dashboard-profile" variant="tablet">
          <UserProfileHeader userData={userData} userProfile={userProfile} key={refreshTransactions}/>
        </TourAnchor>
        <TourAnchor id="dashboard-budget" variant="tablet">
          <BudgetSisa/>
        </TourAnchor>
        <TourAnchor id="dashboard-goals" variant="tablet">
          <GoalsProgress />
        </TourAnchor>
        <TourAnchor id="dashboard-accounts" variant="tablet">
          <MyAccounts />
        </TourAnchor>
        <TourAnchor id="dashboard-calendar" variant="tablet">
          <CalendarView />
        </TourAnchor>
        <TourAnchor id="dashboard-expenses" variant="tablet">
          <DailyExpenseSummary />
        </TourAnchor>
        <TourAnchor id="dashboard-savings" variant="tablet" className="col-span-2">
          <SavingsChart />
        </TourAnchor>
        <TourAnchor id="dashboard-transactions" variant="tablet" className="col-span-2">
          <TransactionHistoryList key={refreshTransactions} onRefresh={handleTransactionRefresh} />
        </TourAnchor>
      </div>

      {/* --- 3. DESKTOP LAYOUT  --- */}
      <div 
        className="hidden xl:grid gap-6 h-full"
        style={{
          gridTemplateAreas: `
            "balance  balance  balance  profile"
            "balance  balance  balance  accounts"
            "goals    goals    budget   accounts"
            "calendar expenses expenses transactions"
            "chart    chart    chart    transactions"
            "chart    chart    chart    transactions"
          `,
          gridTemplateColumns: '1fr 1fr 1fr 1.25fr',
          gridTemplateRows: 'auto auto auto auto auto 1fr' 
        }}
      >
   
        <TourAnchor id="dashboard-balance" variant="desktop" style={{ gridArea: 'balance' }}>
          <BalanceOverview userData={userData} onRefresh={handleTransactionRefresh} />
        </TourAnchor>
        <TourAnchor id="dashboard-profile" variant="desktop" style={{ gridArea: 'profile' }}>
          <UserProfileHeader userData={userData} userProfile={userProfile} key={refreshTransactions} />
        </TourAnchor>
        <TourAnchor id="dashboard-accounts" variant="desktop" style={{ gridArea: 'accounts' }}>
          <MyAccounts key={refreshTransactions} />
        </TourAnchor>
        <TourAnchor id="dashboard-goals" variant="desktop" style={{ gridArea: 'goals' }}>
          <GoalsProgress />
        </TourAnchor>
        <TourAnchor id="dashboard-budget" variant="desktop" style={{ gridArea: 'budget' }}>
          <BudgetSisa key={refreshTransactions}/>
        </TourAnchor>
        <TourAnchor id="dashboard-calendar" variant="desktop" style={{ gridArea: 'calendar' }}>
            <CalendarView />
        </TourAnchor>
        <TourAnchor id="dashboard-expenses" variant="desktop" style={{ gridArea: 'expenses' }}>
            <DailyExpenseSummary key={refreshTransactions} />
        </TourAnchor>
        <TourAnchor id="dashboard-transactions" variant="desktop" style={{ gridArea: 'transactions' }}>
          <TransactionHistoryList key={refreshTransactions} onRefresh={handleTransactionRefresh} />
        </TourAnchor>
        <TourAnchor id="dashboard-savings" variant="desktop" style={{ gridArea: 'chart' }}>
          <SavingsChart />
        </TourAnchor>
      </div>
    </div>
  );
};

export default DashboardPage;