import { Metadata } from 'next';
import UserPage from './components/UserPage';

export const metadata: Metadata = {
  title: 'User Profile - Nutrisys',
  description: 'Personalisasi dan mengecek informasi profil anda.',
};

export default async function Analyze() {
  return <UserPage />;
}
