"use client"; // Komponen ini adalah Client Component

import { usePathname } from "next/navigation";
import Navbar from "@/components/commons/Navbar";
import Footer from "@/components/commons/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
    <>
      {!isNoNavbarFooterPage && <Navbar />}
      <main>{children}</main> {/* Tampilkan konten halaman di sini */}
      {!isNoNavbarFooterPage && <Footer />}
    </>
  );
}