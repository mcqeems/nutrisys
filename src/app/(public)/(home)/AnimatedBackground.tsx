import React from "react";
import { motion, Transition } from "framer-motion";
import {
  BookOpen,
  Heart,
  Users,
  Lightbulb,
  Star,
  Leaf,
  Apple,
  Utensils,
} from "lucide-react";

export function AnimatedBackground() {
  const BACKGROUND_IMAGE_URL = "/Background/bg_2.webp";

  const floatingIcons = [
    { Icon: Leaf, size: 20, delay: 0, initial: "bottom-1/4 left-1/4" },
    { Icon: Heart, size: 18, delay: 1.2, initial: "top-1/3 left-1/5" },
    { Icon: Apple, size: 16, delay: 0.6, initial: "bottom-1/3 right-1/4" },
    { Icon: Utensils, size: 14, delay: 2.1, initial: "top-1/4 right-1/4" },
    { Icon: Star, size: 12, delay: 0.9, initial: "top-1/2 left-1/2" },
    { Icon: BookOpen, size: 20, delay: 3, initial: "top-[10%] left-[10%]" },
    {
      Icon: Lightbulb,
      size: 18,
      delay: 1.5,
      initial: "bottom-[10%] right-[10%]",
    },
    { Icon: Users, size: 16, delay: 2.5, initial: "top-[40%] right-[20%]" },
  ];

  const getFloatAnimation = (
    yRange: number,
    xRange: number,
    duration: number,
    delay: number
  ) => ({
    y: [0, yRange / 2, yRange, yRange / 2, 0],
    x: [0, xRange, 0, -xRange, 0],
    opacity: [0.5, 1, 1, 1, 0.5],
    scale: [1, 1.05, 1.1, 1.05, 1],
    transition: {
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    } as Transition,
  });

  const getIconAnimation = (
    yRange: number,
    xRange: number,
    duration: number,
    delay: number,
    rotation: number
  ) => ({
    y: [0, yRange],
    x: [0, xRange / 2, xRange, xRange / 2, 0],
    rotate: [0, rotation / 4, rotation / 2, rotation / 4, 0],
    opacity: [0.3, 0.8, 0.8, 0.8, 0.3],
    transition: {
      duration: duration,
      repeat: Infinity,
      ease: "linear",
      delay: delay,
      repeatType: "reverse" as const,
    } as Transition,
  });

  const smallDotAnim1 = getFloatAnimation(5, -5, 5, 5);
  const smallDotAnim2 = getFloatAnimation(60, -15, 6, 1);
  const smallDotAnim3 = getFloatAnimation(-45, 25, 5.5, 0.5);
  const smallDotAnim4 = getFloatAnimation(55, -18, 6.5, 2);

  const emojiAnim1 = getFloatAnimation(-70, 30, 7, 0.4);
  const emojiAnim2 = getFloatAnimation(65, -28, 6.5, 1.6);
  const emojiAnim3 = getFloatAnimation(-55, 22, 5.8, 0.9);
  const emojiAnim4 = getFloatAnimation(5, -5, 5, 5);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-auto bg-repeat"
        style={{
          backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
          backgroundColor: "var(--background)",
        }}
      >
        <div className="absolute inset-0 bg-white/75 dark:bg-background/90" />
      </div>

      <motion.div
        className="absolute -top-20 -left-40 h-[24rem] w-[24rem] rounded-full blur-3xl bg-primary/50 hidden lg:block" 
        animate={{
          x: [0, 60, 0],
          y: [0, 80, 0],
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -right-20 h-[30rem] w-[30rem] rounded-full blur-3xl bg-accent/30" 
        animate={{
          x: [0, -70, 0],
          y: [0, -90, 0],
          scale: [1.1, 1, 1.1],
          opacity: [0.6, 0.4, 0.6],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-1/4 right-0 h-80 w-80 rounded-full blur-2xl bg-primary/40"
        animate={{
          x: [0, -40, 0],
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-0 h-64 w-64 rounded-full blur-xl bg-accent/25" // <-- Diganti ke Accent/25
        animate={{
          y: [0, -50, 0],
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />

      <motion.div
        className="absolute top-[15%] left-[20%] h-3 w-3 rounded-full bg-primary/60" // <-- Opasitas Ditingkatkan (60%)
        animate={smallDotAnim1}
      />
      <motion.div
        className="absolute top-[45%] right-[30%] h-2 w-2 rounded-full bg-primary/70" // <-- Opasitas Ditingkatkan (70%)
        animate={smallDotAnim2}
      />
      <motion.div
        className="absolute bottom-[20%] right-[35%] h-2.5 w-2.5 rounded-full bg-accent/40" // <-- Warna Accent
        animate={smallDotAnim3}
      />
      <motion.div
        className="absolute bottom-[40%] left-[10%] h-2 w-2 rounded-full bg-accent/35" // <-- Warna Accent
        animate={smallDotAnim4}
      />

      {floatingIcons.map(({ Icon, size, delay, initial }, index) => (
        <motion.div
          key={index}
          className={`absolute ${
            index % 2 === 0 ? "text-primary/60" : "text-accent/50"
          } ${initial}`}
          animate={getIconAnimation(
            50,
            15 + index * 2,
            7 + index * 0.5,
            delay,
            360
          )}
        >
          <Icon size={size} />
        </motion.div>
      ))}

      <motion.div
        className="absolute top-1/5 left-1/5 text-3xl" 
        animate={emojiAnim1}
      >
        
      </motion.div>
      <motion.div
        className="absolute bottom-1/5 right-1/5 text-2xl" 
        animate={emojiAnim2}
      >
        
      </motion.div>
      <motion.div
        className="absolute top-1/2 right-1/4 text-xl" 
        animate={emojiAnim3}
      >
        
      </motion.div>
      <motion.div
        className="absolute bottom-1/8 left-1/8 text-lg" // <-- Posisi Baru
        animate={emojiAnim4}
      >
        💧
      </motion.div>
    </div>
  );
}

export default AnimatedBackground;
