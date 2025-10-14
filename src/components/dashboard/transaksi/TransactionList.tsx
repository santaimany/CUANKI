'use client';
import React, { useState } from 'react';
import CalendarPicker from './CalendarPicker';
import { transactionData, Transaction } from '@/data/transactionData';

interface TransactionListProps {
  transactions?: Transaction[];
  filterType?: 'expense' | 'income';
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, filterType = 'expense' }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterBySpecificDate, setFilterBySpecificDate] = useState(false);

  // Close calendar when clicking outside
  React.useEffect(() => {
    if (!showCalendar) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.calendar-container')) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCalendar]);

  const displayTransactions = transactions || transactionData;

  // Filter transactions by selected date and type (expense/income)
  const filteredTransactions = displayTransactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date.split('/').reverse().join('-'));
    
    // Filter by specific date or just month/year
    const matchesDate = filterBySpecificDate
      ? (
          transactionDate.getDate() === selectedDate.getDate() &&
          transactionDate.getMonth() === selectedDate.getMonth() &&
          transactionDate.getFullYear() === selectedDate.getFullYear()
        )
      : (
          transactionDate.getMonth() === selectedDate.getMonth() &&
          transactionDate.getFullYear() === selectedDate.getFullYear()
        );
    
    // Filter by transaction type
    const matchesType = filterType === 'expense' 
      ? transaction.amount < 0 
      : transaction.amount > 0;
    
    return matchesDate && matchesType;
  });

  // Sort transactions by date (newest first)
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.date.split('/').reverse().join('-'));
    const dateB = new Date(b.date.split('/').reverse().join('-'));
    
    // Compare dates (descending - newest first)
    if (dateB.getTime() !== dateA.getTime()) {
      return dateB.getTime() - dateA.getTime();
    }
    
    // If same date, sort by time (parse "Pukul HH:MM")
    const timeA = a.time.replace('Pukul ', '').split(':');
    const timeB = b.time.replace('Pukul ', '').split(':');
    const minutesA = parseInt(timeA[0]) * 60 + parseInt(timeA[1]);
    const minutesB = parseInt(timeB[0]) * 60 + parseInt(timeB[1]);
    
    return minutesB - minutesA;
  });

  // Group transactions by date
  const groupedTransactions = sortedTransactions.reduce((acc, transaction) => {
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

  // Get month name in Indonesian
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
  const displayMonth = `${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;

  // Navigate months
  const handlePrevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
    setFilterBySpecificDate(false); // Reset to month view
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
    setFilterBySpecificDate(false); // Reset to month view
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setFilterBySpecificDate(true); // Enable specific date filtering
  };

  return (
    <div className="space-y-4 sm:space-y-6 bg-[#50488A] p-3 sm:p-4 rounded-xl sm:rounded-2xl">
      {/* Month Navigation Header - Always visible */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
        <div>
          <h3 className="text-white text-base sm:text-lg md:text-xl font-medium">
            {filterBySpecificDate 
              ? `Transaksi ${selectedDate.getDate()} ${displayMonth}` 
              : 'Transaksi Bulan Ini'
            }
          </h3>
          {filterBySpecificDate && (
            <button
              onClick={() => setFilterBySpecificDate(false)}
              className="text-[#00F5A0] text-xs sm:text-sm hover:underline mt-1"
            >
              ← Kembali ke tampilan bulan
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <button 
            onClick={handlePrevMonth}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="relative calendar-container">
            <button 
              onClick={() => setShowCalendar(!showCalendar)}
              className="text-white text-sm sm:text-base font-medium hover:text-[#00F5A0] transition-colors cursor-pointer"
            >
              {displayMonth}
            </button>
            {showCalendar && (
              <CalendarPicker
                selectedDate={selectedDate}
                onSelectDate={handleDateSelect}
                onClose={() => setShowCalendar(false)}
              />
            )}
          </div>
          <button 
            onClick={handleNextMonth}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Transaction Groups */}
      {Object.keys(groupedTransactions).length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <div className="text-white/50 text-base sm:text-lg md:text-xl mb-2">Tidak ada transaksi</div>
          <div className="text-white/30 text-sm sm:text-base md:text-lg">
            Belum ada {filterType === 'expense' ? 'pengeluaran' : 'pendapatan'} di bulan ini
          </div>
        </div>
      ) : (
        Object.entries(groupedTransactions).map(([date, transactions]) => (
        <div key={date}>
         
          {/* Date header for each day */}
          <div className="mb-3 sm:mb-4">
            <h4 className="text-white/70 text-sm sm:text-base md:text-lg font-medium">{date}</h4>
          </div>

          {/* Transaction Items */}
          <div className="space-y-2 sm:space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-[#7971BC] rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 hover:bg-[#6B5CE7]/40 transition-colors"
              >
                {/* Left Side - Icon and Info */}
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/10 rounded-2xl sm:rounded-3xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-white font-semibold text-sm sm:text-base md:text-lg lg:text-xl truncate">{transaction.category}</h4>
                    <p className="text-white/70 text-xs sm:text-sm md:text-base lg:text-lg truncate">{transaction.description}</p>
                  </div>
                </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 sm:gap-0 w-full sm:w-auto">
                  <div className="text-white text-xs sm:text-sm md:text-base lg:text-xl sm:mb-10 sm:mr-5">
                    {transaction.date} {transaction.time}
                  </div>
                <div className="text-left sm:text-right">
                  <div className="flex bg-white rounded-full p-1.5 sm:p-2 items-center justify-center gap-1 sm:gap-2">
                    <span className={`text-xs sm:text-sm md:text-base lg:text-xl font-bold ${
                      transaction.amount < 0 ? 'text-[#FF6B47]' : 'text-[#00F5A0]'
                    }`}>
                      {transaction.amount < 0 ? '-' : '+'}Rp {Math.abs(transaction.amount).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="text-white/50 text-xs sm:text-sm md:text-base lg:text-lg mt-1">{transaction.source}</div>
                </div>
            </div>
                
              </div>
            ))}
          </div>
        </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;
