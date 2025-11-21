import { Metadata } from 'next';
import NotificationsPage from './components/NotificationsPage';

export const metadata: Metadata = {
  title: 'Notifikasi - Nutrisys',
  description: 'Notifikasi anda di aplikasi Nutrisys.',
};

export default async function Analyze() {
  return <NotificationsPage />;
}
