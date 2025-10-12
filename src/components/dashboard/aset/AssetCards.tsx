'use client';
import React, { useState } from 'react';

interface Asset {
  id: string;
  name: string;
  amount: number;
  color: string;
}

interface AssetCardsProps {
  assets?: Asset[];
  showButtons?: boolean;
}

const AssetCards: React.FC<AssetCardsProps> = ({ assets, showButtons = true }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const defaultAssets: Asset[] = [
    { id: '1', name: 'BSI', amount: 100000, color: 'bg-[#00F5A0]' },
    { id: '2', name: 'BCA', amount: 100000, color: 'bg-[#00D9D9]' },
    { id: '3', name: 'Sisa', amount: 100000, color: 'bg-[#7BFFC7]' },
    { id: '4', name: 'Cash', amount: 100000, color: 'bg-[#4DD4AC]' },
     { id: '5', name: 'Cash', amount: 100000, color: 'bg-[#4DD4AC]' },
  ];

  const displayAssets = assets || defaultAssets;
  const totalPages = Math.ceil(displayAssets.length / 4);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const visibleAssets = displayAssets.slice((currentPage - 1) * 4, currentPage * 4);

  return (
    <div className="mb-6">
      {/* Asset Cards Grid - Compact style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {visibleAssets.map((asset) => (
          <div
            key={asset.id}
            className="rounded-3xl overflow-hidden shadow-lg flex flex-col bg-white hover:shadow-xl transition-shadow cursor-pointer"
          >
            {/* Bagian Atas: Nama Akun */}
            <div className="py-5 px-6">
              <h3 className="text-center text-4xl font-bold text-[#363256]">
                {asset.name}
              </h3>
            </div>

            {/* Bagian Bawah: Saldo */}
            <div className={`${asset.color} text-black py-4 px-6`}>
              <p className="text-center text-2xl font-bold">
                Rp {asset.amount.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons - Only show if showButtons is true */}
      {showButtons && (
        <div className="flex gap-3 mb-6">
          <button className="flex-1 bg-[#00F5A0] text-black font-bold py-4 rounded-3xl hover:shadow-lg transition-all">
            + Tambah aset
          </button>
          <button className="flex-1 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white font-bold py-4 rounded-3xl hover:shadow-lg transition-all">
            - Hapus aset
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-[#363256]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                currentPage === page
                  ? 'bg-[#00F5A0] text-black'
                  : 'bg-white text-[#363256] hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-[#363256]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default AssetCards;
