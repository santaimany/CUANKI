"use client";

import React from 'react';
import Image from 'next/image';
import Substract from "@/assets/education/image/Subtract.svg";
import smileKanan from '@/assets/education/background/smile-kanan.svg';
import cIjoBawah from '@/assets/education/background/c-ijo-bawah.svg';
import cPutihBawah from '@/assets/education/background/c-putih-bawah.svg';
import vKiriBawah from '@/assets/education/background/v-kiri-bawah.svg';
import Link from 'next/link';
import SubstractMobile from '@/assets/education/background/subtract-mobile.svg';

const EducationSection2 = () => {
  return (
    <>
      <section className="lg:hidden relative bg-gradient-to-r from-[#363256] to-[#50488A] min-h-screen py-16 px-6 overflow-hidden flex items-center justify-center">
        
   
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <Image
            src={SubstractMobile}
            alt="Background decoration"
            className="w-full h-auto"
          />
        </div>

     
        <div className="relative z-10 space-y-8 max-w-sm mx-auto">
     
          <div className="bg-[#A3FFD6] rounded-3xl p-6 space-y-2 mb-20">
         
            <div className="flex justify-center">
              <Link href="/login" className="bg-[#363256] text-white px-10 py-2.5 rounded-full text-sm font-bold hover:bg-[#2A2448] transition-colors">
                Login
              </Link>
            </div>

           
            <p className="text-[#363256] text-sm leading-relaxed text-center">
              Control your spendings! You choose the items you wish to activate Protect for.
            </p>

          
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 bg-[#363256] rounded-full flex items-center justify-center">
                <span className="text-white text-xs">💬</span>
              </div>
              <p className="text-[#363256] text-xs font-bold hover:underline">
                Talk to us to learn more!
              </p>
            </div>
          </div>

          <div className=" rounded-3xl p-6 space-y-4 mb-20">
            
            <div className="flex justify-center">
              <Link href="/register" className="border-2 border-[#363256] bg-white text-[#363256] px-10 py-2 rounded-full text-sm font-bold hover:bg-[#363256] hover:text-white transition-all duration-300">
                Start
              </Link>
            </div>

          
            <h2 className="text-[#363256] text-xl font-bold leading-tight text-center">
              Start managing your financial now or never
            </h2>

  
            <p className="text-[#363256] text-xs leading-relaxed text-center">
              Exposing your inventory to incidents is a thing of the past. We have a professional insurance policy that protects all your items against damage and theft.
            </p>
          </div>
        </div>
      </section>

      <section className="hidden lg:flex relative items-center justify-center bg-gradient-to-r from-[#363256] to-[#50488A] min-h-[150vh] py-16 md:py-8 overflow-hidden">
     
        <div className="absolute lg:bottom-16 lg:-right-40 z-10">
          <Image
            src={smileKanan}
            alt="Smile decoration right bottom"
            width={60}
            height={60}
            className="w-full h-auto opacity-70"
          />
        </div>

        <div className="absolute lg:bottom-12 lg:left-[40%] z-10">
          <Image
            src={cIjoBawah}
            alt="Green C decoration bottom"
            width={50}
            height={50}
            className="w-full h-auto"
          />
        </div>

        <div className="absolute lg:bottom-4 lg:right-[32%] z-10">
          <Image
            src={cPutihBawah}
            alt="White C decoration bottom right"
            width={70}
            height={70}
            className="w-full h-auto opacity-80"
          />
        </div>

        <div className="absolute lg:bottom-40 lg:left-[18%] z-10">
          <Image
            src={vKiriBawah}
            alt="V decoration bottom left"
            width={50}
            height={50}
            className="w-full h-auto "
          />
        </div>

        <div className="relative max-w-7xl mt-70  mx-auto w-full px-4 sm:px-6 lg:px-8">

          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Image
              src={Substract}
              alt="Background subtract"
              width={1200}
              height={400}
              className="w-full h-auto"
            />
          </div>

          <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:items-start">
            
            <div className="space-y-6 lg:-mt-94 lg:ml-8">
              <div className="flex justify-center lg:justify-start">
              
                <Link href="/register" className="border-2 border-[#363256] text-[#363256] px-14 py-2 rounded-full font-semibold hover:bg-[#363256] hover:text-white transition-all duration-300 lg:text-xl">
                  Start
                </Link>
              </div>
              
              <div className="space-y-6 text-center lg:text-left">
              
                <h2 className="text-[#363256] font-bold leading-tight lg:text-5xl xl:text-6xl">
                  <span className="whitespace-nowrap">Start managing your </span> 
                  <br /> 
                  <span className="whitespace-nowrap">financial now or never</span>
                </h2>
             x
                <p className="text-[#363256] leading-relaxed opacity-80 lg:text-xl xl:text-2xl">
                  Exposing your inventory to incidents is a thing of the past. We have a professional insurance policy that protects all your items against damage and theft.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end mt-12 lg:-mt-130 lg:pr-8">
              <div className="max-w-sm space-y-4">
                <div className="flex justify-center lg:justify-end">
                
                  <Link href="/login" className="bg-[#363256] text-white px-14 py-2 rounded-full text-lg font-semibold hover:bg-[#2A2448] transition-colors">
                    Login
                  </Link>
                </div>
            
                <div className="space-y-3 text-center lg:text-right">
                  <p className="text-[#363256] text-xl leading-relaxed">
                    Control your spendings! You choose the items you wish to activate Protect for.
                  </p>
                  
                  <div className="flex items-center justify-center lg:justify-end gap-2">
                    <div className="w-5 h-5 bg-[#363256] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">💬</span>
                    </div>
                    <Link href="/contact" className="text-[#363256] text-sm font-medium hover:underline ">
                      Talk to us to learn more!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default EducationSection2;