"use client";
import { ArrowRight, Globe, TrendingUp } from "lucide-react";
import { motion, Variants } from "framer-motion";

const slideUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
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
    <section className="py-16 sm:py-24 bg-background" id="visimisi">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Animasi untuk Header */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            Visi dan{" "}
            <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Misi Kami
            </span>
          </motion.h2>

          <motion.p
            className="text-muted-foreground"
            variants={itemVariants} 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            Kami ada untuk menjembatani kesenjangan antara kompleksitas ilmu
            nutrisi dan pilihan makanan harian Anda.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} 
        >
          <motion.div
            className="flex flex-col p-6 rounded-xl bg-card border border-border transition duration-300 lg:hover:shadow-xl lg:hover:border-primary"
            variants={slideUp} 
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
                  <ArrowRight className="h-5 w-5 text-chart-1 shrink-0 mr-2 transition duration-300 group-hover:text-primary lg:group-hover:translate-x-1" />
                  <span className="transition duration-300 lg:group-hover:text-primary">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="flex flex-col p-6 rounded-xl bg-card border border-border transition duration-300 lg:hover:shadow-xl lg:hover:border-primary"
            variants={slideUp} 
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
                  <ArrowRight className="h-5 w-5 text-chart-2 shrink-0 mr-2 mt-1 transition duration-300 group-hover:text-primary lg:group-hover:translate-x-1" />
                  <span className="transition duration-300 lg:group-hover:text-primary">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
