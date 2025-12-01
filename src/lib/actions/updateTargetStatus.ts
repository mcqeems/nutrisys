'use server';

import { prisma } from '@/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

function calculateTimeLeft(endDate: Date): string {
  const now = new Date();
  const end = new Date(endDate);
  const diffMs = end.getTime() - now.getTime();

  if (diffMs <= 0) {
    return 'sudah berakhir';
  }

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (diffDays > 0) {
    return `${diffDays} hari ${diffHours} jam lagi`;
  } else if (diffHours > 0) {
    return `${diffHours} jam lagi`;
  } else {
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffMinutes} menit lagi`;
  }
}

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

    // Create notification when target is set to Aktif
    if (status === 'Aktif') {
      const timeLeft = calculateTimeLeft(target.end_date);
      await prisma.notifications.create({
        data: {
          user_id: userId,
          message: `🎯 Target "${target.name}" diaktifkan kembali! Waktu tersisa: ${timeLeft}. Ayo lanjutkan progressmu!`,
          type: 'reminder',
          is_read: false,
        },
      });
    } else if (status === 'Selesai') {
      await prisma.notifications.create({
        data: {
          user_id: userId,
          message: `🎉 Selamat! Target "${target.name}" telah selesai. Kerja bagus!`,
          type: 'success',
          is_read: false,
        },
      });
    }

    revalidatePath('/target');
    return { success: true, message: 'Status berhasil diperbarui' };
  } catch (error) {
    console.error('Error updating target status:', error);
    return { success: false, message: 'Gagal memperbarui status' };
  }
}
