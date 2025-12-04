import RegisterPage from './components/RegisterPage';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Register',
  description:
    'Create your free NutriSys account and start your AI-powered health and wellness journey. Track nutrition, analyze food, and achieve your health goals.',
  robots: {
    index: false,
    follow: true,
  },
};

export default async function Register() {
  const session = await auth();
  if (session) {
    redirect('/dashboard');
  }
  return (
    <>
      <RegisterPage />
    </>
  );
}
