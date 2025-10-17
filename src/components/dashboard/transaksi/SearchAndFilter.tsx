'use client';
import React, { useState } from 'react';

interface SearchAndFilterProps {
  onSearch?: (query: string) => void;
  onFilter?: (filters: FilterOptions) => void;
}

interface FilterOptions {
  dateRange: 'today' | 'week' | 'month' | 'custom';
  amountRange: { min: number; max: number };
  categories: string[];
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ onSearch, onFilter }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: 'today',
    amountRange: { min: 0, max: 10000000 },
    categories: []
  });

  const handleApplyFilters = () => {
    onFilter?.(filters);
    setShowFilterModal(false);
  };

  return (
    <div className="flex items-center bg-[#50488A] p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl gap-2 sm:gap-3 md:gap-4">
    
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Cari pencatatan"
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full bg-white text-black placeholder-black/50 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base rounded-full focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
        />
        <button className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      
      <button 
        onClick={() => setShowFilterModal(true)}
        className="bg-white/10 p-2 sm:p-2.5 md:p-3 rounded-full hover:bg-white/20 transition-colors"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </button>
      
      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800">Filter Transaksi</h3>
              <button 
                onClick={() => setShowFilterModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Date Range Filter */}
            <div className="mb-6">
              <div className="block text-sm font-semibold text-gray-700 mb-3">Rentang Waktu</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'today', label: 'Hari Ini' },
                  { value: 'week', label: 'Minggu Ini' },
                  { value: 'month', label: 'Bulan Ini' },
                  { value: 'custom', label: 'Custom' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFilters(prev => ({ ...prev, dateRange: option.value as FilterOptions['dateRange'] }))}
                    className={`p-3 text-sm rounded-lg border-2 transition-colors ${
                      filters.dateRange === option.value
                        ? 'border-[#00F5A0] bg-[#00F5A0]/10 text-[#00A366]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Range Filter */}
            <div className="mb-6">
              <div className="block text-sm font-semibold text-gray-700 mb-3">Rentang Jumlah</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="min-amount" className="block text-xs text-gray-500 mb-1">Minimum</label>
                  <input
                    id="min-amount"
                    type="number"
                    value={filters.amountRange.min}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      amountRange: { ...prev.amountRange, min: Number(e.target.value) }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#00F5A0] focus:outline-none"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label htmlFor="max-amount" className="block text-xs text-gray-500 mb-1">Maksimum</label>
                  <input
                    id="max-amount"
                    type="number"
                    value={filters.amountRange.max}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      amountRange: { ...prev.amountRange, max: Number(e.target.value) }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:border-[#00F5A0] focus:outline-none"
                    placeholder="10000000"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setFilters({
                    dateRange: 'today',
                    amountRange: { min: 0, max: 10000000 },
                    categories: []
                  });
                }}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={handleApplyFilters}
                className="flex-1 py-3 px-4 bg-[#00F5A0] text-white rounded-lg hover:bg-[#00E68F] transition-colors"
              >
                Terapkan Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
