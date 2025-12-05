"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const heroImageDesktop = "/Background/hero-nutrition.webp";
const heroImageMobile = "/Background/hero-nutrition-horizontal.webp";

export default function HeroTentang() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-background/10 via-background/10 to-background z-10" />
        <img
          src={heroImageDesktop}
          alt="Nutrition Hero Desktop"
          className="w-full h-full object-cover opacity-20 max-sm:hidden"
        />
        <img
          src={heroImageMobile}
          alt="Nutrition Hero Mobile"
          className="w-full h-full object-cover opacity-20 sm:hidden"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 text-center max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-8xl font-bold font-headline mb-6 text-primary to-accent bg-clip-text ">
            Tentang Nutrisys
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        >
          Mengubah cara Anda memahami nutrisi dengan teknologi analisis canggih
          dan pendekatan personal untuk kesehatan optimal
        </motion.p>
      </motion.div>
    </section>
  );
}
