import { Footer } from "@/components/ui/footer";
import { FeatureShowcase } from "./component/FeatureShowcase";

export const metadata = {
  title: "Fitur | Nutrisys",
  description: "Explore our AI-powered health and wellness features",
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <FeatureShowcase />
      <Footer/>
    </main>
  );
}
