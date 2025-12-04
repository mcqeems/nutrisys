"use client";

import Link from "next/link";
// Import Image dihapus karena kita menggunakan iframe
import { motion, Variants } from "framer-motion"; // Import motion dan Variants untuk animasi

interface ComplementaryFeatureCardProps {
  feature: {
    id: number;
    title: string;
    description: string;
    videoUrl: string; 
    link: string;
    icon: React.ElementType;
  };
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export function ComplementaryFeatureCard({
  feature,
  isHovered,
  onHover,
  onLeave, 
}: ComplementaryFeatureCardProps) {
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${feature.videoUrl}`;

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-card border border-border/40 transition-all duration-500 hover:shadow-2xl hover:border-primary/50 h-full flex flex-col"
      onMouseEnter={onHover} 
      onMouseLeave={onLeave} 
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative p-8 h-full flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <div className="w-14 h-14 rounded-lg bg-linear-to-br from-primary to-primary/60 flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
            <feature.icon className="w-7 h-7 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {feature.title}
          </h3>
        </div>

        <p className="text-muted-foreground mb-6 grow leading-relaxed">
          {feature.description}
        </p>
        <div
          className={`relative mb-4 rounded-xl overflow-hidden bg-black aspect-video transition-all duration-500 group-hover:scale-105 shadow-xl`}
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
        </div>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className={`overflow-hidden ${isHovered ? "mb-6" : "mb-0"}`}
        >
          <div className="flex items-center p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 dark:text-yellow-400">
            <div className="mr-3 text-xl">⚠️</div>
            <p className="text-sm font-medium">
              Untuk pengalaman visual terbaik, pastikan Anda
              memakai resolusi  tertinggi
            </p>
          </div>
        </motion.div>

        {/* Tombol Link */}
        <Link href={feature.link} className="block mt-auto">
          <button className="w-full py-3 rounded-lg font-semibold bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform group-hover:scale-105 active:scale-95 cursor-pointer">
            Jelajahi {feature.title}
          </button>
        </Link>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  );
}
