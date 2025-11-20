import { Metadata } from 'next';
import LoginPage from './components/LoginPage';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Login - Nutrisys',
  description: 'Nutrisys Login Page',
};

export default async function Login() {
  const session = await auth();
  if (session) {
    redirect('/dashboard');
  }
  return (
    <>
      <LoginPage />
    </>
  );
}
