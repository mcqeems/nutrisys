import { NextResponse } from 'next/server';
import { prisma } from '@/prisma';
import { auth } from '@/auth';
import { getImageUrl } from '@/lib/actions/getImageUrl';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

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

    const data = {
      user: user
        ? {
            name: user.name || 'Pengguna',
            email: user.email,
            image: userImage,
          }
        : null,
      userInfo: userInfo
        ? {
            gender: userInfo.gender,
            blood_type: userInfo.blood_type,
            height: userInfo.height,
            weight: userInfo.weight,
            food_allergy: userInfo.food_allergy,
            medical_history: userInfo.medical_history,
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

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Error fetching dashboard data.' }, { status: 500 });
  }
}
