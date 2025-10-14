import React from 'react';

// Menentukan tipe data untuk props agar lebih aman dan jelas
interface AccountCardProps {
  accountName: string;
  balance: number;
  color: string; // Terima class warna dari Tailwind, cth: 'bg-green-400'
}

const AccountCard: React.FC<AccountCardProps> = ({
  accountName,
  balance,
  color,
}) => {
  // Format angka menjadi format mata uang Rupiah (Rp 100.000)
  const formattedBalance = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // Menghilangkan ,00 jika tidak perlu
  }).format(balance);

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg flex flex-col bg-white">
      {/* Bagian Atas: Nama Akun */}
      <div className="p-6">
        <h3 className="text-center text-3xl font-bold text-[#363256]">
          {accountName}
        </h3>
      </div>

      {/* Bagian Bawah: Saldo */}
      <div className={`${color} text-white p-4`}>
        <p className="text-center text-2xl font-semibold">
          {formattedBalance}
        </p>
      </div>
    </div>
  );
};

export default AccountCard;