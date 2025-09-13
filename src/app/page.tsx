
import AboutUsSection from "@/components/landingpage/AboutUsSection";
import FeaturesSection from "@/components/landingpage/FeaturesSection";
import HeroSection from "@/components/landingpage/HeroSection";

export default function Home() {
  return (
    <main>
      <div className="bg-[#1e1e1e]">
      <HeroSection />
      <AboutUsSection />
      <FeaturesSection />

      </div>
    </main>
  );
}
