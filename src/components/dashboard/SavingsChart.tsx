'use client';
import React, { useState, useEffect } from 'react';
// 1. Impor semua yang dibutuhkan dari chart.js dan wrapper-nya
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  type TooltipItem,
  type ScriptableContext,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axiosInstance from '@/lib/axios';

// 2. Registrasi semua elemen yang akan digunakan
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler // <-- Registrasi Filler plugin
);

// Interface untuk response API
interface ChartDataPoint {
  x: string;
  y: number;
  date: string;
  month_name: string;
  formatted_value: string;
}

interface GoalGraphicRateResponse {
  status: string;
  message: string;
  data: {
    period: string;
    chart_data: ChartDataPoint[];
    summary: {
      current_balance: number;
      formatted: {
        current_balance: string;
        growth_percentage: string;
      };
    };
  };
}

interface SavingsChartProps {
  period?: '7days' | '30days' | '3months' | '6months' | '12months';
}

const SavingsChart: React.FC<SavingsChartProps> = ({ period = '12months' }) => {
  const [chartData, setChartData] = useState<GoalGraphicRateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data dari API
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get<GoalGraphicRateResponse>(
          `/api/goal-graphic-rate?period=${period}`
        );
        
        setChartData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching chart data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [period]);

  // Extract data untuk chart
  const labels = chartData?.data?.chart_data?.map(item => item.x) || [];
  const dataPoints = chartData?.data?.chart_data?.map(item => item.y) || [];
  const formattedBalance = chartData?.data?.summary?.formatted?.current_balance || 'Rp 0';
  const growthPercentage = chartData?.data?.summary?.formatted?.growth_percentage || '+0%';

  // 3. Plugin kustom untuk menggambar garis vertikal saat hover
  const verticalLinePlugin = {
    id: 'verticalLine',
    afterDraw: (chart: ChartJS) => {
      const tooltip = chart.tooltip as unknown as { _active?: Array<{ element: { x: number } }> };
      if (tooltip?._active?.length) {
        const ctx = chart.ctx;
        const x = tooltip._active[0].element.x;
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
        mode: 'index' as const,
        intersect: false,
        // Konfigurasi tampilan tooltip kustom
        backgroundColor: '#FFFFFF',
        titleColor: '#363256',
        bodyColor: '#363256',
        titleFont: { weight: 'bold' as const },
        bodyFont: { weight: 'bold' as const },
        displayColors: false, // Sembunyikan kotak warna di tooltip
        padding: 10,
        cornerRadius: 12,
        // Format angka di tooltip
        callbacks: {
          label: function (context: TooltipItem<'line'>) {
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
          title: () => '', // Sembunyikan title default (bulan)
        },
      },
    },
    // Efek hover
    interaction: {
      mode: 'index' as const,
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
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(0, 245, 160, 0.3)');
          gradient.addColorStop(1, 'rgba(0, 245, 160, 0)');
          return gradient;
        },
      },
    ],
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-[#50488A] rounded-2xl p-6 text-white">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            <p className="text-sm text-white">Memuat data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-[#50488A] rounded-2xl p-6 text-white">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <p className="mb-2 text-sm text-red-300">Gagal memuat data</p>
            <p className="text-xs text-white/60">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!chartData || labels.length === 0) {
    return (
      <div className="bg-[#50488A] rounded-2xl p-6 text-white">
        <div className="flex h-64 items-center justify-center">
          <p className="text-sm text-white/60">Tidak ada data tersedia</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#50488A] rounded-2xl p-6 text-white">
      <h3 className="text-sm font-medium text-white/80">Saldo saat ini</h3>
      <p className="text-4xl font-bold mb-4">{formattedBalance}</p>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-sm text-green-400">{growthPercentage}</span>
      </div>
      
      <div className="relative h-48">
        <Line options={options} data={data} plugins={[verticalLinePlugin]} />
      </div>
    </div>
  );
};

export default SavingsChart;