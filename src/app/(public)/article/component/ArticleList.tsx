"use client";

import { Search, ChevronRight, Leaf, Calendar } from "lucide-react"; // Menambahkan Leaf dan Calendar icon
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import type { ArticleListItem } from "@/lib/actions/getArticles";
import React from "react";
import { Zap } from "lucide-react";

interface ArticleListProps {
  articles: ArticleListItem[];
}

const formatDate = (date: Date | null | undefined): string =>
  date
    ? new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Tanggal Tidak Tersedia";

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  // Animasi untuk list item (Staggering effect)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section className="pt-30 py-16 bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium animate-fade-in-up">
            <Zap className="w-4 h-4" />
            Wawasan Sehat dari NutriSys
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Jendela Nutrisi Sehat Anda
          </h1>
          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Kumpulan artikel pilihan yang dikurasi oleh para ahli kami. Dapatkan
            pengetahuan mendalam untuk gaya hidup yang lebih baik.
          </p>
        </div>

        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari artikel ...."
              className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-card text-card-foreground placeholder-muted-foreground focus:ring-primary focus:border-primary transition shadow-md"
            />
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {articles.map((article, index) => (
            <motion.a
              key={article.id}
              href={`/article/${article.id}`}
              className="group flex flex-col rounded-xl bg-card shadow-lg border border-border transition-all duration-500 
                         transform hover:scale-[1.02] hover:shadow-2xl hover:border-primary 
                         dark:shadow-none dark:hover:border-primary/50"
              variants={itemVariants}
            >
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={article.image_path || "/images/placeholder.jpg"}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition duration-500 ease-in-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />

                <div className="absolute bottom-0 left-0 p-4">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-foreground bg-primary/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg transition duration-300 group-hover:bg-primary">
                    <Leaf className="h-4 w-4" />
                    {article.description}{" "}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-7 flex flex-col flex-grow">
                <div className="flex items-center text-sm font-medium text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4 mr-1 text-primary" />
                  {formatDate(article.created_at)}
                </div>
                <h2
                  className="text-2xl font-semibold text-card-foreground leading-snug mb-3 
                             group-hover:text-primary transition duration-300 
                             font-sans-stack-headline overflow-hidden text-ellipsis line-clamp-2"
                >
                  {article.title}
                </h2>
                <p
                  className="text-base text-muted-foreground flex-grow mb-5 
                             overflow-hidden text-ellipsis line-clamp-3"
                >
                  {article.content}
                </p>
                <div className="mt-auto pt-4 border-t border-border/70">
                  <span className="flex items-center font-medium text-primary hover:text-primary/80 transition duration-300">
                    Baca Selengkapnya
                    <ChevronRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {articles.length > 0 && (
          <div className="mt-20 text-center">
            <button className="px-8 py-3 text-lg font-medium rounded-full text-primary-foreground bg-primary hover:bg-primary/90 transition shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/50">
              Lihat Artikel Lainnya
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
