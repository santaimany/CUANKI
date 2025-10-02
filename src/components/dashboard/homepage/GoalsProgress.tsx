'use client';
import React from 'react';

const GoalsProgress = () => {
  return (
    // 1. Mengganti background gradasi menjadi warna ungu solid (#6F64A7)
    <div className="bg-gradient-to-tl from-[#7971BC] to-[#373456/10] rounded-2xl p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        {/* 2. Memperbesar ukuran font judul menjadi lebih tebal dan besar */}
        <h3 className="text-xl font-bold">Goals Progress</h3>
        {/* 3. Menyesuaikan font progress value */}
        <span className="text-base font-medium">15.000/1M</span>
      </div>
      {/* 4. Mengubah warna track progress bar dan mempertebalnya */}
      <div className="w-full bg-[#BDB7DC] rounded-full h-3">
        {/* 5. Menyesuaikan ketebalan fill progress bar agar sama */}
        <div className="bg-[#00F5A0] h-3 rounded-full" style={{ width: '15%' }}></div>
      </div>
    </div>
  );
};

export default GoalsProgress;