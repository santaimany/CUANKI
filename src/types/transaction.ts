// Asumsikan ini adalah tipe dari API Anda
// (Anda sudah mengimpornya dari '@/types/api')
// import type { ExpenseItem, IncomeItem } from '@/types/api';

// Tipe data yang sudah diformat untuk ditampilkan di UI
export interface DisplayTransaction {
  id: number;
  category: string;
  description: string;
  amount: number; // Negatif untuk expense, Positif untuk income
  date: string;
  time: string;
  source: string;
  datetime: string;
  status?: string; // Untuk income
}