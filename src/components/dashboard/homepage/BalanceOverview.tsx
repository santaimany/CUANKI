'use client';
import React from 'react';

// 1. Impor komponen yang diperlukan dari Chart.js dan wrapper-nya
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// 2. Daftarkan elemen yang akan kita gunakan (ArcElement untuk Pie/Donut Chart)
ChartJS.register(ArcElement);

// 3. Siapkan data dengan format yang sesuai untuk Chart.js
export const data = {
  datasets: [
    {
      data: [50, 25, 25], // Proporsi data sama seperti sebelumnya
      backgroundColor: [
        '#00F5A0', // Hijau terang
        '#A3FFD6', // Hijau Pucat
        '#34D399', // Hijau Gelap
      ],
      borderWidth: 0, // Menghilangkan border antar segmen
    },
  ],
};

// 4. Siapkan opsi untuk menghilangkan tooltip dan legend
export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false, // Menyembunyikan legend bawaan
        },
        tooltip: {
            enabled: false, // Menonaktifkan tooltip saat hover
        }
    }
}

const BalanceOverview = () => {
  return (
    <div className="bg-gradient-to-tl from-[#7971BC] to-[#373456] rounded-2xl p-6 text-white relative">
      <div className="flex items-center gap-6">
        {/* PIE CHART menggunakan react-chartjs-2 */}
        <div className="w-28 h-28">
            <Pie data={data} options={options} />
        </div>
        
        {/* Konten Teks dan Tombol (Tidak ada perubahan di sini) */}
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
      
      {/* Panah (Tidak ada perubahan di sini) */}
      <div className="absolute right-6 bottom-6">
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
        </svg>
      </div>
    </div>
  );
};

export default BalanceOverview;