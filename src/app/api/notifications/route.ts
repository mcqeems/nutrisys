import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import getNotifications from '@/lib/actions/getNotifications';

export async function GET() {
  try {
    // Check if user is authenticated
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await getNotifications();

    if (!data) {
      return NextResponse.json({ error: 'Notifications not found' }, { status: 404 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Error fetching notifications.' }, { status: 500 });
  }
}
