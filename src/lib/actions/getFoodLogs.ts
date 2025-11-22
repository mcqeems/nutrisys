import { prisma } from '@/prisma';
import { auth } from '@/auth';
import { getImageUrl } from './getImageUrl';

export default async function getFoodLogs() {
  const userAuth = await auth();
  const userId = userAuth?.user?.id;

  if (!userId) {
    console.error('No user ID found in session');
    return null;
  }

  try {
    const response = await prisma.food_logs.findMany({
      where: {
        user_id: userId,
      },
    });
    // Process each food log to generate presigned URLs for images
    const logsWithImages = await Promise.all(
      response.map(async (log) => {
        if (log.image_url) {
          const presignedUrl = await getImageUrl(log.image_url);
          return { ...log, image_url: presignedUrl };
        }
        return log;
      })
    );

    return logsWithImages;
  } catch (error) {
    console.error('Error fetching user info: ', error);
    return null;
  }
}
