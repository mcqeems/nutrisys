"use client";

import {  motion, Variants } from "framer-motion";
import FeatureSection from "../(home)/FeatureSection";
import BenefitsSection from "./component/BenefitSection";
import ComparisonTable from "../(home)/ComparisonTable";
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
      <HeroSection />


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
