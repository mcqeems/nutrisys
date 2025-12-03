'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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

export function MainFeatureCard({ feature, isHovered, onHover, onLeave }: MainFeatureCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="group relative overflow-hidden rounded-2xl bg-card border border-border/40 transition-all duration-500  hover:shadow-2xl hover:border-primary/50"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="w-14 h-14 rounded-lg bg-linear-to-br from-primary to-primary/60 flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <feature.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {feature.title}
            </h3>
          </div>
          <Link href={feature.link}>
            <div className="text-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-0 group-hover:translate-y-2">
              <ArrowRight />
            </div>
          </Link>
        </div>

        <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>

        {/* Video Placeholder */}
        <div
          className={`relative mb-6 rounded-xl overflow-hidden bg-linear-to-br from-primary/20 to-primary/5 aspect-video transition-all duration-500 ${
            isHovered ? 'scale-105 shadow-lg' : ''
          }`}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <Image src={feature.videoUrl || '/placeholder.svg'} alt={feature.title} fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap gap-2">
          {feature.benefits.map((benefit, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300"
            >
              {benefit}
            </span>
          ))}
        </div>

        <div className="mt-6 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <Link href={feature.link}>
            <button className="w-full py-3 rounded-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer">
              Coba {feature.title}
            </button>
          </Link>
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </motion.div>
  );
}
