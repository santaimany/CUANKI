"use client";

import React from 'react';
import Image from 'next/image';
import WhiteBg from "@/assets/landingpage/background/green-education-inverted.svg";
import TopiToga from '@/assets/landingpage/image/topitogawithcoin-image.svg';




const HeroSection = () => {
  return (
         <section className="relative bg-gradient-to-r from-[#363256] to-[#50488A]  py-16 lg:py-24">
              <div className="relative w-full max-w-[1600px] mx-auto">
                <div className="relative">
                    <Image
                        src={WhiteBg}
                        alt="Education background shape"
                        width={1048}
                        height={912}
                        className="w-full h-auto"
                    />
                    
                    {/* Education Badge */}
                    <div className="absolute top-[20%] right-[2vw] bg-[#50488A] text-white px-[2.5vw] py-[0.8vw] rounded-full text-[1.5vw] font-semibold cursor-pointer transform transition-transform duration-300 hover:scale-110 sm:right-[1.5vw] sm:px-[3.5vw] sm:py-[1.1vw] sm:text-[2.1vw] md:right-[1.8vw] md:px-[3vw] md:py-[1vw] md:text-[1.8vw] lg:right-[2.5vw] lg:px-[2.8vw] lg:py-[0.9vw] lg:text-[1.6vw] xl:right-[3vw] xl:px-[2.5vw] xl:py-[0.8vw] xl:text-[1.5vw]">
                        Education
                    </div>

                    {/* Graduation Image - positioned on left side of green area */}
                    <div className="absolute -top-[10vw] left-0 w-[40vw] z-10 sm:-top-[12vw] sm:left-[-2vw] sm:w-[50vw] md:-top-[11vw] md:left-[-1vw] md:w-[45vw] lg:-top-[10.5vw] lg:left-[4vw] lg:w-[24vw] xl:-top-[10vw] xl:left-0 xl:w-[40vw]">
                        <Image
                            src={TopiToga}
                            alt="Graduation Cap and Diploma with coins"
                            width={600}
                            height={600}
                            className="w-full h-auto"
                        />
                    </div>

                    {/* Main Content - positioned on right side */}
                    <div className="absolute top-1/2 right-[2vw] -translate-y-1/2 max-w-[50vw] text-right sm:right-[1vw] sm:max-w-[55vw] md:right-[1.5vw] md:max-w-[52vw] lg:right-[4vw] lg:max-w-[50vw] xl:right-[4vw] xl:max-w-[50vw]">
                        <h2 className="text-[#50488A] text-[3.8vw] font-medium leading-tight sm:text-[4.5vw] md:text-[4.2vw] lg:text-[3.8vw] xl:text-[3.8vw]">
                            <span className="font-black">Smart education</span><br />
                            for your smart <span className="font-black">financial</span>
                        </h2>
                    </div>
                </div>

             
            </div>
        
        </section>
  );
}

export default HeroSection;