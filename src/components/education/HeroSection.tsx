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
                    
                    <div className="absolute top-[20%] right-8 lg:right-12 bg-[#50488A] text-white px-10 py-3 rounded-full text-2xl font-semibold">
                        Education
                    </div>
                    <div className="absolute -top-[10vw] left-0 xl:left-0 lg:left-16 w-60 sm:w-72 lg:w-96 xl:w-[52rem] z-10">
                        <Image
                            src={TopiToga}
                            alt="Graduation Cap and Diploma with coins"
                            width={600}
                            height={600}
                            className="w-full h-auto"
                        />
                    </div>

                    <div className="absolute top-1/2 right-8 lg:right-16 -translate-y-1/2 max-w-4xl text-right">
                        <h2 className="text-[#50488A] text-4xl sm:text-5xl lg:text-7xl font-medium leading-tight">
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