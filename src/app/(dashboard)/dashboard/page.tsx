import React from 'react';
import GoalsProgress from '@/components/dashboard/homepage/GoalsProgress';
import Streak from '@/components/dashboard/homepage/Streak';
import BalanceOverview from '@/components/dashboard/homepage/BalanceOverview';
import SpendingBreakdown from '@/components/dashboard/homepage/SpendingBreakdown';
import SavingsChart from '@/components/dashboard/homepage/SavingsChart';
// Impor komponen kalender yang baru dibuat
import CalendarView from '@/components/dashboard/homepage/CalendarView'; 

const DashboardPage = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Baris 1 */}
      <div className="md:col-span-3">
        <BalanceOverview />
      </div>

      <div className="md:col-span-2 md:row-span-3">
        <GoalsProgress />
      </div>
      <div>
        <Streak />
      </div>

      {/* Baris 2 & 3 - Kiri */}

      {/* Baris 2 & 3 - Kanan (ditumpuk vertikal) */}
      <div className='md:col-start-1 md:col-span-2 md:row-span-2'>
        {/* Gunakan komponen SpendingBreakdown yang sudah diperbaiki */}
        <SpendingBreakdown />
      </div>
      
      <div className="md:col-start-3 md:col-span-2 md:row-span-2">
  
        <CalendarView />
      </div>
      
      {/* Baris 4 */}
      <div className="md:col-span-3">
        <SavingsChart />
      </div>

    </div>
  );
};

export default DashboardPage;