import { Metadata } from 'next';
import LoginPage from './components/LoginPage';

export const metadata: Metadata = {
  title: 'Login - Nutrisys',
  description: 'Nutrisys Login Page',
};

export default function Login() {
  return (
    <>
      <LoginPage />
    </>
  );
}
