'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

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
    <div style={{ maxWidth: 360, margin: '40px auto', fontFamily: 'system-ui' }}>
      <h1>Register</h1>
      {formError && <p style={{ color: 'crimson' }}>{formError}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label>
          Name (optional)
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your name"
            style={{ width: '100%' }}
          />
        </label>
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            style={{ width: '100%' }}
          />
        </label>
        <label>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            minLength={6}
            style={{ width: '100%' }}
          />
        </label>
        <button disabled={loading} type="submit" style={{ padding: '8px 12px' }}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
      <p style={{ marginTop: 12 }}>
        Have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}
