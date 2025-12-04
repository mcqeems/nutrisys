"use client";

import { motion, type Variants } from "framer-motion";

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1, 
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactHeader() {
  return (
    <motion.div
      variants={headerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }} 
      className="relative overflow-hidden bg-linear-to-b pt-20"
    >
      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Judul */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl sm:text-5xl text-center lg:text-6xl font-bold text-foreground leading-tight text-balance mt-4">
              Mari Terhubung
            </h1>
          </motion.div>

          {/* Deskripsi */}
          <motion.div variants={itemVariants} className="mt-4">
            <p className="text-lg md:text-xl text-center text-muted-foreground leading-relaxed">
              Kami ingin mendengar dari Anda. Hubungi kami dengan pertanyaan,
              masukan, atau sekadar untuk mengucapkan salam.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
