'use server';

import { prisma } from '@/prisma';
import { auth } from '@/auth';

export async function getUnreadNotificationCount(): Promise<number> {
  const session = await auth();
  if (!session?.user?.id) {
    return 0;
  }

  try {
    const count = await prisma.notifications.count({
      where: {
        user_id: session.user.id,
        is_read: false,
      },
    });

    return count;
  } catch (error) {
    console.error('Error getting unread notification count:', error);
    return 0;
  }
}
