'use client'
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Logo from "@/assets/landingpage/logo/cuanki-logo.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const langRef = useRef<HTMLAnchorElement | null>(null);
  const loginBtnRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        paused: true,
        defaults: { ease: "expo.inOut" }
      });

      tl.to(navRef.current, { 
        yPercent: -100, 
        duration: 1, 
      });

      tl.set(navRef.current, {
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      });
      tl.set(navContainerRef.current, { paddingTop: "1.2vw", paddingBottom: "1.2vw" });
      tl.set(logoRef.current, { width: "8vw" });
      tl.set(navLinkRefs.current, { fontSize: "1.1vw" });
      tl.set(loginBtnRef.current, { padding: "0.4vw 1.6vw", fontSize: "1.1vw" });
      tl.set(langRef.current, { padding: "0.4vw 1.2vw" });

      tl.to(navRef.current, { 
        yPercent: 0, 
        duration: 1, 
      });

      ScrollTrigger.create({
        trigger: document.documentElement,
      
        start: "400vw top",
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });
      
    }, navRef);

    return () => ctx.revert();
  }, []);


  return (
    <>
      <nav ref={navRef} className="w-full bg-gradient-to-r from-[#363256] to-[#50488A] sticky top-0 z-50 border-b border-transparent">
        <div ref={navContainerRef} className="w-full max-w-screen-2xl mx-auto flex justify-between items-center px-[6vw] py-[1.5vw] sm:px-[4vw] sm:py-[1.2vw] md:px-[5vw] md:py-[1.3vw] lg:px-[6vw] lg:py-[1.5vw]">
          
          <div className="flex items-center">
            <Link href="/" className="cursor-pointer transition-transform duration-200 w-[9vw] sm:w-[12vw] md:w-[10vw] lg:w-[9vw]">
            <Image ref={logoRef} src={Logo} alt="Cuanki Logo"/>
            </Link>
            <div className="hidden md:flex items-center ml-[2.5vw] gap-[2vw] sm:ml-[3vw] sm:gap-[2.5vw] md:ml-[2.8vw] md:gap-[2.2vw] lg:ml-[2.5vw] lg:gap-[2vw]">
              <Link
                ref={el => { navLinkRefs.current[0] = el; }}
                href="/education" 
                className="text-white font-semibold hover:text-[#00E676] transition-colors duration-200 text-[1.3vw] sm:text-[1.6vw] md:text-[1.4vw] lg:text-[1.3vw]"
              >
                Education
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-[1.5vw] sm:gap-[2vw] md:gap-[1.8vw] lg:gap-[1.5vw]">
            <Link href="/register" ref={langRef} className="flex items-center text-[#0EFF95] border-2 border-[#0EFF95] rounded-full cursor-pointer hover:bg-white/10 transition-colors duration-200 px-[1.6vw] py-[0.3vw] sm:px-[2vw] sm:py-[0.4vw] md:px-[1.8vw] md:py-[0.35vw] lg:px-[1.6vw] lg:py-[0.3vw]">
              <span className="font-semibold text-[1.1vw] sm:text-[1.4vw] md:text-[1.2vw] lg:text-[1.1vw]">Register</span>
            </Link>
            <Link href="/login" ref={loginBtnRef} className="bg-[#0EFF95] text-[#4A4978] font-bold rounded-full hover:bg-opacity-90 transition-all duration-200 shadow-lg px-[2.4vw] py-[0.3vw] text-[1.1vw] sm:px-[3vw] sm:py-[0.4vw] sm:text-[1.4vw] md:px-[2.7vw] md:py-[0.35vw] md:text-[1.2vw] lg:px-[2.4vw] lg:py-[0.3vw] lg:text-[1.1vw] flex items-center justify-center">
              Login
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              <svg 
                className="w-[2.2vw] h-[2.2vw] sm:w-[3vw] sm:h-[3vw] md:w-[2.5vw] md:h-[2.5vw]"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 16h7" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-xl border-t border-white/20 flex flex-col fixed w-full z-40 shadow-2xl p-[2vw] gap-[2.5vw] sm:p-[3vw] sm:gap-[3vw]">
          <Link href="/education" className="text-white font-semibold hover:text-[#00E676] text-[3vw] sm:text-[4vw]">Education</Link>
          <div className="border-t border-white/20 pt-[2.5vw] sm:pt-[3vw]">
            <Link href="/login" className="bg-[#00E676] w-full text-[#4A4978] font-bold rounded-full hover:bg-opacity-90 transition-all duration-200 shadow-lg p-[1.2vw] text-[2.5vw] sm:p-[1.5vw] sm:text-[3vw] flex items-center justify-center">
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;