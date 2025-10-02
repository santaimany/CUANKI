'use client';
import React from 'react';

const Streak = () => {
  return (
    <div className="bg-[#00F5A0] rounded-2xl p-6 text-black">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Streak</h3>
        <span className="text-sm font-medium">100%</span>
      </div>
      <div className="flex items-center gap-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-3 h-3 bg-black rounded-full"></div>
        ))}
      </div>
    </div>
  );
};

export default Streak;