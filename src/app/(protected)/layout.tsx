'use server';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Provider } from '@/components/ui/provider';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  return (
    <>
      <Provider defaultTheme="light">{children}</Provider>
    </>
  );
}
