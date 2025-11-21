import { Metadata } from 'next';
import AnalyzePage from './components/AnalyzePage';

export const metadata: Metadata = {
  title: 'Analisis Nutrisi - Nutrisys',
  description: 'Analisis makanan atau minuman anda dengan Smart Analyzer dari nutrisys',
};

export default async function Analyze() {
  return <AnalyzePage />;
}
