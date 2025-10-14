import React, { useState } from 'react';

type CalendarPickerProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export default function CalendarPicker({ value = '', onChange }: CalendarPickerProps) {
  const [currentMonth] = useState(new Date());
  
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const selectedDay = value ? parseInt(value) : null;

  const handleDayClick = (day: number) => {
    onChange?.(day.toString());
  };

  const renderDays = () => {
    const cells = [];
    
    // Empty cells before first day
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(
        <div key={`empty-${i}`} className="aspect-square" />
      );
    }
    
    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDay === day;
      cells.push(
        <button
          key={day}
          onClick={() => handleDayClick(day)}
          className={`aspect-square rounded-full flex items-center justify-center text-sm transition ${
            isSelected
              ? 'bg-[#7971BC] text-white font-semibold'
              : 'text-white hover:bg-white/10'
          }`}
        >
          {day}
        </button>
      );
    }
    
    return cells;
  };

  return (
    <div className="bg-[#50488A] border border-white rounded-2xl p-6">
      <div className="grid grid-cols-7 gap-2 mb-3">
        {days.map((day) => (
          <div key={day} className="text-center text-white/60 text-xs font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {renderDays()}
      </div>
    </div>
  );
}