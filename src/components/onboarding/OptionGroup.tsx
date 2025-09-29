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
          className={`px-6 py-3 rounded-md border border-white/30 text-white/90 hover:bg-white/5 transition ${selected === opt ? 'bg-white/10' : ''}`}>
          {opt}
        </button>
      ))}
    </div>
  );
}
