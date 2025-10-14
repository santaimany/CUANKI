import React from 'react';

type CurrencyInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function CurrencyInput({ value, onChange, placeholder }: CurrencyInputProps) {
  const formatCurrency = (val: string) => {
    const numbers = val.replace(/\D/g, '');
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\./g, '');
    onChange(rawValue);
  };

  const displayValue = value ? formatCurrency(value) : '';

  return (
    <div className="relative">
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder || '0'}
        className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white text-center text-lg placeholder:text-white/40 focus:outline-none focus:border-[#00F5A0] transition"
      />
    </div>
  );
}