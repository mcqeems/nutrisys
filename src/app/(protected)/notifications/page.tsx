import { Metadata } from 'next';
import NotificationsPage from './components/NotificationsPage';

export const metadata: Metadata = {
  title: 'Notifications',
  description:
    'Stay updated with your NutriSys notifications - health reminders, progress updates, and personalized wellness alerts.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Analyze() {
  return <NotificationsPage />;
}
