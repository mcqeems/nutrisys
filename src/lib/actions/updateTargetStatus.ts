'use server';

import { prisma } from '@/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export async function updateTargetStatus(id: number, status: string) {
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

    await prisma.user_targets.update({
      where: { id },
      data: { status },
    });

    revalidatePath('/target');
    return { success: true, message: 'Status berhasil diperbarui' };
  } catch (error) {
    console.error('Error updating target status:', error);
    return { success: false, message: 'Gagal memperbarui status' };
  }
}
