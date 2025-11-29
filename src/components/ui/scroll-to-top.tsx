// ScrollToTopButton.js (Disesuaikan)

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ChevronUp } from "lucide-react";

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

const ScrollToTopButton = ({ isHorizontal = false }) => {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 400) {
      setShowScrollTopButton(true);
    } else {
      setShowScrollTopButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const baseClasses =
    "p-5 bg-primary text-white border border-primary/20 rounded-full shadow-2xl hover:bg-primary/90 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/50 cursor-pointer";

  return (
    <AnimatePresence>
      {showScrollTopButton && (
        <motion.button
          onClick={scrollToTop}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover="hover"
          className={baseClasses}
          aria-label="Scroll back to top"
        >
          <ChevronUp className="w-7 h-7" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
