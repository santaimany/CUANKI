"use client";

import React from 'react';
import Image from 'next/image';
import WhiteBg from "@/assets/landingpage/background/green-education-inverted.svg";
import TopiToga from '@/assets/landingpage/image/topitogawithcoin-image.svg';

const HeroSection = () => {
  return (
        <>
            <section className="lg:hidden relative bg-gradient-to-r from-[#363256] to-[#50488A] pt-24 pb-12 px-4 overflow-hidden">
            
                <div className="absolute top-4 -left-8 w-48 h-48 z-30">
                    <Image
                        src={TopiToga}
                        alt="Graduation decoration"
                        width={192}
                        height={192}
                        className="w-full h-auto"
                    />
                </div>

                <div className="relative z-20 mb-8 text-center pt-8">
         
                    <div className="relative inline-block px-8 py-8">
                
                        <div className="absolute inset-0 -mx-4 -left-50 -my-4 z-0">
                            <Image
                                src={WhiteBg}
                                alt="Education background shape"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        
                  
                        <h2 className="relative z-10 text-[#50488A] text-2xl font-medium leading-tight">
                            <div className="inline-block bg-[#50488A] text-white px-8 py-3 rounded-full text-base font-semibold mb-6 shadow-md">
                                Education
                            </div>
                            <br/>
                            <span className="font-black">Smart education</span>
                            <br/>
                            for your smart <span className="font-black">financial</span>
                        </h2>
                    </div>
                </div>
            </section>

        
            <section className="hidden lg:block relative bg-gradient-to-r from-[#363256] to-[#50488A] py-16 lg:py-24">
            
                <div className="relative w-full max-w-screen-xl mx-auto">
                    <div className="relative">
                        <Image
                            src={WhiteBg}
                            alt="Education background shape"
                            width={1048}
                            height={912}
                            className="w-full h-auto"
                        />
                        
                    
                        <div className="absolute top-[20%] bg-[#50488A] text-white rounded-full font-semibold cursor-pointer transform transition-transform duration-300 hover:scale-110
                                        lg:right-10 lg:px-10 lg:py-3 lg:text-xl
                                        xl:right-16 xl:px-12 xl:py-4 xl:text-2xl"
                        >
                            Education
                        </div>

                       
                        <div className="absolute z-10
                                        lg:-top-32 lg:left-16 lg:w-[30rem]
                                        xl:-top-40 xl:left-0 xl:w-[40rem]"
                        >
                            <Image
                                src={TopiToga}
                                alt="Graduation Cap and Diploma with coins"
                                width={600}
                                height={600}
                                className="w-full h-auto"
                            />
                        </div>

                  
                        <div className="absolute top-1/2 -translate-y-1/2 text-right
                                        lg:right-16 lg:max-w-2xl
                                        xl:right-20 xl:max-w-3xl"
                        >
                        
                            <h2 className="text-[#50488A] font-medium leading-tight
                                            lg:text-5xl
                                            xl:text-6xl"
                            >
                                <span className="font-black">Smart education</span><br />
                                for your smart <span className="font-black">financial</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </section>
        </>
  );
}

export default HeroSection;