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

  const handleTabSwitch = (tab: "aboutus" | "solution") => {
    if (tab === activeTab || (tl.current && tl.current.isActive())) return;

    if (!contentRef.current) return;

    // Animasi latar belakang (tidak ada perubahan di sini)
    if (tl.current) {
        tl.current.kill();
    }
    tl.current = gsap.timeline({ defaults: { duration: 1.1, ease: "sine.inOut" } });
    
    const isSwitchingToSolution = tab === "solution";
    const layerToRecede = isSwitchingToSolution ? greenBgContainerRef.current : whiteBgContainerRef.current;
    const layerToAdvance = isSwitchingToSolution ? whiteBgContainerRef.current : greenBgContainerRef.current;

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


    // Animasi konten dan tombol
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
};
    return (
        <section className="relative bg-gradient-to-r from-[#363256] to-[#50488A] w-full px-[2vw] py-[4vw] sm:px-[3vw] sm:py-[5vw] md:px-[2.5vw] md:py-[4.5vw] lg:px-[2.2vw] lg:py-[4.2vw] xl:px-[2vw] xl:py-[4vw]">
            <div className="relative max-w-7xl mx-auto">
                <div className="relative z-30 rounded-[3vw] sm:rounded-[4vw] md:rounded-[3.5vw] lg:rounded-[3.2vw] xl:rounded-[3vw]">
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

                    <div ref={contentRef} className="absolute inset-0 flex items-start justify-start p-[3vw] sm:p-[4vw] md:p-[3.5vw] lg:p-[3.2vw] xl:p-[3vw]">
                         <div className="relative z-10 max-w-[35vw] sm:max-w-[50vw] md:max-w-[45vw] lg:max-w-[40vw] xl:max-w-[35vw]">
                            <div className="flex items-center gap-[11vw] mb-[2vw] -translate-y-1 sm:gap-[8vw] sm:mb-[2.8vw] md:gap-[9vw] md:mb-[2.4vw] lg:gap-[10vw] lg:mb-[2.2vw] xl:gap-[11vw] xl:mb-[2vw]">
                                <button
                                    data-tab-button="aboutus"
                                    onClick={() => handleTabSwitch("aboutus")}
                                    className={`border-2 px-[2vw] py-[0.8vw] rounded-full font-semibold text-[1.2vw] transition-all duration-300 sm:px-[2.8vw] sm:py-[1.1vw] sm:text-[1.7vw] md:px-[2.4vw] md:py-[1vw] md:text-[1.4vw] lg:px-[2.2vw] lg:py-[0.9vw] lg:text-[1.3vw] xl:px-[2vw] xl:py-[0.8vw] xl:text-[1.2vw] ${
                                        activeTab === "aboutus" 
                                            ? "bg-transparent text-black border-[#4A4978]" 
                                            : "border-gray-600 border-2 bg-[#4A4978] hover:bg-[#4A4978] text-white hover:border-[#4A4978]"
                                    }`}
                                >
                                    About Us
                                </button>
                                
                                <div className="relative">
                                    <div className="rounded-full px-[1.2vw] py-[0.4vw] sm:px-[1.7vw] sm:py-[0.6vw] md:px-[1.4vw] md:py-[0.5vw] lg:px-[1.3vw] lg:py-[0.45vw] xl:px-[1.2vw] xl:py-[0.4vw]">
                                        <button 
                                            data-tab-button="solution"
                                            onClick={() => handleTabSwitch("solution")}
                                            className={`px-[1.2vw] py-[0.8vw] rounded-full font-semibold text-[1.2vw] transition-all duration-300 sm:px-[1.7vw] sm:py-[1.1vw] sm:text-[1.7vw] md:px-[1.4vw] md:py-[1vw] md:text-[1.4vw] lg:px-[1.3vw] lg:py-[0.9vw] lg:text-[1.3vw] xl:px-[1.2vw] xl:py-[0.8vw] xl:text-[1.2vw] ${
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
                            <h2 className={`text-[3.5vw] font-bold leading-tight mb-[2vw] transition-colors duration-500 sm:text-[4.9vw] sm:mb-[2.8vw] md:text-[4.2vw] md:mb-[2.4vw] lg:text-[3.8vw] lg:mb-[2.2vw] xl:text-[3.5vw] xl:mb-[2vw] ${
                                activeTab === "aboutus" ? "text-[#2C3E50]" : "text-[#4A4978]"
                            }`}>
                                {activeTab === "aboutus" ? (
                                    <>
                                        <div className="font-medium mb-[0.5vw] sm:mb-[0.7vw] md:mb-[0.6vw] lg:mb-[0.55vw] xl:mb-[0.5vw]">
                                            We <span className="font-black">deliver</span> you a
                                        </div>
                                        <div className="font-black mb-[0.5vw] sm:mb-[0.7vw] md:mb-[0.6vw] lg:mb-[0.55vw] xl:mb-[0.5vw]">
                                            <span className="text-[#2C3E50]">milestone</span> to your
                                        </div>
                                        <div className="font-black">
                                            <span className="text-[#2C3E50]">financial goal</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="font-medium mb-[0.5vw] sm:mb-[0.7vw] md:mb-[0.6vw] lg:mb-[0.55vw] xl:mb-[0.5vw]">
                                            Our <span className="font-black">innovative</span> solutions
                                        </div>
                                        <div className="font-black mb-[0.5vw] sm:mb-[0.7vw] md:mb-[0.6vw] lg:mb-[0.55vw] xl:mb-[0.5vw]">
                                            <span className="text-[#4A4978]">streamline</span> your
                                        </div>
                                        <div className="font-black">
                                            <span className="text-[#4A4978]">business growth</span>
                                        </div>
                                    </>
                                )}
                            </h2>
                            <p className={`text-[1.4vw] leading-[2vw] max-w-[25vw] transition-colors duration-500 sm:text-[2vw] sm:leading-[2.8vw] sm:max-w-[35vw] md:text-[1.7vw] md:leading-[2.4vw] md:max-w-[30vw] lg:text-[1.5vw] lg:leading-[2.2vw] lg:max-w-[27vw] xl:text-[1.4vw] xl:leading-[2vw] xl:max-w-[25vw] ${
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