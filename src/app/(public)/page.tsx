import CTASection from './(home)/CTASection';
import HeroSection from './(home)/HeroSection';
import Testimonials from './(home)/Testimonials';
import WhyNutriSys from './(home)/WhySection';
import FaqSection from './(home)/FaqSection';
import ComparisonTable from './(home)/ComparisonTable';
import AboutNutriSys from './(home)/AboutNutrisys';
import FeatureSection from './(home)/FeatureSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Transform your health journey with NutriSys. AI-powered nutrition tracking, food analysis, and personalized wellness insights to help you achieve your health goals.',
  openGraph: {
    title: 'NutriSys - AI-Powered Health & Wellness Platform',
    description:
      'Transform your health journey with AI-powered nutrition tracking, food analysis, and personalized wellness insights.',
  },
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
