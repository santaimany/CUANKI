'use client';
import React, { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios';

interface Bank {
  id: number;
  code_name: string;
  bank_name: string;
}

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddAccountModal: React.FC<AddAccountModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [bankId, setBankId] = useState<string>('');
  const [accountType, setAccountType] = useState<string>('Kebutuhan');
  const [balance, setBalance] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(true);

  const accountTypes = ['Kebutuhan', 'Tabungan', 'Darurat'];

  // Fetch banks from API
  useEffect(() => {
    if (isOpen) {
      fetchBanks();
    }
  }, [isOpen]);

  const fetchBanks = async () => {
    try {
      setLoadingBanks(true);
      const response = await axiosInstance.get('/api/listbank');
      const banksData = response.data.data || response.data;
      console.log('📊 Fetched banks:', banksData);
      setBanks(banksData);
    } catch (err) {
      console.error('❌ Error fetching banks:', err);
      setError('Gagal memuat daftar bank. Silakan coba lagi.');
    } finally {
      setLoadingBanks(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankId || !balance) {
      setError('Mohon lengkapi semua field.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const requestData = {
        bank_id: parseInt(bankId),
        type: accountType,
        balance_per_type: balance,
      };

      console.log('📤 Adding new account:', requestData);

      const response = await axiosInstance.post('/api/add-new-account', requestData);
      
      console.log('✅ Account added successfully:', response.data);

      onSuccess();
      onClose();
      setBankId('');
      setAccountType('Kebutuhan');
      setBalance('');
    } catch (err) {
      console.error('❌ Error adding account:', err);
      const errorMessage = err && typeof err === 'object' && 'response' in err
        ? ((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Gagal menambahkan akun. Silakan coba lagi.')
        : 'Gagal menambahkan akun. Silakan coba lagi.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setBalance(value);
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setBankId('');
      setAccountType('Kebutuhan');
      setBalance('');
      setError(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-[#5B4E96] rounded-3xl p-6 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={handleClose}
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
          <h2 className="text-white text-xl font-semibold ml-4">Tambah Akun Bank</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Bank Selection */}
          <div>
            <label htmlFor="bank-select" className="block text-white/80 text-sm mb-2">
              Pilih Bank
            </label>
            <select
              id="bank-select"
              value={bankId}
              onChange={(e) => setBankId(e.target.value)}
              className="w-full bg-white rounded-xl px-4 py-3 text-gray-800 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-[#00F5A0]"
              required
              disabled={loading}
            >
              <option value="">-- Pilih Bank --</option>
              {banks.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.code_name}
                </option>
              ))}
            </select>
          </div>

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
              Saldo Awal
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
              onClick={handleClose}
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
              {loading ? 'Menambahkan...' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccountModal;
