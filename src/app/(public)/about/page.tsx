import CTASection from '../(home)/CTASection';
import TeamSection from './component/TeamSection';
import VissionMissionSection from './component/VissionMissionSection';
import HeroTentang from './component/HeroTentang';
import CommitmentSection from './component/CommitmentSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about NutriSys - our mission to revolutionize health and wellness through AI-powered nutrition tracking and personalized insights. Meet our team and discover our vision.',
  openGraph: {
    title: 'About NutriSys - Our Mission & Team',
    description: 'Discover how NutriSys is transforming health and wellness with AI-powered nutrition solutions.',
  },
};

const About = () => {
  return (
    <div className="relative overflow-hidden bg-background">
      <HeroTentang />
      <VissionMissionSection />
      <div className="border-t border-border mx-auto max-w-7xl"></div>
      <TeamSection />
      <div className="border-t border-border mx-auto max-w-7xl"></div>
      <CommitmentSection />
      <CTASection />
    </div>
  );
};

export default About;
