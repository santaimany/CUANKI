'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import CalendarPicker from './CalendarPicker';
import { getDetailReceiptExpense, getDetailReceiptIncome } from '@/lib/services/dashboardService';
import type { ExpenseItem, IncomeItem } from '@/types/api';
import type { DisplayTransaction } from '@/types/transaction';
import { useToast } from '@/context/ToastContext';
import { useIsMobile } from '@/hooks/useIsMobile';
import TransactionItem from './TransactionItem'; // Impor komponen item

// Tipe data (bisa dipindah ke file types)
interface SummaryData {
  formatted: {
    total_expenses?: string;
    expense_count?: string;
    total_incomes?: string;
    income_count?: string;
  };
}

interface NavigationData {
  has_previous: boolean;
  has_next: boolean;
  previous_date: string | null;
  next_date: string | null;
}

interface TransactionListProps {
  filterType?: 'expense' | 'income';
  onRefresh?: () => void;
  searchQuery?: string;
}

// Helper untuk format tanggal (FIX TIMEZONE BUG)
const formatDateToAPI = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const TransactionList: React.FC<TransactionListProps> = ({ 
  filterType = 'expense', 
  searchQuery = '' 
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transactions, setTransactions] = useState<(ExpenseItem | IncomeItem)[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [navigation, setNavigation] = useState<NavigationData | null>(null);
  const { showError } = useToast();
  const isMobile = useIsMobile();

  // Fetch data
  const fetchTransactionData = useCallback(async (date: Date) => {
    setLoading(true);
    setTransactions([]);
    try {
      // FIX: Gunakan helper untuk format tanggal lokal
      const dateStr = formatDateToAPI(date);
      
      if (filterType === 'expense') {
        const response = await getDetailReceiptExpense(dateStr);
        setTransactions(response.data.expenses);
        setSummary(response.data.summary);
        setNavigation(response.data.navigation);
      } else {
        const response = await getDetailReceiptIncome(dateStr);
        setTransactions(response.data.incomes);
        setSummary(response.data.summary);
        setNavigation(response.data.navigation);
      }
    } catch (error) {
      console.error('Error fetching transaction data:', error);
      showError(error instanceof Error ? error.message : 'Gagal memuat data transaksi');
    } finally {
      setLoading(false);
    }
  }, [filterType, showError]);


  useEffect(() => {
    fetchTransactionData(selectedDate);
  }, [selectedDate, filterType, fetchTransactionData]);
 
  useEffect(() => {
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

  const allDisplayTransactions: DisplayTransaction[] = useMemo(() => {
    return transactions.map((transaction) => {
      if (filterType === 'expense') {
        const expense = transaction as ExpenseItem;
        return {
          id: expense.expense_id,
          category: expense.category.name,
          description: expense.note,
          amount: -Number.parseFloat(expense.amount), // Negatif
          date: expense.formatted.expense_date,
          time: expense.formatted.expense_time,
          source: expense.from_bank.code_name,
          datetime: expense.formatted.expense_datetime,
        };
      } else {
        const income = transaction as IncomeItem;
        return {
          id: income.income_id,
          category: income.income_source,
          description: income.note,
          amount: Number.parseFloat(income.amount), // Positif
          date: income.formatted.received_date,
          time: income.formatted.received_time,
          source: income.to_bank.code_name,
          datetime: income.formatted.received_datetime,
        };
      }
    });
  }, [transactions, filterType]);

  const displayTransactions = useMemo(() => {
    if (!searchQuery.trim()) return allDisplayTransactions;
    
    const query = searchQuery.toLowerCase();
    return allDisplayTransactions.filter(transaction =>
      transaction.category.toLowerCase().includes(query) ||
      transaction.description.toLowerCase().includes(query) ||
      transaction.source.toLowerCase().includes(query)
    );
  }, [allDisplayTransactions, searchQuery]);

  const displaySummary = useMemo(() => {
    const isSearching = searchQuery.trim().length > 0;
    
    if (!isSearching && summary) {
      return summary.formatted;
    }
    
    if (isSearching) {
      const count = displayTransactions.length;
      const total = displayTransactions.reduce((acc, t) => acc + t.amount, 0);

      if (filterType === 'expense') {
        return {
          total_expenses: `Rp ${Math.abs(total).toLocaleString('id-ID')}`,
          expense_count: `${count} Transaksi`,
        };
      } else {
        return {
          total_incomes: `Rp ${total.toLocaleString('id-ID')}`,
          income_count: `${count} Transaksi`,
        };
      }
    }
    
    return null;

  }, [searchQuery, summary, displayTransactions, filterType]);


  // Nama bulan
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
  const displayMonth = `${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;

  // Navigasi tanggal
  const handlePrevDate = () => {
    if (navigation?.has_previous && navigation.previous_date) {
      setSelectedDate(new Date(navigation.previous_date));
    }
  };

  const handleNextDate = () => {
    if (navigation?.has_next && navigation.next_date) {
      setSelectedDate(new Date(navigation.next_date));
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowCalendar(false); // Tutup kalender setelah memilih
  };

  return (
    <div className="space-y-4 sm:space-y-6 bg-[#50488A] p-3 sm:p-4 rounded-xl sm:rounded-2xl">

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
        <div>
          <h3 className="text-white text-base sm:text-lg md:text-xl font-medium">
            Transaksi {selectedDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </h3>
      
          {displaySummary && (
            <p className="text-[#00F5A0] text-xs sm:text-sm mt-1">
              {filterType === 'expense' 
                ? `${displaySummary.total_expenses} • ${displaySummary.expense_count}`
                : `${displaySummary.total_incomes} • ${displaySummary.income_count}`
              }
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <button 
            onClick={handlePrevDate}
            disabled={!navigation?.has_previous || loading}
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
                isMobile={isMobile}
              />
            )}
          </div>
          <button 
            onClick={handleNextDate}
            disabled={!navigation?.has_next || loading}
            className="text-white/60 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>


      </div>

      {loading && (
        <div className="text-center py-8 sm:py-12">
          <div className="text-white/50 text-base sm:text-lg md:text-xl mb-2">Memuat transaksi...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00F5A0] mx-auto"></div>
        </div>
      )}
      
      {!loading && displayTransactions.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <div className="text-white/50 text-base sm:text-lg md:text-xl mb-2">
            {searchQuery.trim().length > 0 ? 'Transaksi tidak ditemukan' : 'Tidak ada transaksi'}
          </div>
          <div className="text-white/30 text-sm sm:text-base md:text-lg">
            {searchQuery.trim().length > 0
              ? 'Coba kata kunci lain'
              : `Belum ada ${filterType === 'expense' ? 'pengeluaran' : 'pendapatan'} pada tanggal ini`
            }
          </div>
        </div>
      )}
      
      {/* Render list menggunakan komponen TransactionItem */}
      {!loading && displayTransactions.length > 0 && (
        <div className="space-y-2 sm:space-y-3">
          {displayTransactions.map((transaction) => (
            <TransactionItem 
              key={transaction.id} 
              transaction={transaction} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;