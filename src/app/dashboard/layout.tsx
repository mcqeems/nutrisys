'use client';
import { signOut } from 'next-auth/react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <button onClick={() => signOut()}>Sign Out</button>
      {children}
    </>
  );
}
