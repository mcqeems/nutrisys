import { articles } from '@prisma/client';
import { prisma } from '@/prisma';

/**
 * @param id ID artikel (harus berupa angka).
 */
export async function getSingleArticleDetail(id: number): Promise<articles | null> {
  if (isNaN(id) || id <= 0) {
    console.error('ACTION_ERROR: ID is NaN or zero, aborting query.');
    return null;
  }

  try {
    const article = await prisma.articles.findUnique({
      where: { id },
    });

    console.log(`[DEBUG] Article found for ID ${id}:`, !!article);

    return article;
  } catch (error) {
    console.error(`ACTION_ERROR_GET_DETAIL (ID: ${id}):`, error);
    throw new Error('Gagal mengambil detail artikel karena kesalahan server/database.');
  }
}
