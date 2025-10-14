import React from 'react';
import AccountCard from './AccountCard'; // Sesuaikan path ke komponen Anda

const MyAccounts = () => {
  // Siapkan data akun dalam bentuk array of objects
  const accounts = [
    { name: 'BCA', balance: 7500, color: 'bg-[#00F5A0]' },
    { name: 'BSI', balance: 15000, color: 'bg-[#15803d]' }, // Hijau tua
    { name: 'BSI', balance: 100000, color: 'bg-[#6ee7b7]' }, // Hijau muda
    { name: 'Cash', balance: 100000, color: 'bg-[#0d9488]' }, // Teal
  ];

  return (
    // Container untuk grid
    <div className="p-8 bg-[#363256]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Gunakan .map untuk membuat kartu dari setiap item data */}
        {accounts.map((account, index) => (
          <AccountCard
            key={index}
            accountName={account.name}
            balance={account.balance}
            color={account.color}
          />
        ))}
      </div>
    </div>
  );
};

export default MyAccounts;