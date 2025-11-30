'use server';

import { prisma } from '@/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export async function deleteTarget(id: number) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    // Verify ownership
    const target = await prisma.user_targets.findUnique({
      where: { id },
    });

    if (!target || target.user_id !== userId) {
      return { success: false, message: 'Target not found or unauthorized' };
    }

    await prisma.user_targets.delete({
      where: { id },
    });

    revalidatePath('/target');
    return { success: true, message: 'Target deleted successfully' };
  } catch (error) {
    console.error('Error deleting target:', error);
    return { success: false, message: 'Failed to delete target' };
  }
}
