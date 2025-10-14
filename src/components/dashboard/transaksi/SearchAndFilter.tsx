'use client';
import React from 'react';

interface SearchAndFilterProps {
  onSearch?: (query: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ onSearch }) => {
  return (
    <div className="flex items-center bg-[#50488A] p-2  rounded-3xl gap-4">
    
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder="Cari pencatatan"
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full bg-white text-black placeholder-black/50 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
        />
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
      
      <button className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </button>
    </div>
  );
};

export default SearchAndFilter;
