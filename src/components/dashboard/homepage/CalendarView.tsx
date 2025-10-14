'use client';
import React from 'react';

const CalendarView = () => {
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  // Data kalender untuk Oktober 2025 (sesuai gambar)
  const dates = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  const startingDayOfMonth = 3; // 1 Oktober 2025 adalah hari Rabu (index 3)

  const today = new Date().getDate(); // Untuk menyorot tanggal hari ini

  return (
    <div className="bg-[#50488A] rounded-2xl p-4 text-white h-full">
      <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
        {/* Render Nama Hari */}
        {daysOfWeek.map((day) => (
          <div key={day} className="font-semibold text-white/60">
            {day}
          </div>
        ))}
        
        {/* Render Spasi Kosong sebelum tanggal 1 */}
        {Array.from({ length: startingDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`}></div>
        ))}

        {/* Render Tanggal */}
        {dates.map((date) => {
          const isToday = date === today;
          return (
            <div
              key={date}
              className={`flex justify-center items-center h-7 w-7 mx-auto rounded-full transition-colors ${
                isToday ? 'bg-white text-[#363256] font-bold' : 'text-white/80'
              }`}
            >
              {date}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;