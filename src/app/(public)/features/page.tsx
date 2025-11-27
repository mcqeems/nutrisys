"use client";

import {  motion, Variants } from "framer-motion";
import FeatureSection from "./component/FeatureSection";
import BenefitsSection from "./component/BenefitSection";
import ComparisonTable from "./component/ComparisonTable";
import HowToUseSection from "./component/HowToUse";
import HeroSection from "./component/HeroSection";
import ScrollToTopButton from "@/components/ui/scroll-to-top";

export default function FeaturesPage() {
  
  const scrollVariant: Variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full pt-20 overflow-hidden">
      {/* hero section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <HeroSection />
      </motion.div>

      {/* fitur section */}
      <motion.div
        variants={scrollVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <FeatureSection />
      </motion.div>
      {/* benefit section */}
      <motion.div
        variants={scrollVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <BenefitsSection />
      </motion.div>

      {/* perbandingan section */}
      <motion.div
        variants={scrollVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ComparisonTable />
      </motion.div>
      {/* pemakaian section */}
      <motion.div
        variants={scrollVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <HowToUseSection />
      </motion.div>
    </div>
  );
}
