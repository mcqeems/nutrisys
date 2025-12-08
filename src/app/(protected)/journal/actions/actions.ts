'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { auth } from '@/auth';
import { prisma } from '@/prisma';
import { revalidatePath } from 'next/cache';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2 || '');

export async function createJournal(mood: string, content: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: 'Unauthorized' };
  }

  try {
    const journal = await prisma.journal_entries.create({
      data: {
        user_id: session.user.id,
        mood,
        content,
        entry_date: new Date(),
      },
    });
    revalidatePath('/journal');
    return { success: true, data: journal };
  } catch (error) {
    console.error('Error creating journal:', error);
    return { error: 'Failed to create journal' };
  }
}

export async function getAiReply(journalId: number, content: string, mood: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: 'Unauthorized' };
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `
      User Mood: ${mood}
      Journal Content: ${content}
      
      As a supportive wellness assistant, provide a short, empathetic, and constructive reply to this journal entry. 
      Keep it under 100 words. Language: Bahasa Indonesia.
    `;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    await prisma.journal_entries.update({
      where: { id: journalId },
      data: { ai_reply: reply },
    });

    revalidatePath('/journal');
    return { success: true, reply };
  } catch (error) {
    console.error('Error generating AI reply:', error);
    return { error: 'Failed to generate AI reply' };
  }
}
