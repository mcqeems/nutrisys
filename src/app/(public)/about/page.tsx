
import CTASection from "../(home)/CTASection";
import Team from "./component/Team";
import VisiMisi from "./component/VisiMisi";
import HeroTentang from "./component/HeroTentang";
import Philosophy from "./component/Philosophy";

const About = () => {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-orb-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-orb-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-orb-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>
      <HeroTentang />
      <VisiMisi />
      <Philosophy />
      <Team />
      <CTASection />
    </div>
  );
};

export default About;
