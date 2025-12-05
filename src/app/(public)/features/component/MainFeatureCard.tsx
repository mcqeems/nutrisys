"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface MainFeatureCardProps {
  feature: {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    icon: React.ElementType;
    link: string;
    benefits: string[];
  };
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
    },
  },
};

export function MainFeatureCard({
  feature,
  isHovered,
  onHover,
  onLeave,
}: MainFeatureCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const youtubeEmbedUrl = `https://www.youtube.com/embed/${feature.videoUrl}`;

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border/40 transition-all duration-500  lg:hover:shadow-2xl lg:hover:border-primary/50"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="w-14 h-14 rounded-lg bg-linear-to-br from-primary to-primary/60 flex items-center justify-center mb-3 shadow-lg lg:group-hover:shadow-xl transition-shadow duration-300">
              <feature.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground lg:group-hover:text-primary transition-colors duration-300">
              {feature.title}
            </h3>
          </div>
          <Link href={feature.link}>
            <div className="text-3xl opacity-0 lg:group-hover:opacity-100 transition-all duration-300 translate-y-0 lg:group-hover:translate-y-2">
              <ArrowRight />
            </div>
          </Link>
        </div>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          {feature.description}
        </p>

        {/* Kontainer Video */}
        <div
          className={`relative mb-4 rounded-xl overflow-hidden bg-black aspect-video transition-all duration-500 ${
            isHovered ? "scale-105 shadow-lg" : ""
          }`}
        >
          <iframe
            className="w-full h-full"
            src={youtubeEmbedUrl}
            title={`Video demo ${feature.title}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            key={feature.videoUrl}
          ></iframe>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 bottom-12 left-3 right-3 p-1"
          >
            <div className="flex items-center p-2 rounded-lg bg-yellow-900/90 backdrop-blur-sm border border-yellow-500/40 text-white shadow-xl max-w-full">
              <div className="mr-2 text-base">⚠️</div>
              <p className="text-xs font-medium **whitespace-nowrap overflow-hidden text-ellipsis**">
                Untuk pengalaman visual terbaik, pastikan memakai kualitas
                tertinggi.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Benefit Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {feature.benefits.map((benefit, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 lg:group-hover:bg-primary/20 transition-colors duration-300"
            >
              {benefit}
            </span>
          ))}
        </div>

        {/* Button */}
        <div className="mt-6 translate-y-4 lg:group-hover:translate-y-0 transition-all duration-300">
          <Link href={feature.link}>
            <button className="w-full py-3 rounded-lg font-semibold bg-primary text-primary-foreground lg:hover:bg-primary/90 transition-all duration-300 transform lg:hover:scale-105 active:scale-95 cursor-pointer">
              Coba {feature.title}
            </button>
          </Link>
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 lg:group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </motion.div>
  );
}
