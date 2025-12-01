import { NextResponse } from 'next/server';
import { getDashboard } from '@/lib/actions/getDashboard';

export async function GET() {
  try {
    const data = await getDashboard();

    if (!data) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Error fetching dashboard data.' }, { status: 500 });
  }
}
