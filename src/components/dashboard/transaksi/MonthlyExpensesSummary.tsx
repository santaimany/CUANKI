'use client';
import React, { useState } from 'react';

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{ name: string; amount: number }>({ 
    name: '', 
    amount: 0 
  });

  const defaultExpenses: ExpenseItem[] = [
    { id: '1', name: 'Bensin', description: 'Rp 200.000,00', amount: 200000, completed: true },
    { id: '2', name: 'Peralatan', description: 'Rp 170.000,00', amount: 170000, completed: true },
    { id: '3', name: 'Laundry', description: 'Rp 100.000,00', amount: 100000, completed: true },
    { id: '4', name: 'Paketan', description: 'Hairdatas', amount: 0, completed: true },
    { id: '5', name: 'Akun Premium', description: 'Ramaylnya', amount: 0, completed: true },
  ];

  const displayExpenses = expenses || defaultExpenses;

  const handleEditClick = (expense: ExpenseItem) => {
    if (editingId === expense.id) {
      // Save and close
      console.log('Saving:', editData);
      // TODO: Implement save logic here
      setEditingId(null);
    } else {
      setEditingId(expense.id);
      setEditData({
        name: expense.name,
        amount: expense.amount,
      });
    }
  };

  return (
    <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6">
      <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">Pengeluaran Bulanan</h3>
      
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        {displayExpenses.map((expense) => (
          <div 
            key={expense.id}
            className="bg-[#50488A] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 ease-in-out"
          >
            {/* Main Card - Clickable Header */}
            <div
              className="p-3 sm:p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => handleEditClick(expense)}
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#7971BC] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-white font-medium text-sm sm:text-base truncate">{expense.name}</h4>
                  <p className="text-white/70 text-xs sm:text-sm truncate">{expense.description}</p>
                </div>
              </div>
              
              {expense.completed && (
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#00F5A0] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* Accordion Content - Edit Form */}
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                editingId === expense.id 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-3 sm:pt-4 bg-[#7971BC]">
                <div className="space-y-3 sm:space-y-4">
                  <h5 className="text-white text-sm sm:text-base md:text-lg font-medium">Berapa yang kamu keluarkan?</h5>
                  
                  {/* Amount Input with underline */}
                  <div>
                    <input
                      type="text"
                      value={editData.amount === 0 ? '' : editData.amount.toLocaleString('id-ID')}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, '');
                        setEditData({ ...editData, amount: Number(numericValue) });
                      }}
                      placeholder="200.000"
                      className="w-full bg-transparent border-b-2 border-white text-white text-lg sm:text-xl md:text-2xl font-light pb-2 focus:outline-none focus:border-[#00F5A0] placeholder-white/50"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(null);
                      }}
                      className="flex-1 bg-white/10 text-white font-medium py-2 sm:py-3 rounded-xl hover:bg-white/20 transition-colors text-xs sm:text-sm"
                    >
                      Batal
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Saving:', editData);
                        // TODO: Implement save logic here
                        setEditingId(null);
                      }}
                      className="flex-1 bg-[#00F5A0] text-black font-medium py-2 sm:py-3 rounded-xl hover:bg-[#00E68F] transition-colors text-xs sm:text-sm"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add Button */}
      <button className="w-full bg-[#00F5A0] text-black font-bold py-3 sm:py-4 rounded-2xl sm:rounded-3xl border-b-2 border-white hover:bg-[#00E68F] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
        <span>Atur Pengeluaran Bulanan</span>
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default MonthlyExpensesSummary;
