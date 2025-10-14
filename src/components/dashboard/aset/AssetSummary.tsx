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

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

interface AssetSummaryProps {
  totalAmount: number;
}

const AssetSummary: React.FC<AssetSummaryProps> = ({ totalAmount }) => {
  // Data untuk pie chart
  const data = {
    labels: ['BSI', 'BCA', 'Sisa', 'Cash'],
    datasets: [
      {
        data: [40, 30, 20, 10], // Persentase sesuai gambar
        backgroundColor: [
          '#00F5A0', // BSI - Green
          '#00D9D9', // BCA - Cyan
          '#7BFFC7', // Sisa - Light green
          '#4DD4AC', // Cash - Teal
        ],
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
        display: false, // Hide legend karena tidak ada di gambar
      },
      tooltip: {
        enabled: false, // Disable tooltip
      },
    },
    cutout: '0%', // 0% untuk pie chart penuh (bukan donut)
  };

  return (
    <div className="bg-gradient-to-tl from-[#7971BC] to-[#373456] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
     
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        {/* Pie Chart */}
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 flex-shrink-0">
          <Doughnut data={data} options={options} />
        </div>

        {/* Total Amount */}
        <div className="flex-1 text-center sm:text-left">
          <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-2 sm:mb-3">Total uang kamu:</p>
          <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Rp {totalAmount.toLocaleString('id-ID')},00
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssetSummary;
