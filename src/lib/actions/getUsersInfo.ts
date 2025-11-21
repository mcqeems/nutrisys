import { prisma } from '@/prisma';
import { auth } from '@/auth';

export default async function getUsersInfo() {
  const userAuth = await auth();
  const userData = userAuth?.user;
  try {
    const response = await prisma.user_info.findUnique({
      where: {
        user_id: userData?.id,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching user info: ', error);
  }
}
