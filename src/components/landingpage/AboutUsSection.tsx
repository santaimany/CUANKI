"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import greenBg from "@/assets/landingpage/background/green-aboutus-inverted.svg";
import whiteBg from "@/assets/landingpage/background/white-solution-inverted.svg";
import handImage from "@/assets/landingpage/image/image-tangan.png";

const AboutUsSection = () => {
    const [activeTab, setActiveTab] = useState("aboutus");
    const greenBgContainerRef = useRef<HTMLDivElement>(null);
    const whiteBgContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const contentMobileRef = useRef<HTMLDivElement>(null);
    
    const tl = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (greenBgContainerRef.current && whiteBgContainerRef.current) {
            gsap.set(greenBgContainerRef.current, { zIndex: 2, y: "0%", scale: 1 });
            gsap.set(whiteBgContainerRef.current, { zIndex: 1, y: "0%", scale: 0.95 });
        }
    }, []);

  const handleTabSwitch = (tab: "aboutus" | "solution") => {
    if (tab === activeTab || (tl.current && tl.current.isActive())) return;

    if (!contentRef.current && !contentMobileRef.current) return;

    // Animasi latar belakang (Desktop only)
    if (tl.current) {
        tl.current.kill();
    }
    tl.current = gsap.timeline({ defaults: { duration: 1.1, ease: "sine.inOut" } });
    
    const isSwitchingToSolution = tab === "solution";
    const layerToRecede = isSwitchingToSolution ? greenBgContainerRef.current : whiteBgContainerRef.current;
    const layerToAdvance = isSwitchingToSolution ? whiteBgContainerRef.current : greenBgContainerRef.current;

    if (layerToRecede && layerToAdvance) {
        tl.current.to(layerToRecede, { scale: 0.95 }, 0)
            .to(layerToAdvance, {
                keyframes: [
                    { y: "-90%", scale: 1.05, duration: 0.6, ease: "sine.out" },
                    { y: "0%", scale: 1, duration: 0.5, ease: "sine.in" }
                ]
            }, 0)
            .set(layerToAdvance, { zIndex: 3 }, 0.6)
            .set(layerToAdvance, { zIndex: 2 })
            .set(layerToRecede, { zIndex: 1 });
    }


    // Animasi konten - Desktop
    if (contentRef.current) {
        const clickedButton = contentRef.current.querySelector(`[data-tab-button="${tab}"]`);
        const textContent = [
            contentRef.current.querySelector('h2'),
            contentRef.current.querySelector('p')
        ];

        gsap.to([clickedButton, ...textContent], {
            autoAlpha: 0,
            duration: 0.3,
            ease: "power2.in",
            stagger: 0.5,
            onComplete: () => {
                setActiveTab(tab);

                gsap.delayedCall(0.5, () => {
                    if (!contentRef.current) return;

                    const newTextContent = [
                       contentRef.current.querySelector('h2'),
                       contentRef.current.querySelector('p')
                    ];
                    const newlyActiveButton = contentRef.current.querySelector(`[data-tab-button="${tab}"]`);

                    gsap.fromTo([newlyActiveButton, ...newTextContent], 
                        { autoAlpha: 0}, 
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.1,
                            stagger: 0.1,
                            ease: "power2.out"
                        }
                    );
                });
            }
        });
    }
    
    // Animasi konten - Mobile (simple state change only)
    if (contentMobileRef.current) {
        setActiveTab(tab);
    }
};
    return (
        <section className="relative bg-gradient-to-r from-[#363256] to-[#50488A] w-full px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-10 lg:py-14 xl:px-12 xl:py-16">
            <div className="relative max-w-7xl mx-auto">
                
                {/* Mobile Layout */}
                <div 
                    ref={contentMobileRef}
                    className={`lg:hidden relative rounded-[2rem] overflow-hidden min-h-[700px] transition-colors duration-500 ${
                        activeTab === "aboutus" ? "bg-[#0EFF95]" : "bg-white"
                    }`}
                >
                    {/* Content layer for mobile */}
                    <div className="relative z-10 h-full flex flex-col p-6">
                        {/* Buttons at top */}
                        <div className="flex items-center gap-20 mb-8">
                            <button
                                data-tab-button-mobile="aboutus"
                                onClick={() => handleTabSwitch("aboutus")}
                                className={`border-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                                    activeTab === "aboutus" 
                                        ? "bg-transparent text-[#363256] border-[#363256]" 
                                        : "bg-[#4A4978] text-white border-[#4A4978] hover:bg-[#4A4978]/90"
                                }`}
                            >
                                About Us
                            </button>
                            
                            <button 
                                data-tab-button-mobile="solution"
                                onClick={() => handleTabSwitch("solution")}
                                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 border-2 ${
                                    activeTab === "solution" 
                                        ? "bg-transparent text-[#4A4978] border-[#4A4978]" 
                                        : "bg-[#4A4978] text-white border-[#4A4978] hover:bg-[#4A4978]/90"
                                }`}
                            >
                                Solution
                            </button>
                        </div>

                        {/* Content in center */}
                        <div className="flex-1 flex flex-col justify-center text-center px-2">
                            <h2 className={`text-3xl sm:text-4xl font-bold leading-tight mb-6 transition-colors duration-500 ${
                                activeTab === "aboutus" ? "text-[#363256]" : "text-[#4A4978]"
                            }`}>
                                {activeTab === "aboutus" ? (
                                    <>
                                        We <span className="font-black">deliver</span> you a <span className="font-black">milestone</span> to your <span className="font-black">financial goal</span>
                                    </>
                                ) : (
                                    <>
                                        Our <span className="font-black">innovative</span> solutions <span className="font-black">streamline</span> your <span className="font-black">business growth</span>
                                    </>
                                )}
                            </h2>
                            <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
                                activeTab === "aboutus" ? "text-[#363256]" : "text-[#4A4978]"
                            }`}>
                                {activeTab === "aboutus" ? (
                                    "Exposing your inventory to incidents is a thing of the past. We have a professional insurance policy that protects all your items against damage and theft."
                                ) : (
                                    "From cutting-edge technology to bespoke services, we provide comprehensive solutions tailored to your unique needs, ensuring maximum efficiency and security."
                                )}
                            </p>
                        </div>

                        {/* Hand image at bottom */}
                        <div className="relative h-[280px] -mb-6 -mx-6">
                            <Image 
                                src={handImage}
                                alt="Hand with money"
                                className="absolute -bottom-25 left-[30%] -translate-x-1/2 w-full max-w-[400px] h-auto object-contain"
                                style={{ 
                                    filter: "drop-shadow(0 -5px 20px rgba(0,0,0,0.1))"
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:block relative z-30 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] lg:rounded-[3rem] xl:rounded-[3.5rem]">
                    <Image
                        src={greenBg}
                        alt="Background Placeholder"
                        className="w-full h-auto object-cover invisible"
                        priority
                    />

                    <div ref={greenBgContainerRef} className="absolute inset-0"> 
                        <Image src={greenBg} alt="Green Background - About Us" className="w-full h-auto object-cover" priority />
                    </div>

                    <div ref={whiteBgContainerRef} className="absolute inset-0">
                        <Image src={whiteBg} alt="White Background - Solution" className="w-full h-auto object-cover" />
                    </div>

                    <div ref={contentRef} className="absolute inset-0 flex items-start justify-start p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14">
                         <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                            <div className="flex items-center gap-4 mb-6 -translate-y-1 sm:gap-6 sm:mb-8 md:gap-8 md:mb-10 lg:gap-10 lg:mb-12 xl:gap-4 xl:mb-8">
                                <button
                                    data-tab-button="aboutus"
                                    onClick={() => handleTabSwitch("aboutus")}
                                    className={`border-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg lg:px-7 lg:py-3.5 lg:text-xl xl:px-8 xl:py-4 xl:text-2xl ${
                                        activeTab === "aboutus" 
                                            ? "bg-transparent text-black border-[#4A4978]" 
                                            : "border-gray-600 border-2 bg-[#4A4978] hover:bg-[#4A4978] text-white hover:border-[#4A4978]"
                                    }`}
                                >
                                    About Us
                                </button>
                                
                                <div className="relative">
                                    <div className="rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 xl:px-6 xl:py-3">
                                        <button 
                                            data-tab-button="solution"
                                            onClick={() => handleTabSwitch("solution")}
                                            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg lg:px-7 lg:py-3.5 lg:text-xl xl:px-8 xl:py-4 xl:text-2xl ${
                                                activeTab === "solution" 
                                                    ? "bg-transparent text-black border-2 border-[#4A4978]" 
                                                    : "bg-[#4A4978] text-[#ffffff]"
                                            }`}
                                        >
                                            Solution
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <h2 className={`text-2xl font-bold leading-tight mb-4 transition-colors duration-500 sm:text-3xl sm:mb-6 md:text-4xl md:mb-8 lg:text-5xl lg:mb-10 xl:text-6xl xl:mb-12 ${
                                activeTab === "aboutus" ? "text-[#2C3E50]" : "text-[#4A4978]"
                            }`}>
                                {activeTab === "aboutus" ? (
                                    <>
                                        <div className="font-medium mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5">
                                            We <span className="font-black">deliver</span> you a
                                        </div>
                                        <div className="font-black mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5">
                                            <span className="text-[#2C3E50]">milestone</span> to your
                                        </div>
                                        <div className="font-black">
                                            <span className="text-[#2C3E50]">financial goal</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="font-medium mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5">
                                            Our <span className="font-black">innovative</span> solutions
                                        </div>
                                        <div className="font-black mb-1 sm:mb-2 md:mb-3 lg:mb-4 xl:mb-5">
                                            <span className="text-[#4A4978]">streamline</span> your
                                        </div>
                                        <div className="font-black">
                                            <span className="text-[#4A4978]">business growth</span>
                                        </div>
                                    </>
                                )}
                            </h2>
                            <p className={`text-sm leading-relaxed max-w-xs transition-colors duration-500 sm:text-base sm:leading-relaxed sm:max-w-sm md:text-lg md:leading-relaxed md:max-w-md lg:text-xl lg:leading-relaxed lg:max-w-lg xl:text-2xl xl:leading-relaxed xl:max-w-xl ${
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