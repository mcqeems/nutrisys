"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion"; 

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
      className="group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-500 lg:hover:shadow-2xl lg:hover:border-primary/50 h-full flex flex-col"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative p-8 h-full flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <div className="w-14 h-14 rounded-lg bg-linear-to-br from-primary to-primary/60 flex items-center justify-center mb-4 shadow-lg lg:group-hover:shadow-xl transition-shadow duration-300">
            <feature.icon className="w-7 h-7 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-bold text-foreground lg:group-hover:text-primary transition-colors duration-300">
            {feature.title}
          </h3>
        </div>

        <p className="text-muted-foreground mb-6 grow leading-relaxed">
          {feature.description}
        </p>

        {/* Kontainer Video */}
        <div
          className={`relative mb-4 rounded-xl overflow-hidden bg-black aspect-video transition-all duration-500 lg:group-hover:scale-105 shadow-xl`}
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
              <p className="text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                Pastikan Anda memakai resolusi
                tertinggi
              </p>
            </div>
          </motion.div>
        </div>

        <Link href={feature.link} className="block mt-auto">
          <button className="w-full py-3 rounded-lg font-semibold bg-primary/10 text-primary border border-primary/20 lg:hover:bg-primary lg:hover:text-primary-foreground transition-all duration-300 transform group-hover:scale-105 active:scale-95 cursor-pointer">
            Jelajahi {feature.title}
          </button>
        </Link>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  );
}
