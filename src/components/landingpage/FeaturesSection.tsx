"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import Clogo from "@/assets/landingpage/logo/cuanki-logo-white.svg";
import CoinJar from "@/assets/landingpage/image/coin-jar.svg";
import Image from "next/image";
import MoneyIcon from "@/assets/landingpage/icons/money-icon.svg";
import CalendarIcon from "@/assets/landingpage/icons/calendar-icon.svg";
import AiIcon from "@/assets/landingpage/icons/ai-icon.svg";
import EduIcon from "@/assets/landingpage/icons/education-icon.svg";
import GreenBgInverted from "@/assets/landingpage/background/green-features-inverted.svg";
import WhiteEllipse from "@/assets/commons/icons/white-ellipse.svg";
import CGreen from "@/assets/commons/icons/c-green.svg";  

gsap.registerPlugin(ScrollTrigger, SplitText);

type FeatureCardProps = {
  icon: string;
  alt: string;
  title: React.ReactNode;
};

const FeatureCard = ({ icon, alt, title }: FeatureCardProps) => (
  <div className="bg-[#A3FFD6] rounded-3xl p-8 w-60 h-[30vh] flex flex-col items-center justify-center">
    <Image src={icon} alt={alt} width={50} height={50} className="mb-4" />
    <h4 className="text-[#453F76] text-3xl font-bold text-center leading-tight">
      {title}
    </h4>
  </div>
);

const FeaturesSection = () => {
  const mainRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const milestoneTitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- ANIMASI BAGIAN 1 (Tidak ada perubahan) ---
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: section1Ref.current,
          start: "top top",
          end: "+=2500",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
      gsap.set(".coin-jar-anim", { xPercent: -100, autoAlpha: 0 });
      gsap.set(".title-text-anim", { y: 50, autoAlpha: 0 });
      gsap.set(".clogo-anim", { x: -50, autoAlpha: 0 });
      gsap.set(".card-node-anim", { y: 150, autoAlpha: 0 });
      gsap.set(".line-anim", { scaleY: 0, transformOrigin: "top" });
      tl1
        .to(".coin-jar-anim", { xPercent: 0, autoAlpha: 1, ease: "power2.out" })
        .to(".clogo-anim", { x: 0, autoAlpha: 1, ease: "power2.out" }, "<")
        .to(
          ".title-text-anim",
          { y: 0, autoAlpha: 1, stagger: 0.1, ease: "power2.out" },
          "<"
        )
        .to(
          ".card-node-anim",
          { y: 0, autoAlpha: 1, stagger: 0.15, ease: "power3.out" },
          "-=0.5"
        )
        .to(
          ".line-anim",
          { scaleY: 1, autoAlpha: 1, stagger: 0.15, ease: "power3.inOut" },
          "-=0.5"
        );

      // --- ANIMASI BAGIAN 2 (Trigger diubah agar lebih cepat) ---
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top 100%", // DIUBAH: dari 70% menjadi 85%
          toggleActions: "play none none reverse",
        },
      });

      const splitMilestoneTitle = new SplitText(milestoneTitleRef.current, {
        type: "words,lines",
      });

      gsap.set(section2Ref.current, { autoAlpha: 0 });
      gsap.set(splitMilestoneTitle.words, { y: 30, autoAlpha: 0 });
      gsap.set(".milestone-paragraph", { y: 20, autoAlpha: 0 });
      gsap.set(".milestone-buttons", { autoAlpha: 0, scale: 0.8 });

      tl2
        .to(section2Ref.current, { autoAlpha: 1, duration: 0.1 })
        .to(".milestone-bg-anim", {
          clipPath: "circle(100% at 50% 50%)",
          autoAlpha: 1,
          duration: 1.5,
          ease: "power3.inOut",
        })
        .to(".coin-jar-anim", { y: -50, ease: "power2.out" }, "<")
        .to(
          splitMilestoneTitle.words,
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.05,
            duration: 1.8,
            ease: "power3.out",
          },
          "-=1.2"
        )
        .to(
          ".milestone-paragraph",
          { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" },
          "-=0.8"
        )
        .to(
          ".milestone-buttons",
          { autoAlpha: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
          "-=0.6"
        );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      className="bg-gradient-to-r from-[#363256]  to-[#50488A]"
    >
      <section
        ref={section1Ref}
        className="relative h-screen flex items-center"
      >
        <div className="absolute bottom-[-15rem]  sm:bottom-[-20rem] lg:bottom-[-27rem] z-10 coin-jar-anim">
          <Image
            src={CoinJar}
            alt="Coin Jar"
            width={550}
            height={550}
            className="w-[400px] sm:w-[550px] lg:w-[650px] h-auto"
          />
        </div>
        <div className="relative z-20 w-full px-4 sm:px-8 lg:px-24 flex items-center">
          <div className="w-full lg:w-auto text-center lg:text-left lg:translate-x-40 lg:-translate-y-40 lg:flex-grow">
            <div className="mb-32 lg:mb-0">
              <h2 className="text-white text-5xl sm:text-7xl lg:text-8xl leading-tight">
                <span className="flex items-center justify-center lg:justify-start">
                  <div className="clogo-anim">
                    <Image
                      src={Clogo}
                      alt="Cuanki Logo"
                      className="w-16 h-16 sm:w-20 sm:h-20"
                    />
                  </div>
                  <span className="font-bold title-text-anim">heck</span>
                </span>
                <span className="title-text-anim">Our</span>
              </h2>
              <h3 className="text-[#0EFF95] text-5xl sm:text-7xl lg:text-8xl font-bold title-text-anim">
                Features
              </h3>
            </div>
          </div>
          <div
            className="hidden lg:block w-auto h-[800px] relative flex-shrink-0 ml-16"
            style={{ width: "800px" }}
          >
            <div className="absolute bottom-[2rem] left-[-10rem] z-10 card-node-anim">
              <div className="relative">
                <FeatureCard
                  icon={MoneyIcon}
                  alt="Money Manager"
                  title={
                    <>
                      Money
                      <br />
                      Manager
                    </>
                  }
                />
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-7 h-[17vh] bg-[#A3FFD6] line-anim"></div>
              </div>
            </div>
            <div className="absolute top-[20rem] left-10 z-10 card-node-anim">
              <div className="relative">
                <FeatureCard
                  icon={CalendarIcon}
                  alt="Calendar Logs"
                  title={
                    <>
                      Calendar
                      <br />
                      Logs
                    </>
                  }
                />
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-7 h-[36vh] bg-[#A3FFD6] line-anim"></div>
              </div>
            </div>
            <div className="absolute top-[6rem] left-[15rem] z-10 card-node-anim">
              <div className="relative">
                <FeatureCard
                  icon={AiIcon}
                  alt="AI Assistant"
                  title={
                    <>
                      AI
                      <br />
                      Assistant
                    </>
                  }
                />
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-7 h-[61vh] bg-[#A3FFD6] line-anim"></div>
              </div>
            </div>
            <div className="absolute top-[15rem] right-25 z-10 card-node-anim">
              <div className="relative">
                <FeatureCard
                  icon={EduIcon}
                  alt="Financial Education"
                  title={
                    <>
                      Financial
                      <br />
                      Edu
                    </>
                  }
                />
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-7 h-[45vh] bg-[#A3FFD6] line-anim"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BAGIAN 2: MILESTONE */}
      <section
        ref={section2Ref}
        className="relative z-10 px-4 sm:px-8 overflow-hidden lg:px-16 py-16"
      >
        <div className="relative  ">
          <div className="absolute inset-0 z-0 ">
            <Image
              src={GreenBgInverted}
              alt="Milestone background"
              layout="fill"
              objectFit="fill"
            />
          </div>
               <div className="absolute top-[70%] right-[35%] z-[-20]">
                    <Image
                      src={WhiteEllipse}
                      alt="White Ellipse"
                      width={200}
                      height={200}
                      className="w-44 h-44"
                    />
                  </div>
          <div className="relative z-10">
            <Image
              src={GreenBgInverted}
              alt=""
              className="w-full h-auto invisible"
              aria-hidden="true"
            />
            <div className="absolute inset-0 z-10 p-6 sm:p-8 lg:p-12 xl:p-24 flex flex-col justify-center lg:justify-between">
              <div className="lg:translate-x-40">
                <h3
                  ref={milestoneTitleRef}
                  className="text-[#50488A] text-[clamp(2.5rem,8vw,5rem)] lg:text-7xl  leading-tight max-w-7xl mx-auto text-center"
                >
                  We <span className="font-bold"> deliver</span> you a{" "}
                  <span className="font-bold">milestone</span> <br /> to your{" "}
                  <span className="font-bold">financial goal</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 items-end mt-12 lg:mt-0">
                <div className="lg:-translate-y-30">
                  <p className="text-[#50488A] text-[clamp(1.25rem,4vw,2.25rem)] lg:text-[2.7rem] max-w-2xl text-justify milestone-paragraph">
                    Exposing your inventory to incidents is a thing of the past.
                    We have a professional insurance policy that protects all
                    your items against damage and theft.
                  </p>
                </div>

                <div className="flex justify-center lg:justify-end items-center w-full mt-12 lg:mt-0 lg:-translate-x-30 lg:-translate-y-80">
                  <div className="flex items-center gap-12 lg:gap-20 milestone-buttons">
                    <button className="bg-[#A3FFD6] text-[#1e1e1e] font-bold py-3 px-10 text-[clamp(1.25rem,3vw,2rem)] lg:py-3 lg:px-14 lg:text-2xl rounded-full">
                      Read
                    </button>
                    <a
                      href="#"
                      className="text-[#A3FFD6] font-bold flex items-center gap-2 text-[clamp(1.25rem,3vw,2rem)] lg:text-2xl"
                    >
                      Explore <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
                     <div className="absolute bottom-0  -right-20 ">
                    <Image
                      src={CGreen}
                      alt="C Green Ellipse"
                      width={200}
                      height={200}
                      className="w-64 h-64"
                    />
                  </div>
      </section>
    </div>
  );
};

export default FeaturesSection;
