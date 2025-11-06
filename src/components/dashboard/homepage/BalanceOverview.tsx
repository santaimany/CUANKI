'use client';
import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { GreetingUsersResponse } from '@/types/api';
import AddTransactionModal from '@/components/dashboard/transaksi/AddTransactionModal';

ChartJS.register(ArcElement);

interface BalanceOverviewProps {
  userData?: GreetingUsersResponse | null;
  onRefresh?: () => void; // Callback for refreshing data after transaction
}

const BalanceOverview: React.FC<BalanceOverviewProps> = ({ userData, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'income' | 'expense'>('income');

  const handleOpenModal = (type: 'income' | 'expense') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleTransactionSuccess = () => {
    // Refresh parent data if callback provided
    if (onRefresh) {
      onRefresh();
    }
  };

  // Get daily budget data
  const dailyBudget = userData?.data?.user.daily_budget || null;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    rotation: -135,
    circumference: 270,
    plugins: {
      tooltip: { enabled: false },
    }
  };

  const userName = userData?.data?.user?.username || 'User';
  const firstName = typeof userName === 'string' ? userName.split(' ')[0] : 'User';
  
  return (
    <>
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        onSubmit={handleTransactionSuccess}
      />

      <div className="bg-[#6F64A7] rounded-2xl p-4 sm:p-5 md:p-6 min-h-[300px] md:h-full text-white relative">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
          
          <div className="flex-1 text-center md:text-left">
            <p className="text-xs sm:text-sm md:text-base mb-1 sm:mb-2">Hai {firstName}!, ini uang kamu hari ini:</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">{dailyBudget}</h2>
            
            {/* DIUBAH: Membungkus tombol dalam div dengan max-w-sm 
              agar tidak terlalu lebar di layar besar (lg/xl).
              'mx-auto md:mx-0' digunakan untuk center di mobile dan rata kiri di desktop.
            */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-sm mx-auto md:mx-0">
              <button 
                onClick={() => handleOpenModal('income')}
                /* DIUBAH: Dibuat w-full sm:w-auto agar tombol sama lebar di mobile */
                className="w-full sm:w-auto bg-[#00F5A0] text-[#363256] cursor-pointer px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base md:text-lg font-semibold border-b-2 border-white hover:opacity-90 transition-opacity"
              >
                + pendapatan
              </button>
              <button 
                onClick={() => handleOpenModal('expense')}
                /* DIUBAH: Dibuat w-full sm:w-auto agar tombol sama lebar di mobile */
                className="w-full sm:w-auto bg-[#E85D5D] text-white cursor-pointer px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base md:text-lg font-semibold border-b-2 border-white hover:opacity-90 transition-opacity"
              >
                - pengeluaran
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute right-4 sm:right-5 md:right-6 bottom-4 sm:bottom-5 md:bottom-6">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default BalanceOverview;