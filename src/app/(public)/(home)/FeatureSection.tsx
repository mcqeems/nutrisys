'use client';

import React from "react";
import { motion, type Variants } from "framer-motion"; 
import {
  Check,
  Activity,
  Bot,
  BookOpenText,
  Target,
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
    feature: Feature;
  }

  const featuresData: Feature[] = [
    {
      id: 1,
      title: "Analisis Nutrisi",
      description:
        "Teknologi AI yang menganalisis kebutuhan nutrisi Anda secara mendalam dan personal.",
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
      title: "NutriAI Chat",
      description:
        "Membuat percakapan mengenai kesehatan, nutrisi dan sebagainya dengan NutriAI, AI cerdas dari Nutrisys.",
      icon: Bot,
      color: "from-green-500 to-emerald-500",
      details: ["Chatbot", "Artificial Intelligence", "Smart Assistant"],
    },
    {
      id: 3,
      title: "Wellness Journal",
      description:
        "Dokumentasikan perjalanan kesejahteraan anda dengan perjunalan cerdas. Lacak suasanan hati, kebiasaan, dan kemajuan dengan wawasan bertenaga AI.",
      icon: BookOpenText,
      color: "from-purple-500 to-pink-500",
      details: [
        "Pencatatan Suasana Hati",
        "Pelacakan Kebiasaan",
        "AI Integrated",
      ],
    },
    {
      id: 4,
      title: "Smart Target",
      description:
        "Tetapkan, lacak, da capai tujuan kesehatan anda secara cerdas. Dapatkan pemberitahuan cerdas dari target anda.",
      icon: Target,
      color: "from-orange-500 to-red-500",
      details: ["Penetapan Tujuan", "Pelacakan Kemajuan", "Smart Reminder"],
    },
  ];

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const containerVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
    const Icon = feature.icon;

    return (
      <motion.div
        key={feature.id}
        className="group relative"
        variants={cardVariants}
      >
        <div className="relative p-8 bg-card rounded-2xl border border-border lg:hover:border-primary transition-all duration-500 h-full overflow-hidden">
          <div className="absolute inset-0 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-primary/5 to-transparent rounded-2xl"></div>

          <div className="relative flex flex-col h-full">
            {/* Icon Container */}
            <div className="inline-flex mb-2">
              <div
                className={`p-3 bg-linear-to-br ${feature.color} rounded-xl text-white shadow-lg lg:group-hover:shadow-2xl transition-all duration-500 lg:group-hover:scale-110`}
              >
                <Icon className="w-6 h-6" />
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-foreground lg:group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Details List */}
            <ul className="space-y-2 pt-4 border-t border-border/50 mt-auto">
              {feature.details.map((detail, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-muted-foreground lg:group-hover:text-foreground transition-colors duration-300"
                >
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          {/* Arrow indicator */}
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-10 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          {featuresData.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
