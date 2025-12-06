import { Metadata } from 'next';
import AnalyzePage from './components/AnalyzePage';

export const metadata: Metadata = {
  title: 'Nutrition Analyzer',
  description:
    'Analyze your food and beverages with NutriSys Smart Analyzer - get instant nutrition information powered by AI.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Analyze() {
  return <AnalyzePage />;
}
