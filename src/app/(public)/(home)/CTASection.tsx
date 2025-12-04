"use client";

import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/butons";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const benefits = [
  "Analisis nutrisi real-time",
  "Rekomendasi menu personal",
  "Tracking progress harian",
  "Reminder Cerdas",
];

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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

const CTASection = () => {
  return (
    <section className="relative pb-24 px-4 overflow-hiddena bg-background">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.2 }}
          className="backdrop-blur-xl bg-card/80 rounded-3xl border-2 border-primary/30 shadow-2xl shadow-primary/20 p-8 md:p-12 lg:p-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block px-4 py-2 bg-primary/20 rounded-full text-sm font-semibold text-primary mb-6"
              >
                🚀 Mulai Perjalanan Sehat Anda
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              >
                Transformasi Kesehatan Anda{" "}
                <span
                  className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-shift"
                  style={{ backgroundSize: "200%" }}
                >
                  Dimulai Hari Ini
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-muted-foreground mb-8"
              >
                Bergabunglah dengan ribuan pengguna yang telah merasakan manfaat
                hidup lebih sehat dengan NutriSys.
              </motion.p>

              <motion.ul
                variants={containerVariants}
                className="space-y-4 mb-8"
              >
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* button */}
              <Link href="/register">
                <motion.div
                  variants={itemVariants}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button
                    size="lg"
                    className="group w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg font-bold rounded-xl transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 cursor-pointer"
                  >
                    Daftar Gratis Sekarang
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-sm text-muted-foreground mt-4"
              >
                ✨ Gratis Pemakaian • Tidak perlu berbayar
              </motion.p>
            </div>

            <motion.div variants={containerVariants} className="space-y-6">
              {[
                {
                  value: "100%",
                  label: "Pemakaian Gratis",
                  color: "from-primary to-accent",
                },
                {
                  value: "95%+",
                  label: "Akurasi AI yang tinggi.",
                  color: "from-chart-1 to-chart-2",
                },
                {
                  value: "24 Jam",
                  label: "Akses tanpa henti",
                  color: "from-chart-4 to-chart-5",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group backdrop-blur-sm bg-background/60 rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 "
                >
                  <div
                    className={`text-3xl font-bold mb-2 bg-linear-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
