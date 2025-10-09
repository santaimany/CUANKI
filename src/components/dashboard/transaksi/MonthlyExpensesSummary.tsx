'use client';
import React from 'react';

interface ExpenseItem {
  id: string;
  name: string;
  description: string;
  amount: number;
  icon?: string;
  completed?: boolean;
}

interface MonthlyExpensesSummaryProps {
  expenses?: ExpenseItem[];
}

const MonthlyExpensesSummary: React.FC<MonthlyExpensesSummaryProps> = ({ expenses }) => {
  const defaultExpenses: ExpenseItem[] = [
    { id: '1', name: 'Bensin', description: 'Rp 200.000,00', amount: 200000, completed: true },
    { id: '2', name: 'Peralatan', description: 'Rp 170.000,00', amount: 170000, completed: true },
    { id: '3', name: 'Laundry', description: 'Rp 100.000,00', amount: 100000, completed: true },
    { id: '4', name: 'Paketan', description: 'Hairdatas', amount: 0, completed: true },
    { id: '5', name: 'Akun Premium', description: 'Ramaylnya', amount: 0, completed: true },
  ];

  const displayExpenses = expenses || defaultExpenses;

  return (
    <div className="bg-gradient-to-b from-[#6B5CE7] to-[#5A4FCF] rounded-2xl p-6">
      <h3 className="text-white text-2xl font-semibold mb-6">Pengeluaran Bulanan</h3>
      
      {/* Expense List */}
      <div className="space-y-3 mb-6">
        {displayExpenses.map((expense) => (
          <div
            key={expense.id}
            className="bg-white/10 rounded-xl p-4 flex items-center justify-between hover:bg-white/15 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-medium">{expense.name}</h4>
                <p className="text-white/70 text-sm">{expense.description}</p>
              </div>
            </div>
            
            {expense.completed && (
              <div className="w-6 h-6 bg-[#00F5A0] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Add Button */}
      <button className="w-full bg-[#00F5A0] text-black font-bold py-4 rounded-2xl hover:bg-[#00E68F] transition-colors flex items-center justify-center gap-2">
        <span>Atur Pengeluaran Bulanan</span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default MonthlyExpensesSummary;
