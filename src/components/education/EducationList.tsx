

"use client";

import React, { useState } from "react";
import EducationCard from "./EducationCard";


const EducationList = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 1);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 1) % 1);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative bg-gradient-to-r from-[#363256] to-[#50488A]  py-20 px-8 lg:px-16 overflow-hidden">

 <div className="max-w-7xl mx-auto">

        <div className="relative">
          {/* 3. Jarak antar kartu (gap) diperbesar agar lebih lega */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center transition-all duration-500">
        
            <EducationCard cardNumber={1} />
            
            <div className="md:-translate-y-12">
              <EducationCard cardNumber={2} />
            </div>
            <div className="md:-translate-y-20  ">
            
            <EducationCard cardNumber={3} />
            </div>

            <div className="md:-translate-y-40">
              <EducationCard cardNumber={4} />
            </div>
        
          </div>


          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors z-10"
          >
            <svg className="w-6 h-6 text-[#363256]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0EFF95] rounded-full flex items-center justify-center shadow-lg hover:bg-[#00D4AA] transition-colors z-10"
          >
            <svg className="w-6 h-6 text-[#363256]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={prevSlide}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => goToSlide(0)}
            className="w-10 h-10 bg-[#0EFF95] text-[#363256] rounded-full font-semibold transition-all"
          >
            1
          </button>

          <button
            onClick={() => goToSlide(1)}
            className="w-10 h-10 bg-white/20 text-white hover:bg-white/30 rounded-full font-semibold transition-all"
          >
            2
          </button>

          <button
            onClick={() => goToSlide(2)}
            className="w-10 h-10 bg-white/20 text-white hover:bg-white/30 rounded-full font-semibold transition-all"
          >
            3
          </button>

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
    </section>
  );
};

export default EducationList;