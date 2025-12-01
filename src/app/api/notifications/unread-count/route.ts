import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getUnreadNotificationCount } from '@/lib/actions/getUnreadNotificationCount';

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const count = await getUnreadNotificationCount();

    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    return NextResponse.json({ error: 'Error fetching unread count.' }, { status: 500 });
  }
}
