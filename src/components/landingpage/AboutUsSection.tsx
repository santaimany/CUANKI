"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import greenBg from "@/assets/landingpage/background/green-aboutus-inverted.svg";
import whiteBg from "@/assets/landingpage/background/white-solution-inverted.svg";

const AboutUsSection = () => {
    const [activeTab, setActiveTab] = useState("aboutus");
    const greenBgContainerRef = useRef<HTMLDivElement>(null);
    const whiteBgContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (greenBgContainerRef.current && whiteBgContainerRef.current) {
            gsap.set(greenBgContainerRef.current, { zIndex: 2, y: "0%", scale: 1 });
            gsap.set(whiteBgContainerRef.current, { zIndex: 1, y: "0%", scale: 0.95 });
        }
    }, []);

    const animateContent = () => {
        if (!contentRef.current) return;
        const els = [contentRef.current.querySelector('h2'), contentRef.current.querySelector('p')];
        gsap.to(els, { opacity: 0, y: 15, duration: 0.3, ease: "power2.in" });
        gsap.fromTo(els, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.6 });
    };
    
    const handleTabSwitch = (tab: "aboutus" | "solution") => {
        if (tab === activeTab || (tl.current && tl.current.isActive())) return;

        setActiveTab(tab);
        animateContent();
        
        if (tl.current) {
            tl.current.kill();
        }

        tl.current = gsap.timeline({ defaults: { duration: 1.1, ease: "sine.inOut" } });

        const isSwitchingToSolution = tab === "solution";
        
        const layerToRecede = isSwitchingToSolution ? greenBgContainerRef.current : whiteBgContainerRef.current;
        const layerToAdvance = isSwitchingToSolution ? whiteBgContainerRef.current : greenBgContainerRef.current;

        tl.current.to(layerToRecede, {
            scale: 0.95,
        }, 0);

        tl.current.to(layerToAdvance, {
            keyframes: [
                { y: "-90%", scale: 1.05, duration: 0.6, ease: "sine.out" },
                { y: "0%", scale: 1, duration: 0.5, ease: "sine.in" }
            ]
        }, 0);
        
        tl.current.set(layerToAdvance, { zIndex: 3 }, 0.6);
        
        tl.current.set(layerToAdvance, { zIndex: 2 });
        tl.current.set(layerToRecede, { zIndex: 1 });
    };

    return (
        // PERUBAHAN 1: Tambahkan z-index pada section utama agar bisa menumpuk di atas section lain
        <section className="relative bg-[#363256] z-20 w-full px-4 sm:px-8 lg:px-16 py-16">
            <div className="relative max-w-7xl mx-auto">
                {/* PERUBAHAN 2: HAPUS `overflow-hidden` dari container ini */}
                <div className="relative rounded-[3rem] lg:rounded-[4rem]">
                    
                    <Image
                        src={greenBg}
                        alt="Background Placeholder"
                        className="w-full h-auto object-cover invisible"
                        priority
                    />

                    {/* Kita tidak perlu lagi rounded-corner di sini karena bingkai utamanya sudah tidak memotong */}
                    <div ref={greenBgContainerRef} className="absolute inset-0"> 
                        <Image
                            src={greenBg}
                            alt="Green Background - About Us"
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>

                    <div ref={whiteBgContainerRef} className="absolute inset-0">
                        <Image
                            src={whiteBg}
                            alt="White Background - Solution"
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    {/* PERUBAHAN 3: Pastikan konten memiliki z-index tertinggi */}
                    <div ref={contentRef} className="absolute inset-0 z-30 flex items-start justify-start p-8 sm:p-12 lg:p-16">
                         <div className="relative z-10 max-w-2xl">
                            {/* ... (kode tombol dan teks tidak berubah) ... */}
                            <div className="flex items-center gap-55 mb-8 -translate-y-1">
                                <button 
                                    onClick={() => handleTabSwitch("aboutus")}
                                    className={`border-2 px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                                        activeTab === "aboutus" 
                                            ? "bg-transparent text-black border-[#4A4978] " 
                                            : "border-gray-600 border-2 bg-[#4A4978] hover:bg-[#4A4978] text-white hover:border-[#4A4978]"
                                    }`}
                                >
                                    About Us
                                </button>
                                
                                <div className="relative">
                                    <div className=" rounded-full px-6 py-2 ">
                                        <button 
                                            onClick={() => handleTabSwitch("solution")}
                                            className={`px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                                                activeTab === "solution" 
                                                    ? "bg-transparent text-black border-2 border-[#4A4978] " 
                                                    : "bg-[#4A4978] text-[#ffffff] "
                                            }`}
                                        >
                                            Solution
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <h2 className={`text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8 transition-colors duration-500 ${
                                activeTab === "aboutus" ? "text-[#2C3E50]" : "text-[#4A4978]"
                            }`}>
                                {activeTab === "aboutus" ? (
                                    <>
                                        <div className="font-medium mb-2">
                                            We <span className="font-black">deliver</span> you a
                                        </div>
                                        <div className="font-black mb-2">
                                            <span className="text-[#2C3E50]">milestone</span> to your
                                        </div>
                                        <div className="font-black">
                                            <span className="text-[#2C3E50]">financial goal</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="font-medium mb-2">
                                            Our <span className="font-black">innovative</span> solutions
                                        </div>
                                        <div className="font-black mb-2">
                                            <span className="text-[#4A4978]">streamline</span> your
                                        </div>
                                        <div className="font-black">
                                            <span className="text-[#4A4978]">business growth</span>
                                        </div>
                                    </>
                                )}
                            </h2>
                            <p className={`text-lg lg:text-xl leading-relaxed max-w-lg transition-colors duration-500 ${
                                activeTab === "aboutus" ? "text-[#2C3E50]" : "text-[#4A4978]"
                            }`}>
                                {activeTab === "aboutus" ? (
                                    "Exposing your inventory to incidents is a thing of the past. We have a professional insurance policy that protects all your items against damage and theft."
                                ) : (
                                    "From cutting-edge technology to bespoke services, we provide comprehensive solutions tailored to your unique needs, ensuring maximum efficiency and security."
                                )}
                            </p>
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;