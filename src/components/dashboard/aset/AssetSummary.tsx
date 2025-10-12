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
    <div className="bg-gradient-to-tl from-[#7971BC] to-[#373456] rounded-3xl p-8 mb-6">
     
      <div className="flex items-center gap-12">
        {/* Pie Chart */}
        <div className="relative w-56 h-56 flex-shrink-0">
          <Doughnut data={data} options={options} />
        </div>

        {/* Total Amount */}
        <div className="flex-1">
          <p className="text-white/90 text-2xl mb-3">Total uang kamu:</p>
          <p className="text-white text-5xl font-bold">
            Rp {totalAmount.toLocaleString('id-ID')},00
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssetSummary;
