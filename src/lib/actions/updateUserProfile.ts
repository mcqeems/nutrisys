'use server';

import { prisma } from '@/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export type UserProfileData = {
  gender?: string;
  height?: number;
  weight?: number;
  blood_type?: string;
  food_allergy?: string;
  medical_history?: string;
};

export async function updateUserProfile(data: UserProfileData) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    // Check if user_info exists
    const existingInfo = await prisma.user_info.findUnique({
      where: { user_id: userId },
    });

    if (existingInfo) {
      await prisma.user_info.update({
        where: { user_id: userId },
        data: {
          gender: data.gender,
          height: data.height,
          weight: data.weight,
          blood_type: data.blood_type,
          food_allergy: data.food_allergy,
          medical_history: data.medical_history,
        },
      });
    } else {
      await prisma.user_info.create({
        data: {
          user_id: userId,
          gender: data.gender,
          height: data.height,
          weight: data.weight,
          blood_type: data.blood_type,
          food_allergy: data.food_allergy,
          medical_history: data.medical_history,
        },
      });
    }

    revalidatePath('/user');
    return { success: true, message: 'Profile updated successfully' };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, message: 'Failed to update profile' };
  }
}
