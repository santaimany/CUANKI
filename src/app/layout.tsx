"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import Navbar from "@/components/commons/Navbar";
import Footer from "@/components/commons/Footer";
import "./globals.css";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Cuanki - Smart Solution for Your Smart Financial",
//   description: "Cuanki is a smart financial solution that helps you manage your finances effectively and efficiently.",
// };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isNoNavbarFooterPage =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register") ||
    pathname?.startsWith("/auth") ||
    pathname?.startsWith("/get-started") ||
    pathname?.startsWith("/onboarding") ||
    pathname?.startsWith("/complete-on-boarding") ||
    pathname?.startsWith("/dashboard");

  return (
    <html lang="en">
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.scg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {!isNoNavbarFooterPage && <Navbar />}
        {children}
        {!isNoNavbarFooterPage && <Footer />}
      </body>
    </html>
  );
}
