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
      const isMobile = window.innerWidth < 1024;

      if (isMobile) {
   
        gsap.set(cardsRef.current?.children || [], {
          opacity: 0,
          y: 50,
          scale: 0.9,
        });

        gsap.to(cardsRef.current?.children || [], {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });
      } else {
   
        gsap.set(cardsRef.current?.children || [], {
          opacity: 1,
          y: -150,
          rotation: () => gsap.utils.random(-45, 45),
          scale: 0.8,
          transformOrigin: "top center",
        });

        gsap.to(cardsRef.current?.children || [], {
          opacity: 1,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.5,
          stagger: {
            each: 0.2,
            ease: "power2.out",
          },
          ease: "bounce.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none none",
          },
        });
      }

 
      if (!isMobile && cardsRef.current?.children) {
        Array.from(cardsRef.current.children).forEach((card) => {
          const cardElement = card as HTMLElement;

          cardElement.addEventListener("mouseenter", () => {
            gsap.to(cardElement, {
              y: -15,
              rotation: gsap.utils.random(-3, 3),
              scale: 1.05,
              duration: 0.6,
              ease: "elastic.out(1, 0.75)",
            });
          });

          cardElement.addEventListener("mouseleave", () => {
            gsap.to(cardElement, {
              y: 0,
              rotation: 0,
              scale: 1,
              duration: 0.8,
              ease: "elastic.out(1.2, 0.75)",
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-r from-[#363256] to-[#50488A] py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32"
    >
  
      <div className="lg:hidden relative w-full px-4 py-12 overflow-hidden">
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
            <div className="absolute inset-0 -mx-4 -left-50 -my-4 z-0 ">
              <Image
                src={WhiteBg}
                alt="Education background shape"
                className="w-full h-full object-contain"
              />
            </div>

            <h2 className="relative z-10 text-[#50488A] text-2xl font-medium leading-tight">
              <div className="inline-block bg-[#50488A]  text-white px-8 py-3 rounded-full text-base font-semibold mb-6 shadow-md">
                Education
              </div>{" "}
              <br />
              <span className="font-black">Smart education</span>
              <br />
              for your smart <span className="font-black">financial</span>
            </h2>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="relative z-10 flex flex-col items-center space-y-8 px-2"
        >
          <div className="w-60 max-w-sm">
            <CardEducation
              title="Financial Planning"
              description="Exposing your inventory to incidents is a thing of the past."
            />
          </div>
          <div className="w-60 max-w-sm">
            <CardEducation
              title="Investment Basics"
              description="Exposing your inventory to incidents is a thing of the past."
            />
          </div>
          <div className="w-60 max-w-sm">
            <CardEducation
              title="Budgeting Tips"
              description="Exposing your inventory to incidents is a thing of the past."
            />
          </div>
        </div>
      </div>

  
      <div className="hidden lg:block relative w-full max-w-screen-xl mx-auto">
        <div className="relative">
          <Image
            src={WhiteBg}
            alt="Education background shape"
            width={1048}
            height={912}
            className="w-full h-auto"
          />
          <div
            className="absolute top-[20%] right-12 bg-[#50488A] text-white rounded-full font-semibold cursor-pointer transform transition-transform duration-300 hover:scale-110
                                    lg:px-10 lg:py-3 lg:text-xl
                                    xl:px-12 xl:py-4 xl:text-2xl"
          >
            Education
          </div>

          <div
            className="absolute z-10
                                    lg:-top-32 lg:left-12 lg:w-[32rem]
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

          <div
            className="absolute top-1/2 -translate-y-1/2 text-right
                                    lg:right-16 lg:max-w-2xl
                                    xl:right-20 xl:max-w-3xl"
          >
       
            <h2
              className="text-[#50488A] font-medium leading-tight
                                        lg:text-5xl
                                        xl:text-6xl"
            >
              <span className="font-black">Smart education</span>
              <br />
              for your smart <span className="font-black">financial</span>
            </h2>
          </div>
        </div>

        <div
          className="relative z-20
                                lg:-mt-16 lg:px-16
                                xl:-mt-20 xl:px-20"
        >
          <div
            ref={cardsRef}
            className="grid justify-items-center mx-auto
                                                    lg:grid-cols-2 lg:gap-x-12 lg:gap-y-32 lg:max-w-4xl
                                                    xl:grid-cols-3 xl:gap-x-12 xl:gap-y-32 xl:max-w-6xl"
          >
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
