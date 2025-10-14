"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TopiToga from "@/assets/landingpage/image/topitogawithcoin-image.svg";
import WhiteBg from "@/assets/landingpage/background/green-education-inverted.svg";
import CardEducation from "./CardEducation";

gsap.registerPlugin(ScrollTrigger);

const EducationSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            gsap.set(cardsRef.current?.children || [], {
                opacity: 1,
                y: -150,
                rotation: () => gsap.utils.random(-45, 45),
                scale: 0.8,
                transformOrigin: "top center"
            });

       
            gsap.to(cardsRef.current?.children || [], {
                opacity: 1,
                y: 0,
                rotation: 0,
                scale: 1,
                duration: 1.5,
                stagger: {
                    each: 0.2,
                    ease: "power2.out"
                },
                ease: "bounce.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 50%",
                    toggleActions: "play none none none"
                }
            });

        
            if (cardsRef.current?.children) {
                Array.from(cardsRef.current.children).forEach((card) => {
                    const cardElement = card as HTMLElement;
                    
                    cardElement.addEventListener('mouseenter', () => {
                        gsap.to(cardElement, {
                            y: -15,
                            rotation: gsap.utils.random(-3, 3),
                            scale: 1.05,
                            duration: 0.6,
                            ease: "elastic.out(1, 0.75)"
                        });
                    });

                    cardElement.addEventListener('mouseleave', () => {
                        gsap.to(cardElement, {
                            y: 0,
                            rotation: 0,
                            scale: 1,
                            duration: 0.8,
                            ease: "elastic.out(1.2, 0.75)"
                        });
                    });
                });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);
    return (
        <section ref={sectionRef} className="relative bg-gradient-to-r from-[#363256] to-[#50488A] py-[4vw] sm:py-[5vw] md:py-[4.5vw] lg:py-[5vw] xl:py-[6vw]">
         
            <div className="relative w-full max-w-[90vw] mx-auto sm:max-w-[95vw] md:max-w-[92vw] lg:max-w-[91vw] xl:max-w-[90vw]">
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

                {/* Education Cards */}
                <div className="relative -mt-[4vw] px-[2vw] z-20 sm:-mt-[5vw] sm:px-[1vw] md:-mt-[4.5vw] md:px-[1.5vw] lg:-mt-[4.2vw] lg:px-[4vw] xl:-mt-[4vw] xl:px-[4vw]">
                    <div ref={cardsRef} className="grid grid-cols-1 gap-[17vw] justify-items-center max-w-[60vw] mx-auto sm:grid-cols-1 sm:gap-[20vw] sm:max-w-[70vw] md:grid-cols-2 md:gap-[18vw] md:max-w-[65vw] lg:grid-cols-2 lg:gap-[17.5vw] lg:max-w-[62vw] xl:grid-cols-3 xl:gap-[17vw] xl:max-w-[60vw]">
                        <CardEducation 
                            title="Financial Planning"
                            description="Learn how to create and manage your personal financial plan effectively"
                        />
                        <CardEducation 
                            title="Investment Basics"
                            description="Understand the fundamentals of investing and building wealth over time"
                        />
                        <CardEducation 
                            title="Budgeting Tips"
                            description="Master the art of budgeting to control your expenses and save money"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationSection;