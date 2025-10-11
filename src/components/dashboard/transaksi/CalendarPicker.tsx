'use client';

import React, { useState } from 'react';

interface CalendarPickerProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({ selectedDate, onSelectDate, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate);

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
    <div className="absolute top-full right-0 mt-2 z-50">
      <div className="bg-[#4A4462] rounded-3xl p-6 w-[500px] shadow-2xl border border-white/10">
        {/* Header with Month/Year and Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevMonth}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <h2 className="text-white text-3xl font-bold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          
          <button
            onClick={handleNextMonth}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-white/70 font-semibold text-lg">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
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
                    className={`w-full h-full flex items-center justify-center rounded-full text-xl font-medium transition-all ${buttonClass}`}
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
