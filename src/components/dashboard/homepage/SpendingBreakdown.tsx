'use client';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

const SpendingBreakdown = () => {
  const data = {
    datasets: [
      {
        data: [50, 30, 20], // Data pengeluaran (misalnya 50%, 30%, 20%)
        backgroundColor: ['#00F5A0', '#A3FFD6', '#34D399'],
        borderWidth: 0,
        cutout: '70%', // Mengatur ketebalan donat
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  const categories = [
    { name: 'Food & beverages', color: '#00F5A0' },
    { name: 'Lifestyle', color: '#A3FFD6' },
    { name: 'Coffee', color: '#34D399' },
  ];

  return (
    <div className="bg-gradient-to-l from-[#7971BC] to-[#50488A] rounded-2xl p-6 text-white h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Pengeluaran</h3>
        <button className="text-2xl font-light hover:text-white/70">+</button>
      </div>

      <div className="flex items-center gap-6">
        {/* Donut Chart */}
        <div className="relative w-24 h-24">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xl font-bold">70k</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              ></div>
              <span className="text-sm">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingBreakdown;