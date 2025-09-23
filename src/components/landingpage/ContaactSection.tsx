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
        <section ref={sectionRef} className="relative bg-gradient-to-r from-[#363256]  to-[#50488A] h-[170vh]  flex items-center justify-center z-0 ">
            
            {/* Smile Background */}
            <div ref={smileBgRef} className="absolute inset mt-50   w-full h-full">
                <Image
                    src={smileBg}
                    alt="Smile background"
                    fill
                    className="object-cover "
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
            <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
                <h2 ref={headingRef} className="text-5xl sm:text-6xl lg:text-7xl xl:text-[6rem] font-semibold text-white leading-tight mb-12">
                    <span className="text-[#0EFF95] ">Contact us</span> now<br />
                    & find your own<br />
                    <span className="text-[#0EFF95] ">financial freedom</span>
                </h2>
                
                <button ref={buttonRef} className="bg-[#0EFF95] text-[#363256] px-12 py-4 rounded-full text-xl lg:text-2xl font-bold hover:bg-[#00D4AA] transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Contact
                </button>
            </div>
        </section>
    );
};

export default ContactSection;

