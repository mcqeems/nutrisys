import { NextResponse } from 'next/server';
import getTarget from '@/lib/actions/getTarget';
import { auth } from '@/auth';

export async function GET() {
  try {
    // Check if user is authenticated
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await getTarget();

    if (!data) {
      return NextResponse.json({ error: 'Targets not found' }, { status: 404 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching targets:', error);
    return NextResponse.json({ error: 'Error fetching targets.' }, { status: 500 });
  }
}
