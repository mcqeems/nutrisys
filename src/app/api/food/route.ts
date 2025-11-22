import { NextResponse } from 'next/server';
import getFoodLogs from '@/lib/actions/getFoodLogs';
import { auth } from '@/auth';

export async function GET() {
  try {
    // Check if user is authenticated
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await getFoodLogs();

    if (!data) {
      return NextResponse.json({ error: 'Food logs not found' }, { status: 404 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching food logs:', error);
    return NextResponse.json({ error: 'Error fetching food logs.' }, { status: 500 });
  }
}
