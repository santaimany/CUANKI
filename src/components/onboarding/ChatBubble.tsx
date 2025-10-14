import React from 'react';


type Props = {
  children: React.ReactNode;
  side?: 'left' | 'right';
  className?: string;
};

export default function ChatBubble({ children, side = 'left', className = '' }: Props) {
  // Responsive padding and text sizing
  const base = 'relative inline-block px-3 sm:px-4 py-2 text-xs sm:text-sm md:text-base';
  
  // Solid background with border
  const leftStyle = 'bg-[#50488A] border-1 border-gray-400 rounded-2xl rounded-bl-none';
  const rightStyle = 'bg-[#E6E1F8] text-[#50488A] rounded-2xl rounded-br-none';

  return (
    <div className={`max-w-[100%] ${side === 'left' ? 'self-start' : 'self-end'} ${className}`}>
      <div className={`${base} ${side === 'left' ? leftStyle : rightStyle}`}>
        {children}
      </div>
    </div>
  );
}