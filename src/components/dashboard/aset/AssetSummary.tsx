'use client';
import React from 'react';

interface AssetSummaryProps {
  totalAmount: number;
}

const AssetSummary: React.FC<AssetSummaryProps> = ({ totalAmount }) => {
  return (
    <div className="bg-gradient-to-br from-[#7971BC] to-[#6B5CE7] rounded-3xl p-8 mb-6">
      <h2 className="text-white text-4xl font-bold mb-8">Kategori aset kamu</h2>
      
      <div className="flex items-center gap-12">
        {/* Pie Chart */}
        <div className="relative w-56 h-56 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            {/* BSI - Green */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="#00F5A0"
              strokeWidth="50"
              strokeDasharray="220 440"
              strokeDashoffset="0"
            />
            
            {/* BCA - Cyan */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="#00D9D9"
              strokeWidth="50"
              strokeDasharray="88 440"
              strokeDashoffset="-220"
            />
            
            {/* Sisa - Light green */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="#7BFFC7"
              strokeWidth="50"
              strokeDasharray="66 440"
              strokeDashoffset="-308"
            />
            
            {/* Cash - Teal */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke="#4DD4AC"
              strokeWidth="50"
              strokeDasharray="66 440"
              strokeDashoffset="-374"
            />
          </svg>
        </div>

        {/* Total Amount */}
        <div className="flex-1">
          <p className="text-white/90 text-2xl mb-3">Total uang kamu:</p>
          <p className="text-white text-5xl font-bold">
            Rp {totalAmount.toLocaleString('id-ID')},00
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssetSummary;
