'use client';

import React, { useState, useEffect, useRef } from 'react';

type Props = Readonly<{
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
}>;

export default function SearchableDropdown({ options, value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [query, setQuery] = useState(value || ''); 
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (query !== value) {
            setQuery(value || '');
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, query, value]);

  const handleOptionClick = (option: string) => {
    onChange?.(option);
    setQuery(option);  
    setIsOpen(false);  
  };


  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setIsOpen(true);

    if (newQuery === '') {
        onChange?.('');
    }
  };
  const filteredOptions = options.filter(o => 
    o.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={dropdownRef} className="relative w-full max-w-md mx-auto mb-3">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          onFocus={() => setIsOpen(true)} 
          placeholder="Ketik atau pilih lokasi"
          className="bg-[#6B5DD6]/80 text-white px-6 py-3 rounded-lg border border-white/30 w-full
                     placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          style={{ paddingRight: '2.5rem' }} 
        />
        <span 
          onClick={() => setIsOpen(!isOpen)} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
        >
          {isOpen ? '▲' : '▼'}
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 bg-white rounded-lg w-full shadow-lg overflow-hidden z-10 max-h-60 overflow-y-auto">
       
          {filteredOptions.length === 0 && (
            <div className="px-6 py-3 text-center text-gray-500">
              Lokasi tidak ditemukan
            </div>
          )}

          {filteredOptions.map((o, index) => (
            <div
              key={`${o}-${index}`}
              onClick={() => handleOptionClick(o)}
              className={`px-6 py-3 text-center cursor-pointer transition-colors duration-150 ${
                value === o 
                ? 'bg-gray-200 text-black font-semibold' 
                : 'text-gray-800 hover:bg-gray-100'
              }`}>
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}