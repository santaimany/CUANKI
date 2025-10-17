'use client';
import React from 'react';

interface BadgeHeaderProps {
  featuredBadge?: {
    name: string;
    description: string;
  };
}

const BadgeHeader: React.FC<BadgeHeaderProps> = ({ 
  featuredBadge 
}) => {
  const defaultBadge = {
    name: "Si Rajin",
    description: "Mencapai 10 hari berturut-turut mencatat pengeluaran"
  };

  const displayBadge = featuredBadge || defaultBadge;
  return (
    <div className="bg-[#7971BC] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg mb-6">
      <div className="flex items-center gap-4 sm:gap-6 mb-6">
        {/* Badge Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#50488A] rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Header Text */}
        <div className="flex-1">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            {displayBadge.name}
          </h1>
          <p className="text-white/80 text-sm sm:text-base md:text-lg">
            {displayBadge.description}
          </p>
        </div>

        {/* Edit Icon */}
        <button className="text-white/60 hover:text-white transition-colors p-2">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BadgeHeader;