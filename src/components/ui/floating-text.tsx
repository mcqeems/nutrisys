"use client";

import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";

interface FloatingCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
}

export function FloatingText({
  icon = <Star className="h-5 w-5" />,
  title = "Floating Card",
}: FloatingCardProps) {
  const floatingVariants: Variants = {
    animate: {
      y: [-20, 20, -20],
      x: [-15, 15, -15],
      transition: {
        duration: 6,
        ease: "easeInOut", 
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  return (
    <div className={`p-4`}>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute p-3 bg-card border border-border rounded-lg shadow-lg flex items-center gap-2"
      >
        <div className="text-primary">{icon}</div>
        <span className="text-sm font-medium text-foreground whitespace-nowrap">
          {title}
        </span>
      </motion.div>
    </div>
  );
}
