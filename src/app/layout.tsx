// File: app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "@/components/commons/ClientLayout";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: "Cuanki",
  title: {
    default: "Cuanki",
    template: "%s | Cuanki",
  },
  description: "Aplikasi manajemen keuangan pribadi untuk mengatur budget harian, tabungan, dan goals keuangan Anda",
  manifest: "/manifest.json",
  themeColor: "#6F64A7",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Cuanki",
    startupImage: '/android/android-launchericon-512-512.png',
  },
  icons: {
    icon: "/favicon.svg",
    apple: [
      { url: '/ios/152.png', sizes: '152x152' },
      { url: '/ios/180.png', sizes: '180x180' },
      { url: '/android/android-launchericon-192-192.png', sizes: '192x192' },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

    
        
        <ClientLayout>{children}</ClientLayout>
        
      
        <script dangerouslySetInnerHTML={{
          __html: `
            let deferredPrompt;
            window.addEventListener('beforeinstallprompt', (e) => {
              e.preventDefault();
              deferredPrompt = e;
              window.deferredPrompt = e;
            });
            
            window.addEventListener('appinstalled', () => {
              console.log('PWA was installed');
              window.deferredPrompt = null;
            });
          `
        }} />
      </body>
    </html>
  );
}