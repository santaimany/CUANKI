'use client';
import React, { useState, useEffect, useCallback } from 'react';
import CalendarPicker from './CalendarPicker';
import { getDetailReceiptExpense, getDetailReceiptIncome } from '@/lib/services/dashboardService';
import type { ExpenseItem, IncomeItem } from '@/types/api';
import { useToast } from '@/context/ToastContext';

interface TransactionListProps {
  filterType?: 'expense' | 'income';
  onRefresh?: () => void; // Optional callback for refreshing parent data
  searchQuery?: string; // Search query for filtering transactions
}

interface DisplayTransaction {
  id: number;
  category: string;
  description: string;
  amount: number;
  date: string;
  time: string;
  source: string;
  datetime: string;
  status?: string; // For income transactions
}

const TransactionList: React.FC<TransactionListProps> = ({ filterType = 'expense', onRefresh, searchQuery = '' }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [incomes, setIncomes] = useState<IncomeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<{
    formatted: {
      total_expenses?: string;
      expense_count?: string;
      total_incomes?: string;
      income_count?: string;
    };
  } | null>(null);
  const [navigation, setNavigation] = useState<{
    has_previous: boolean;
    has_next: boolean;
    previous_date: string | null;
    next_date: string | null;
  } | null>(null);
  const { showError } = useToast();

  // Fetch data based on selected date and filter type
  const fetchTransactionData = useCallback(async (date: Date) => {
    setLoading(true);
    try {
      const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      if (filterType === 'expense') {
        const response = await getDetailReceiptExpense(dateStr);
        setExpenses(response.data.expenses);
        setSummary(response.data.summary);
        setNavigation(response.data.navigation);
      } else {
        const response = await getDetailReceiptIncome(dateStr);
        setIncomes(response.data.incomes);
        setSummary(response.data.summary);
        setNavigation(response.data.navigation);
      }
    } catch (error) {
      console.error('Error fetching transaction data:', error);
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('Gagal memuat data transaksi');
      }
    } finally {
      setLoading(false);
      // Call refresh callback if provided
      if (onRefresh) {
        onRefresh();
      }
    }
  }, [filterType, showError, onRefresh]);

  // Load data when component mounts or date/filterType changes
  useEffect(() => {
    fetchTransactionData(selectedDate);
  }, [selectedDate, filterType, fetchTransactionData]);

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

  // Get current transactions based on filter type
  const currentTransactions = filterType === 'expense' ? expenses : incomes;

  // Format transactions for display
  const allDisplayTransactions: DisplayTransaction[] = currentTransactions.map((transaction) => {
    if (filterType === 'expense') {
      const expense = transaction as ExpenseItem;
      return {
        id: expense.expense_id,
        category: expense.category.name,
        description: expense.note,
        amount: -Number.parseFloat(expense.amount), // Negative for expense
        date: expense.formatted.expense_date,
        time: expense.formatted.expense_time,
        source: expense.from_bank.bank_name,
        datetime: expense.formatted.expense_datetime,
      };
    } else {
      const income = transaction as IncomeItem;
      return {
        id: income.income_id,
        category: income.income_source,
        description: income.note,
        amount: Number.parseFloat(income.amount), // Positive for income
        date: income.formatted.received_date,
        time: income.formatted.received_time,
        source: income.to_bank.bank_name,
        datetime: income.formatted.received_datetime,
        status: income.formatted.confirmation_status,
      };
    }
  });

  // Filter transactions based on search query
  const displayTransactions = allDisplayTransactions.filter(transaction => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      transaction.category.toLowerCase().includes(query) ||
      transaction.description.toLowerCase().includes(query) ||
      transaction.source.toLowerCase().includes(query)
    );
  });

  // Group transactions by the single date (since API returns data for specific date)
  const groupedTransactions = displayTransactions.length > 0 
    ? { [displayTransactions[0].date]: displayTransactions }
    : {};

  // Get month name in Indonesian
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
  const displayMonth = `${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;

  // Navigate dates using API navigation
  const handlePrevDate = () => {
    if (navigation?.has_previous && navigation.previous_date) {
      const prevDate = new Date(navigation.previous_date);
      setSelectedDate(prevDate);
    }
  };

  const handleNextDate = () => {
    if (navigation?.has_next && navigation.next_date) {
      const nextDate = new Date(navigation.next_date);
      setSelectedDate(nextDate);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="space-y-4 sm:space-y-6 bg-[#50488A] p-3 sm:p-4 rounded-xl sm:rounded-2xl">
      {/* Date Navigation Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
        <div>
          <h3 className="text-white text-base sm:text-lg md:text-xl font-medium">
            Transaksi {selectedDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </h3>
          {summary && (
            <p className="text-[#00F5A0] text-xs sm:text-sm mt-1">
              {filterType === 'expense' 
                ? `${summary.formatted.total_expenses} • ${summary.formatted.expense_count}`
                : `${summary.formatted.total_incomes} • ${summary.formatted.income_count}`
              }
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <button 
            onClick={handlePrevDate}
            disabled={!navigation?.has_previous}
            className="text-white/60 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
            onClick={handleNextDate}
            disabled={!navigation?.has_next}
            className="text-white/60 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Transaction Content */}
      {loading && (
        <div className="text-center py-8 sm:py-12">
          <div className="text-white/50 text-base sm:text-lg md:text-xl mb-2">Memuat transaksi...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00F5A0] mx-auto"></div>
        </div>
      )}
      
      {!loading && Object.keys(groupedTransactions).length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <div className="text-white/50 text-base sm:text-lg md:text-xl mb-2">Tidak ada transaksi</div>
          <div className="text-white/30 text-sm sm:text-base md:text-lg">
            Belum ada {filterType === 'expense' ? 'pengeluaran' : 'pendapatan'} pada tanggal ini
          </div>
        </div>
      )}
      
      {!loading && Object.keys(groupedTransactions).length > 0 && (
        <>
        {Object.entries(groupedTransactions).map(([date, transactions]) => (
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
                    {filterType === 'income' && transaction.status && (
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        transaction.status === 'Pending' 
                          ? 'bg-yellow-500/20 text-yellow-300' 
                          : 'bg-green-500/20 text-green-300'
                      }`}>
                        {transaction.status}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 sm:gap-0 w-full sm:w-auto">
                  <div className="text-white text-xs sm:text-sm md:text-base lg:text-xl sm:mb-10 sm:mr-5">
                    {transaction.time}
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="flex bg-white rounded-full p-1.5 sm:p-2 items-center justify-center gap-1 sm:gap-2">
                      <span className={`text-xs sm:text-sm md:text-base lg:text-xl font-bold ${
                        transaction.amount < 0 ? 'text-[#FF6B47]' : 'text-[#00F5A0]'
                      }`}>
                        {transaction.amount < 0 ? '-' : '+'}Rp {Math.abs(transaction.amount).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="text-white/50 text-xs sm:text-sm md:text-base lg:text-lg mt-1 truncate">{transaction.source}</div>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>
        ))}
        </>
      )}
    </div>
  );
};

export default TransactionList;
