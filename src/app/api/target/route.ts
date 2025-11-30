import { NextResponse, NextRequest } from 'next/server';
import getTarget from '@/lib/actions/getTarget';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '15');

    const data = await getTarget(page, limit);

    if (!data) {
      return NextResponse.json({ error: 'Targets not found' }, { status: 404 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching targets:', error);
    return NextResponse.json({ error: 'Error fetching targets.' }, { status: 500 });
  }
}
