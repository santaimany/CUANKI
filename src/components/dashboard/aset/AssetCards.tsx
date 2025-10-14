'use client';
import React, { useState, useEffect } from 'react';
import { getUserAccounts } from '@/lib/api/user';
import { UserAccount } from '@/types/api';
import EditAccountModal from './EditAccountModal';

interface AssetCardsProps {
  showButtons?: boolean;
  onAccountsChange?: (accounts: UserAccount[]) => void;
}

const AssetCards: React.FC<AssetCardsProps> = ({ showButtons = true, onAccountsChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [accounts, setAccounts] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<UserAccount | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await getUserAccounts();
      setAccounts(response.data.accounts);
      if (onAccountsChange) {
        onAccountsChange(response.data.accounts);
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = Math.ceil(accounts.length / 4);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEditAccount = (account: UserAccount) => {
    setSelectedAccount(account);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = async () => {
    // Simpan halaman saat ini sebelum refresh
    const currentPageBeforeUpdate = currentPage;
    
    await fetchAccounts();
    
    // Kembalikan ke halaman yang sama setelah refresh
    setCurrentPage(currentPageBeforeUpdate);
  };

  const getColorByType = (type: string) => {
    const colorMap: Record<string, string> = {
      'Kebutuhan': 'bg-[#00F5A0]',
      'Tabungan': 'bg-[#00D9D9]',
      'Darurat': 'bg-[#7BFFC7]',
      'default': 'bg-[#4DD4AC]'
    };
    return colorMap[type] || colorMap['default'];
  };

  const visibleAccounts = accounts.slice((currentPage - 1) * 4, currentPage * 4);

  if (loading) {
    return (
      <div className="mb-4 sm:mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg flex flex-col bg-white/10 animate-pulse"
            >
              <div className="py-4 sm:py-5 px-4 sm:px-6">
                <div className="h-8 bg-white/20 rounded mx-auto w-20"></div>
              </div>
              <div className="bg-white/20 py-3 sm:py-4 px-4 sm:px-6">
                <div className="h-6 bg-white/30 rounded mx-auto w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 sm:mb-6">
      {/* Asset Cards Grid - Compact style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {visibleAccounts.map((account) => (
          <div
            key={`${account.account_id}-${account.type}`}
            className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg flex flex-col bg-white hover:shadow-xl transition-shadow cursor-pointer group"
            onClick={() => handleEditAccount(account)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleEditAccount(account);
              }
            }}
            role="button"
            tabIndex={0}
          >
            {/* Bagian Atas: Nama Akun */}
            <div className="py-4 sm:py-5 px-4 sm:px-6 relative">
              <h3 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#363256]">
                {account.account_name}
              </h3>
              <p className="text-center text-xs sm:text-sm text-[#363256]/70 mt-1">
                {account.type}
              </p>
              {/* Edit Icon */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-5 h-5 text-[#363256]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
            </div>

            {/* Bagian Bawah: Saldo */}
            <div className={`${getColorByType(account.type)} text-black py-3 sm:py-4 px-4 sm:px-6`}>
              <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                {account.formatted_balance}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons - Only show if showButtons is true */}
      {showButtons && (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
          <button className="flex-1 bg-[#00F5A0] text-black font-bold py-3 sm:py-4 text-sm sm:text-base rounded-2xl sm:rounded-3xl hover:shadow-lg transition-all">
            + Tambah aset
          </button>
          <button className="flex-1 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white font-bold py-3 sm:py-4 text-sm sm:text-base rounded-2xl sm:rounded-3xl hover:shadow-lg transition-all">
            - Hapus aset
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#363256]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base rounded-full flex items-center justify-center font-semibold transition-colors ${
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
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#363256]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      {/* Edit Account Modal */}
      <EditAccountModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        account={selectedAccount}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default AssetCards;
