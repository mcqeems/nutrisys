import DashboardPage from './components/DashboardPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'Your personalized NutriSys dashboard - track nutrition, view health insights, and monitor your wellness progress.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Dashboard() {
  return (
    <>
      <DashboardPage />
    </>
  );
}
