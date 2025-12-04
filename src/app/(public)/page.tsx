import CTASection from "./(home)/CTASection";
import HeroSection from "./(home)/HeroSection";
import Testimonials from "./(home)/Testimonials";
import WhyNutriSys from "./(home)/WhySection";
import FaqSection from "./(home)/FaqSection";
import ComparisonTable from "./(home)/ComparisonTable";
import AboutNutriSys from "./(home)/AboutNutrisys";
import FeatureSection from "./(home)/FeatureSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nutrisys - Home",
  description: "Explore our AI-powered health and wellness features",
};

function home() {
  
  return (
    <div>
      <HeroSection />

      <AboutNutriSys />

      <FeatureSection />

      <ComparisonTable />

      <WhyNutriSys />

      <FaqSection />

      <Testimonials />

      <CTASection />
    </div>
  );
}
export default home;
