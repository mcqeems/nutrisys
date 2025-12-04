import { ArticleList } from './component/ArticleList';
import { getAllArticleList } from '@/lib/actions/getArticles';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Explore our collection of health and nutrition articles. Get expert insights on diet, wellness, healthy eating habits, and the latest nutrition science.',
  openGraph: {
    title: 'Health & Nutrition Articles | NutriSys',
    description: 'Expert health and nutrition articles to help you make informed wellness decisions.',
  },
};

export default async function ArticleListPage() {
  const articles = await getAllArticleList();
  return (
    <div>
      <ArticleList articles={articles} />
    </div>
  );
}
