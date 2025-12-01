import { prisma } from '@/prisma';
import { auth } from '@/auth';

export default async function getTotal() {
  const userAuth = await auth();
  const userId = userAuth?.user?.id;

  if (!userId) {
    console.error('No user ID found in session');
    return null;
  }

  try {
    const responseJournal = await prisma.journal_entries.findMany({
      where: {
        user_id: userId,
      },
    });
    const responseChat = await prisma.chat_logs.findMany({
      where: {
        user_id: userId,
      },
    });
    const responseFood = await prisma.food_logs.findMany({
      where: {
        user_id: userId,
      },
    });
    const responseTarget = await prisma.user_targets.findMany({
      where: {
        user_id: userId,
      },
    });

    const totalJournal = responseJournal.length;
    const totalChat = responseChat.length;
    const totalFood = responseFood.length;
    const totalTarget = responseTarget.length;
    const response = {
      journals: totalJournal,
      chats: totalChat,
      foods: totalFood,
      targets: totalTarget,
    };

    return response;
  } catch (error) {
    console.error('Error fetching User Totals: ', error);
    return null;
  }
}
