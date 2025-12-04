import { ArticleList } from "./component/ArticleList";
import { getAllArticleList } from "@/lib/actions/getArticles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles - Nutrisys",
  description:
    "Kumpulan artikel-artikel tentang kesehatan nutrisi untuk memperluas wawasan anda.",
};

export default async function ArticleListPage() {
  const articles = await getAllArticleList();
  return (
    <div>
      <ArticleList articles={articles} />
    </div>
  );
}
