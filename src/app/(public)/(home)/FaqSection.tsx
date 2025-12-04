"use client";

import { motion, type Variants } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordian";

function FaqSection() {
  const faqs = [
    {
      question: "Apa itu Nutrisys?",
      answer:
        "Nutrisys adalah aplikasi analisis nutrisi yang menggunakan teknologi AI untuk membantu Anda memahami kandungan nutrisi makanan Anda. Cukup foto makanan Anda, dan kami akan memberikan informasi lengkap tentang kalori, protein, karbohidrat, lemak, vitamin, dan mineral.",
    },
    {
      question: "Bagaimana cara kerja Nutrisys?",
      answer:
        "Nutrisys menggunakan teknologi computer vision dan machine learning untuk mengenali makanan dari foto yang Anda upload. Sistem kami kemudian menganalisis kandungan nutrisi berdasarkan database makanan yang komprehensif dan memberikan hasil yang akurat dalam hitungan detik.",
    },
    {
      question: "Apakah Nutrisys gratis?",
      answer:
        "Nutrisys sepenuhnya gratis! Anda dapat langsung menikmati semua fitur canggih analisis nutrisi dan pengelolaan diet tanpa perlu khawatir biaya. Kami berkomitmen menyediakan layanan kesehatan yang dapat diakses oleh siapa saja, tanpa batasan atau langganan premium.",
    },
    {
      question: "Apakah data saya aman?",
      answer:
        "Keamanan data adalah prioritas utama kami. Semua informasi kesehatan Anda dienkripsi dan disimpan dengan standar keamanan tinggi. Kami tidak akan pernah membagikan data Anda tanpa izin eksplisit dari Anda.",
    },
    {
      question: "Makanan apa saja yang bisa dianalisis?",
      answer:
        "Nutrisys dapat menganalisis hampir semua jenis makanan, mulai dari makanan tradisional Indonesia, makanan internasional, hingga makanan kemasan. Database kami terus diperbarui untuk mencakup lebih banyak variasi makanan.",
    },
    {
      question: "Apakah Nutrisys bisa membantu diet saya?",
      answer:
        "Ya! Nutrisys tidak hanya menganalisis nutrisi, tetapi juga memberikan rekomendasi personal berdasarkan tujuan kesehatan Anda. Anda bisa set target kalori harian, pantau progress, dan dapatkan saran meal plan yang sesuai dengan kebutuhan diet Anda.",
    },
  ];

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  return (
    <motion.section
      className="relative overflow-hidden py-4"
      id="faq"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-[orb-pulse_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-20 left-10 w-56 h-56 bg-accent/10 rounded-full blur-3xl animate-[orb-pulse_12s_ease-in-out_infinite_3s]" />
        <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-[orb-pulse_14s_ease-in-out_infinite_2s]" />
      </div>

      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Seputar{" "}
              <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Nutrisys
              </span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Temukan jawaban untuk pertanyaan umum tentang Nutrisys
            </motion.p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="relative border border-border/90 px-4 py-2 text-xl rounded-xl bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02] group overflow-hidden"
                >
                  {/* Animated linear background on hover */}
                  <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-primary/10 to-transparent" />

                  <AccordionTrigger className="relative text-left text-xl font-semibold hover:text-primary hover:no-underline py-6 transition-all duration-300 &data-state=open:text-primary cursor-pointer">
                    <span className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300">
                      <span className="w-2 h-2 rounded-full bg-primary/50 group-hover:bg-primary group-hover:scale-150 transition-all duration-300" />
                      {faq.question}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="relative text-muted-foreground leading-relaxed pb-6">
                    <div className="pl-5 border-l-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </motion.section>
  );
}

export default FaqSection;
