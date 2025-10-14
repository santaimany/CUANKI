export interface Transaction {
  id: string;
  category: string;
  description: string;
  date: string; // Format: DD/MM/YYYY
  time: string;
  amount: number; // Negative for expenses, positive for income
  source: string;
  icon?: string;
}

export const transactionData: Transaction[] = [
  // October 2025 - Income
  {
    id: '1',
    category: 'Salary',
    description: 'Gaji Bulanan',
    date: '01/10/2025',
    time: 'Pukul 08:00',
    amount: 5000000,
    source: 'from BCA',
  },
  {
    id: '6',
    category: 'Freelance',
    description: 'Project web design',
    date: '05/10/2025',
    time: 'Pukul 14:00',
    amount: 1500000,
    source: 'from BCA',
  },
  {
    id: '9',
    category: 'Investment',
    description: 'Dividen saham',
    date: '10/10/2025',
    time: 'Pukul 10:00',
    amount: 500000,
    source: 'from BCA',
  },
  
  // October 2025 - Expenses
  {
    id: '2',
    category: 'Food & beverages',
    description: 'Ayam tulkiran',
    date: '01/10/2025',
    time: 'Pukul 00:07',
    amount: -10000,
    source: 'from BCA',
  },
  {
    id: '3',
    category: 'Food & beverages',
    description: 'Kopi pagi',
    date: '02/10/2025',
    time: 'Pukul 07:30',
    amount: -25000,
    source: 'from Gopay',
  },
  {
    id: '4',
    category: 'Transportation',
    description: 'Grab ke kantor',
    date: '02/10/2025',
    time: 'Pukul 08:15',
    amount: -35000,
    source: 'from Gopay',
  },
  {
    id: '5',
    category: 'Food & beverages',
    description: 'Makan siang',
    date: '03/10/2025',
    time: 'Pukul 12:30',
    amount: -45000,
    source: 'from BCA',
  },
  {
    id: '7',
    category: 'Shopping',
    description: 'Beli baju',
    date: '06/10/2025',
    time: 'Pukul 16:20',
    amount: -250000,
    source: 'from BCA',
  },
  {
    id: '8',
    category: 'Food & beverages',
    description: 'Dinner keluarga',
    date: '07/10/2025',
    time: 'Pukul 19:00',
    amount: -150000,
    source: 'from BCA',
  },
  {
    id: '10',
    category: 'Entertainment',
    description: 'Nonton bioskop',
    date: '11/10/2025',
    time: 'Pukul 20:00',
    amount: -75000,
    source: 'from Gopay',
  },
  {
    id: '16',
    category: 'Food & beverages',
    description: 'Coffee shop',
    date: '11/10/2025',
    time: 'Pukul 15:30',
    amount: -35000,
    source: 'from Gopay',
  },
  {
    id: '17',
    category: 'Transportation',
    description: 'Bensin motor',
    date: '08/10/2025',
    time: 'Pukul 09:00',
    amount: -50000,
    source: 'from BCA',
  },
  {
    id: '18',
    category: 'Food & beverages',
    description: 'Lunch meeting',
    date: '09/10/2025',
    time: 'Pukul 13:00',
    amount: -120000,
    source: 'from BCA',
  },
  
  // September 2025
  {
    id: '11',
    category: 'Salary',
    description: 'Gaji Bulanan',
    date: '01/09/2025',
    time: 'Pukul 08:00',
    amount: 5000000,
    source: 'from BCA',
  },
  {
    id: '12',
    category: 'Food & beverages',
    description: 'Groceries',
    date: '15/09/2025',
    time: 'Pukul 10:00',
    amount: -300000,
    source: 'from BCA',
  },
  {
    id: '13',
    category: 'Utilities',
    description: 'Bayar listrik',
    date: '20/09/2025',
    time: 'Pukul 14:00',
    amount: -200000,
    source: 'from BCA',
  },
  
  // November 2025
  {
    id: '14',
    category: 'Salary',
    description: 'Gaji Bulanan',
    date: '01/11/2025',
    time: 'Pukul 08:00',
    amount: 5000000,
    source: 'from BCA',
  },
  {
    id: '15',
    category: 'Food & beverages',
    description: 'Lunch with friends',
    date: '05/11/2025',
    time: 'Pukul 12:00',
    amount: -100000,
    source: 'from BCA',
  },
];
