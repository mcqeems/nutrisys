import { Metadata } from 'next';
import TargetPage from './components/TargetPage';

export const metadata: Metadata = {
  title: 'Target - Nutrisys',
  description: 'Membantu anda membuat target untuk menjaga dan memperbaiki kesehatan anda.',
};

export default async function Analyze() {
  return <TargetPage />;
}
