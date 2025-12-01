'use server';

import { prisma } from '@/prisma';
import { auth } from '@/auth';
import { getImageUrl } from './getImageUrl';

export interface DashboardData {
  user: {
    name: string;
    email: string;
    image?: string;
  } | null;
  userInfo: {
    gender?: string;
    blood_type?: string;
    height?: number;
    weight?: number;
    food_allergy?: string;
    medical_history?: string;
  } | null;
  notifications: Array<{
    id: number;
    message: string;
    type: string | null;
    is_read: boolean | null;
    created_at: Date | null;
  }>;
  summary: string | null;
  stats: {
    totalAnalisis: number;
    totalPesan: number;
    totalJurnal: number;
    totalTarget: number;
  };
}

export async function getDashboard(): Promise<DashboardData | null> {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const userId = session.user.id;

  try {
    // Fetch all data in parallel
    const [user, userInfo, notifications, summary, foodLogsCount, chatLogsCount, journalCount, targetCount] =
      await Promise.all([
        prisma.user.findUnique({
          where: { id: userId },
          select: { name: true, email: true, image: true },
        }),
        prisma.user_info.findUnique({
          where: { user_id: userId },
        }),
        prisma.notifications.findMany({
          where: { user_id: userId },
          orderBy: { created_at: 'desc' },
          take: 4,
        }),
        prisma.summary.findUnique({
          where: { user_id: userId },
        }),
        prisma.food_logs.count({
          where: { user_id: userId },
        }),
        prisma.chat_logs.count({
          where: { user_id: userId },
        }),
        prisma.journal_entries.count({
          where: { user_id: userId },
        }),
        prisma.user_targets.count({
          where: { user_id: userId },
        }),
      ]);

    // Get presigned URL for user image if exists
    let userImage = user?.image;
    if (userImage) {
      try {
        userImage = await getImageUrl(userImage);
      } catch (e) {
        console.error('Failed to get presigned URL:', e);
      }
    }

    return {
      user: user
        ? {
            name: user.name || 'Pengguna',
            email: user.email,
            image: userImage || undefined,
          }
        : null,
      userInfo: userInfo
        ? {
            gender: userInfo.gender || undefined,
            blood_type: userInfo.blood_type || undefined,
            height: userInfo.height || undefined,
            weight: userInfo.weight || undefined,
            food_allergy: userInfo.food_allergy || undefined,
            medical_history: userInfo.medical_history || undefined,
          }
        : null,
      notifications: notifications || [],
      summary: summary?.description || null,
      stats: {
        totalAnalisis: foodLogsCount,
        totalPesan: chatLogsCount,
        totalJurnal: journalCount,
        totalTarget: targetCount,
      },
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return null;
  }
}
