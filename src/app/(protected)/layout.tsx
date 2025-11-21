'use server';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Provider } from '@/components/ui/provider';
import { Suspense } from 'react';
import Loading from './loading';
import ProtectedLayout from '@/components/ProtectedLayout';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Provider defaultTheme="light">
          <ProtectedLayout userData={session.user}>{children}</ProtectedLayout>
        </Provider>
      </Suspense>
    </>
  );
}
