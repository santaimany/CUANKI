import React, { useState } from 'react';

import AddBankModal from './AddBankModal';


type Props = {
  items?: string[];
  onChange?: (items: string[]) => void;
};

const ALL_AVAILABLE_BANKS = ['BCA', 'BRI', 'BSI', 'BLU', 'Mandiri', 'BNI', 'CIMB Niaga', 'Danamon', 'OCBC NISP'];

export default function AddList({ items = [], onChange }: Props) {
  const [list, setList] = useState<string[]>(items);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddBank(bankName: string) {
    if (bankName && !list.includes(bankName)) {
      const next = [...list, bankName];
      setList(next);
      onChange?.(next);
    }
  }

  function handleRemoveBank(bankNameToRemove: string) {
    const next = list.filter(bank => bank !== bankNameToRemove);
    setList(next);
    onChange?.(next);
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        {list.map((bank, index) => (
          <button
            key={index}
            onClick={() => handleRemoveBank(bank)}
            className={`px-20 py-2.5 rounded-xl font-semibold text-black relative group
              ${index === 0 ? 'bg-[#00F5A0]' : 'bg-[#99FFD4]'}
            `}
          >
            {bank}
            <div className="absolute inset-0 bg-red-500/80 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white font-bold text-lg">×</span>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full cursor-pointer bg-[#7971BC] border-2 border-[#6D61B7] text-white font-semibold text-lg px-6 py-3 rounded-xl hover:bg-[#403774] transition-colors"
      >
        + Tambah data bank
      </button>

      {isModalOpen && (
        <AddBankModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddBank}
          availableBanks={ALL_AVAILABLE_BANKS.filter(b => !list.includes(b))}
        />
      )}
    </div>
  );
}