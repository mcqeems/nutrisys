import { Metadata } from 'next';
import LoginPage from './components/LoginPage';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Login',
  description:
    'Sign in to your NutriSys account to access AI-powered nutrition tracking, personalized health insights, and wellness tools.',
  robots: {
    index: false,
    follow: true,
  },
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
