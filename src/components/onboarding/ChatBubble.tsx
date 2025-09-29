import React from 'react';

type Props = {
  children: React.ReactNode;
  side?: 'left' | 'right';
  className?: string;
};

export default function ChatBubble({ children, side = 'left', className = '' }: Props) {
  const base = 'inline-block rounded-full px-4 py-2 text-sm md:text-base';
  const leftStyle = 'bg-gradient-to-b from-[#6B5DD6]/80 to-[#4B3C8A]/80 text-white rounded-tl-none';
  const rightStyle = 'bg-[#E6E1F8] text-[#50488A] rounded-tr-none';

  return (
    <div className={`max-w-[70%] ${side === 'left' ? 'self-start' : 'self-end'} ${className}`}>
      <div className={`${base} ${side === 'left' ? leftStyle : rightStyle}`}>{children}</div>
    </div>
  );
}
