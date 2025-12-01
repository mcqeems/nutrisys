import { prisma } from '@/prisma';
import { auth } from '@/auth';
import { JsonValue } from '@prisma/client/runtime/library';

export interface SummarizeData {
  user: {
    name: string;
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
    message: string;
    type: string | null;
    is_read: boolean | null;
  }>;
  food_logs: Array<{
    description: JsonValue | null;
  }>;
  chat_logs: Array<{
    sender_type: string;
    message: string;
  }>;
  journal_entries: Array<{
    mood: string | null;
    content: string;
  }>;
  user_targets: Array<{
    name: string;
    start_date: Date;
    end_date: Date;
    status: string | null;
  }>;
  date_now: Date;
}

export async function getSummarizeData(): Promise<SummarizeData | null> {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const userId = session.user.id;

  try {
    // Fetch all data in parallel
    const [user, userInfo, notifications, food_logs, chat_logs, journal_entries, user_targets] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { name: true },
      }),
      prisma.user_info.findUnique({
        where: { user_id: userId },
      }),
      prisma.notifications.findMany({
        where: { user_id: userId },
        select: { message: true, type: true, is_read: true },
        orderBy: { created_at: 'desc' },
        take: 5,
      }),
      prisma.food_logs.findMany({
        where: { user_id: userId },
        select: { description: true },
        orderBy: { log_date: 'desc' },
        take: 5,
      }),
      prisma.chat_logs.findMany({
        where: { user_id: userId, sender_type: 'user' },
        select: { sender_type: true, message: true },
        orderBy: { timestamp: 'desc' },
        take: 10,
      }),
      prisma.journal_entries.findMany({
        where: { user_id: userId },
        select: { mood: true, content: true },
        orderBy: { entry_date: 'desc' },
        take: 5,
      }),
      prisma.user_targets.findMany({
        where: { user_id: userId },
        select: { name: true, start_date: true, end_date: true, status: true },
        orderBy: { created_at: 'desc' },
        take: 10,
      }),
    ]);

    return {
      user: user
        ? {
            name: user.name || 'Pengguna',
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
      food_logs: food_logs || [],
      chat_logs: chat_logs || [],
      journal_entries: journal_entries || [],
      user_targets: user_targets || [],
      // Get current time in Jakarta timezone (UTC+7)
      date_now: new Date(Date.now() + 7 * 60 * 60 * 1000),
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return null;
  }
}
