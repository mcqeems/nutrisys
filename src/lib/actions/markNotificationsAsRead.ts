'use server';

import { prisma } from '@/prisma';
import { auth } from '@/auth';

export async function markNotificationsAsRead(notificationIds?: number[]) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: 'Unauthorized' };
  }

  const userId = session.user.id;

  try {
    if (notificationIds && notificationIds.length > 0) {
      // Mark specific notifications as read
      await prisma.notifications.updateMany({
        where: {
          id: { in: notificationIds },
          user_id: userId,
        },
        data: {
          is_read: true,
        },
      });
    } else {
      // Mark all notifications as read
      await prisma.notifications.updateMany({
        where: {
          user_id: userId,
          is_read: false,
        },
        data: {
          is_read: true,
        },
      });
    }

    return { success: true, message: 'Notifikasi telah dibaca' };
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    return { success: false, message: 'Gagal menandai notifikasi' };
  }
}
