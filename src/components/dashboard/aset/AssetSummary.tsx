'use client';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { UserAccount } from '@/types/api';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

interface AssetSummaryProps {
  accounts: UserAccount[];
}

const AssetSummary: React.FC<AssetSummaryProps> = ({ accounts }) => {
  // Calculate total amount
  const totalAmount = accounts.reduce((sum, account) => {
    return sum + parseFloat(account.balance);
  }, 0);

  // Prepare chart data from accounts
  const labels = accounts.map(acc => `${acc.account_name} - ${acc.type}`);
  const balances = accounts.map(acc => parseFloat(acc.balance));
  
  const colors = [
    '#00F5A0', // Green
    '#00D9D9', // Cyan
    '#7BFFC7', // Light green
    '#4DD4AC', // Teal
    '#A3FFD6', // Light cyan
    '#2DD4BF', // Another teal
  ];

  // Data untuk pie chart
  const data = {
    labels: labels,
    datasets: [
      {
        data: balances,
        backgroundColor: colors.slice(0, accounts.length),
        borderWidth: 0,
        spacing: 0,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: Rp ${value.toLocaleString('id-ID')}`;
          }
        }
      },
    },
    cutout: '0%', // 0% untuk pie chart penuh (bukan donut)
  };

  if (accounts.length === 0) {
    return (
      <div className="bg-gradient-to-tl from-[#7971BC] to-[#373456] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
        <div className="flex items-center justify-center py-12">
          <p className="text-white/70 text-lg">Belum ada data akun</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-tl from-[#7971BC] to-[#373456] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        {/* Pie Chart */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 flex-shrink-0">
          <Doughnut data={data} options={options} />
        </div>

        {/* Total Amount */}
        <div className="flex-1 text-center sm:text-left">
          <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-2 sm:mb-3">
            Total uang kamu:
          </p>
          <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Rp {totalAmount.toLocaleString('id-ID')},00
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssetSummary;
