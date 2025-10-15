"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CoinBg from "@/assets/landingpage/background/coin-bg.svg";
import smileBg from '@/assets/landingpage/background/smile-bg.svg';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const coinBgRef = useRef<HTMLDivElement>(null);
    const smileBgRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set(coinBgRef.current, {
                y: "100%",
                opacity: 0
            });

            gsap.set(smileBgRef.current, {
                scale: 0.8,
                opacity: 0
            });

            gsap.set(headingRef.current, {
                y: 80,
                opacity: 0
            });

            gsap.set(buttonRef.current, {
                y: 50,
                opacity: 0,
                scale: 0.8
            });

            // Main animation timeline
            const mainTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            mainTl
                // Smile background gentle entrance
                .to(smileBgRef.current, {
                    scale: 1,
                    opacity: 1,
                    duration: 2.0,
                    ease: "power2.out"
                })
                
                // Coin background rising from bottom
                .to(coinBgRef.current, {
                    y: "0%",
                    opacity: 1,
                    duration: 2.2,
                    ease: "power3.out"
                }, "-=1.0")
                
                // Heading text entrance
                .to(headingRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 2.2,
                    ease: "back.out(1.2)"
                }, "-=1.5")
                
                // Button smooth entrance
                .to(buttonRef.current, {
                    y: 0,
                    opacity: 1,
              
                    duration: 1,
                    ease: "power3.out"
                }, "-=1.2");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* Mobile Layout */}
            <section className="lg:hidden relative bg-gradient-to-r from-[#363256] to-[#50488A] min-h-screen flex items-center justify-center overflow-hidden py-16 px-6">
                {/* Background Images */}
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src={smileBg}
                        alt="Smile background"
                        fill
                        className="object-cover opacity-60"
                    />
                </div>
                
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src={CoinBg}
                        alt="Floating coins background"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center max-w-md mx-auto">
                    <h2 className="text-4xl font-semibold text-white leading-tight mb-10">
                        <span className="text-[#0EFF95]">Contact us</span> now<br />
                        & find your own<br />
                        <span className="text-[#0EFF95]">financial freedom</span>
                    </h2>
                    
                    <button className="bg-[#0EFF95] text-[#363256] px-12 py-3.5 rounded-full text-lg font-bold hover:bg-[#00D4AA] transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95">
                        Contact
                    </button>
                </div>
            </section>

            {/* Desktop Layout */}
            <section ref={sectionRef} className="hidden lg:block relative bg-gradient-to-r from-[#363256] to-[#50488A] h-[170vh] sm:h-[120vh] md:h-[140vh] lg:h-[160vh] xl:h-[170vh]">
                <div className="flex items-center justify-center h-full">
                    {/* Smile Background */}
                    <div ref={smileBgRef} className="absolute inset-0 mt-[3vw] w-full h-full sm:mt-[4vw] md:mt-[3.5vw] lg:mt-[3.2vw] xl:mt-[3vw]">
                        <Image
                            src={smileBg}
                            alt="Smile background"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {/* Background Images */}
                    <div ref={coinBgRef} className="absolute inset-0 w-full h-full">
                        <Image
                            src={CoinBg}
                            alt="Floating coins background"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 max-w-[40vw] mx-auto px-[1vw] text-center sm:max-w-[55vw] sm:px-[1.5vw] md:max-w-[50vw] md:px-[1.3vw] lg:max-w-[45vw] lg:px-[1.2vw] xl:max-w-[40vw] xl:px-[1vw]">
                        <h2 ref={headingRef} className="text-[4.5vw] font-semibold text-white leading-tight mb-[2vw] sm:text-[6vw] sm:mb-[2.8vw] md:text-[5.5vw] md:mb-[2.5vw] lg:text-[5vw] lg:mb-[2.2vw] xl:text-[4.5vw] xl:mb-[2vw]">
                            <span className="text-[#0EFF95]">Contact us</span> now<br />
                            & find your own<br />
                            <span className="text-[#0EFF95]">financial freedom</span>
                        </h2>
                        
                        <button ref={buttonRef} className="bg-[#0EFF95] text-[#363256] px-[2vw] py-[0.8vw] rounded-full text-[1.4vw] font-bold hover:bg-[#00D4AA] transition-all duration-300 transform hover:scale-105 shadow-lg sm:px-[2.8vw] sm:py-[1.1vw] sm:text-[2vw] md:px-[2.5vw] md:py-[1vw] md:text-[1.8vw] lg:px-[2.2vw] lg:py-[0.9vw] lg:text-[1.6vw] xl:px-[2vw] xl:py-[0.8vw] xl:text-[1.4vw]">
                            Contact
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactSection;

