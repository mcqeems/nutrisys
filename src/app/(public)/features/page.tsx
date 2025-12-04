import { FeatureShowcase } from './component/FeatureShowcase';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Explore NutriSys AI-powered features: food analysis, nutrition tracking, personalized meal planning, health analytics, and smart wellness recommendations.',
  openGraph: {
    title: 'NutriSys Features - AI-Powered Health Tools',
    description: 'Discover our comprehensive suite of AI-powered nutrition and wellness features.',
  },
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <FeatureShowcase />
    </main>
  );
}
