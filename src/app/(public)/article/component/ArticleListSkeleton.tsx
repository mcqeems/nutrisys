import React from "react";

const skeletonCount = 6;
const skeletons = Array.from({ length: skeletonCount }, (_, i) => i);

export const ArticleCardSkeleton: React.FC = () => (
  <div
    className="flex flex-col rounded-3xl bg-card shadow-lg border border-border 
               overflow-hidden animate-pulse h-[480px]" // Sesuaikan tinggi
  >
    <div className="relative w-full h-48 bg-muted/70 overflow-hidden">
      <div className="absolute bottom-4 left-4">
        <div className="w-24 h-6 bg-muted-foreground/30 rounded-full"></div>
      </div>
    </div>

    <div className="p-6 md:p-7 flex flex-col flex-grow">
      <div className="flex items-center text-sm mb-3">
        <div className="h-4 w-4 mr-2 bg-primary/50 rounded-full"></div>
        <div className="h-4 w-20 bg-muted-foreground/30 rounded"></div>
      </div>
      <div className="h-6 w-11/12 bg-muted-foreground/30 rounded mb-2"></div>
      <div className="h-6 w-9/12 bg-muted-foreground/30 rounded mb-4"></div>
      <div className="h-4 w-full bg-muted-foreground/30 rounded mb-1"></div>
      <div className="h-4 w-11/12 bg-muted-foreground/30 rounded mb-1"></div>
      <div className="h-4 w-10/12 bg-muted-foreground/30 rounded mb-5"></div>
      <div className="mt-auto pt-4 border-t border-border/70">
        <div className="h-5 w-32 bg-primary/50 rounded"></div>
      </div>
    </div>
  </div>
);

export const ArticleListSkeleton: React.FC = () => (
  <section className="pt-30 py-16 bg-background min-h-screen">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 animate-pulse">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium h-8 w-48 mx-auto mb-4"></div>
        <div className="h-10 sm:h-12 w-3/4 mx-auto bg-muted-foreground/30 rounded-lg mb-4"></div>
        <div className="h-6 w-1/2 mx-auto bg-muted-foreground/30 rounded"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-16 max-w-4xl mx-auto animate-pulse">
        <div className="w-full h-12 bg-muted-foreground/30 rounded-xl"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {skeletons.map((i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </section>
);
