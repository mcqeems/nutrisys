import { getSingleArticleDetail } from "@/lib/actions/getSingleArticleDetail";
import Image from "next/image";
import { ArrowLeft } from "lucide-react"; 
import Link from "next/link"; 

interface ArticleDetailPageProps {
  params: {
    id: string;
  };
}

function ErrorComponent({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 min-h-[60vh] bg-background">
      <div className="text-center max-w-lg p-8 border border-border rounded-xl shadow-lg bg-card">
        <h1 className="text-4xl font-extrabold text-destructive mb-3">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground mb-6">{message}</p>

        <Link href="/article">
          <button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors 
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                       ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 
                       h-10 py-2 px-4 shadow-md"
          >
            Kembali ke Beranda
          </button>
        </Link>
      </div>
    </div>
  );
}

export default async function ArticleDetailPage({
  params: routeParams,
}: ArticleDetailPageProps) {
  const { id } = await routeParams;

  if (!id || id.trim() === "") {
    return (
      <ErrorComponent
        title="Kesalahan Rute"
        message="ID artikel tidak ditemukan di URL."
      />
    );
  }

  const articleId = parseInt(id);

  if (isNaN(articleId)) {
    return (
      <ErrorComponent
        title="404: ID Artikel Tidak Valid"
        message={`Tautan yang diakses ('${id}') tidak valid. Pastikan ID berupa angka.`}
      />
    );
  }

  const article = await getSingleArticleDetail(articleId);

  if (!article) {
    return (
      <ErrorComponent
        title="Artikel Tidak Ditemukan 😔"
        message={`Artikel dengan ID ${articleId} tidak ada di database kami. Mungkin sudah dihapus.`}
      />
    );
  }

  const dateDisplay = article.created_at
    ? new Date(article.created_at).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Tanggal tidak tersedia";

  const imageUrl = article.image_path || "/images/placeholder.jpg";

  return (
    <section className="pt-24 pb-20 bg-background min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <article className="bg-card p-6 md:p-10 lg:p-12 rounded-3xl shadow-2xl border border-border/50">
          <div className="mb-12">
            <a
              href="/article"
              className="inline-flex items-center justify-center rounded-full px-5 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold
               bg-primary text-primary-foreground shadow-lg shadow-primary/30
               hover:opacity-90 transition-opacity duration-200"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Kembali
            </a>
          </div>
          <div className="relative w-full aspect-video md:aspect-[16/7] rounded-xl overflow-hidden mb-8 shadow-inner">
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-4">
              {article.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-muted-foreground pt-4">
              <span className="font-semibold text-primary/80 bg-primary/10 px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-2 sm:mb-0">
                {article.description || "Tanpa Kategori"}
              </span>

              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-1.5 text-primary/60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Dipublikasikan:{" "}
                <span className="ml-1 font-medium text-foreground">
                  {dateDisplay}
                </span>
              </span>
            </div>

            <div className="w-full h-px bg-border mt-4"></div>
          </header>

          <div className="text-card-foreground">
            <div
              className="prose prose-lg dark:prose-invert max-w-none 
                          prose-headings:text-foreground prose-a:text-primary 
                          prose-li:marker:text-primary prose-strong:font-bold"
            >
              <p className="whitespace-pre-line text-lg leading-relaxed">
                {article.content ??
                  "Konten artikel ini belum tersedia. Mohon maaf atas ketidaknyamanan ini."}
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
