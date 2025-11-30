'use server';

import { prisma } from '@/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export async function createTarget(name: string, startDate: string, endDate: string, status: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    await prisma.user_targets.create({
      data: {
        user_id: userId,
        name,
        start_date: new Date(startDate),
        end_date: new Date(endDate),
        status,
      },
    });

    revalidatePath('/target');
    return { success: true, message: 'Target created successfully' };
  } catch (error) {
    console.error('Error creating target:', error);
    return { success: false, message: 'Failed to create target' };
  }
}
