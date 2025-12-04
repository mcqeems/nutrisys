import CTASection from '../(home)/CTASection';
import TeamSection from './component/TeamSection';
import VissionMissionSection from './component/VissionMissionSection';
import HeroTentang from './component/HeroTentang';
import CommitmentSection from './component/CommitmentSection';

export const metadata = {
  title: "About | Nutrisys",
  description: "Explore our AI-powered health and wellness features",
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
