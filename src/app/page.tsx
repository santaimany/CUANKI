import LoadingScreen from "@/components/commons/LoadingScreen";
import AboutUsSection from "@/components/landingpage/AboutUsSection";
import ContactSection from "@/components/landingpage/ContaactSection";
import EducationSection from "@/components/landingpage/EducationSection";
import FeaturesSection from "@/components/landingpage/FeaturesSection";
import HeroSection from "@/components/landingpage/HeroSection";
import { Suspense } from "react";

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
