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
      
      if (isMobile) {

        tl.set(navContainerRef.current, { paddingTop: "0.875rem", paddingBottom: "0.875rem" });
        tl.set(logoRef.current, { width: "7.5rem" }); 
      } else if (isTablet) {
  
        tl.set(navContainerRef.current, { paddingTop: "0.875rem", paddingBottom: "0.875rem" });
        tl.set(logoRef.current, { width: "8.5rem" }); 
      } else if (isMedium) {

        tl.set(navContainerRef.current, { paddingTop: "0.625rem", paddingBottom: "0.625rem" });
        tl.set(logoRef.current, { width: "9.5rem" }); 
      } else {
    
        tl.set(navContainerRef.current, { paddingTop: "1.25rem", paddingBottom: "1.25rem" }); 
        tl.set(logoRef.current, { width: "10rem" }); 
      }

      if (!isMobile && !isTablet) {

        const desktopFontSize = isMedium ? "0.875rem" : "1.25rem"; 
        
        tl.set(navLinkRefs.current, { fontSize: desktopFontSize });

        tl.set(loginBtnRef.current, { 

          padding: isMedium ? "0.375rem 1.75rem" : "0.375rem 2.5rem", 
          fontSize: desktopFontSize
        });
        tl.set(langRef.current, { 

          padding: isMedium ? "0.375rem 1.25rem" : "0.375rem 1.75rem", 
          fontSize: desktopFontSize 
        });
      }

      tl.to(navRef.current, { 
        yPercent: 0, 
        duration: 1, 
      });

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "400px top", 
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });
      
    }, navRef);

    return () => ctx.revert();
  }, []);


  return (
    <>
      <nav ref={navRef} className="w-full bg-gradient-to-r from-[#363256] to-[#50488A] sticky top-0 z-50 border-b border-transparent">
 
        <div ref={navContainerRef} className="w-full max-w-screen-2xl mx-auto flex justify-between items-center px-4 py-4 sm:px-6 sm:py-4 md:px-12 md:py-3 lg:px-28 lg:py-7">
          
          <div className="flex items-center">
      
            <Link href="/" className="cursor-pointer transition-transform duration-200 w-32 sm:w-36 md:w-40 lg:w-44">
            <Image ref={logoRef} src={Logo} alt="Cuanki Logo"/>
            </Link>
       
            <div className="hidden md:flex items-center ml-6 gap-6 md:ml-8 md:gap-6 lg:ml-12 lg:gap-10">
              <Link
                ref={el => { navLinkRefs.current[0] = el; }}
                href="/education"
            
                className="text-white font-semibold hover:text-[#00E676] transition-colors duration-200 text-base md:text-base lg:text-2xl"
              >
                Education
              </Link>
            </div>
          </div>

       
          <div className="hidden md:flex items-center gap-4 md:gap-5 lg:gap-7">
        
            <Link href="/register" ref={langRef} className="flex items-center text-[#0EFF95] border-2 border-[#0EFF95] rounded-full cursor-pointer hover:bg-white/10 transition-colors duration-200 px-5 py-2 text-sm md:px-6 md:py-1.5 md:text-sm lg:px-8 lg:py-1.5 lg:text-xl">
              <span className="font-semibold">Register</span>
            </Link>
          
            <Link href="/login" ref={loginBtnRef} className="bg-[#0EFF95] text-[#4A4978] font-bold rounded-full hover:bg-opacity-90 transition-all duration-200 shadow-lg px-6 py-2 text-sm md:px-8 md:py-1.5 md:text-sm lg:px-12 lg:py-1.5 lg:text-xl flex items-center justify-center">
              Login
            </Link>
          </div>

    
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

      {isMenuOpen && (
        <div className="md:hidden bg-[#363256]/95 backdrop-blur-xl border-t border-white/20 flex flex-col fixed w-full z-40 shadow-xl p-6 gap-4 animate-slide-down">
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