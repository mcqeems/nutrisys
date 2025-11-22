import { NextResponse } from 'next/server';
import getUsersInfo from '@/lib/actions/getUsersInfo';
import { auth } from '@/auth';

export async function GET() {
  try {
    // Check if user is authenticated
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await getUsersInfo();

    if (!data) {
      return NextResponse.json({ error: 'User info not found' }, { status: 404 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user info:', error);
    return NextResponse.json({ error: 'Error fetching users info.' }, { status: 500 });
  }
}
