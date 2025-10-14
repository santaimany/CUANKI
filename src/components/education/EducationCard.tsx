// File: EducationCard.tsx

import React from 'react';
import Card1 from '@/assets/education/image/card-1.svg';
import Card2 from '@/assets/education/image/card-2.svg';
import Card3 from '@/assets/education/image/card-3.svg';
import Card4 from '@/assets/education/image/card-4.svg';
import Image from 'next/image';
import { EducationItem } from '@/data/educationData';

interface EducationCardProps {
  educationItem: EducationItem;
  cardNumber: 1 | 2 | 3 | 4;
  onClick?: () => void;
}

const EducationCard: React.FC<EducationCardProps> = ({ 
  educationItem,
  cardNumber,
  onClick
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
    <div 
      className="relative w-full aspect-[5/5] rounded-3xl overflow-hidden transform transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Background Image */}
      <Image
        src={getCardImage()}
        alt={`Education Card ${cardNumber}`}
        fill
        className="object-contain"
      />
      
      {/* Content - Centered */}
      <div className="absolute inset-0 p-6 flex flex-col justify-center items-center ">
        <div className="max-w-xl ">
          <h3 className="text-4xl font-bold mb-4 leading-tight text-[#363256]">
            {educationItem.title}
          </h3>
          <p className="text-xl leading-relaxed text-justify text-[#363256] opacity-80">
            {educationItem.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;