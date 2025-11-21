import React, { useState } from "react";
import {
  Check,
  ArrowRight,
  Activity,
  Leaf,
  Users,
  BarChart3,
  Bell,
  Lock,
  LucideIcon,
} from "lucide-react";

export default function FeatureSection() {

  interface Feature {
    id: number;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string; 
    details: string[];
  }

 
  interface FeatureCardProps {
    feature: Feature & {
      onMouseEnter: () => void;
      onMouseLeave: () => void;
    };
    style?: React.CSSProperties;
  }


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

  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const FeatureCard: React.FC<FeatureCardProps> = ({ feature, style }) => {
    const Icon = feature.icon;

    return (
      <div
        key={feature.id}
        className="group relative animate-fade-in-up cursor-pointer"
        style={style}
        onMouseEnter={feature.onMouseEnter}
        onMouseLeave={feature.onMouseLeave}
      >
        <div className="relative p-8 bg-card rounded-2xl border border-border hover:border-primary transition-all duration-500 h-full overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-primary/5 to-transparent rounded-2xl"></div>

          <div className="relative space-y-6">
            {/* Icon Container */}
            <div className="inline-flex">
              <div
                className={`p-3 bg-linear-to-br ${feature.color} rounded-xl text-white shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110`}
              >
                <Icon className="w-6 h-6" />
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Details List */}
            <ul className="space-y-2 pt-4 border-t border-border/50">
              {feature.details.map((detail, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                >
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>

            {/* Arrow indicator */}
            <div className="pt-2 flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
              <span className="text-sm font-semibold">Pelajari lebih</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    );
  };


  return (
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
  );
}
