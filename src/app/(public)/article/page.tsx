import { Footer } from "@/components/ui/footer";
import { ArticleList } from "./component/ArticleList";
import { getAllArticleList } from "@/lib/actions/getArticles";

export default async function ArticleListPage() {
  const articles = await getAllArticleList();
  return (
    <div>
    <ArticleList articles={articles} />
    <Footer/>
    </div>
  );
}
