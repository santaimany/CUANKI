'use client';

import React, { useState } from 'react';
import AddBankModal from './AddBankModal';

type Props = {
  items?: string[];
  onChange?: (items: string[]) => void;
  availableBanks?: string[];
};

/**
 * Helper function untuk menentukan label berdasarkan
 * urutan (index) dan jumlah total (totalItems).
 */
function getLabels(index: number, totalItems: number): string[] {
  if (totalItems === 1) {
    // Kasus 1: Hanya ada 1 bank
    if (index === 0) return ["Kebutuhan", "Tabungan", "Darurat"];
  }
  
  if (totalItems === 2) {
    // Kasus 2: Ada 2 bank
    if (index === 0) return ["Kebutuhan"];
    if (index === 1) return ["Tabungan", "Darurat"];
  }

  if (totalItems >= 3) {
    // Kasus 3: Ada 3 bank (atau lebih, tapi kita batasi 3)
    if (index === 0) return ["Kebutuhan"];
    if (index === 1) return ["Tabungan"];
    if (index === 2) return ["Darurat"];
  }
  
  return []; // Default, tidak ada label
}

export default function AddList({ items = [], onChange, availableBanks = [] }: Props) {
  const [list, setList] = useState<string[]>(items);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddBank(bankName: string) {
    // --- DIUBAH: Tambahkan batasan maksimal 3 bank ---
    if (list.length >= 3) {
      setIsModalOpen(false);
      // Anda bisa tambahkan toast error di sini jika mau
      // misal: showError("Maksimal 3 bank yang bisa ditambahkan");
      return; 
    }
    // --- AKHIR PERUBAHAN ---

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
      {/* --- DIUBAH: Logika render tombol di dalam .map() ---
      */}
      <div className="flex flex-col gap-3"> {/* Diubah ke flex-col agar rapi */}
        {list.map((bank, index) => {
          // Ambil label untuk bank ini
          const labels = getLabels(index, list.length);
          
          return (
            <button
              key={index}
              onClick={() => handleRemoveBank(bank)}
              // Styling diubah agar cocok untuk konten multi-baris
              className={`p-4 rounded-xl text-black relative group w-full text-left
                ${index === 0 ? 'bg-[#00F5A0]' : 'bg-[#99FFD4]'}
              `}
            >

              <div className="font-semibold text-lg mb-2">{bank}</div>
              
  
              <div className="flex flex-wrap gap-1.5">
                {labels.map(label => (
                  <span 
                    key={label}
                    className="text-xs font-medium bg-black/10 text-black/80 px-2 py-0.5 rounded-full"
                  >
                    {label}
                  </span>
                ))}
              </div>
              
              {/* Ikon Hapus (hover) */}
              <div className="absolute top-3 right-3 bg-red-500/80 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-bold text-sm">×</span>
              </div>
            </button>
          );
        })}
      </div>
      {list.length < 3 && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full cursor-pointer bg-[#7971BC] border-2 border-[#6D61B7] text-white font-semibold text-lg px-6 py-3 rounded-xl hover:bg-[#403774] transition-colors"
        >
          + Tambah data bank
        </button>
      )}
 


      {isModalOpen && (
        <AddBankModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddBank}
          availableBanks={availableBanks.filter((b: string) => !list.includes(b))}
        />
      )}
    </div>
  );
}