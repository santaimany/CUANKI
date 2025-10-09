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
    <div className="bg-[#6F64A7] rounded-2xl p-6 text-white relative">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center justify-center w-28 ">
          <div className="relative w-28 h-auto">
            {/* Plugin untuk animasi panah dihapus dari sini */}
            <Doughnut data={data} options={options} />
            
            <div className="absolute inset-0 flex items-center justify-center">
              {/* MODIFIKASI: Panah sekarang statis dengan rotasi tetap */}
              <div className="transform -rotate-45">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-base font-semibold mt-1">{progress}% Terpakai</p>
        </div>
        
        <div className="flex-1">
          <p className="text-base mb-1">Hai Ian!, ini uang kamu hari ini:</p>
          <h2 className="text-5xl font-bold mb-4">Rp 70.000,00</h2>
          <div className="flex gap-3">
            <button className="bg-[#00F5A0] text-[#363256] px-4 py-1.5 rounded-xl text-sm font-semibold border-b-2 border-white hover:opacity-90 transition-opacity">
              + pendapatan
            </button>
            <button className="bg-[#E85D5D] text-white px-4 py-1.5 rounded-xl text-sm font-semibold border-b-2 border-white hover:opacity-90 transition-opacity">
              - pengeluaran
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute right-6 bottom-6">
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
        </svg>
      </div>
    </div>
  );
};

export default BalanceOverview;