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

    // Create notification for active targets
    if (status === 'Aktif') {
      const timeLeft = calculateTimeLeft(new Date(endDate));
      await prisma.notifications.create({
        data: {
          user_id: userId,
          message: `🎯 Target baru "${name}" telah dibuat! Waktu tersisa: ${timeLeft}. Semangat mencapai targetmu!`,
          type: 'Reminder',
          is_read: false,
        },
      });
    }

    revalidatePath('/target');
    return { success: true, message: 'Target berhasil dibuat.' };
  } catch (error) {
    console.error('Error creating target:', error);
    return { success: false, message: 'Gagal membuat target.' };
  }
}
