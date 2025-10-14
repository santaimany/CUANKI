import React from 'react';

type Props = {
  options: string[];
  onSelect: (value: string) => void;
  selected?: string;
};

export default function OptionGroup({ options, onSelect, selected }: Props) {
  return (
    <div className="flex gap-4 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`px-20 bg-[#50488A] py-3 rounded-xl border border-b-2 cursor-pointer border-white/30 border-b-white text-white/90 hover:bg-[#7971BC] transition transform active:duration-100 hover:duration-200 ease-in-out active:scale-[.98] active:translate-y-px active:border-b-1 ${selected === opt ? 'bg-[#7971BC] ' : ''}`}>
          {opt}
        </button>
      ))}
    </div>
  );
}