"use client";

import Link from "next/link";
import Image from "next/image";

interface ComplementaryFeatureCardProps {
  feature: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    icon: string;
  };
}

export function ComplementaryFeatureCard({
  feature,
}: ComplementaryFeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card border border-border/40 transition-all duration-500 hover:shadow-2xl hover:border-primary/50 h-full">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative p-8 h-full flex flex-col">
        <div className="mb-4">
          <div className="text-5xl mb-4">{feature.icon}</div>
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {feature.title}
          </h3>
        </div>

        <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
          {feature.description}
        </p>

        <div className="relative mb-6 rounded-xl overflow-hidden bg-linear-to-br from-primary/20 to-primary/5 aspect-video transition-all duration-500 group-hover:scale-105">
          <Image
            src={feature.imageUrl || "/placeholder.svg"}
            alt={feature.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"></div>
        </div>
        <Link href="/login" className="block">
          <button className="w-full py-3 rounded-lg font-semibold bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform group-hover:scale-105 active:scale-95">
            Explore {feature.title}
          </button>
        </Link>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  );
}
