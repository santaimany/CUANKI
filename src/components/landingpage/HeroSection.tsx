'use client'
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImage from '@/assets/landingpage/image/image-kiri.svg'; 
import smileBg from '@/assets/landingpage/background/smile-bg.svg';

gsap.registerPlugin(ScrollTrigger);

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface Window {
    deferredPrompt?: BeforeInstallPromptEvent;
  }
}

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const floatingCoinsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
 
      const masterTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      masterTl
        .fromTo(glowRef.current, 
          { opacity: 0, scale: 0.5, filter: "blur(100px)" }, 
          { opacity: 1, scale: 1, filter: "blur(150px)", duration: 1.5, ease: "power2.out" }
        )
        .fromTo(imageRef.current, 
          { opacity: 0, x: -150, scale: 0.8, rotationY: -25, filter: "blur(10px)" },
          { opacity: 1, x: 0, scale: 1, rotationY: 0, filter: "blur(0px)", duration: 1.4, ease: "back.out(1.7)" },
          "-=1.2"
        )
        .fromTo(headlineRef.current, 
          { opacity: 0, x: 100, scale: 0.9, skewX: 10, filter: "blur(5px)" },
          { opacity: 1, x: 0, scale: 1, skewX: 0, filter: "blur(0px)", duration: 1.2, ease: "elastic.out(1, 0.8)" },
          "-=0.8"
        )
        .fromTo(paragraphRef.current, 
          { opacity: 0, y: 50, scale: 0.95, filter: "blur(3px)" },
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.0, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(buttonRef.current, 
          { opacity: 0, scale: 0.7, y: 80, rotation: -2, filter: "brightness(0.5)" },
          { opacity: 1, scale: 1, y: 0, rotation: 0, filter: "brightness(1)", duration: 0.8, ease: "elastic.out(1.2, 0.75)" }, // durasi diubah sedikit
          "-=0.4"
        )
        .fromTo(floatingCoinsRef.current?.children || [], 
          { opacity: 0, scale: 0, y: 100, rotation: 180 },
          { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 0.8, stagger: 0.15, ease: "back.out(2)" },
          "-=0.6"
        );

   
      gsap.to(floatingCoinsRef.current?.children || [], {
        y: "-=20",
        rotation: "+=360",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.3,
          from: "random"
        }
      });

  
      gsap.to(imageRef.current, {
        yPercent: -40,
        rotation: 2,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(glowRef.current, {
        yPercent: -20,
        scale: 1.2,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });


      const setupHoverEffects = () => {
        if (buttonRef.current) {
          buttonRef.current.addEventListener('mouseenter', () => {
            gsap.to(buttonRef.current, {
              scale: 1.05, 
              boxShadow: "0 0 30px rgba(14, 255, 149, 0.6)",
              filter: "brightness(1.2)",
              duration: 0.3,
              ease: "power2.out"
            });
          });

          buttonRef.current.addEventListener('mouseleave', () => {
            gsap.to(buttonRef.current, {
              scale: 1,
              boxShadow: "0 0 0px rgba(14, 255, 149, 0)",
              filter: "brightness(1)",
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }

        if (imageRef.current) {
          imageRef.current.addEventListener('mouseenter', () => {
            gsap.to(imageRef.current, {
              scale: 1.05,
              filter: "brightness(1.1) saturate(1.2)",
              duration: 0.4,
              ease: "power2.out"
            });
          });

          imageRef.current.addEventListener('mouseleave', () => {
            gsap.to(imageRef.current, {
              scale: 1,
              filter: "brightness(1) saturate(1)",
              duration: 0.4,
              ease: "power2.out"
            });
          });
        }
      };

      setupHoverEffects();

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gradient-to-r from-[#363256] to-[#50488A] w-full min-h-screen flex items-center relative px-4 lg:px-8 ">
      <div className="hidden lg:block absolute -left-60 top-1/2 -translate-y-1/2 z-10 opacity-60">
        <Image
          src={smileBg}
          alt="Smile Background"
          width={1200}
          height={1200}
          className="w-[90rem] object-contain" 
        />
      </div>


      <div className="lg:hidden relative z-10 w-full flex flex-col items-center justify-center text-center pb-12 mb-20 space-y-6 mt-20">
  
        <div ref={imageRef} className="w-full max-w-sm">
          <div className="relative">
          
            <Image
              src={heroImage}
              alt="Smart Financial Solution"
              width={400} 
              height={400} 
              className="object-contain relative z-10 w-full h-auto drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        <button 
          ref={buttonRef}
          onClick={() => {
            if ('serviceWorker' in navigator) {
              const installPrompt = window.deferredPrompt;
              if (installPrompt) {
                installPrompt.prompt();
                installPrompt.userChoice.then((choiceResult) => {
                  if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                  }
                  window.deferredPrompt = undefined;
                });
              } else {
                alert('To install, click the share button and select "Add to Home Screen"');
              }
            }
          }}
          className="border-2 border-[#0EFF95] text-[#0EFF95] font-bold rounded-full 
                     hover:bg-[#0EFF95] hover:text-[#363256] hover:scale-105
                     active:scale-95
                     transition-all duration-300 ease-in-out relative overflow-hidden
                     px-12 py-3 text-lg shadow-lg shadow-[#0EFF95]/30
                     before:absolute before:inset-0 before:bg-[#0EFF95] before:opacity-0 
                     before:transition-opacity before:duration-300 hover:before:opacity-20"
        >
          <span className="relative z-10">Install</span>
        </button>


        <h1 ref={headlineRef} className="leading-tight text-white relative text-4xl sm:text-5xl font-bold">
          <span className="text-[#0EFF95] relative drop-shadow-[0_0_20px_rgba(14,255,149,0.6)]">
            Smart
          </span>{' '}
          <span className="font-light">solution</span>
          <br />
          <span className="font-light">for your smart</span>{' '}
          <span className="text-[#0EFF95] relative drop-shadow-[0_0_20px_rgba(14,255,149,0.6)]">
            financial
          </span>
        </h1>

  
        <p ref={paragraphRef} className="text-gray-300 text-base sm:text-lg max-w-md px-4">
          Track your spending, set budgets, and achieve financial goals with ease.
        </p>
      </div>

      
      <div className="hidden lg:flex relative z-10 w-full max-w-screen-2xl mx-auto flex-row items-center justify-center lg:gap-16">
        
    
        <div ref={imageRef} className="w-full lg:w-1/2 flex items-center justify-center relative">
          <div className="relative w-full max-w-2xl"> 
            <Image
              src={heroImage}
              alt="Smart Financial Solution"
              width={800} 
              height={800} 
              className="object-contain relative z-10 w-full h-auto" 
              priority
            />
          </div>
        </div>
        
     
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right">
          <div className="flex flex-col items-center lg:items-end gap-8 max-w-3xl">
         
         
            <h1 ref={headlineRef} className="leading-tight text-white relative font-bold text-7xl leading-[1.1]">
              <span className="text-[#0EFF95] relative">
                Smart
                <span className="absolute inset-0 text-[#0EFF95] blur-sm opacity-70"></span>
              </span> <span> solution</span> 
              <br />
           
              <span className="font-light">for your smart</span>
              <br />
              <span className="text-[#0EFF95] relative">
                financial
                <span className="absolute inset-0 text-[#0EFF95] blur-sm opacity-70"></span>
              </span>
            </h1>

          
            <p ref={paragraphRef} className="text-gray-300 relative text-2xl leading-9">
              Exposing your inventory to incidents is a thing of the past. We have a professional insurance policy that protects all your items.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;