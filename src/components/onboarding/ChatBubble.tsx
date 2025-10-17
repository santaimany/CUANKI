import React from 'react';


type Props = {
  children: React.ReactNode;
  side?: 'left' | 'right';
  className?: string;
};

export default function ChatBubble({ children, side = 'left', className = '' }: Props) {
  // Mobile-first responsive design
  const base = 'relative inline-block px-4 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-sm md:text-base break-words leading-relaxed';
  
  // Chat bubble styling - more mobile-friendly
  const leftStyle = 'bg-[#50488A] text-white border-1 border-gray-400 rounded-2xl rounded-bl-md shadow-sm';
  const rightStyle = 'bg-[#00F5A0] text-black rounded-2xl rounded-br-md shadow-sm';

  return (
    <div className={`max-w-[85%] sm:max-w-[100%] ${side === 'left' ? 'self-start' : 'self-end'} ${className}`}>
      <div className={`${base} ${side === 'left' ? leftStyle : rightStyle}`}>
        {children}
      </div>
    </div>
  );
}