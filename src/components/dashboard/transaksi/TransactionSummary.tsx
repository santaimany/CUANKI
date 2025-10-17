'use client';
import React, { useState } from 'react';
import AddTransactionModal from './AddTransactionModal';
import { getUsageBars } from '@/lib/services/transactionService';
import { UsageBar } from '@/types/api';

interface TransactionSummaryProps {
  income?: number;
  expense?: number;
  onRefresh?: () => void; // Callback untuk refresh data setelah tambah transaksi
}

const TransactionSummary: React.FC<TransactionSummaryProps> = ({
  income = 60000,
  expense = 70000,
  onRefresh,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'income' | 'expense'>('income');
  const [usageBars, setUsageBars] = useState<UsageBar[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch usage bars data
  const fetchUsageBars = async () => {
    setLoading(true);
    try {
      const response = await getUsageBars();
      // Response structure: { success: true, data: { today_spending, daily_limit, percentage } }
      if (response.success && response.data) {
        setUsageBars([response.data]); // Wrap single object in array for consistent rendering
      }
    } catch (error) {
      console.error('Error fetching usage bars:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load usage bars on component mount
  React.useEffect(() => {
    fetchUsageBars();
  }, []);

  const handleOpenModal = (type: 'income' | 'expense') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleTransactionSuccess = () => {
    // Refresh parent data if callback provided
    if (onRefresh) {
      onRefresh();
    }
    // Also refresh usage bars
    fetchUsageBars();
  };
  return (
    <>
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        onSubmit={handleTransactionSuccess}
      />

      <div className="bg-gradient-to-tl from-[#7971BC]  to-[#373456] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-semibold mb-4 sm:mb-6">Transaksi anda hari ini:</h2>
        
        {/* Usage Bars - Dynamic Progress Bars */}
        <div className="mb-3 sm:mb-4">
          {loading && (
            <div className="animate-pulse">
              <div className="w-full bg-white/20 rounded-full h-2 sm:h-2.5 md:h-3"></div>
            </div>
          )}
          
          {!loading && usageBars.length > 0 && (
            <div className="space-y-2">
              {usageBars.map((bar, index) => (
                <div key={`usage-bar-${index}-${bar.percentage}`} className="w-full">
                  <div className="flex justify-between text-xs sm:text-sm mb-1">
                    <span className="text-white/60">{bar.percentage}%</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm mb-1">
                    
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 sm:h-2.5 md:h-3 overflow-hidden">
                    <div 
                      className={`h-2 sm:h-2.5 md:h-3 rounded-full transition-all duration-300 ${
                        bar.percentage == 100 
                          ? 'bg-gradient-to-r from-[#FF6B47] to-[#FF4444]' 
                          : 'bg-gradient-to-r from-[#00F5A0] to-[#00E68F]'
                      }`}
                      style={{ width: `${Math.min(bar.percentage || 0, 100)}%` }}
                    ></div>
                  </div>
                    <div className="text-right mb-4 sm:mb-6">
          <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">Rp {Number(bar.today_spending).toLocaleString('id-ID')}/Rp  {Number(bar.daily_limit).toLocaleString('id-ID')}</span>
         
        </div>
                  {bar.percentage == 100 && (
                    <div className="text-xs text-red-400 mt-1">
                      ⚠️ Anda telah melebihi limit harian!
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {!loading && usageBars.length === 0 && (
            <div className="space-y-2">
              <div className="w-full">
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span className="text-white/80">Pengeluaran vs Limit Harian</span>
                  <span className="text-white/60">0%</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span className="text-white/60">Rp 0</span>
                  <span className="text-white/60">Rp 0</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 sm:h-2.5 md:h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#00F5A0] to-[#00E68F] h-2 sm:h-2.5 md:h-3 rounded-full transition-all duration-300 w-0"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Amount Display */}
      
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          <button 
            onClick={() => handleOpenModal('income')}
            className="bg-gradient-to-r from-[#A3FFD6] to-[#0EFF95] border-b-2 border-white cursor-pointer text-black font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl sm:rounded-3xl hover:bg-[#00E68F] transition-colors"
          >
            + pendapatan
          </button>
          <button 
            onClick={() => handleOpenModal('expense')}
            className="bg-[#DF4000] text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl sm:rounded-3xl hover:bg-[#FF5530] transition-colors border-b-2 border-white cursor-pointer"
          >
            - pengeluaran
          </button>
        </div>
      </div>
    </>
  );
};

export default TransactionSummary;
