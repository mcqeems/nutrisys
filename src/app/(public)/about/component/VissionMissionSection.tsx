'use client';
import { ArrowRight, Globe, TrendingUp } from "lucide-react";
import { motion, Variants } from "framer-motion";

const leftSlide: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.8, 0.5, 1] }, // FIXED Easing
  },
};

const rightSlide: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.8, 0.5, 1] }, // FIXED Easing
  },
};

const vision = {
  title: "Visi Kami",
  icon: Globe,
  description:
    "Menjadi platform analisis nutrisi paling tepercaya dan intuitif di Asia, memberdayakan miliaran orang untuk membuat pilihan makanan yang mengarah pada kesehatan jangka panjang yang berkelanjutan.",
  points: [
    "Pionir Akurasi Data Nutrisi",
    "Pengalaman Pengguna Tanpa Batas",
    "Fokus pada Kesehatan Jangka Panjang",
  ],
};

const mission = {
  title: "Misi Kami",
  icon: TrendingUp,
  points: [
    "Menyediakan database nutrisi yang diverifikasi Ahli Gizi dan diperbarui secara real-time.",
    "Menciptakan fitur pelacakan yang sangat mudah dan intuitif untuk semua usia.",
    "Menjamin kerahasiaan dan keamanan data kesehatan pengguna (Privasi Nol).",
    "Terus berinovasi dalam fitur analisis instan (OCR/AI).",
  ],
};

const VisionMissionSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Visi dan{" "}
            <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Misi Kami
            </span>
          </h2>

          <p className="text-muted-foreground animate-[fade-in_1s_ease-out_0.3s_backwards]">
            Kami ada untuk menjembatani kesenjangan antara kompleksitas ilmu
            nutrisi dan pilihan makanan harian Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Kolom Kiri: Visi (Slide dari Kiri) */}
          <motion.div
            className="flex flex-col p-6 rounded-xl bg-card border border-border transition duration-300 hover:shadow-xl hover:border-primary"
            variants={leftSlide}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <vision.icon
                className={`h-10 w-10 text-primary tw-animate-pulse-slowest`}
              />
              <h3 className="text-3xl font-bold text-card-foreground font-sans-stack-headline">
                {vision.title}
              </h3>
            </div>

            <p className="text-lg text-muted-foreground mb-6 border-b border-border pb-4">
              {vision.description}
            </p>

            <ul className="space-y-3">
              {vision.points.map((point, index) => (
                <li
                  key={index}
                  className="flex items-center text-card-foreground text-base group cursor-default"
                >
                  <ArrowRight className="h-5 w-5 text-chart-1 flex-shrink-0 mr-2 transition duration-300 group-hover:text-primary group-hover:translate-x-1" />
                  <span className="transition duration-300 group-hover:text-primary">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Kolom Kanan: Misi (Slide dari Kanan) */}
          <motion.div
            className="flex flex-col p-6 rounded-xl bg-card border border-border transition duration-300 hover:shadow-xl hover:border-primary"
            variants={rightSlide}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <mission.icon
                className={`h-10 w-10 text-primary tw-animate-pulse-slowest`}
              />
              <h3 className="text-3xl font-bold text-card-foreground font-sans-stack-headline">
                {mission.title}
              </h3>
            </div>

            <p className="text-lg text-muted-foreground mb-6 border-b border-border pb-4">
              Misi kami adalah menjabarkan visi tersebut menjadi langkah-langkah
              nyata dan terukur.
            </p>

            <ul className="space-y-3">
              {mission.points.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start text-card-foreground text-base group cursor-default"
                >
                  <ArrowRight className="h-5 w-5 text-chart-2 flex-shrink-0 mr-2 mt-1 transition duration-300 group-hover:text-primary group-hover:translate-x-1" />
                  <span className="transition duration-300 group-hover:text-primary">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
