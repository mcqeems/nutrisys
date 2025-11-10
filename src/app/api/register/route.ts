import { NextResponse } from 'next/server';
import { prisma } from '@/prisma';
import { hashPassword } from '@/lib/auth/password';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body?.email ?? '').toString().trim().toLowerCase();
    const name = (body?.name ?? '').toString().trim();
    const password = (body?.password ?? '').toString();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, name: name || null, passwordHash },
      select: { id: true, email: true, name: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.error('Register error', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
