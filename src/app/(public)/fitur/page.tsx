"use client";

import { useState } from "react";

import FeatureCard from "./component/FeatureCard";
import BenefitsSection from "./component/BenefitSection";
import ComparisonTable from "./component/ComparisonTable";
import HowToUseSection from "./component/HowToUse";
import { motion } from "framer-motion";
import HeroSection from "./component/HeroSection";

export default function FeaturesPage() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <div className="w-full pt-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Main Features Grid */}
       <FeatureCard />

        {/* 3. Benefits Section */}
        <BenefitsSection />

        {/* 4. Comparison Table */}
        <ComparisonTable />

        {/* 5. How To Use Section */}
        <HowToUseSection />
      </motion.div>
    </div>
  );
}
