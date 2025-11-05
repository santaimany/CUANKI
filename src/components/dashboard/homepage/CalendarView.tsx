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
      return 'border-2 border-white';
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
      <div className="bg-[#50488A] rounded-2xl p-4 text-white h-full flex items-center justify-center">
        <div className="text-sm text-white/60">Loading calendar...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#50488A] rounded-2xl p-4 text-white h-full">
      {monthName && (
        <div className="text-center text-sm font-semibold mb-3 text-white/80">
          {monthName}
        </div>
      )}
      <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
        {/* Render Nama Hari */}
        {daysOfWeek.map((day) => (
          <div key={day} className="font-semibold text-white/60 mb-1">
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
            className={`flex justify-center items-center h-7 w-7 mx-auto rounded-full transition-colors ${getDateColor(dateData)}`}
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