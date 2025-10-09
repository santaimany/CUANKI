'use client';
import React from 'react';

interface Transaction {
  id: string;
  category: string;
  description: string;
  date: string;
  time: string;
  amount: number;
  source: string;
  icon?: string;
}

interface TransactionListProps {
  transactions?: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  // Sample data
  const defaultTransactions: Transaction[] = [
    {
      id: '1',
      category: 'Food & beverages',
      description: 'Ayam tulkiran',
      date: '03/10/2025',
      time: 'Pukul 00:07',
      amount: -10000,
      source: 'from BCA',
    },
    {
      id: '2',
      category: 'Food & beverages',
      description: 'Ayam tulkiran',
      date: '03/10/2025',
      time: 'Pukul 00:07',
      amount: -10000,
      source: 'from BCA',
    },
  ];

  const displayTransactions = transactions || defaultTransactions;

  // Group transactions by date
  const groupedTransactions = displayTransactions.reduce((acc, transaction) => {
    const dateKey = new Date(transaction.date.split('/').reverse().join('-')).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedTransactions).map(([date, transactions]) => (
        <div key={date}>
          {/* Date Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-xl font-medium">{date}</h3>
            <div className="flex items-center gap-4">
              <button className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="text-white font-medium">Okt 2025</span>
              <button className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Transaction Items */}
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-[#6B5CE7]/30 rounded-2xl p-4 flex items-center justify-between hover:bg-[#6B5CE7]/40 transition-colors"
              >
                {/* Left Side - Icon and Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">{transaction.category}</h4>
                    <p className="text-white/70 text-sm">{transaction.description}</p>
                  </div>
                </div>

                {/* Right Side - Date, Amount, Source */}
                <div className="text-right">
                  <div className="text-white/70 text-sm mb-1">
                    {transaction.date} {transaction.time}
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <span className={`text-xl font-bold ${
                      transaction.amount < 0 ? 'text-[#FF6B47]' : 'text-[#00F5A0]'
                    }`}>
                      {transaction.amount < 0 ? '-' : '+'}Rp {Math.abs(transaction.amount).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="text-white/50 text-xs mt-1">{transaction.source}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
