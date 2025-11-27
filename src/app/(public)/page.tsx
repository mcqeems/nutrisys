'use client'

import { useState, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ChevronUp } from "lucide-react";
import CTASection from "./(home)/CTASection";
import HeroSection from "./(home)/HeroSection";
import Testimonials from "./(home)/Testimonials";
import WhyNutriSys from "./(home)/WhySection";
import FaqSection from "./(home)/FaqSection";

function home() {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined" && window.scrollY > 300) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  };

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
      <AnimatePresence>
        {showScrollTopButton && (
          <motion.button
            onClick={scrollToTop}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover="hover"
            className="fixed bottom-10 right-10 p-4 bg-white text-primary border border-primary/20 rounded-full shadow-2xl hover:bg-primary hover:text-white transition-all duration-300 z-50 focus:outline-none focus:ring-4 focus:ring-primary/50"
            aria-label="Scroll back to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
export default home;
