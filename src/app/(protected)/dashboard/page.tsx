import DashboardPage from './components/DashboardPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Nutrisys',
  description: 'Nutrisys official dashboard page.',
};

export default function Dashboard() {
  return (
    <>
      <DashboardPage />
    </>
  );
}
