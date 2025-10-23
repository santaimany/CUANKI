import React from 'react';

// Menentukan tipe data untuk props agar lebih aman dan jelas
interface AccountCardProps {
  accountName: string;
  balance: number;
  color: string; // Terima class warna dari Tailwind, cth: 'bg-green-400'
  accountType?: string; // Tambahkan type untuk konsistensi dengan aset page
  onEdit?: () => void; // Optional edit handler
}

const AccountCard: React.FC<AccountCardProps> = ({
  accountName,
  balance,
  color,
  accountType,
  onEdit,
}) => {
  // Format angka menjadi format mata uang Rupiah (Rp 100.000)
  const formattedBalance = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // Menghilangkan ,00 jika tidak perlu
  }).format(balance);

  if (onEdit) {
    return (
      <button 
        className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg flex flex-col bg-white hover:shadow-xl transition-shadow cursor-pointer group w-full text-left min-w-0"
        onClick={onEdit}
        aria-label={`Edit account ${accountName}`}
      >
        {/* Bagian Atas: Nama Akun */}
        <div className="py-4 sm:py-5 px-4 sm:px-6 relative">
            <h3 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#363256] break-words max-w-full leading-tight">
            {accountName}
          </h3>
          {accountType && (
            <p className="text-center text-xs sm:text-sm text-[#363256]/70 mt-1">
              {accountType}
            </p>
          )}
        </div>

        {/* Bagian Bawah: Saldo */}
        <div className={`${color} text-black py-3 sm:py-4 px-4 sm:px-6`}>
          <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl font-bold break-words max-w-full leading-tight">
            {formattedBalance}
          </p>
        </div>
      </button>
    );
  }

  return (
    <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg flex flex-col bg-white min-w-0">
      {/* Bagian Atas: Nama Akun */}
      <div className="py-4 sm:py-5 px-4 sm:px-6 relative">
        <h3 className="text-center text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold text-[#363256] break-words max-w-full leading-tight">
          {accountName}
        </h3>
        {accountType && (
          <p className="text-center text-xs sm:text-sm text-[#363256]/70 mt-1">
            {accountType}
          </p>
        )}
      </div>

      {/* Bagian Bawah: Saldo */}
      <div className={`${color} text-black py-3 sm:py-4 px-4 sm:px-6`}>
        <p className="text-center text-sm sm:text-base md:text-lg lg:text-lg font-bold break-words max-w-full leading-tight">
          {formattedBalance}
        </p>
      </div>
    </div>
  );
};

export default AccountCard;