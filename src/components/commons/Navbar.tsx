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

  // ================================================================
  // BAGIAN 1: EFEK SAAT SCROLL (TIDAK BERUBAH)
  // Ini adalah kode 'useEffect' yang telah kita setujui sebelumnya.
  // ================================================================
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

      // Style "setelah scroll"
      tl.set(navRef.current, {
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      });
      
      // Padding "setelah scroll" (versi 'rem' yang disetujui)
      if (isMobile) {
        tl.set(navContainerRef.current, { paddingTop: "0.875rem", paddingBottom: "0.875rem" }); 
        tl.set(logoRef.current, { width: "7.5rem" });
      } else if (isTablet) {
        tl.set(navContainerRef.current, { paddingTop: "0.875rem", paddingBottom: "0.875rem" });
        tl.set(logoRef.current, { width: "8rem" });
      } else if (isMedium) {
        tl.set(navContainerRef.current, { paddingTop: "0.625rem", paddingBottom: "0.625rem" });
        tl.set(logoRef.current, { width: "9rem" });
      } else {
        tl.set(navContainerRef.current, { paddingTop: "1rem", paddingBottom: "1rem" }); 
        tl.set(logoRef.current, { width: "8rem" });
      }
      
      // Style tombol/link "setelah scroll" (hanya desktop)
      if (!isMobile && !isTablet) {
        const desktopFontSize = isMedium ? "0.875rem" : "0.875rem";
        
        tl.set(navLinkRefs.current, { fontSize: desktopFontSize });
        tl.set(loginBtnRef.current, { 
          padding: isMedium ? "0.5rem 1.5rem" : "0.5rem 1.25rem", 
          fontSize: desktopFontSize
        });
        tl.set(langRef.current, { 
          padding: isMedium ? "0.375rem 1.25rem" : "0.375rem 1rem" 
        });
      }

      tl.to(navRef.current, { 
        yPercent: 0, 
        duration: 1, 
      });

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "400px top", // Mulai animasi setelah scroll 400px
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });
      
    }, navRef);

    return () => ctx.revert();
  }, []);


  // ================================================================
  // BAGIAN 2: TAMPILAN JSX (DIUBAH KE 'rem' DENGAN UKURAN BESAR)
  // Semua nilai 'md:' dan 'lg:' telah diperbesar secara signifikan.
  // ================================================================
  return (
    <>
      <nav ref={navRef} className="w-full bg-gradient-to-r from-[#363256] to-[#50488A] sticky top-0 z-50 border-b border-transparent">
        {/*
          DIUBAH: Padding 'md' dan 'lg' diperbesar
          Sebelumnya (md): md:px-10 md:py-2.5
          Sebelumnya (lg): lg:px-20 lg:py-5
        */}
        <div ref={navContainerRef} className="w-full max-w-screen-2xl mx-auto flex justify-between items-center px-4 py-4 sm:px-6 sm:py-4 md:px-12 md:py-3 lg:px-28 lg:py-7">
          
          <div className="flex items-center">
            {/*
              DIUBAH: Ukuran logo 'lg' diperbesar
              Sebelumnya (lg): lg:w-44
            */}
            <Link href="/" className="cursor-pointer transition-transform duration-200 w-32 sm:w-36 md:w-40 lg:w-44">
            <Image ref={logoRef} src={Logo} alt="Cuanki Logo"/>
            </Link>
            {/*
              DIUBAH: Margin & Gap 'md' dan 'lg' diperbesar
              Sebelumnya (md): md:ml-5 md:gap-4
              Sebelumnya (lg): lg:ml-8 lg:gap-6
            */}
            <div className="hidden md:flex items-center ml-6 gap-6 md:ml-8 md:gap-6 lg:ml-12 lg:gap-10">
              <Link
                ref={el => { navLinkRefs.current[0] = el; }}
                href="/education"
                /*
                  DIUBAH: Ukuran font 'md' dan 'lg' diperbesar
                  Sebelumnya (md): md:text-sm
                  Sebelumnya (lg): lg:text-base
                */
                className="text-white font-semibold hover:text-[#00E676] transition-colors duration-200 text-base md:text-base lg:text-2xl"
              >
                Education
              </Link>
            </div>
          </div>

          {/*
            DIUBAH: Gap 'md' dan 'lg' diperbesar
            Sebelumnya (md): md:gap-4
            Sebelumnya (lg): lg:gap-4
          */}
          <div className="hidden md:flex items-center gap-4 md:gap-5 lg:gap-7">
            {/*
              DIUBAH: Padding & Font 'md' dan 'lg' diperbesar
              Sebelumnya (md): md:px-4 md:py-1 md:text-xs
              Sebelumnya (lg): lg:px-5 lg:py-1 lg:text-sm
            */}
            <Link href="/register" ref={langRef} className="flex items-center text-[#0EFF95] border-2 border-[#0EFF95] rounded-full cursor-pointer hover:bg-white/10 transition-colors duration-200 px-5 py-2 text-sm md:px-6 md:py-1.5 md:text-sm lg:px-8 lg:py-1.5 lg:text-xl">
              <span className="font-semibold">Register</span>
            </Link>
            {/*
              DIUBAH: Padding & Font 'md' dan 'lg' diperbesar
              Sebelumnya (md): md:px-5 md:py-1 md:text-xs
              Sebelumnya (lg): lg:px-7 lg:py-1 lg:text-sm
            */}
            <Link href="/login" ref={loginBtnRef} className="bg-[#0EFF95] text-[#4A4978] font-bold rounded-full hover:bg-opacity-90 transition-all duration-200 shadow-lg px-6 py-2 text-sm md:px-8 md:py-1.5 md:text-sm lg:px-12 lg:py-1.5 lg:text-xl flex items-center justify-center">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button (Tidak berubah) */}
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

      {/* Mobile Menu Dropdown (Tidak berubah) */}
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