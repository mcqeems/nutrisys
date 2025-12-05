"use client";

import { Zap, Shield, Heart, Aperture } from "lucide-react";
import { motion, type Variants } from "framer-motion"; // Tambahkan 'type' untuk konsistensi

// Menggunakan cardVariants dari komponen WhyNutriSys (termasuk scale dan y)
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

// Menggunakan containerVariants dari komponen WhyNutriSys
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // StaggerChildren juga disesuaikan
    },
  },
};

const commitments = [
  {
    icon: Zap,
    title: "Analisis Instan & Cepat",
    description:
      "Kami berkomitmen untuk menyediakan data nutrisi real-time. Tidak perlu menunggu; masukkan makanan, dapatkan hasil detik itu juga.",
    color: "text-chart-1",
  },
  {
    icon: Shield,
    title: "Akurasi & Verifikasi Data",
    description:
      "Setiap data diverifikasi silang dengan sumber otoritatif (TKPI, USDA) dan ditinjau oleh Ahli Gizi untuk menjamin informasi yang terpercaya.",
    color: "text-chart-2",
  },
  {
    icon: Heart,
    title: "Privasi Data Kesehatan",
    description:
      "Kesehatan Anda adalah hal pribadi. Kami menjamin kerahasiaan penuh. Data pelacakan Anda dienkripsi dan tidak akan pernah dibagikan.",
    color: "text-chart-5",
  },
  {
    icon: Aperture,
    title: "Pengalaman Pengguna Terbaik",
    description:
      "Kami terus berinovasi untuk membuat pelacakan nutrisi menjadi intuitif dan menyenangkan, bukan menjadi tugas yang membebani.",
    color: "text-chart-4",
  },
];

const CommitmentSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-background" id="komitmen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Komitmen Kami{" "}
            <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Untuk Anda
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-xl text-muted-foreground">
            Kami membangun aplikasi ini berdasarkan empat pilar utama untuk
            memberikan pengalaman nutrisi terbaik.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {commitments.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative flex flex-col items-center p-6 bg-card rounded-xl shadow-lg border border-border transition duration-500 ease-in-out transform lg:hover:scale-[1.05] lg:hover:shadow-2xl lg:hover:border-primary/50"
            >
              <div
                className={`p-4 rounded-full bg-secondary transition duration-500 lg:group-hover:bg-primary/10 border-2 border-primary`}
              >
                <item.icon className={`h-8 w-8 ${item.color}`} />
              </div>

              {/* Konten */}
              <h3 className="mt-6 text-xl font-bold text-card-foreground text-center transition duration-500 lg:group-hover:text-primary">
                {item.title}
              </h3>
              <p className="mt-3 text-base text-muted-foreground text-center">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CommitmentSection;
