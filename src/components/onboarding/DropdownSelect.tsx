import React, { useState, useEffect, useRef } from 'react';

type Props = Readonly<{
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
}>;

export default function DropdownSelect({ options, value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Fungsi ini sekarang HANYA mengubah nilai dan menutup dropdown
  const handleOptionClick = (option: string) => {
    onChange?.(option);
    setIsOpen(false);
    // onSelectNext?.(); <-- BARIS INI DIHAPUS
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-md mx-auto">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="mb-3 flex justify-between items-center bg-[#6B5DD6]/80 text-white px-6 py-3 rounded-lg border border-white/30 w-full text-center cursor-pointer"
      >
        <span>{value || 'Pilih lokasi'}</span>
        <span className="transform transition-transform duration-200">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 bg-white rounded-lg w-full shadow-lg overflow-hidden z-10 max-h-60 overflow-y-auto">
          {options.map((o, index) => (
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