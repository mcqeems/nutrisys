import RegisterPage from './components/RegisterPage';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Register - Nutrisys',
  description: 'Nutrisys Register Page',
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
