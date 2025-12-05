'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Heart, Scale, Zap } from 'lucide-react';
import Nutrition from './Nutrition';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      when: 'beforeChildren',
    },
  },
};

const AboutNutriSys: React.FC = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative py-16 sm:py-24 bg-background text-foreground"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20">
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2 flex justify-center lg:justify-start order-1 lg:order-1"
          >
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-none h-64 sm:h-80 lg:h-96 lg:pt-15">
              <Nutrition />
            </div>
          </motion.div>

          <motion.div className="w-full lg:w-1/2 space-y-8 order-2 lg:order-2">
            <motion.h3 variants={itemVariants} className="text-primary uppercase tracking-widest font-semibold">
              MENGANALISIS GIZI
            </motion.h3>

            {/* Judul Utama */}
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-extrabold text-card-foreground">
              Apa itu Nutrisys?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-muted-foreground max-w-xl">
              NutriSys adalah platform canggih untuk menganalisis dan melacak asupan nutrisi Anda. Kami membantu Anda
              memahami komposisi makanan secara mendalam, dari makro hingga mikro nutrisi, mendukung gaya hidup sehat
              berbasis data.
            </motion.p>

            <motion.ul variants={containerVariants} className="space-y-4 pt-4 text-card-foreground">
              <motion.li variants={itemVariants} className="flex items-start gap-3">
                <Scale className="w-5 h-5 mt-1 text-primary shrink-0" />
                <p>
                  <strong className="font-semibold">Analisis Makronutrien Akurat:</strong> Hitung karbohidrat, protein,
                  dan lemak secara real-time.
                </p>
              </motion.li>

              <motion.li variants={itemVariants} className="flex items-start gap-3">
                <Heart className="w-5 h-5 mt-1 text-primary shrink-0" />
                <p>
                  <strong className="font-semibold">Pelacakan Vitamin & Mineral:</strong> Memastikan Anda mendapatkan
                  semua nutrisi mikro esensial.
                </p>
              </motion.li>

              <motion.li variants={itemVariants} className="flex items-start gap-3">
                <Zap className="w-5 h-5 mt-1 text-primary shrink-0" />
                <p>
                  <strong className="font-semibold">Data Dikelola dengan Baik:</strong> Sumber data gizi terverifikasi
                  dan terus diperbarui.
                </p>
              </motion.li>
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutNutriSys;
