// app/(public)/feature/page.tsx
"use client";

import { useState } from "react";
import {
  Activity,
  Leaf,
  Users,
  BarChart3,
  Bell,
  Lock,
  Zap,
} from "lucide-react";

// Import tipe dan komponen
import { Feature } from "./type-data";
import FeatureCard from "./component/feature-card";
import BenefitsSection from "./component/benefit-section";
import ComparisonTable from "./component/comparison-table";
import HowToUseSection from "./component/how-to-us";

// Menggunakan tipe Feature untuk data
const featuresData: Feature[] = [
  {
    id: 1,
    title: "Analisis Nutrisi AI",
    description:
      "Teknologi machine learning menganalisis kebutuhan nutrisi Anda secara mendalam dan personal",
    icon: Activity,
    color: "from-blue-500 to-cyan-500",
    details: [
      "Scan nutrisi real-time",
      "Rekomendasi otomatis",
      "Tracking akurat",
    ],
  },
  {
    id: 2,
    title: "Database Makanan Lengkap",
    description:
      "Lebih dari 500,000 jenis makanan dengan informasi gizi detail dan akurat",
    icon: Leaf,
    color: "from-green-500 to-emerald-500",
    details: [
      "Makanan lokal & internasional",
      "Update berkala",
      "Kalori presisi",
    ],
  },
  {
    id: 3,
    title: "Konsultasi Ahli",
    description:
      "Akses terbatas ke ahli gizi profesional untuk konsultasi dan panduan personal",
    icon: Users,
    color: "from-purple-500 to-pink-500",
    details: ["Chat dengan ahli", "Video konsultasi", "Rencana custom"],
  },
  {
    id: 4,
    title: "Laporan & Analytics",
    description:
      "Visualisasi data komprehensif tentang kemajuan dan tren kesehatan Anda",
    icon: BarChart3,
    color: "from-orange-500 to-red-500",
    details: ["Grafik interaktif", "Export laporan", "Insight mingguan"],
  },
  {
    id: 5,
    title: "Notifikasi Pintar",
    description:
      "Pengingat minum air, makan snack sehat, dan aktivitas fisik di waktu yang tepat",
    icon: Bell,
    color: "from-indigo-500 to-blue-500",
    details: ["Reminder personal", "Jadwal fleksibel", "Push notification"],
  },
  {
    id: 6,
    title: "Keamanan Data",
    description:
      "Enkripsi end-to-end dan compliance dengan standar internasional untuk privasi Anda",
    icon: Lock,
    color: "from-teal-500 to-cyan-500",
    details: ["Enkripsi 256-bit", "GDPR compliant", "Backup otomatis"],
  },
];

export default function FeaturesPage() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <div className="w-full overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-background via-background to-background overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary opacity-8 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute -bottom-20 left-10 w-72 h-72 bg-primary opacity-5 rounded-full mix-blend-multiply filter blur-3xl animation-delay-4000"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium animate-fade-in-up">
            <Zap className="w-4 h-4" />
            Fitur-Fitur Unggulan
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Semua Alat yang Anda Butuhkan untuk Sukses
          </h1>

          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Fitur-fitur canggih yang dirancang untuk membuat perjalanan nutrisi
            Anda menjadi mudah, efektif, dan menyenangkan
          </p>
        </div>
      </section>

      {/* 2. Main Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresData.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={{
                  ...feature,
                  onMouseEnter: () => setActiveFeature(feature.id),
                  onMouseLeave: () => setActiveFeature(null),
                }}
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Benefits Section */}
      <BenefitsSection />

      {/* 4. Comparison Table */}
      <ComparisonTable />

      {/* 5. How To Use Section */}
      <HowToUseSection />
    </div>
  );
}
