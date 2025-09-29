'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { educationData } from '@/data/educationData';
import EducationCard from './EducationCard';
import smileBg from '@/assets/landingpage/background/smile-bg.svg';
import cKiri from '@/assets/education/icons/c-kiri-readothers.svg';
import cTengah from '@/assets/education/icons/c-tengah-readothers.svg';
import cKanan from '@/assets/education/icons/c-kanan-readothers.svg';
import Image from 'next/image';


interface ReadOthersProps {
  currentId: string;
}

export default function ReadOthers({ currentId }: ReadOthersProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  
  // Filter out the current education item
  const otherEducations = educationData.filter(item => item.id !== currentId);
  
  // Pagination settings
  const itemsPerPage = 2;
  const totalPages = Math.ceil(otherEducations.length / itemsPerPage);
  
  // Get current page items
  const currentItems = otherEducations.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleCardClick = (id: string) => {
    router.push(`/education/${id}`);
  };

  const handlePrevious = () => {
    setCurrentPage(prev => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Smile Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={smileBg}
          alt="Smile background"
          fill
          className="object-contain "
        />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-12">
          Read Others
        </h2>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {currentItems.map((education, index) => (
            <EducationCard
              key={education.id}
              educationItem={education}
              cardNumber={(index + 1) as 1 | 2 | 3 | 4}
              onClick={() => handleCardClick(education.id)}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mb-12">
            <button
              onClick={handlePrevious}
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-200"
              aria-label="Previous page"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* Page indicators */}
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentPage ? 'bg-[#0EFF95]' : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={handleNext}
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-200"
              aria-label="Next page"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}

        {/* Bottom Icons */}
        <div className="flex justify-center items-center bottom-0 left-0 right-0 z-20 space-x-8 sm:space-x-12 lg:space-x-50">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
            <Image
              src={cKiri}
              alt="Left icon"
              width={96}
              height={96}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-10 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
            <Image
              src={cTengah}
              alt="Center icon"
              width={96}
              height={96}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
            <Image
              src={cKanan}
              alt="Right icon"
              width={96}
              height={96}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}