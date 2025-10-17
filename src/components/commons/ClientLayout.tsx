"use client"; // Komponen ini adalah Client Component

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/commons/Navbar";
import Footer from "@/components/commons/Footer";
import SplashScreen from "@/components/commons/SplashScreen";
import { ToastProvider } from "@/context/ToastContext";

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [showSplash, setShowSplash] = useState(false);

  // Check if splash should be shown (only on landing page for first-time visitors)
  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    const isLandingPage = pathname === '/';
    
    if (isLandingPage && !hasSeenSplash) {
      setShowSplash(true);
    }
  }, [pathname]);

  // Logika untuk menentukan halaman mana yang tidak butuh Navbar/Footer
  const isNoNavbarFooterPage =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register") ||
    pathname?.startsWith("/auth") ||
    pathname?.startsWith("/get-started") ||
    pathname?.startsWith("/onboarding") ||
    pathname?.startsWith("/complete-on-boarding") ||
    pathname?.startsWith("/dashboard");

  return (
    <ToastProvider>
      {showSplash && <SplashScreen />}
      {!isNoNavbarFooterPage && <Navbar />}
      <main>{children}</main> {/* Tampilkan konten halaman di sini */}
      {!isNoNavbarFooterPage && <Footer />}
    </ToastProvider>
  );
}