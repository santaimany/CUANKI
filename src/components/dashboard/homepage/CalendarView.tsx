'use client';
import React, { useEffect, useState } from 'react';
import { getCalendarStatus } from '@/lib/services/dashboardService';
import type { CalendarDate } from '@/types/api';

const CalendarView = () => {
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const [calendarDates, setCalendarDates] = useState<CalendarDate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [monthName, setMonthName] = useState('');
  
  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        setIsLoading(true);
        const response = await getCalendarStatus();
        setCalendarDates(response.data.calendar_dates);
        setMonthName(response.data.month_name);
      } catch {
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalendarData();
  }, []);

  // Get starting day of month (0 = Sunday, 6 = Saturday)
  const getStartingDay = () => {
    if (calendarDates.length === 0) return 0;
    const firstDate = new Date(calendarDates[0].date);
    return firstDate.getDay();
  };

  const startingDayOfMonth = getStartingDay();

  // Get color based on date status
  const getDateColor = (dateData: CalendarDate) => {
    if (dateData.is_today) {
      // Dibuat lebih menonjol
      return 'border-2 border-white text-white font-bold';
    }
    if (dateData.is_over_budget ) {
      return dateData.is_over_budget 
        ? 'bg-red-500 text-white font-bold' 
        : 'bg-white text-[#363256] font-bold';
    }
    
    if (dateData.is_future) {
      return 'text-white/40';
    }
    
    if (dateData.status === 'no-budget') {
      return 'text-white/50';
    }
    
    if (dateData.status === 'overbudget') {
      return 'bg-red-400/30 text-red-200 font-semibold';
    }
    
    if (dateData.status === 'under-budget' && dateData.expense_count > 0) {
      return 'bg-green-500/30 text-green-200 font-semibold';
    }
    
    return 'text-white/70';
  };

  if (isLoading) {
    return (
      <div className="bg-[#50488A] rounded-2xl p-4 sm:p-5 text-white h-full flex items-center justify-center">
        <div className="text-sm text-white/60">Loading calendar...</div>
      </div>
    );
  }

  return (
    // DIUBAH: Padding dibuat responsif
    <div className="bg-[#50488A] rounded-2xl p-4 sm:p-5 text-white h-full">
      {monthName && (
        // DIUBAH: Font dibuat sedikit lebih besar dan tebal
        <div className="text-center text-base font-semibold mb-4 text-white/80">
          {monthName}
        </div>
      )}
      {/* DIUBAH: Font dan gap dibuat responsif */}
      <div className="grid grid-cols-7 gap-y-1 sm:gap-y-2 text-center text-xs sm:text-sm">
        {/* Render Nama Hari */}
        {daysOfWeek.map((day) => (
          // DIUBAH: Font dan margin dibuat responsif
          <div key={day} className="font-semibold text-white/60 mb-2 text-xs sm:text-sm">
            {day}
          </div>
        ))}
        
        {/* Render Spasi Kosong sebelum tanggal 1 */}
        {Array.from({ length: startingDayOfMonth }, (_, i) => `empty-${monthName}-${i}`).map((key) => (
          <div key={key}></div>
        ))}

        {/* Render Tanggal dari API */}
        {calendarDates.map((dateData) => (
          <div
            key={dateData.date}
            /* --- PERBAIKAN UTAMA DI SINI ---
              DIHAPUS: 'h-7 w-7 mx-auto'
              DIGANTI: 'w-full aspect-square' 
              Ini membuat bulatan tanggal mengisi sel grid dan 
              membuat tingginya sama dengan lebarnya (responsive square).
            */
            className={`flex justify-center items-center rounded-full transition-colors w-full aspect-square ${getDateColor(dateData)}`}
            title={`${dateData.formatted.date}: ${dateData.formatted.daily_expenses} / ${dateData.formatted.daily_budget}`}
          >
            {dateData.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;