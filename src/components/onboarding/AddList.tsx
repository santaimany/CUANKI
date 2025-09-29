import React, { useState } from 'react';

type Props = {
  items?: string[];
  onChange?: (items: string[]) => void;
};

export default function AddList({ items = [], onChange }: Props) {
  const [list, setList] = useState<string[]>(items);
  const [input, setInput] = useState('');

  function add() {
    if (!input.trim()) return;
    const next = [...list, input.trim()];
    setList(next);
    setInput('');
    onChange?.(next);
  }

  return (
    <div className="flex flex-col gap-3">
      <button onClick={add} className="mb-2 bg-white/10 px-4 py-2 rounded-md text-white">+ Tambah data bank</button>
      <input value={input} onChange={(e) => setInput(e.target.value)} className="px-4 py-2 rounded-md bg-white/10 text-white" placeholder="Nama bank" />

      <div className="bg-white/5 rounded-md p-3">
        {list.length === 0 && <div className="text-white/60">Belum ada data</div>}
        {list.map((it, i) => (
          <div key={i} className="py-2 border-b border-white/10 text-white">{it}</div>
        ))}
      </div>
    </div>
  );
}
