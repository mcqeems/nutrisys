import RegisterPage from './components/RegisterPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register - Nutrisys',
  description: 'Nutrisys Register Page',
};

export default function Register() {
  return (
    <>
      <RegisterPage />
    </>
  );
}
