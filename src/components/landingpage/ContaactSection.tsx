import React from "react";
import Image from "next/image";
import CoinBg from "@/assets/landingpage/background/coin-bg.svg";
import smileBg from '@/assets/landingpage/background/smile-bg.svg';

const ContactSection = () => {
    return (
        <section className="relative bg-gradient-to-r from-[#363256]  to-[#50488A] h-[170vh]  flex items-center justify-center z-0 ">
            
            {/* Smile Background */}
            <div className="absolute inset mt-50   w-full h-full">
                <Image
                    src={smileBg}
                    alt="Smile background"
                    fill
                    className="object-cover "
                />
            </div>
            {/* Background Images */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={CoinBg}
                    alt="Floating coins background"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
                <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[6rem] font-semibold text-white leading-tight mb-12">
                    <span className="text-[#0EFF95] ">Contact us</span> now<br />
                    & find your own<br />
                    <span className="text-[#0EFF95] ">financial freedom</span>
                </h2>
                
                <button className="bg-[#0EFF95] text-[#363256] px-12 py-4 rounded-full text-xl lg:text-2xl font-bold hover:bg-[#00D4AA] transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Contact
                </button>
            </div>
        </section>
    );
};

export default ContactSection;

