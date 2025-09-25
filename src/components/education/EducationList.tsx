

"use client";

import React, { useState } from "react";
import EducationCard from "./EducationCard";
import { educationData } from '@/data/educationData';


const EducationList = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(educationData.length / 4);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleCardClick = (id: string) => {
    // Navigate to education detail page
    console.log(`Navigating to education detail: ${id}`);
    // TODO: Implement navigation to detail page
    // router.push(`/education/${id}`)
  };

  return (
    <section className="relative bg-gradient-to-r from-[#363256] to-[#50488A]  py-40 px-8 lg:px-16 overflow-hidden">

 <div className="max-w-7xl mx-auto">

        <div className="relative">
          {/* Education Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center transition-all duration-500">
        
            <EducationCard 
              educationItem={educationData[0]} 
              cardNumber={1}
              onClick={() => handleCardClick(educationData[0].id)}
            />
            
            <div className="md:translate-y-10">
              <EducationCard 
                educationItem={educationData[1]} 
                cardNumber={2}
                onClick={() => handleCardClick(educationData[1].id)}
              />
            </div>
            <div className="md:-translate-y-10">
              <EducationCard 
                educationItem={educationData[2]} 
                cardNumber={3}
                onClick={() => handleCardClick(educationData[2].id)}
              />
            </div>

              <EducationCard 
                educationItem={educationData[3]} 
                cardNumber={4}
                onClick={() => handleCardClick(educationData[3].id)}
              />
          
        
          </div>

          {/* Pagination Dots - Right below cards */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-10 h-10 rounded-full font-semibold transition-all ${
                  currentSlide === index
                    ? 'bg-[#0EFF95] text-[#363256]'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={nextSlide}
              className="w-10 h-10 bg-[#0EFF95] rounded-full flex items-center justify-center hover:bg-[#00D4AA] transition-colors"
            >
              <svg className="w-5 h-5 text-[#363256]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationList;