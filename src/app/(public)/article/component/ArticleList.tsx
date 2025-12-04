"use client";

import { ChevronRight, Leaf, Calendar, Zap } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import type { ArticleListItem } from "@/lib/actions/getArticles"; // Ganti dengan path yang sesuai
import React from "react";
import ReactMarkdown from "react-markdown";

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

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <section className="pt-30 py-16 bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium"
          >
            <Zap className="w-4 h-4" />
            Wawasan Sehat dari NutriSys
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance mt-4">
            Jendela Nutrisi Sehat Anda
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-3">
            Kumpulan artikel pilihan yang dikurasi oleh para ahli kami. Dapatkan
            pengetahuan mendalam untuk gaya hidup yang lebih baik.
          </p>
        </div>

        {/* Input Pencarian */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        ></motion.div>

        {/* Daftar Artikel */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {articles.length > 0 ? (
            articles.map((article) => (
              <motion.a
                key={article.id}
                href={
                  article.id && article.id > 0 ? `/article/${article.id}` : "#"
                }
                className="group flex flex-col rounded-3xl bg-card shadow-lg border border-border transition-all duration-300 
                       transform hover:scale-[1.01] hover:shadow-xl hover:border-primary/50 overflow-hidden"
                variants={itemVariants}
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={article.image_path || "/images/placeholder.jpg"}
                    alt={article.title}
                    fill
                    objectFit="cover"
                    className="transition duration-500 ease-in-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                           overflow-hidden text-ellipsis line-clamp-2"
                  >
                    {article.title}
                  </h2>
                  <div
                    // Wrapper div yang menampung konten dan diberikan kelas line-clamp-3
                    className="text-base text-muted-foreground flex-grow mb-5 
             overflow-hidden text-ellipsis line-clamp-3"
                  >
                    <ReactMarkdown
                      // Melarang semua elemen block-level yang akan merusak hitungan baris
                      disallowedElements={[
                        "h1",
                        "h2",
                        "h3",
                        "h4",
                        "h5",
                        "h6", // Headings
                        "ul",
                        "ol",
                        "li", // Lists
                        "table",
                        "blockquote",
                        "hr",
                        "img", // Lain-lain
                      ]}
                      unwrapDisallowed={true}
                    >
                      {article.content}
                    </ReactMarkdown>
                  </div>
                  <div className="mt-auto pt-4 border-t border-border/70">
                    <span className="flex items-center font-medium text-primary hover:text-primary/80 transition duration-300">
                      Baca Selengkapnya
                      <ChevronRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-muted-foreground text-lg">
              Tidak ada artikel yang tersedia saat ini.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
