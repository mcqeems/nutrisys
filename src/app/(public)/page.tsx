import CTASection from "./(home)/CTASection";
import HeroSection from "./(home)/HeroSection";
import Testimonials from "./(home)/Testimonials";
import WhyNutriSys from "./(home)/WhySection";
import FaqSection from "./(home)/FaqSection";

function home() {
  return (
    <div>
      <HeroSection />
      <WhyNutriSys />
      <Testimonials />
      <FaqSection />
      <CTASection />
    </div>
  );
}
export default home;
