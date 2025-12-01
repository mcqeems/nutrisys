// src/app/(public)/article/page.tsx

import { ArticleList } from "./component/ArticleList";
import { getAllArticleList, ArticleListItem } from "@/lib/actions/getArticles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wawasan Sehat | Blog Nutrisi",
  description:
    "Baca artikel terbaru tentang makronutrien, tips diet, dan analisis makanan dari ahli kami.",
};

const getArticlesData = async (): Promise<ArticleListItem[]> => {
  try {
    const articles = await getAllArticleList();
    return articles || [];
  } catch (error) {
    console.error("Failed to fetch article list:", error);
    return [];
  }
};

const ArticleIndexPage = async () => {
  const articles = await getArticlesData();

  return (
    <main className="bg-background">
      <ArticleList articles={articles} />
    </main>
  );
};

export default ArticleIndexPage;
