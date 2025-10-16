'use client';
import React, { useState, useEffect } from 'react';
import { getUserAccounts, deleteAccount } from '@/lib/api/user';
import { UserAccount } from '@/types/api';
import EditAccountModal from './EditAccountModal';
import AddAccountModal from './AddAccountModal';
import { useToast } from '@/context/ToastContext';

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingAccountId, setDeletingAccountId] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<{ id: number; name: string } | null>(null);
  
  const { showError, showSuccess, showLoading } = useToast();

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await getUserAccounts();
      console.log('📊 Full API Response:', response);
      console.log('📊 Accounts data:', response.data.accounts);
      console.log('📊 First account structure:', response.data.accounts[0]);
      setAccounts(response.data.accounts);
      if (onAccountsChange) {
        onAccountsChange(response.data.accounts);
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
      showError('Gagal memuat data akun. Silakan coba lagi.');
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
    
    showSuccess('Akun berhasil diperbarui!');
  };

  const handleAddAccount = () => {
    setIsAddModalOpen(true);
  };

  const handleAddSuccess = async () => {
    await fetchAccounts();
    showSuccess('Akun berhasil ditambahkan!');
  };

  const handleDeleteAccount = (accountId: number, accountName: string) => {
    setAccountToDelete({ id: accountId, name: accountName });
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAccount = async () => {
    if (!accountToDelete) return;

    setDeletingAccountId(accountToDelete.id);
    setShowDeleteConfirm(false);
    
    showLoading(`Menghapus akun ${accountToDelete.name}...`);
    
    try {
      console.log('🗑️ Deleting account ID:', accountToDelete.id);
      console.log('🗑️ DELETE URL:', `/api/account/${accountToDelete.id}`);
      
      const response = await deleteAccount(accountToDelete.id);
      console.log('✅ Delete response:', response);
      
      // Refresh data setelah delete
      await fetchAccounts();
      
      // Reset ke halaman 1 jika halaman saat ini tidak ada data lagi
      const newTotalPages = Math.ceil((accounts.length - 1) / 4);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
      
      showSuccess(`Akun ${accountToDelete.name} berhasil dihapus!`);
    } catch (error) {
      console.error('❌ Error deleting account:', error);
      
      // Type guard for axios error
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string }; status?: number } };
        console.error('❌ Error response:', axiosError.response?.data);
        console.error('❌ Error status:', axiosError.response?.status);
        
        const errorMessage = axiosError.response?.data?.message || 'Gagal menghapus akun. Silakan coba lagi.';
        showError(errorMessage);
      } else {
        showError('Gagal menghapus akun. Silakan coba lagi.');
      }
    } finally {
      setDeletingAccountId(null);
      setAccountToDelete(null);
    }
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
              {/* Action Icons */}
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Edit Icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditAccount(account);
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-md transition-all"
                  title="Edit"
                >
                  <svg
                    className="w-4 h-4 text-[#363256]"
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
                </button>
                {/* Delete Icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAccount(account.account_id, account.account_name);
                  }}
                  disabled={deletingAccountId === account.account_id}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/80 hover:bg-red-500 shadow-md transition-all disabled:opacity-50"
                  title="Delete"
                >
                  {deletingAccountId === account.account_id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  )}
                </button>
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
          <button 
            onClick={handleAddAccount}
            className="flex-1 bg-[#00F5A0] text-black font-bold py-3 sm:py-4 text-sm sm:text-base rounded-2xl sm:rounded-3xl hover:shadow-lg transition-all"
          >
            + Tambah aset
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

      {/* Add Account Modal */}
      <AddAccountModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddSuccess}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && accountToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Hapus Akun
            </h3>

            {/* Message */}
            <p className="text-gray-600 text-center mb-6">
              Apakah Anda yakin ingin menghapus akun <span className="font-semibold text-gray-900">{accountToDelete.name}</span>? 
              <br />
              <span className="text-sm text-red-600 mt-1 block">Tindakan ini tidak dapat dibatalkan.</span>
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setAccountToDelete(null);
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-4 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                onClick={confirmDeleteAccount}
                disabled={deletingAccountId !== null}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deletingAccountId === accountToDelete.id ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetCards;
