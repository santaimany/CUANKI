'use client';

import React, { useState } from 'react';

interface CalendarPickerProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
  isMobile?: boolean;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ selectedDate, onSelectDate, onClose, isMobile = false }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate);

  // Format date untuk input type="date" (YYYY-MM-DD)
  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Handle perubahan dari native date picker
  const handleNativeDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    if (dateValue) {
      const newDate = new Date(dateValue + 'T00:00:00');
      onSelectDate(newDate);
      onClose();
    }
  };

  // Jika mobile, gunakan native date picker
  if (isMobile) {
    return (
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50">
        <input
          type="date"
          value={formatDateForInput(selectedDate)}
          onChange={handleNativeDateChange}
          className="bg-[#4A4462] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B73FF] focus:border-transparent"
          style={{
            colorScheme: 'dark',
          }}
        />
      </div>
    );
  }

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (date: Date) => {
    onSelectDate(date);
    onClose();
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date | null) => {
    if (!date) return false;
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  return (
    <div className="absolute top-full left-1/2 transform -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 mt-2 z-50">
      <div className="bg-[#4A4462] rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 w-[280px] sm:w-[320px] md:w-[400px] shadow-2xl border border-white/10">
        {/* Header with Month/Year and Navigation */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
          <button
            onClick={handlePrevMonth}
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <h2 className="text-white text-lg sm:text-xl md:text-3xl font-bold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          
          <button
            onClick={handleNextMonth}
            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-white/70 font-semibold text-xs sm:text-sm md:text-lg">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {days.map((date, index) => {
            const dateKey = date ? date.toISOString() : `empty-${index}`;
            let buttonClass = 'text-white hover:bg-white/10';
            
            if (date) {
              if (isSelected(date)) {
                buttonClass = 'bg-[#6B73FF] text-white shadow-lg scale-110';
              } else if (isToday(date)) {
                buttonClass = 'bg-white/10 text-white ring-2 ring-white/30';
              }
            }

            return (
              <div key={dateKey} className="aspect-square">
                {date ? (
                  <button
                    onClick={() => handleDateClick(date)}
                    className={`w-full h-full flex items-center justify-center rounded-full text-sm sm:text-base md:text-xl font-medium transition-all ${buttonClass}`}
                  >
                    {date.getDate()}
                  </button>
                ) : (
                  <div />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarPicker;
