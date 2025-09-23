// File: EducationCard.tsx

import React from 'react';
import Card1 from '@/assets/education/image/card-1.svg';
import Card2 from '@/assets/education/image/card-2.svg';
import Card3 from '@/assets/education/image/card-3.svg';
import Card4 from '@/assets/education/image/card-4.svg';
import Image from 'next/image';

interface EducationCardProps {
  cardNumber: 1 | 2 | 3 | 4;
}

const EducationCard: React.FC<EducationCardProps> = ({ 
  cardNumber
}) => {
  const getCardImage = () => {
    switch(cardNumber) {
      case 1: return Card1;
      case 2: return Card2;
      case 3: return Card3;
      case 4: return Card4;
      default: return Card1;
    }
  };

  return (
    // --- PERUBAHAN DI SINI ---
    // Hapus kelas height (h-[...]) dan ganti dengan aspect ratio
    <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden transform transition-all duration-300 ">
      <Image
        src={getCardImage()}
        alt={`Education Card ${cardNumber}`}
        fill
        className="object-contain"
      />
    </div>
  );
};

export default EducationCard;