import { prisma } from '@/prisma';
import { auth } from '@/auth';

export default async function getTarget(page: number = 1, limit: number = 15) {
  const userAuth = await auth();
  const userId = userAuth?.user?.id;

  if (!userId) {
    console.error('No user ID found in session');
    return null;
  }

  try {
    const response = await prisma.user_targets.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return response;
  } catch (error) {
    console.error('Error fetching User Targets: ', error);
    return null;
  }
}
