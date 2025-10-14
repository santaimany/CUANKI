import React from 'react';

type Props = {
  value?: string;
  placeholder?: string;
  onChange?: (v: string) => void;
  onContinue?: () => void;
  disabled?: boolean;
};

export default function InputBar({ value = '', placeholder = '', onChange, onContinue, disabled = false }: Props) {
  return (
    <div className="w-full max-w-3xl flex items-center gap-2 sm:gap-3 md:gap-4">
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && !disabled) onContinue?.(); }}
        placeholder={placeholder}
        className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-white/60 outline-none"
      />
      <button
        onClick={() => !disabled && onContinue?.()}
        disabled={disabled}
        className={`px-3 sm:px-4 py-2 rounded-full font-semibold text-sm sm:text-base ${disabled ? 'bg-white/20 cursor-not-allowed text-white/60' : 'bg-[#00F5A0] text-black'}`}>
        Continue
      </button>
    </div>
  );
}
