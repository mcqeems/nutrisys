import { Metadata } from 'next';
import TargetPage from './components/TargetPage';

export const metadata: Metadata = {
  title: 'Health Targets',
  description: 'Set and manage your personalized health and nutrition targets with NutriSys AI-powered goal tracking.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Analyze() {
  return <TargetPage />;
}
