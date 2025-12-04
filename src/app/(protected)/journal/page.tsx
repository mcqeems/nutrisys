import { Metadata } from 'next';
import JournalPage from './components/JournalPage';

export const metadata: Metadata = {
  title: 'Wellness Journal',
  description:
    'Document and track your nutrition journey with the NutriSys wellness journal - log meals, monitor progress, and achieve your health goals.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Analyze() {
  return <JournalPage />;
}
