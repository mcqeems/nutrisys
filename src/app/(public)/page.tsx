'use client'

import { useState, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ChevronUp } from "lucide-react";
import CTASection from "./(home)/CTASection";
import HeroSection from "./(home)/HeroSection";
import Testimonials from "./(home)/Testimonials";
import WhyNutriSys from "./(home)/WhySection";
import FaqSection from "./(home)/FaqSection";
import ScrollToTopButton from "@/components/ui/scroll-to-top";

function home() {
  const scrollVariant: Variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <HeroSection />
      </motion.div>
      <motion.div
        variants={scrollVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <WhyNutriSys />
      </motion.div>
      <motion.div
        variants={scrollVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <Testimonials />
      </motion.div>
      <motion.div
        variants={scrollVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <FaqSection />
      </motion.div>
      <motion.div
        variants={scrollVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <CTASection />
      </motion.div>
    </div>
  );
}
export default home;
