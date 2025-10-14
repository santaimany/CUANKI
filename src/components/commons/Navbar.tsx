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
      // Check if mobile/tablet/desktop
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 768;
      const isMedium = window.innerWidth >= 768 && window.innerWidth < 1024;
      
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
      
      // Responsive padding for container
      if (isMobile) {
        tl.set(navContainerRef.current, { paddingTop: "1rem", paddingBottom: "1rem" });
      } else if (isTablet) {
        tl.set(navContainerRef.current, { paddingTop: "1rem", paddingBottom: "1rem" });
      } else if (isMedium) {
        tl.set(navContainerRef.current, { paddingTop: "1.2vw", paddingBottom: "1.2vw" });
      } else {
        tl.set(navContainerRef.current, { paddingTop: "1.2vw", paddingBottom: "1.2vw" });
      }
      
      // Responsive logo size
      if (isMobile) {
        tl.set(logoRef.current, { width: "7rem" }); // 112px - slightly smaller after scroll
      } else if (isTablet) {
        tl.set(logoRef.current, { width: "8rem" }); // 128px
      } else if (isMedium) {
        tl.set(logoRef.current, { width: "9rem" }); // 144px
      } else {
        tl.set(logoRef.current, { width: "8vw" }); // Desktop uses vw
      }
      
      // Only set font sizes for desktop elements
      if (!isMobile && !isTablet) {
        tl.set(navLinkRefs.current, { fontSize: isMedium ? "0.875rem" : "1.1vw" });
        tl.set(loginBtnRef.current, { 
          padding: isMedium ? "0.5rem 1.5rem" : "0.4vw 1.6vw", 
          fontSize: isMedium ? "0.875rem" : "1.1vw" 
        });
        tl.set(langRef.current, { 
          padding: isMedium ? "0.5rem 1.25rem" : "0.4vw 1.2vw" 
        });
      }

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
        <div ref={navContainerRef} className="w-full max-w-screen-2xl mx-auto flex justify-between items-center px-4 py-4 sm:px-6 sm:py-4 md:px-[5vw] md:py-[1.3vw] lg:px-[6vw] lg:py-[1.5vw]">
          
          <div className="flex items-center">
            <Link href="/" className="cursor-pointer transition-transform duration-200 w-32 sm:w-36 md:w-40 lg:w-[9vw]">
            <Image ref={logoRef} src={Logo} alt="Cuanki Logo"/>
            </Link>
            <div className="hidden md:flex items-center ml-6 gap-6 md:ml-[2.8vw] md:gap-[2.2vw] lg:ml-[2.5vw] lg:gap-[2vw]">
              <Link
                ref={el => { navLinkRefs.current[0] = el; }}
                href="/education" 
                className="text-white font-semibold hover:text-[#00E676] transition-colors duration-200 text-base md:text-[1.4vw] lg:text-[1.3vw]"
              >
                Education
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 md:gap-[1.8vw] lg:gap-[1.5vw]">
            <Link href="/register" ref={langRef} className="flex items-center text-[#0EFF95] border-2 border-[#0EFF95] rounded-full cursor-pointer hover:bg-white/10 transition-colors duration-200 px-5 py-2 md:px-[1.8vw] md:py-[0.35vw] lg:px-[1.6vw] lg:py-[0.3vw]">
              <span className="font-semibold text-sm md:text-[1.2vw] lg:text-[1.1vw]">Register</span>
            </Link>
            <Link href="/login" ref={loginBtnRef} className="bg-[#0EFF95] text-[#4A4978] font-bold rounded-full hover:bg-opacity-90 transition-all duration-200 shadow-lg px-6 py-2 text-sm md:px-[2.7vw] md:py-[0.35vw] md:text-[1.2vw] lg:px-[2.4vw] lg:py-[0.3vw] lg:text-[1.1vw] flex items-center justify-center">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none p-2">
              <svg 
                className="w-6 h-6 sm:w-7 sm:h-7"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#363256]/95 backdrop-blur-xl border-t border-white/20 flex flex-col fixed w-full z-40 shadow-2xl p-6 gap-4 animate-slide-down">
          <Link 
            href="/education" 
            className="text-white font-semibold hover:text-[#00E676] text-lg py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Education
          </Link>
          <div className="border-t border-white/20 pt-4 flex flex-col gap-3">
            <Link 
              href="/register" 
              className="text-[#0EFF95] border-2 border-[#0EFF95] rounded-full font-semibold hover:bg-white/10 transition-colors duration-200 py-3 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
            <Link 
              href="/login" 
              className="bg-[#0EFF95] text-[#4A4978] font-bold rounded-full hover:bg-opacity-90 transition-all duration-200 shadow-lg py-3 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;