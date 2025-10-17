import LoadingScreen from "@/components/commons/LoadingScreen";
import AboutUsSection from "@/components/landingpage/AboutUsSection";
import ContactSection from "@/components/landingpage/ContaactSection";
import EducationSection from "@/components/landingpage/EducationSection";
import FeaturesSection from "@/components/landingpage/FeaturesSection";
import HeroSection from "@/components/landingpage/HeroSection";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cuanki - Aplikasi Keuangan Pribadi Terbaik di Indonesia",
  description: "Kelola keuangan pribadi Anda dengan mudah menggunakan Cuanki. Budget tracker, manajemen tabungan, dan pencapaian goals keuangan dalam satu aplikasi gratis.",
  keywords: "aplikasi keuangan, budget tracker indonesia, manajemen keuangan pribadi, tabungan digital, financial planning",
  openGraph: {
    title: "Cuanki - Aplikasi Keuangan Pribadi Terbaik di Indonesia",
    description: "Kelola keuangan pribadi Anda dengan mudah. Fitur lengkap untuk budgeting, tabungan, dan goals keuangan.",
    images: [
      {
        url: "/android/android-launchericon-512-512.png",
        width: 512,
        height: 512,
        alt: "Cuanki - Aplikasi Keuangan Pribadi",
      },
    ],
  },
};

export default function Home() {
  return (
    <main>
      <div className="bg-[#1e1e1e]">
      <Suspense fallback={<LoadingScreen />}>
        <HeroSection />
        <AboutUsSection />
        <FeaturesSection />
        <EducationSection />
        <ContactSection/>
      </Suspense>
      </div>
    </main>
  );
}
