import React from 'react';

type Props = {
  options: string[];
  onSelect: (value: string) => void;
  selected?: string;
};

export default function OptionGroup({ options, onSelect, selected }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 w-full">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`
            px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 rounded-xl border-2 cursor-pointer 
            text-sm sm:text-base font-medium min-h-[48px] flex items-center justify-center
            transition-all duration-200 ease-in-out transform active:scale-[.98] 
            touch-manipulation truncate
            ${selected === opt 
              ? 'bg-[#00F5A0] text-black border-[#00F5A0] shadow-lg ring-2 ring-[#00F5A0]/50 scale-105' 
              : 'bg-[#50488A] text-white/90 border-white/30 hover:bg-[#7971BC] hover:border-white/50 active:bg-[#6B5DD6]'
            }
          `}
        >
          <span className="relative">
            {opt}
            {selected === opt && (
              <span className="absolute -top-1 -right-2 w-2 h-2  rounded-full animate-pulse"></span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}