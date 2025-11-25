'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { auth } from '@/auth';
import { prisma } from '@/prisma';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function sendMessage(message: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: 'Unauthorized' };
  }

  const userId = session.user.id;
  const sessionId = 'default';

  try {
    // 1. Save User Message
    await prisma.chat_logs.create({
      data: {
        user_id: userId,
        session_id: sessionId,
        sender_type: 'user',
        message: message,
      },
    });

    // 2. Fetch recent history for context
    const recentLogs = await prisma.chat_logs.findMany({
      where: { user_id: userId },
      orderBy: { timestamp: 'desc' },
      take: 21, // Fetch last 20 + current one
    });

    // Reverse to chronological order
    const chronologicalLogs = recentLogs.reverse();

    // Filter out the current message we just saved to avoid sending it in history
    // The current message should be the last one in chronologicalLogs
    const historyLogs = chronologicalLogs.slice(0, -1);

    const history = historyLogs.map((log) => ({
      role: log.sender_type === 'user' ? 'user' : 'model',
      parts: [{ text: log.message }],
    }));

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [
            {
              text: 'You are a health and nutrition specialist. You can help and answer anything about health and nutrition. If the user asks about something outside these topics, politely refuse to answer and apologize. Do not answer questions unrelated to health and nutrition. Answer in Indonesian by default, but if the user speaks in another language (like English), reply in that language. Nutrisys has these features: Analisis Nutrisi (/analyze), AI Chat (/chatbot), Wellness Jurnal (/journal), and Target (/target). If the user asks about these topics, provide the corresponding link using Markdown format like [Link Name](url) (e.g., [Analisis Nutrisi](/analyze)) and suggest they use that feature. Do not wrap links in bold (**). Also there is a Dashboard that summarize and manage all the features with AI so the user can track their activity in the application in (/dashboard), There is a notification too if the user have done anything like creating something new or deleting or updating in the features also like a reminder that analyzed by the AI and send directly to the notification and the email if the email is valid, the notification page is (/notifications)',
            },
          ],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I am ready to assist with health and nutrition inquiries.' }],
        },
        ...history,
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    const text = response.text();

    // 3. Save AI Response
    await prisma.chat_logs.create({
      data: {
        user_id: userId,
        session_id: sessionId,
        sender_type: 'bot',
        message: text,
      },
    });

    return { success: true, message: text };
  } catch (error) {
    console.error('Chatbot Error:', error);
    return { error: 'Maaf, terjadi kesalahan saat memproses pesan Anda.' };
  }
}

export async function resetChat() {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: 'Unauthorized' };
  }

  const userId = session.user.id;

  try {
    await prisma.chat_logs.deleteMany({
      where: {
        user_id: userId,
      },
    });
    return { success: true };
  } catch (error) {
    console.error('Reset Chat Error:', error);
    return { error: 'Gagal menghapus riwayat chat.' };
  }
}
