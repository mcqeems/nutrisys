"use client";

import { motion, type Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Brain, Shield, Zap, Users, LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
}

const features: Feature[] = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Analisis nutrisi yang didukung oleh kecerdasan buatan untuk rekomendasi yang akurat dan personal.",
    gradient: "from-primary/20 to-accent/20",
    iconColor: "text-primary",
  },
  {
    icon: Shield,
    title: "Data Aman & Privasi",
    description:
      "Keamanan data Anda adalah tanggung jawab dan prioritas utama kami dengan enkripsi end-to-end.",
    gradient: "from-chart-2/20 to-chart-1/20",
    iconColor: "text-chart-2",
  },
  {
    icon: Zap,
    title: "Real-time Tracking",
    description:
      "Pantau asupan nutrisi Anda secara real-time dengan dashboard interaktif yang mudah dipahami.",
    gradient: "from-chart-4/20 to-chart-5/20",
    iconColor: "text-chart-4",
  },
  {
    icon: Users,
    title: "Komunitas Aktif",
    description:
      "Bergabung dengan pengguna lainnya yang berkomitmen untuk hidup lebih sehat dan teratur.",
    gradient: "from-chart-3/20 to-primary/20",
    iconColor: "text-chart-3",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const WhyNutriSys = () => {
  return (
    <motion.section
      className="relative py-24 px-4 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Mengapa{" "}
            <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Nutrisys ?
            </span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Platform nutrisi terlengkap dengan teknologi terdepan untuk
            kesehatan optimal Anda
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={cardVariants}>
                <Card className="group relative overflow-hidden backdrop-blur-sm bg-card/50 border-2 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 ">
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative p-8">
                    {/* Icon Container */}
                    <div className="mb-6 relative">
                      <div
                        className={`inline-flex p-4 rounded-2xl bg-linear-to-br ${feature.gradient} group-hover:scale-110 transition-transform duration-500`}
                      >
                        <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Hover Effect Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default WhyNutriSys;
