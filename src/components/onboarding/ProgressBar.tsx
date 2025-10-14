import React from 'react';

type Props = { value: number; max?: number; className?: string };

export default function ProgressBar({ value, max = 100, className = '' }: Props) {
  const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
  return (
    <div className={`w-full ${className}`}>
      <div className="h-3 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-[#00F5A0] rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
