import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';


type AddBankModalProps = {
  onClose: () => void;
  onAdd: (bankName: string) => void;
  availableBanks: string[];
};

function AddBankModal({ onClose, onAdd, availableBanks }: AddBankModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  // State baru untuk menyimpan bank yang dipilih sementara
  const [selectedBank, setSelectedBank] = useState<string | null>(null); 
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(modalRef.current, 
        { autoAlpha: 0, scale: 0.95, y: 20 }, 
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  const filteredBanks = useMemo(() => {
    if (!searchTerm) return availableBanks;
    return availableBanks.filter(bank =>
      bank.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, availableBanks]);

  // Fungsi untuk menangani klik tombol Continue
  const handleContinue = () => {
    if (selectedBank) {
      onAdd(selectedBank);
      onClose();
    }
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      {/* 1. Bentuk modal diubah menjadi persegi panjang */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl h-[75vh] max-h-[600px] bg-[#50488A] border border-white/10 rounded-2xl flex flex-col overflow-hidden"
      >
        {/* 2. Header disesuaikan seperti gambar */}
        <header className="relative flex items-center justify-center p-4 border-b border-white/10">
          <button onClick={onClose} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 text-2xl">←</button>
          <h1 className="text-white text-xl font-semibold">Atur data bank kamu</h1>
        </header>

        {/* 3. Konten utama dibuat bisa scroll */}
        <main className="flex-1 flex flex-col p-6 gap-4 overflow-y-auto">
          <div className="relative">
            <label className="absolute top-2 left-4 text-xs text-gray-400">Nama Bank</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama bank"
              className="w-full bg-white rounded-lg px-4 pt-6 pb-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00F5A0]"
              autoFocus
            />
          </div>

          <div className="bg-white rounded-lg overflow-y-auto flex-1">
            {filteredBanks.map(bank => (
              <div
                key={bank}
                onClick={() => setSelectedBank(bank)} // Hanya memilih, tidak langsung continue
                className={`px-4 py-3 text-black cursor-pointer transition-colors ${selectedBank === bank ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                {bank}
              </div>
            ))}
            {filteredBanks.length === 0 && (
              <div className="px-4 py-3 text-gray-500">Bank tidak ditemukan</div>
            )}
          </div>
        </main>
        
        {/* 4. Footer dengan tombol Continue */}
        <footer className="p-6 items-center flex justify-center  border-t border-white/10">
          <button 
            onClick={handleContinue}
            disabled={!selectedBank}
            className={`w-54 py-3 rounded-full font-semibold transition-all ${
              selectedBank 
              ? 'bg-[#00F5A0] text-black' 
              : 'bg-white/20 text-white/50 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </footer>
      </div>
    </div>
  );
}

export default AddBankModal;