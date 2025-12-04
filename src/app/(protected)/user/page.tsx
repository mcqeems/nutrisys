import { Metadata } from 'next';
import UserPage from './components/UserPage';

export const metadata: Metadata = {
  title: 'User Profile',
  description:
    'Manage your NutriSys profile settings, personalize your wellness preferences, and update your health information.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Analyze() {
  return <UserPage />;
}
