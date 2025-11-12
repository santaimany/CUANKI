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
  <div className="bg-[#A3FFD6] rounded-[2vw] p-[2vw] w-[12vw] h-[31vh] flex flex-col items-center justify-center sm:w-[16vw] sm:h-[35vh] sm:p-[2.8vw] md:w-[14vw] md:h-[33vh] md:p-[2.4vw] lg:w-[13vw] lg:h-[32vh] lg:p-[2.2vw] xl:w-[12vw] xl:h-[31vh] xl:p-[2vw]">
    <Image src={icon} alt={alt} width={50} height={50} className="mb-[1vw] w-[3vw] h-[3vw] sm:mb-[1.4vw] sm:w-[4.2vw] sm:h-[4.2vw] md:mb-[1.2vw] md:w-[3.6vw] md:h-[3.6vw] lg:mb-[1.1vw] lg:w-[3.3vw] lg:h-[3.3vw] xl:mb-[1vw] xl:w-[3vw] xl:h-[3vw]" />
    <h4 className="text-[#453F76] text-[1.2vw] font-bold text-center leading-tight sm:text-[1.7vw] md:text-[1.4vw] lg:text-[1.3vw] xl:text-[1.2vw]">
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
      // --- ANIMASI MOBILE ---
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      
      if (isMobile) {
        // Mobile animations
        gsap.set(".mobile-coin-jar", { x: -100, autoAlpha: 0 });
        gsap.set(".mobile-header", { y: -30, autoAlpha: 0 });
        gsap.set(".mobile-feature-card", { scale: 0.8, autoAlpha: 0 });
        gsap.set(".mobile-connector", { scaleY: 0, transformOrigin: "top" });
        gsap.set(".mobile-text-box", { y: 50, autoAlpha: 0 });
        gsap.set(".mobile-buttons", { y: 30, autoAlpha: 0 });

        const tlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: ".mobile-section",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        tlMobile
          .to(".mobile-coin-jar", { x: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" })
          .to(".mobile-header", { y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
          .to(".mobile-feature-card", { 
            scale: 1, 
            autoAlpha: 1, 
            stagger: 0.15, 
            duration: 0.5, 
            ease: "back.out(1.7)" 
          }, "-=0.3")
          .to(".mobile-connector", { 
            scaleY: 1, 
            autoAlpha: 1, 
            stagger: 0.15, 
            duration: 0.4, 
            ease: "power2.inOut" 
          }, "-=0.8")
          .to(".mobile-text-box", { y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" }, "-=0.3")
          .to(".mobile-buttons", { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" }, "-=0.3");
      }

      // --- ANIMASI DESKTOP BAGIAN 1 ---
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
      {/* Mobile Layout */}
      <section className="mobile-section lg:hidden relative min-h-screen flex flex-col py-8 px-6 overflow-hidden">
        {/* Coin Jar decorative - positioned like in image */}
        <div className="mobile-coin-jar absolute top-20 -left-8 z-0">
          <Image
            src={CoinJar}
            alt="Coin Jar"
            width={180}
            height={180}
            className="w-36 h-auto opacity-90"
          />
        </div>

        {/* Header */}
        <div className="mobile-header relative z-10 text-justify mb-12 pl-4">
          <h2 className="text-white text-5xl ">
            <span className="flex items-center gap-2 mb-1">
              <Image
                src={Clogo}
                alt="Cuanki Logo"
                width={32}
                height={32}
                className="w-14 h-14"
              />
              <span className="font-bold">heck</span>
            </span>
            <span className="block">Our</span>
            <span className="text-[#0EFF95] font-bold block">Features</span>
          </h2>
        </div>

        {/* Feature Flowchart - 2 Column Layout like in image */}
        <div className="relative z-10 flex flex-col items-center mb-8 px-2">
          {/* Row 1: AI Assistant (left) and Financial Edu (right) */}
          <div className="w-full flex justify-center  mb-0">
            {/* AI Assistant - Left */}
            <div className="flex flex-col items-center">
              <div className="mobile-feature-card bg-[#A3FFD6] rounded-3xl p-6 w-40 h-46 flex flex-col items-center justify-center shadow-lg">
                <Image src={AiIcon} alt="AI Assistant" width={44} height={44} className="mb-3 w-11 h-11" />
                <h4 className="text-[#453F76] text-sm font-bold text-center leading-tight">
                  AI<br />Assistant
                </h4>
              </div>
              <div className="mobile-connector w-5 h-20 bg-[#A3FFD6]"></div>
            </div>

            {/* Financial Edu - Right */}
            <div className="flex flex-col items-center">
              <div className="mobile-feature-card bg-[#A3FFD6] rounded-3xl p-6 w-40 h-46  flex flex-col items-center justify-center shadow-lg">
                <Image src={EduIcon} alt="Financial Education" width={44} height={44} className="mb-3 w-11 h-11" />
                <h4 className="text-[#453F76] text-sm font-bold text-center leading-tight">
                  Financial<br />Edu
                </h4>
              </div>
              <div className="mobile-connector w-5 h-20 bg-[#A3FFD6]"></div>
            </div>
          </div>

          {/* Row 2: Money Manager (left) and Calendar Logs (right) */}
          <div className="w-full flex justify-center mb-0">
            {/* Money Manager - Left */}
            <div className="flex flex-col items-center">
              <div className="mobile-feature-card bg-[#A3FFD6] rounded-3xl p-6 w-40 h-46  flex flex-col items-center justify-center shadow-lg">
                <Image src={MoneyIcon} alt="Money Manager" width={44} height={44} className="mb-3 w-11 h-11" />
                <h4 className="text-[#453F76] text-sm font-bold text-center leading-tight">
                  Money<br />Manager
                </h4>
              </div>
              <div className="mobile-connector w-5 h-30 bg-[#A3FFD6]"></div>
            </div>

            {/* Calendar Logs - Right */}
            <div className="flex flex-col items-center">
              <div className="mobile-feature-card bg-[#A3FFD6] rounded-3xl p-6 w-40 h-46 flex flex-col items-center justify-center shadow-lg">
                <Image src={CalendarIcon} alt="Calendar Logs" width={44} height={44} className="mb-3 w-11 h-11" />
                <h4 className="text-[#453F76] text-sm font-bold text-center leading-tight">
                  Calendar<br />Logs
                </h4>
              </div>
              <div className="mobile-connector w-5 h-30 bg-[#A3FFD6]"></div>
            </div>
          </div>

          {/* Bottom Text Box - Full Width */}
          <div className="mobile-text-box bg-[#A3FFD6] rounded-3xl p-10 w-full shadow-lg">
            <h3 className="text-[#50488A] text-2xl font-normal mb-4 leading-snug">
              We <span className="font-bold">deliver</span> you a <span className="font-bold">milestone</span> to your <span className="font-bold">financial goal</span>
            </h3>
            <p className="text-[#50488A] text-sm leading-relaxed">
              Exposing your inventory to incidents is a thing of the past. We have a professional insurance policy that protects all your items against damage and theft.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mobile-buttons relative z-10 flex justify-center items-center gap-4 mt-4">
          <button className="bg-[#A3FFD6] text-[#1e1e1e] font-bold py-2.5 px-8 text-sm rounded-full  hover:bg-[#8FFFBF] transition-colors">
             Explore <span className="text-lg">→</span>
          </button>
          
        </div>
      </section>

      {/* Desktop Layout */}
      <section
        ref={section1Ref}
        className="hidden lg:flex relative h-screen items-center"
      >
        <div className="absolute bottom-[-15vw] z-10 coin-jar-anim sm:bottom-[-18vw] md:bottom-[-16vw] lg:bottom-[-15.5vw] xl:bottom-[-15vw]">
          <Image
            src={CoinJar}
            alt="Coin Jar"
            width={550}
            height={550}
            className="w-[25vw] h-auto sm:w-[35vw] md:w-[30vw] lg:w-[27vw] xl:w-[25vw]"
          />
        </div>
        <div className="relative z-20 w-full px-[2vw] flex items-center sm:px-[3vw] md:px-[2.5vw] lg:px-[2.2vw] xl:px-[2vw]">
          <div className="w-full lg:w-auto text-center lg:text-left lg:translate-x-[10vw] lg:-translate-y-[6vw] lg:flex-grow sm:lg:translate-x-[12vw] sm:lg:-translate-y-[7vw] md:lg:translate-x-[11vw] md:lg:-translate-y-[6.5vw] xl:lg:translate-x-[10vw] xl:lg:-translate-y-[6vw]">
            <div className="mb-[8vw] lg:mb-0 sm:mb-[10vw] md:mb-[9vw] xl:mb-[8vw]">
              <h2 className="text-white text-[4vw] leading-tight sm:text-[5.5vw] md:text-[4.8vw] lg:text-[4.3vw] xl:text-[4vw]">
                <span className="flex items-center justify-center lg:justify-start">
                  <div className="clogo-anim">
                    <Image
                      src={Clogo}
                      alt="Cuanki Logo"
                      className="w-[4vw] h-[4vw] sm:w-[5.5vw] sm:h-[5.5vw] md:w-[4.8vw] md:h-[4.8vw] lg:w-[4.3vw] lg:h-[4.3vw] xl:w-[4vw] xl:h-[4vw]"
                    />
                  </div>
                  <span className="font-bold title-text-anim">heck</span>
                </span>
                <span className="title-text-anim">Our</span>
              </h2>
              <h3 className="text-[#0EFF95] text-[4vw] font-bold title-text-anim sm:text-[5.5vw] md:text-[4.8vw] lg:text-[4.3vw] xl:text-[4vw]">
                Features
              </h3>
            </div>
          </div>
          <div
            className="hidden lg:block w-[50vw] h-[50vw] relative flex-shrink-0 ml-[4vw] sm:lg:w-[55vw] sm:lg:h-[55vw] sm:lg:ml-[5vw] md:lg:w-[52vw] md:lg:h-[52vw] md:lg:ml-[4.5vw] xl:lg:w-[50vw] xl:lg:h-[50vw] xl:lg:ml-[4vw]"
          >
            <div className="absolute bottom-[6vw] left-[-8vw] z-10 card-node-anim sm:bottom-[7vw] sm:left-[-10vw] md:bottom-[6.5vw] md:left-[-9vw] lg:bottom-[6.2vw] lg:left-[-8.5vw] xl:bottom-[6vw] xl:left-[-8vw]">
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1.4vw] h-[39vh] bg-[#A3FFD6] line-anim sm:w-[2vw] sm:h-[42vh] md:w-[1.7vw] md:h-[40vh] lg:w-[1.5vw] lg:h-[39.5vh] xl:w-[1.4vw] xl:h-[39vh]"></div>
              </div>
            </div>
            <div className="absolute top-[18vw] left-[2vw] z-10 card-node-anim sm:top-[20vw] sm:left-[1vw] md:top-[19vw] md:left-[1.5vw] lg:top-[18.5vw] lg:left-[1.8vw] xl:top-[18vw] xl:left-[2vw]">
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1.4vw] h-[50vh] bg-[#A3FFD6] line-anim sm:w-[2vw] sm:h-[53vh] md:w-[1.7vw] md:h-[51vh] lg:w-[1.5vw] lg:h-[50.5vh] xl:w-[1.4vw] xl:h-[50vh]"></div>
              </div>
            </div>
            <div className="absolute top-[9vw] left-[12vw] z-10 card-node-anim sm:top-[10vw] sm:left-[14vw] md:top-[9.5vw] md:left-[13vw] lg:top-[9.2vw] lg:left-[12.5vw] xl:top-[9vw] xl:left-[12vw]">
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1.4vw] h-[68vh] bg-[#A3FFD6] line-anim sm:w-[2vw] sm:h-[71vh] md:w-[1.7vw] md:h-[69vh] lg:w-[1.5vw] lg:h-[68.5vh] xl:w-[1.4vw] xl:h-[68vh]"></div>
              </div>
            </div>
            <div className="absolute top-[18vw] right-[15vw] z-10 card-node-anim sm:top-[20vw] sm:right-[17vw] md:top-[19vw] md:right-[16vw] lg:top-[18.5vw] lg:right-[15.5vw] xl:top-[18vw] xl:right-[15vw]">
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1.4vw] h-[45vh] bg-[#A3FFD6] line-anim sm:w-[2vw] sm:h-[48vh] md:w-[1.7vw] md:h-[46vh] lg:w-[1.5vw] lg:h-[45.5vh] xl:w-[1.4vw] xl:h-[45vh]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BAGIAN 2: MILESTONE - Desktop Only */}
      <section
        ref={section2Ref}
        className="hidden lg:block relative z-10 px-[2vw] overflow-hidden py-[4vw] sm:px-[3vw] sm:py-[5vw] md:px-[2.5vw] md:py-[4.5vw] lg:px-[2.2vw] lg:py-[4.2vw] xl:px-[2vw] xl:py-[4vw]"
      >
        <div className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src={GreenBgInverted}
              alt="Milestone background"
              layout="fill"
              objectFit="fill"
            />
          </div>
               <div className="absolute top-[70%] right-[36%] z-[-20] sm:top-[68%] sm:right-[34%] md:top-[69%] md:right-[35%] lg:top-[69.5%] lg:right-[35.5%] xl:top-[70%] xl:right-[36%]">
                    <Image
                      src={WhiteEllipse}
                      alt="White Ellipse"
                      width={200}
                      height={200}
                      className="w-[9vw] h-[9vw] sm:w-[12vw] sm:h-[12vw] md:w-[10.5vw] md:h-[10.5vw] lg:w-[9.8vw] lg:h-[9.8vw] xl:w-[9vw] xl:h-[9vw]"
                    />
                  </div>
          <div className="relative z-10">
            <Image
              src={GreenBgInverted}
              alt=""
              className="w-full h-auto invisible"
              aria-hidden="true"
            />
            <div className="absolute inset-0 z-10 p-[2vw] flex flex-col justify-center lg:justify-between sm:p-[3vw] md:p-[2.5vw] lg:p-[2.2vw] xl:p-[2vw]">
              <div className="lg:translate-x-[10vw] sm:lg:translate-x-[12vw] md:lg:translate-x-[11vw] xl:lg:translate-x-[10vw]">
                <h3
                  ref={milestoneTitleRef}
                  className="text-[#50488A] text-[4vw] leading-tight max-w-[80vw] mx-auto text-center sm:text-[5.5vw] sm:max-w-[85vw] md:text-[4.8vw] md:max-w-[82vw] lg:text-[4.3vw] lg:max-w-[81vw] xl:text-[4vw] xl:max-w-[80vw]"
                >
                  We <span className="font-bold"> deliver</span> you a{" "}
                  <span className="font-bold">milestone</span> <br /> to your{" "}
                  <span className="font-bold">financial goal</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 items-end lg:mt-0">
                <div className="lg:-translate-y-[12vw] sm:lg:-translate-y-[14vw] md:lg:-translate-y-[13vw] xl:lg:-translate-y-[12vw]">
                  <p className="text-[#50488A] text-[2vw] max-w-[40vw] text-justify milestone-paragraph sm:text-[2.8vw] sm:max-w-[55vw] md:text-[2.4vw] md:max-w-[48vw] lg:text-[2.2vw] lg:max-w-[42vw] xl:text-[2vw] xl:max-w-[40vw]">
                    Jangan Cuma Punya Mimpi. Wujudkan Bersama Kami.Cuanki adalah solusi untuk mengubah goals besarmu menjadi langkah-langkah harian yang pasti bisa kamu lakukan.
                  </p>
                </div>

                <div className="flex justify-center lg:justify-end items-center w-full mt-[3vw] lg:mt-0 lg:-translate-x-[8vw] lg:-translate-y-[20vw] sm:mt-[4vw] sm:lg:-translate-x-[10vw] sm:lg:-translate-y-[22vw] md:mt-[3.5vw] md:lg:-translate-x-[9vw] md:lg:-translate-y-[21vw] xl:mt-[3vw] xl:lg:-translate-x-[8vw] xl:lg:-translate-y-[20vw]">
                  <div className="flex items-center gap-[3vw] milestone-buttons sm:gap-[4vw] md:gap-[3.5vw] lg:gap-[3.2vw] xl:gap-[3vw]">
                    <button className="bg-[#A3FFD6] text-[#1e1e1e] font-bold py-[0.8vw] px-[2.5vw] text-[1.5vw] rounded-full sm:py-[1.1vw] sm:px-[3.5vw] sm:text-[2.1vw] md:py-[1vw] md:px-[3vw] md:text-[1.8vw] lg:py-[0.9vw] lg:px-[2.8vw] lg:text-[1.6vw] xl:py-[0.8vw] xl:px-[2.5vw] xl:text-[1.5vw]">
                      Read
                    </button>
                    <a
                      href="#"
                      className="text-[#A3FFD6] font-bold flex items-center gap-[0.5vw] text-[1.5vw] sm:gap-[0.7vw] sm:text-[2.1vw] md:gap-[0.6vw] md:text-[1.8vw] lg:gap-[0.55vw] lg:text-[1.6vw] xl:gap-[0.5vw] xl:text-[1.5vw]"
                    >
                      Explore <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
                     <div className="absolute bottom-0 -right-[5vw] sm:-right-[6vw] md:-right-[5.5vw] lg:-right-[5.2vw] xl:-right-[5vw]">
                    <Image
                      src={CGreen}
                      alt="C Green Ellipse"
                      width={200}
                      height={200}
                      className="w-[13vw] h-[13vw] sm:w-[18vw] sm:h-[18vw] md:w-[15vw] md:h-[15vw] lg:w-[14vw] lg:h-[14vw] xl:w-[13vw] xl:h-[13vw]"
                    />
                  </div>
      </section>
    </div>
  );
};

export default FeaturesSection;
