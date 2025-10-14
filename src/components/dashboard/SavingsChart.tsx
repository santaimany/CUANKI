'use client';
import React from 'react';
// 1. Impor semua yang dibutuhkan dari chart.js dan wrapper-nya
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler, // <-- Impor Filler plugin untuk gradasi area
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// 2. Registrasi semua elemen yang akan digunakan
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler // <-- Registrasi Filler plugin
);

const SavingsChart = () => {
  const labels = ['Jan', 'Feb', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'];
  const dataPoints = [20000, 35000, 30000, 45000, 40000, 50000, 65000, 70000, 85000, 80000];

  // 3. Plugin kustom untuk menggambar garis vertikal saat hover
  const verticalLinePlugin = {
    id: 'verticalLine',
    afterDraw: (chart) => {
      if (chart.tooltip?._active?.length) {
        const ctx = chart.ctx;
        const x = chart.tooltip._active[0].element.x;
        const topY = chart.scales.y.top;
        const bottomY = chart.scales.y.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.setLineDash([5, 5]); // Membuat garis putus-putus
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  // 4. Konfigurasi tampilan dan interaksi chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: 'rgba(255, 255, 255, 0.7)' },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        display: false, // Sembunyikan sumbu Y
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        // Konfigurasi tampilan tooltip kustom
        backgroundColor: '#FFFFFF',
        titleColor: '#363256',
        bodyColor: '#363256',
        titleFont: { weight: 'bold' },
        bodyFont: { weight: 'bold' },
        displayColors: false, // Sembunyikan kotak warna di tooltip
        padding: 10,
        cornerRadius: 12,
        // Format angka di tooltip
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(context.parsed.y);
            }
            return label;
          },
          title: () => null, // Sembunyikan title default (bulan)
        },
      },
    },
    // Efek hover
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  // 5. Konfigurasi data dan styling garis/area
  const data = {
    labels,
    datasets: [
      {
        label: 'Rp',
        data: dataPoints,
        fill: true, // <-- Aktifkan fill untuk area chart
        borderColor: '#00F5A0',
        tension: 0.4, // Membuat garis melengkung (smooth)
        pointRadius: 0, // Sembunyikan titik data
        pointHoverRadius: 6, // Tampilkan titik saat hover
        pointBackgroundColor: '#00F5A0',
        pointBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        // Membuat gradasi untuk area di bawah garis
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(0, 245, 160, 0.3)');
          gradient.addColorStop(1, 'rgba(0, 245, 160, 0)');
          return gradient;
        },
      },
    ],
  };

  return (
    <div className="bg-[#50488A] rounded-2xl p-6 text-white">
      <h3 className="text-sm font-medium text-white/80">Saldo saat ini</h3>
      <p className="text-4xl font-bold mb-4">Rp70.000,00</p>
      
      <div className="relative h-48">
        <Line options={options} data={data} plugins={[verticalLinePlugin]} />
      </div>
    </div>
  );
};

export default SavingsChart;