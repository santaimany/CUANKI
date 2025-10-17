// File: app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "@/components/commons/ClientLayout";
import Script from "next/script";

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
  metadataBase: new URL('https://cuanki.vercel.app'),
  applicationName: "Cuanki",
  title: {
    default: "Cuanki - Aplikasi Keuangan Pribadi Terbaik",
    template: "%s | Cuanki - Kelola Keuangan Anda",
  },
  description: "Aplikasi manajemen keuangan pribadi terbaik untuk mengatur budget harian, tabungan, dan goals keuangan Anda. Gratis, mudah, dan aman!",
  keywords: [
    "aplikasi keuangan",
    "manajemen keuangan pribadi", 
    "budget tracker",
    "tabungan",
    "financial planning",
    "cuanki",
    "keuangan indonesia",
    "budget harian",
    "goals keuangan",
    "tracker pengeluaran"
  ],
  authors: [{ name: "Cuanki Team" }],
  creator: "Cuanki",
  publisher: "Cuanki",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  themeColor: "#6F64A7",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://cuanki.vercel.app',
    title: 'Cuanki - Aplikasi Keuangan Pribadi Terbaik',
    description: 'Kelola keuangan pribadi Anda dengan mudah. Budget tracker, tabungan, dan goals keuangan dalam satu aplikasi.',
    siteName: 'Cuanki',
    images: [
      {
        url: '/android/android-launchericon-512-512.png',
        width: 512,
        height: 512,
        alt: 'Cuanki - Aplikasi Keuangan Pribadi',
      },
      {
        url: '/android/android-launchericon-192-192.png', 
        width: 192,
        height: 192,
        alt: 'Cuanki Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cuanki - Aplikasi Keuangan Pribadi Terbaik',
    description: 'Kelola keuangan pribadi Anda dengan mudah. Budget tracker, tabungan, dan goals keuangan dalam satu aplikasi.',
    images: ['/android/android-launchericon-512-512.png'],
    creator: '@cuanki_app',
  },
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
  category: 'finance',
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
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
        
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "CLARITY_PROJECT_ID");
          `}
        </Script>
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Cuanki",
              "description": "Aplikasi manajemen keuangan pribadi untuk mengatur budget harian, tabungan, dan goals keuangan Anda",
              "url": "https://cuanki.vercel.app",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "IDR"
              },
              "author": {
                "@type": "Organization",
                "name": "Cuanki Team"
              },
              "publisher": {
                "@type": "Organization", 
                "name": "Cuanki"
              },
              "screenshot": "https://cuanki.vercel.app/android/android-launchericon-512-512.png",
              "softwareVersion": "1.0.0",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "150"
              }
            })
          }}
        />
      
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