'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  <button onClick={() => signOut()}>Sign Out</button>;
}
