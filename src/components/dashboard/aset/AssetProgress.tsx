'use client';
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '@/lib/axios';

interface ColorScheme {
  primary: string;
  secondary: string;
  text: string;
}

interface FormattedAllocation {
  current_balance: string;
  max_balance: string;
  usage_text: string;
  display_text: string;
  balance_display: string;
}

interface Allocation {
  allocation_id: number;
  account_id: number;
  bank_name: string;
  bank_code: string;
  type: string;
  current_balance: number;
  max_balance: number | string;
  usage_percentage: number;
  status: string;
  status_text: string;
  description: string;
  color_scheme: ColorScheme;
  formatted: FormattedAllocation;
  last_updated: string;
}

interface UsageBarAllocationResponse {
  status: string;
  message: string;
  data: {
    allocations: Allocation[];
    summary: {
      total_allocations: number;
      total_balance: number;
      average_usage_percentage: number;
      status_distribution: Record<string, number>;
      formatted: {
        total_balance: string;
        average_usage: string;
      };
    };
    metadata: {
      generated_at: string;
      timezone: string;
      total_accounts: number;
    };
  };
}

const AssetProgress: React.FC = () => {
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsageBarAllocations();
  }, []);

  const fetchUsageBarAllocations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('📊 Fetching usage bar allocations...');
      const response = await axiosInstance.get<UsageBarAllocationResponse>('/api/usage-bar-allocation');
      
      console.log('✅ Usage bar allocations response:', response.data);
      setAllocations(response.data.data.allocations);
    } catch (err) {
      console.error('❌ Error fetching usage bar allocations:', err);
      setError('Gagal memuat data alokasi');
    } finally {
      setLoading(false);
    }
  };

  const getIconForType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'kebutuhan':
        return (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
        );
      case 'tabungan':
        return (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
        );
      case 'darurat':
        return (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4.586A2 2 0 003.414 12L7 15.586V17a1 1 0 102 0v-1.586l3.586-3.586A2 2 0 0014 10.586V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="space-y-3 sm:space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#7971BC]/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg animate-pulse"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#50488A] rounded-full"></div>
              <div className="flex-1">
                <div className="h-5 bg-white/20 rounded w-24 mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-32"></div>
              </div>
            </div>
            <div className="h-4 bg-white/30 rounded-full"></div>
          </div>
        ))}
      </div>
    );  
  }

  if (error) {
    return (
      <div className="bg-red-500/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
        <p className="text-white text-center">{error}</p>
      </div>
    );
  }

  if (allocations.length === 0) {
    return (
      <div className="bg-[#7971BC] rounded-2xl sm:rounded-3xl p-4 sm:p-6">
        <p className="text-white text-center">Belum ada alokasi</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {allocations.map((allocation) => {
        return (
          <div
            key={allocation.allocation_id}
            className="bg-[#7971BC] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: allocation.color_scheme.primary }}
                >
                  {getIconForType(allocation.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold truncate">
                    {allocation.type}
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm md:text-base truncate">
                    {allocation.bank_name.toUpperCase()} - {allocation.status_text}
                  </p>
                  <p className="text-white/60 text-xs truncate">{allocation.description}</p>
                </div>
              </div>
              
              <div className="text-left sm:text-right">
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                  {allocation.formatted.balance_display}
                </p>
                <p className="text-white/80 text-xs sm:text-sm">
                  {allocation.formatted.usage_text}
                </p>
              </div>
            </div>

            <div className="relative w-full h-3 sm:h-3.5 md:h-4 bg-white/30 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${allocation.usage_percentage}%`,
                  backgroundColor: allocation.color_scheme.primary
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AssetProgress;
