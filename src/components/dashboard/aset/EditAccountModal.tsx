'use client';
import React, { useState, useEffect } from 'react';
import { UserAccount } from '@/types/api';
import { updateAccountAllocation } from '@/lib/api/user';

interface EditAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: UserAccount | null;
  onSuccess: () => void;
}

const EditAccountModal: React.FC<EditAccountModalProps> = ({
  isOpen,
  onClose,
  account,
  onSuccess,
}) => {
  const [balance, setBalance] = useState<string>('');
  const [accountType, setAccountType] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const accountTypes = ['Kebutuhan', 'Tabungan', 'Darurat'];

  useEffect(() => {
    if (account) {
      setBalance(account.balance);
      setAccountType(account.type);
    }
  }, [account]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) return;

    setLoading(true);
    setError(null);

    try {
      console.log('🔍 Full account object:', account);
      console.log('🔍 Available fields in account:', Object.keys(account));
      console.log('🔍 Current account data:', {
        account_id: account.account_id,
        account_allocation_id: account.account_allocation_id,
        account_name: account.account_name,
        current_type: account.type,
        current_balance: account.balance,
        new_type: accountType,
        new_balance: balance,
      });

      // Cari allocation_id dari berbagai kemungkinan field name
      const accountWithId = account as UserAccount & { allocation_id?: number; id?: number };
      const allocationId = account.account_allocation_id 
        || accountWithId.allocation_id 
        || accountWithId.id
        || (typeof account.value === 'string' ? Number.parseInt(account.value) : account.value);
      
      console.log('🔍 Detected allocation ID:', allocationId, 'Type:', typeof allocationId);
      
      if (!allocationId) {
        console.error('❌ Cannot find allocation ID in any field!');
        console.error('📋 Account object keys:', Object.keys(account));
        console.error('📋 Account values:', Object.values(account));
        setError('ID alokasi tidak ditemukan. Data akun: ' + JSON.stringify(Object.keys(account)));
        setLoading(false);
        return;
      }

      // Build request data
      const requestData: {
        account_allocation_id: number;
        new_type?: string;
        new_balance?: string;
      } = {
        account_allocation_id: typeof allocationId === 'string' ? Number.parseInt(allocationId) : allocationId,
      };

      // Only include type if it changed
      if (accountType !== account.type) {
        requestData.new_type = accountType;
      }

      // Only include balance if it changed (compare raw numbers)
      const currentBalance = account.balance.toString();
      const newBalance = balance.toString();
      if (newBalance !== currentBalance) {
        requestData.new_balance = newBalance;
      }

      // Check if anything actually changed
      if (!requestData.new_type && !requestData.new_balance) {
        setError('Tidak ada perubahan yang dibuat.');
        setLoading(false);
        return;
      }

      console.log('📤 Sending request data:', requestData);

      const response = await updateAccountAllocation(requestData);
      
      console.log('✅ Update successful:', response);
      console.log('📊 Change summary:', response.data.change_summary);
      console.log('🏦 Updated accounts:', response.data.updated_accounts);

      onSuccess();
      onClose();
      setBalance('');
      setAccountType('');
    } catch (err) {
      console.error('❌ Error updating account allocation:', err);
      
      // Type guard for axios error
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { message?: string; error?: string; errors?: Record<string, string[]> } } };
        console.error('📋 Error response:', axiosError.response?.data);
        console.error('📋 Validation errors:', axiosError.response?.data?.errors);
        
        // Build error message with validation details
        let errorMessage = axiosError.response?.data?.message || 'Gagal mengupdate akun.';
        
        // Add validation errors if available
        const validationErrors = axiosError.response?.data?.errors;
        if (validationErrors) {
          const errorDetails = Object.entries(validationErrors)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('\n');
          errorMessage += '\n\nDetail:\n' + errorDetails;
        }
        
        setError(errorMessage);
      } else {
        setError('Gagal mengupdate akun. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(/\D/g, '');
    setBalance(value);
  };

  if (!isOpen || !account) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#5B4E96] rounded-3xl p-6 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={onClose}
            className="text-white hover:text-white/80 transition-colors"
            disabled={loading}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h2 className="text-white text-xl font-semibold ml-4">Edit Saldo Akun</h2>
        </div>

        {/* Account Info */}
        <div className="bg-white/10 rounded-2xl p-4 mb-4">
          <p className="text-white/70 text-sm mb-1">Akun</p>
          <p className="text-white text-lg font-bold">{account.account_name}</p>
          <p className="text-white/70 text-xs mt-1">Tipe: {account.type}</p>
          <p className="text-white/70 text-sm mt-3">Saldo Saat Ini</p>
          <p className="text-white text-lg font-bold">{account.formatted_balance}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Account Type Dropdown */}
          <div>
            <label htmlFor="account-type" className="block text-white/80 text-sm mb-2">
              Tipe Akun
            </label>
            <select
              id="account-type"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full bg-white rounded-xl px-4 py-3 text-gray-800 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-[#00F5A0]"
              required
              disabled={loading}
            >
              {accountTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Balance Input */}
          <div>
            <label htmlFor="balance-input" className="block text-white/80 text-sm mb-2">
              Saldo Baru
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800 font-semibold">
                Rp
              </span>
              <input
                id="balance-input"
                type="text"
                value={balance ? Number.parseInt(balance).toLocaleString('id-ID') : ''}
                onChange={handleBalanceChange}
                className="w-full bg-white rounded-xl pl-12 pr-4 py-3 text-gray-800 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-[#00F5A0]"
                placeholder="0"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-xl p-3">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/10 text-white font-bold py-3 rounded-2xl hover:bg-white/20 transition-all disabled:opacity-50"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#A3FFD6] to-[#0EFF95] text-black font-bold py-3 rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccountModal;
