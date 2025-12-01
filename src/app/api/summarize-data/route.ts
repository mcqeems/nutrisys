import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getSummarizeData } from '@/lib/actions/getSummarizeData';

export async function GET() {
  try {
    // Check if user is authenticated
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await getSummarizeData();

    if (!data) {
      return NextResponse.json({ error: 'Summarized data not found' }, { status: 404 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching Summarized data:', error);
    return NextResponse.json({ error: 'Error fetching Summarized data.' }, { status: 500 });
  }
}
