'use client';
import React, { useEffect, useState } from 'react';
import { getCalendarStatus } from '@/lib/services/dashboardService';
import type { CalendarDate } from '@/types/api';

const DailyExpenseSummary = () => {
  const [todayData, setTodayData] = useState<CalendarDate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodayData = async () => {
      try {
        setIsLoading(true);
        const response = await getCalendarStatus();
        
        // Find today's data from calendar_dates
        const today = response.data.calendar_dates.find(date => date.is_today);
        setTodayData(today || null);
      } catch (error) {
        console.error('Failed to fetch today data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodayData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#50488A] rounded-2xl p-4 text-white h-full flex items-center justify-center">
        <div className="text-sm text-white/60">Loading...</div>
      </div>
    );
  }

  if (!todayData) {
    return (
      <div className="bg-[#50488A] rounded-2xl p-4 text-white h-full">
        <h3 className="text-base font-semibold mb-4">Pengeluaran hari ini</h3>
        <p className="text-sm text-white/60">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-[#50488A] rounded-2xl p-4 text-white h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Pengeluaran hari ini</h3>
        <button className="text-white bg-white/20 hover:bg-white/30 rounded-full w-6 h-6 flex items-center justify-center text-lg font-bold transition-colors">
          +
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-3">
        {/* Budget */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <div className="flex-1 flex justify-between items-center">
            <span className="text-sm">Budget:</span>
            <span className="text-sm font-semibold">{todayData.formatted.daily_budget}</span>
          </div>
        </div>

        {/* Pengeluaran */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-orange-400"></div>
          <div className="flex-1 flex justify-between items-center">
            <span className="text-sm">Pengeluaran:</span>
            <span className="text-sm font-semibold">{todayData.formatted.daily_expenses}</span>
          </div>
        </div>

        {/* Sisa */}
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${todayData.is_over_budget ? 'bg-red-400' : 'bg-blue-400'}`}></div>
          <div className="flex-1 flex justify-between items-center">
            <span className="text-sm">Sisa:</span>
            <span className={`text-sm font-semibold ${todayData.is_over_budget ? 'text-red-300' : ''}`}>
              {todayData.is_over_budget ? `-${todayData.formatted.over_budget_amount}` : todayData.formatted.remaining_budget}
            </span>
          </div>
        </div>
      </div>

      {/* Over budget warning */}
      {todayData.is_over_budget && (
        <div className="mt-3 p-2 bg-red-500/20 rounded-lg">
          <p className="text-xs text-red-200 text-center">
            Over budget: {todayData.formatted.over_budget_amount}
          </p>
        </div>
      )}

      {/* Expense count */}
      {todayData.expense_count > 0 && (
        <div className="mt-3 text-center">
          <p className="text-xs text-white/60">
            {todayData.expense_count} transaksi hari ini
          </p>
        </div>
      )}
    </div>
  );
};

export default DailyExpenseSummary;
