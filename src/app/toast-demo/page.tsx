'use client';

import React from 'react';
import { useToast } from '@/context/ToastContext';

export default function ToastDemo() {
  const { showSuccess, showError, showWarning, showInfo, showLoading } = useToast();

  const handleSuccess = () => {
    showSuccess('Operasi berhasil dilakukan!');
  };

  const handleError = () => {
    showError('Terjadi kesalahan. Silakan coba lagi.');
  };

  const handleWarning = () => {
    showWarning('Peringatan: Data belum lengkap.');
  };

  const handleInfo = () => {
    showInfo('Informasi: Fitur sedang dalam pengembangan.');
  };

  const handleLoading = () => {
    showLoading('Sedang memproses data...');
    
    // Simulate async operation
    setTimeout(() => {
      showSuccess('Data berhasil diproses!');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6F64A7] to-[#5B4E96] p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-[#363256] mb-8 text-center">
          React Toast Demo
        </h1>
        
        <div className="space-y-4">
          <button
            onClick={handleSuccess}
            className="w-full bg-[#00F5A0] hover:bg-[#00E68F] text-[#363256] font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Show Success Toast
          </button>
          
          <button
            onClick={handleError}
            className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Show Error Toast
          </button>
          
          <button
            onClick={handleWarning}
            className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Show Warning Toast
          </button>
          
          <button
            onClick={handleInfo}
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Show Info Toast
          </button>
          
          <button
            onClick={handleLoading}
            className="w-full bg-[#5B4E96] hover:bg-[#4A3D7F] text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Show Loading Toast (3s)
          </button>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h2 className="text-lg font-semibold text-[#363256] mb-4">Implementasi Toast</h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• <strong>Success:</strong> Untuk operasi yang berhasil (hijau)</p>
            <p>• <strong>Error:</strong> Untuk error dan kesalahan (merah)</p>
            <p>• <strong>Warning:</strong> Untuk peringatan (oranye)</p>
            <p>• <strong>Info:</strong> Untuk informasi umum (biru)</p>
            <p>• <strong>Loading:</strong> Untuk proses yang sedang berjalan (ungu)</p>
          </div>
        </div>
      </div>
    </div>
  );
}