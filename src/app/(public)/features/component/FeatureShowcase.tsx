"use client";

import { useState } from "react";

import { MainFeatureCard } from "./MainFeatureCard";
import { ComplementaryFeatureCard } from "./ComplementaryFeatureCard";
import { HeroSection } from "./HeroSection";
import {
  Activity,
  Bell,
  BookOpenText,
  Bot,
  Target,
  WandSparkles,
  ClipboardList, 
} from "lucide-react";

const mainFeatures = [
  {
    id: 1,
    title: "NutriAI Chat",
    description:
      "Pelatih kesehatan pribadi Anda tersedia 24 Jam. Dapatkan saran yang dipersonalisasi dan jawaban instan untuk semua pertanyaan kesehatan Anda.",
    videoUrl: "hz12zXne60s",
    link: "chatbot",
    icon: Bot,
    benefits: ["Tersedia 24 Jam", "Saran Personal", "Dukungan Real-time"],
  },
  {
    id: 2,
    title: "Analisis Nutrisi",
    description:
      "Lacak dan analisis nutrisi Anda dengan wawasan bertenaga AI. Dapatkan rincian mendetail tentang makro, mikro, dan rekomendasi diet.",
    videoUrl: "AamwCkUCu4I",
    link: "/analyze",
    icon: Activity,
    benefits: ["Pelacakan Makro", "Analisis AI", "Rekomendasi Diet"],
  },
  {
    id: 3,
    title: "Wellness Journal",
    description:
      "Dokumentasikan perjalanan kesejahteraan Anda dengan penjurnalan cerdas. Lacak suasana hati, kebiasaan, dan kemajuan dengan wawasan bertenaga AI.",
    videoUrl: "419_Iu9mle0",
    link: "journal",
    icon: BookOpenText,
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
    videoUrl: "ro68GbusR7o",
    link: "target",
    icon: Target,
    benefits: ["Penetapan Tujuan", "Pelacakan Kemajuan", "Panduan AI"],
  },
];

const complementaryFeatures = [
  {
    id: 5,
    title: "Notifikasi Cerdas",
    description:
      "Tetap termotivasi dengan pengingat dan pembaruan cerdas yang disesuaikan dengan jadwal dan preferensi Anda.",
    videoUrl: "pBPclUZuYls",
    link: "notifications",
    icon: Bell,
  },
  {
    id: 6,
    title: "Personalisasi",
    description:
      "Semuanya beradaptasi dengan Anda. Platform kami mempelajari preferensi Anda dan memberikan pengalaman yang dipersonalisasi.",
    videoUrl: "gZzvlmveYsE",
    link: "user",
    icon: WandSparkles,
  },
  {
    id: 7,
    title: "Smart Summary Analysis",
    description:
      "Merangkum keseluruhan menggunakan teknologi AI dari fitur-fitur yang telah dipakai oleh para pengguna.",
    videoUrl: "YI25jDCSYtk",
    link: "dashboard",
    icon: ClipboardList,
  },
];

export function FeatureShowcase() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="w-full">
      <HeroSection />
      {/* main feature  */}
      <section
        id="features"
        className="pb-20 px-4 bg-linear-to-b from-background via-background to-background"
      >
        <div className="max-w-7xl mx-auto">
          {/* Main Features: 2 kolom */}
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

          {/* sekunder feature */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-3">
                Pengalaman yang Ditingkatkan
              </h3>
              <p className="text-muted-foreground text-lg">
                Fitur yang membuat segalanya bekerja lebih baik untuk Anda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {complementaryFeatures.map((feature) => (
                <ComplementaryFeatureCard
                  key={feature.id}
                  feature={feature}
                  isHovered={hoveredFeature === feature.id}
                  onHover={() => setHoveredFeature(feature.id)}
                  onLeave={() => setHoveredFeature(null)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
