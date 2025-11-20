'use server';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Provider } from '@/components/ui/provider';
import { Suspense } from 'react';
import Loading from './loading';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Provider defaultTheme="light">{children}</Provider>
      </Suspense>
    </>
  );
}
