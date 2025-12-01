
import { NextResponse } from "next/server";
import  { getAllArticleList }  from "@/lib/actions/getArticles";

export async function GET() {
  try {
    const articles = await getAllArticleList();

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error("API_ERROR_GET_ARTICLES:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
