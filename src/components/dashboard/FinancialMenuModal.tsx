'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface FinancialMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FinancialMenuModal: React.FC<FinancialMenuModalProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  if (!isOpen) return null;

  const financialMenuItems = [
    { 
      name: 'Goals', 
      path: '/dashboard/goals', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 10a3 3 0 116 0 3 3 0 01-6 0z" clipRule="evenodd" />
          <path d="M10 11a1 1 0 100-2 1 1 0 000 2z" />
        </svg>
      ),
      description: 'Kelola target keuangan'
    },
    { 
      name: 'Badges', 
      path: '/dashboard/badges', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      description: 'Lihat pencapaian'
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-80 max-w-[90vw]">
        <div className="bg-[#50488A] rounded-2xl p-6 shadow-2xl border border-white/10">
          <div className="text-center mb-4">
            <h3 className="text-white text-lg font-bold">Financial Menu</h3>
            <p className="text-white/60 text-sm">Pilih menu financial</p>
          </div>
          
          <div className="space-y-3">
            {financialMenuItems.map((item) => {
              const isActive = pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:scale-105
                    ${isActive 
                      ? 'bg-[#00F5A0] text-[#363256]' 
                      : 'bg-[#363256] text-white hover:bg-[#2A2548]'
                    }`}
                >
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-base">{item.name}</h4>
                    <p className={`text-sm ${isActive ? 'text-[#363256]/70' : 'text-white/60'}`}>
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          
          <button
            onClick={onClose}
            className="w-full mt-4 bg-[#363256] text-white py-3 rounded-xl hover:bg-[#2A2548] transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </>
  );
};

export default FinancialMenuModal;