import React from 'react';
import UserProfileHeader from '@/components/dashboard/UserProfile';
import GoalsProgress from '@/components/dashboard/homepage/GoalsProgress';
import Streak from '@/components/dashboard/homepage/Streak';
import BalanceOverview from '@/components/dashboard/homepage/BalanceOverview';
import SpendingBreakdown from '@/components/dashboard/homepage/SpendingBreakdown';
import SavingsChart from '@/components/dashboard/SavingsChart';
import CalendarView from '@/components/dashboard/homepage/CalendarView'; 
import MyAccounts from '@/components/dashboard/homepage/card/MyAccount';
import TransactionHistoryList from '@/components/dashboard/homepage/TransactionHistory';

const DashboardPage = () => {
  return (
    <div className="pb-20 md:pb-0">
      {/* Mobile Layout: Stack vertically */}
      <div className="md:hidden flex flex-col gap-4">
        <UserProfileHeader />
        <BalanceOverview />
        <GoalsProgress />
        <Streak />
        <MyAccounts />
        <CalendarView />
        <SpendingBreakdown />
        <SavingsChart />
        <TransactionHistoryList />
      </div>

      {/* Desktop Layout: Complex Grid */}
      <div className="hidden md:grid grid-cols-4 gap-6 h-full">
        {/* BalanceOverview: Baris 1-2, Kolom 1-3 */}
        <div className="col-span-3 row-span-2">
          <BalanceOverview />
        </div>

        {/* UserProfileHeader: Baris 1, Kolom 4 */}
        <div className="col-start-4 row-start-1">
          <UserProfileHeader />
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
          <Streak />
        </div>

        {/* CalendarView: Baris 4-5, Kolom 1 */}
        <div className="row-start-4 row-span-2 col-start-1">
          <CalendarView />
        </div>

        {/* SpendingBreakdown: Baris 4-5, Kolom 2-3 */}
        <div className="row-start-4 row-span-2 col-start-2 col-span-2">
          <SpendingBreakdown />
        </div>

        {/* TransactionHistoryList: Baris 4-6, Kolom 4 */}
        <div className="col-start-4 row-start-4 row-span-3">
          <TransactionHistoryList />
        </div>

        {/* SavingsChart: Baris 6, Kolom 1-3 */}
        <div className="col-span-3 row-start-6">
          <SavingsChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;