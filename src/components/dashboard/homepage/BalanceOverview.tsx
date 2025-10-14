'use client';
import React from 'react';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement);

const BalanceOverview = () => {
  const progress = 70;

  const data = {
    datasets: [{
      data: [progress, 100 - progress],
      backgroundColor: ['#00F5A0', 'rgba(229, 231, 235, 0.3)'],
      borderWidth: 0,
      borderRadius: 20,
    }],
  };
  
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

  return (
    <div className="bg-[#6F64A7] rounded-2xl p-4 sm:p-5 md:p-6 min-h-[300px] md:h-[40vh] text-white relative">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
        <div className="flex flex-col items-center justify-center w-20 sm:w-24 md:w-28">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
            <Doughnut data={data} options={options} />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="transform -rotate-45">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-xs sm:text-sm md:text-base font-semibold mt-1">{progress}% Terpakai</p>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <p className="text-xs sm:text-sm md:text-base mb-1 sm:mb-2">Hai Ian!, ini uang kamu hari ini:</p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4">Rp 70.000,00</h2>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button className="bg-[#00F5A0] text-[#363256] px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold border-b-2 border-white hover:opacity-90 transition-opacity">
              + pendapatan
            </button>
            <button className="bg-[#E85D5D] text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold border-b-2 border-white hover:opacity-90 transition-opacity">
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
  );
};

export default BalanceOverview;