import React from 'react';

type Props = {
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
  onSelectNext?: () => void;
};

export default function DropdownSelect({ options, value, onChange, onSelectNext }: Props) {

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* selection pill (chat-like) */}
      <div className="mb-3 flex justify-center">
        <div className="bg-[#6B5DD6]/80 text-white px-6 py-3 rounded-lg border border-white/30 w-full max-w-md text-center">
          {value || 'Pilih lokasi'}
        </div>
      </div>

      {/* dropdown list styled as white rounded box */}
      <div className="bg-white rounded-lg w-full max-w-md mx-auto shadow-md overflow-hidden">
          {options.map((o) => (
            <div
              key={o}
              onClick={() => { onChange?.(o); onSelectNext?.(); }}
              className={`px-6 py-3 text-center cursor-pointer ${value === o ? 'bg-gray-300 text-black' : 'text-gray-800'}`}>
              {o}
            </div>
          ))}
        </div>
    </div>
  );
}
