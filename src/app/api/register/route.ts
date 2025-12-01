import { NextResponse } from 'next/server';
import { prisma } from '@/prisma';
import { hashPassword } from '@/lib/auth/password';
import { registerSchema } from '@/lib/validation/auth';

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = registerSchema.safeParse(json);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json({ error: first?.message || 'Invalid input' }, { status: 400 });
    }
    const { email, name, password } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, name: name || null, passwordHash },
      select: { id: true, email: true, name: true },
    });

    await prisma.user_info.create({
      data: {
        user_id: user.id,
      },
    });

    // Create welcome notification for new user
    await prisma.notifications.create({
      data: {
        user_id: user.id,
        message: `Selamat datang di Nutrisys, ${
          name || 'Pengguna'
        }! 🎉 Mulai perjalanan kesehatan Anda dengan menganalisis makanan, membuat jurnal, dan menetapkan target kesehatan.`,
        type: 'Success',
        is_read: false,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.error('Register error', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
