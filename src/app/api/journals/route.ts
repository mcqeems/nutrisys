import { NextResponse } from 'next/server';
import getJournals from '@/lib/actions/getJournals';
import { auth } from '@/auth';
import { prisma } from '@/prisma';
import { revalidatePath } from 'next/cache';

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

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get('id');
    if (!idParam) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const journalId = Number(idParam);
    if (!Number.isInteger(journalId)) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const existing = await prisma.journal_entries.findUnique({
      where: { id: journalId },
      select: { id: true, user_id: true },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Journal not found' }, { status: 404 });
    }

    if (existing.user_id !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await prisma.journal_entries.delete({ where: { id: journalId } });
    revalidatePath('/journal');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting journal:', error);
    return NextResponse.json({ error: 'Error deleting journal.' }, { status: 500 });
  }
}
