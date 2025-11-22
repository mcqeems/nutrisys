import { prisma } from '@/prisma';
import { auth } from '@/auth';
import { getImageUrl } from './getImageUrl';

export default async function getUsersInfo() {
  const userAuth = await auth();
  const userId = userAuth?.user?.id;

  if (!userId) {
    console.error('No user ID found in session');
    return null;
  }

  try {
    const response = await prisma.user_info.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    // Convert S3 key to presigned URL if user data exists
    if (response && response.user?.image) {
      const presignedUrl = await getImageUrl(response.user.image);
      return {
        ...response,
        user: {
          ...response.user,
          image: presignedUrl,
        },
      };
    }

    return response;
  } catch (error) {
    console.error('Error fetching user info: ', error);
    return null;
  }
}
