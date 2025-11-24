import { NextResponse } from 'next/server';
import getChatLogs from '@/lib/actions/getChatLogs';
import { auth } from '@/auth';

export async function GET() {
  try {
    // Check if user is authenticated
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await getChatLogs();

    if (!data) {
      return NextResponse.json(
        {
          error: 'Chat Logs not found',
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error fetching chat logs:', error);
    return NextResponse.json({ error: 'Error fetching chat logs.' }, { status: 500 });
  }
}
