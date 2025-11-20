'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { registerSchema } from '@/lib/validation/auth';
import Image from 'next/image';
import { LoaderCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = registerSchema.safeParse({ email, name: name || undefined, password });
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      setFormError(first?.message || 'Invalid input');
      return;
    }
    setLoading(true);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setFormError(data?.error ?? 'Failed to register');
      setLoading(false);
      return;
    }

    // Auto login after registration
    const loginRes = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (loginRes?.error) {
      router.push('/login');
    } else {
      router.push('/');
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <div className="w-full md:max-w-[500px] max-w-full md:mx-auto mx-4 p-8 rounded-xl bg-card shadow-lg border border-border">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3">
            <Image src="/Logo/nutrisys.webp" alt="logo" width={500} height={500} />
          </div>
          <h1 className="text-3xl font-bold text-primary font-family-sans-stack-headline">Nutrisys</h1>
          <p className="text-muted-foreground text-sm mt-1">Buat akun anda</p>
        </div>

        {formError && (
          <p className="text-center bg-destructive/10 text-destructive rounded-md p-3 mb-4 border border-destructive/20">
            {formError}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="nama@email.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              minLength={6}
              className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-all duration-200 font-medium py-2.5 px-4 mt-2 cursor-pointer"
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Have an account?{' '}
          <a href="/login" className="text-primary hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
