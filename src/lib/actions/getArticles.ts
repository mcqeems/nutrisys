import { articles } from '@/generated/prisma/client';
import { prisma } from '@/prisma';

export type ArticleListItem = {
  id: number;
  title: string;
  description: string;
  image_path: string | null;
  created_at: Date | null;
  content: string | null; 
};

export async function getAllArticleList(): Promise<ArticleListItem[]> {
  try {
    const result = await prisma.articles.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        image_path: true,
        created_at: true,
        content: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return result as ArticleListItem[];
  } catch (error) {
    console.error("ACTION_ERROR_GET_LIST:", error);
    throw new Error("Gagal mengambil daftar artikel.");
  }
}

export async function getSingleArticleDetail(
  id: number
): Promise<articles | null> {
  try {
    const article = await prisma.articles.findUnique({
      where: { id },
    });

    console.log(`[DEBUG] Article found for ID ${id}:`, !!article);

    return article;
  } catch (error) {
    console.error(`ACTION_ERROR_GET_DETAIL (ID: ${id}):`, error);
    throw new Error("Gagal mengambil detail artikel.");
  }
}
