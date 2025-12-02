"use client";

import { useState } from "react";

import { MainFeatureCard } from "./MainFeatureCard";
import { ComplementaryFeatureCard } from "./ComplementaryFeatureCard";
import { HeroSection } from "./HeroSection";

const mainFeatures = [
  {
    id: 1,
    title: "Asisten Chat AI",
    description:
      "Pelatih kesehatan pribadi Anda tersedia 24/7. Dapatkan saran yang dipersonalisasi dan jawaban instan untuk semua pertanyaan kesehatan Anda.",
    videoUrl: "/ai-chat-health-assistant-interactive-conversation.jpg",
    icon: "💬",
    benefits: ["Tersedia 24/7", "Saran Personal", "Dukungan Real-time"],
  },
  {
    id: 2,
    title: "Analisis Nutrisi",
    description:
      "Lacak dan analisis nutrisi Anda dengan wawasan bertenaga AI. Dapatkan rincian mendetail tentang makro, mikro, dan rekomendasi diet.",
    videoUrl: "/nutrition-analysis-tracking-macros.jpg",
    icon: "🥗",
    benefits: ["Pelacakan Makro", "Analisis AI", "Rekomendasi Diet"],
  },
  {
    id: 3,
    title: "Wellness Journal",
    description:
      "Dokumentasikan perjalanan kesejahteraan Anda dengan penjurnalan cerdas. Lacak suasana hati, kebiasaan, dan kemajuan dengan wawasan bertenaga AI.",
    videoUrl: "/wellness-journal-habit-tracking.jpg",
    icon: "📔",
    benefits: [
      "Pelacakan Kebiasaan",
      "Pencatatan Suasana Hati",
      "Analitik Kemajuan",
    ],
  },
  {
    id: 4,
    title: "Target Cerdas",
    description:
      "Tetapkan, lacak, dan capai tujuan kesehatan Anda dengan panduan AI. Dapatkan rekomendasi adaptif berdasarkan kemajuan Anda.",
    videoUrl: "/fitness-goals-tracking-achievement.jpg",
    icon: "🎯",
    benefits: ["Penetapan Tujuan", "Pelacakan Kemajuan", "Panduan AI"],
  },
];

const complementaryFeatures = [
  {
    id: 5,
    title: "Notifikasi Cerdas",
    description:
      "Tetap termotivasi dengan pengingat dan pembaruan cerdas yang disesuaikan dengan jadwal dan preferensi Anda.",
    imageUrl: "/Logo/nutrisys.webp",
    icon: "🔔",
  },
  {
    id: 6,
    title: "Personalisasi",
    description:
      "Semuanya beradaptasi dengan Anda. Platform kami mempelajari preferensi Anda dan memberikan pengalaman yang dipersonalisasi.",
    imageUrl: "/personalization-user-preferences-customization.jpg",
    icon: "✨",
  },
];

export function FeatureShowcase() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="w-full">
      <HeroSection />

      {/* Bagian Fitur Utama */}
      <section
        id="features"
        className="pb-20 px-4 bg-linear-to-b from-background via-background to-background"
      >
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {mainFeatures.map((feature) => (
              <MainFeatureCard
                key={feature.id}
                feature={feature}
                isHovered={hoveredFeature === feature.id}
                onHover={() => setHoveredFeature(feature.id)}
                onLeave={() => setHoveredFeature(null)}
              />
            ))}
          </div>

          {/* Fitur Pelengkap */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-3">
                Pengalaman yang Ditingkatkan
              </h3>
              <p className="text-muted-foreground text-lg">
                Fitur yang membuat segalanya bekerja lebih baik untuk Anda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {complementaryFeatures.map((feature) => (
                <ComplementaryFeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
