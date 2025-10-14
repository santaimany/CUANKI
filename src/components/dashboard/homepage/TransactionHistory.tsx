'use client';
import React from 'react';

// --- Kumpulan Ikon (sebagai komponen React) ---
// Anda bisa mengganti ini dengan file SVG atau library ikon Anda sendiri
const FoodIcon = () => ( <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17 2H7C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5zM7 4h10c1.654 0 3 1.346 3 3v1H4V7c0-1.654 1.346-3 3-3zM5 10h14v1h-7v2h5v1h-5v2h7v1H5v-7z"/></svg> );
const WalletIcon = () => ( <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm3 0a1 1 0 011-1h1a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" /></svg> );
const GasIcon = () => ( <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M15 4H9V2H7v2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1V2h-2v2zM8.5 15.25H11v1.5H8.5v-1.5zm0-2.5H11v1.5H8.5V12.75zm0-2.5H11v1.5H8.5V10.25zM15 15h-1.5l-1-1h-1.5v2.5H12V18h3v-3z"/></svg> );
const LaundryIcon = () => ( <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19.002 3h-14c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm-14 2h14v14h-14V5zm12 2H7v10h10V7zm-5 5c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm0-4c-.551 0-1 .449-1 1s.449 1 1 1 1-.449 1-1-.449-1-1-1z"/></svg> );
const CoffeeIcon = () => ( <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21c-1.103 0-2-.897-2-2h4c0 1.103-.897 2-2 2zM15.002 6.133C14.88 4.34 13.321 3 11.534 3H7.432C7.306 4.333 7.82 5.564 8 6.641V11c0 1.654 1.346 3 3 3h3c.125 0 .248-.013.369-.038C15.539 12.868 16 11.758 16 11V6.641c-.249-.663-.647-1.07-1.002-1.328l.004.82zM20 14h-2v-1c0-1.654-1.346-3-3-3v-1.168C14.394 8.242 14 7.426 14 6.641V5.5C14 3.57 12.43 2 10.5 2S7 3.57 7 5.5v1.141c0 .785-.394 1.601-1 2.168V11H4c-1.103 0-2 .897-2 2v2c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-2c0-1.103-.897-2-2-2z"/></svg> );
const ParkingIcon = () => ( <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path d="M13 12h-2v-4h4v6h-2z"/></svg> );


// --- Komponen untuk 1 Baris Transaksi ---
interface TransactionItemProps {
  icon: React.ReactNode;
  category: string;
  description: string;
  amount: number;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ icon, category, description, amount }) => {
  const isIncome = amount >= 0;

  // Format angka menjadi string (misal: 10.000)
  const formattedAmount = new Intl.NumberFormat('id-ID').format(Math.abs(amount));

  return (
    <div className="bg-[#50488A] flex items-center justify-between p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl">
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
        {/* Lingkaran Ikon */}
        <div className="bg-[#6F64A7] rounded-full p-2 sm:p-2.5 md:p-3 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        {/* Teks Kategori & Deskripsi */}
        <div className="min-w-0 flex-1">
          <p className="font-bold text-xs sm:text-sm md:text-base truncate">{category}</p>
          <p className="text-xs sm:text-sm text-white/70 truncate">{description}</p>
        </div>
      </div>

      {/* Nominal Transaksi */}
      <div className={`px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-bold flex-shrink-0 ${isIncome ? 'bg-green-400 text-green-900' : 'bg-red-400 text-red-900'}`}>
        <span>{isIncome ? '+' : '-'}{formattedAmount}</span>
      </div>
    </div>
  );
};


// --- Komponen Utama: Daftar Riwayat Transaksi ---
const TransactionHistoryList = () => {
  // Contoh data, ini bisa Anda dapatkan dari API
  const sampleTransactions = [
    { icon: <FoodIcon />, category: 'Makanan', description: 'Ayam tukiran', amount: -10000 },
    { icon: <WalletIcon />, category: 'Saku bulanan', description: 'Oktober', amount: 10000 },
    { icon: <GasIcon />, category: 'Bensin', description: 'Minggu 1', amount: -10000 },
    { icon: <LaundryIcon />, category: 'Loundry', description: 'Hari selasa', amount: -10000 }, // Typo diperbaiki
    { icon: <CoffeeIcon />, category: 'Ngopi', description: 'Ramahjiwa', amount: -10000 },
    { icon: <ParkingIcon />, category: 'Parkir', description: 'Ramahjiwa', amount: -10000 },
    { icon: <ParkingIcon />, category: 'Parkir', description: 'Ramahjiwa', amount: -10000 },
  ];

  return (
    <div className="bg-[#363256] p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl text-white w-full max-w-md mx-auto">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-5">Riwayat transaksi</h2>
      <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
        {sampleTransactions.map((transaction, index) => (
          <TransactionItem
            key={index}
            icon={transaction.icon}
            category={transaction.category}
            description={transaction.description}
            amount={transaction.amount}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionHistoryList;