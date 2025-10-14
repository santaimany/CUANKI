'use client';
import React, { useState, useEffect } from 'react';
import { UserAccount } from '@/types/api';
import { updateAccountBalance } from '@/lib/api/user';

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
      await updateAccountBalance({
        account_id: account.account_id,
        type: accountType,
        balance_per_type: parseFloat(balance),
      });

      onSuccess();
      onClose();
      setBalance('');
      setAccountType('');
    } catch (err) {
      setError('Gagal mengupdate saldo. Silakan coba lagi.');
      console.error('Error updating balance:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
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
                value={balance ? parseInt(balance).toLocaleString('id-ID') : ''}
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
