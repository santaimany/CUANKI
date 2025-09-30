import React from 'react';


type Props = {
  children: React.ReactNode;
  side?: 'left' | 'right';
  className?: string;
};

export default function ChatBubble({ children, side = 'left', className = '' }: Props) {
  // 1. Tambahkan 'relative' pada base style
  const base = 'relative inline-block px-4 py-2 text-sm md:text-base';
  
  // 2. Ubah leftStyle menjadi background solid dengan border putih
  const leftStyle = 'bg-[#50488A] border-1 border-gray-400 rounded-2xl rounded-bl-none';
  const rightStyle = 'bg-[#E6E1F8] text-[#50488A] rounded-2xl rounded-br-none';

 

  return (
    // Kontainer luar tidak perlu diubah
    <div className={`max-w-[100%] ${side === 'left' ? 'self-start' : 'self-end'} ${className}`}>
      {/* 4. Terapkan style ekor hanya jika side === 'left' */}
      <div className={`${base} ${side === 'left' ? leftStyle : rightStyle}`}>
        {children}
      </div>
    </div>
  );
}