import { NextResponse, NextRequest } from 'next/server';
import { getSingleArticleDetail } from '@/lib/actions/getArticles';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const articleId = parseInt(id);

  if (isNaN(articleId)) {
    return NextResponse.json({ error: 'Bad Request', message: 'ID artikel harus berupa angka.' }, { status: 400 });
  }

  try {
    const article = await getSingleArticleDetail(articleId);

    if (!article) {
      return NextResponse.json({ message: 'Artikel tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error(`API_ERROR_GET_DETAIL (ID: ${articleId}):`, error);
    return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 });
  }
}
