"use client";

import { motion, Variants } from "framer-motion";
import { Check, Heart, Scale, Zap } from "lucide-react";
import Nutrition from "./Nutrition"; // Asumsi ini adalah komponen visualisasi (Lottie)

interface AboutNutriSysProps {
  scrollVariant: Variants;
}

const AboutNutriSys: React.FC<AboutNutriSysProps> = ({ scrollVariant }) => {
  return (
    <motion.section
      variants={scrollVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative py-16 sm:py-24 bg-background text-foreground"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row **lg:items-center** gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start order-1 lg:order-1">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-none h-64 sm:h-80 lg:h-96 lg:pt-15">
              <Nutrition />
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-8 order-2 lg:order-2">
            <h3 className="text-primary uppercase tracking-widest font-semibold">
              MENGANALISIS GIZI
            </h3>

            {/* Judul Utama */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-card-foreground">
              Apa itu NutriSys?
            </h2>
            <p className="text-muted-foreground max-w-xl">
              NutriSys adalah platform canggih untuk menganalisis dan melacak
              asupan nutrisi Anda. Kami membantu Anda memahami komposisi makanan
              secara mendalam, dari makro hingga mikro nutrisi, mendukung gaya
              hidup sehat berbasis data.
            </p>

            {/* Daftar Poin Kunci */}
            <ul className="space-y-4 pt-4 text-card-foreground">
              <li className="flex items-start gap-3">
                <Scale className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                <p>
                  <strong className="font-semibold">
                    Analisis Makronutrien Akurat:
                  </strong>{" "}
                  Hitung karbohidrat, protein, dan lemak secara *real-time*.
                </p>
              </li>

              <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                <p>
                  <strong className="font-semibold">
                    Pelacakan Vitamin & Mineral:
                  </strong>{" "}
                  Memastikan Anda mendapatkan semua nutrisi mikro esensial.
                </p>
              </li>

              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                <p>
                  <strong className="font-semibold">
                    Data Dikelola dengan Baik:
                  </strong>{" "}
                  Sumber data gizi terverifikasi dan terus diperbarui.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutNutriSys;
