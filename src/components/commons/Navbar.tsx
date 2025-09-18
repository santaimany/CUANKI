'use client'
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Logo from "@/assets/landingpage/logo/cuanki-logo.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const langRef = useRef<HTMLDivElement>(null);
  const loginBtnRef = useRef<HTMLButtonElement>(null);

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
      tl.set(navContainerRef.current, { paddingTop: "1.5rem", paddingBottom: "1.5rem" });
      tl.set(logoRef.current, { width: "10rem" });
      tl.set(navLinkRefs.current, { fontSize: "1.125rem" });
      tl.set(loginBtnRef.current, { padding: "0.5rem 2rem", fontSize: "1.125rem" });
      tl.set(langRef.current, { padding: "0.5rem 1.5rem" });

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
        <div ref={navContainerRef} className="w-full max-w-screen-2xl mx-auto flex justify-between items-center py-6 px-[clamp(2rem,6vw,5rem)]">
          
          <div className="flex items-center">
            <Image ref={logoRef} src={Logo} alt="Cuanki Logo" className="w-[clamp(12rem,8vw,18rem)] h-auto" />
            <div className="hidden md:flex items-center ml-16 space-x-12">
              <a 
                ref={el => { navLinkRefs.current[0] = el; }}
                href="#" 
                className="text-white font-semibold text-xl hover:text-[#00E676] transition-colors duration-200"
              >
                Education
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            <div ref={langRef} className="flex items-center text-white border-2 border-white/30 rounded-full px-8 py-3 cursor-pointer hover:bg-white/10 transition-colors duration-200">
              <span className="font-semibold text-lg">EN</span>
              <svg 
                className="ml-3 w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <button ref={loginBtnRef} className="bg-[#0EFF95] text-[#4A4978] font-bold px-12 py-3 rounded-full hover:bg-opacity-90 transition-all duration-200 shadow-lg text-xl">
              Login
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              <svg 
                className="w-11 h-11" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24"
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
        <div className="md:hidden bg-white/10 backdrop-blur-xl border-t border-white/20 px-10 pt-8 pb-12 flex flex-col space-y-10 fixed w-full z-40 shadow-2xl">
          <a href="#" className="text-white font-semibold text-2xl hover:text-[#00E676]">Education</a>
          <div className="border-t border-white/20 pt-10">
            <button className="bg-[#00E676] w-full text-[#4A4978] font-bold py-5 rounded-full hover:bg-opacity-90 transition-all duration-200 shadow-lg text-xl">
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;