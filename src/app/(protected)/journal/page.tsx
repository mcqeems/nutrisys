import { Metadata } from 'next';
import JournalPage from './components/JournalPage';

export const metadata: Metadata = {
  title: 'Wellness Jurnal - Nutrisys',
  description: 'Membantu anda mendokumentasikan dan mencatat perkembangan kesehatan nutrisi anda!',
};

export default async function Analyze() {
  return <JournalPage />;
}
