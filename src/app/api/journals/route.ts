import { NextResponse } from 'next/server';
import getJournals from '@/lib/actions/getJournals';
import { auth } from '@/auth';

export async function GET() {
  try {
    // Check if user is authenticated
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await getJournals();

    if (!data) {
      return NextResponse.json({ error: 'Journals not found' }, { status: 404 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching journals:', error);
    return NextResponse.json({ error: 'Error fetching journals.' }, { status: 500 });
  }
}
