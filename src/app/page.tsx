import AboutUsSection from "@/components/landingpage/AboutUsSection";
import ContactSection from "@/components/landingpage/ContaactSection";
import EducationSection from "@/components/landingpage/EducationSection";
import FeaturesSection from "@/components/landingpage/FeaturesSection";
import HeroSection from "@/components/landingpage/HeroSection";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Home() {
  return (
    <main>
      <div className="bg-[#1e1e1e]">
      <HeroSection />
      <AboutUsSection />
      <FeaturesSection />
      <EducationSection />
      <ContactSection/>

      

      </div>
    </main>
  );
}
