import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import getTotal from '@/lib/actions/getTotal';

export async function GET() {
  try {
    // Check if user is authenticated
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await getTotal();

    if (!data) {
      return NextResponse.json({ error: 'Total not found' }, { status: 404 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching total:', error);
    return NextResponse.json({ error: 'Error fetching total.' }, { status: 500 });
  }
}
