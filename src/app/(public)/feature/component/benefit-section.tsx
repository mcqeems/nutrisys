// components/sections/BenefitsSection.tsx
"use client";

import { useState } from "react";

const benefits: string[] = [
  // Tipe string[]
  "Hemat waktu dengan tracking otomatis",
  "Tingkatkan kesehatan dengan insight berbasis data",
  "Motivasi berkelanjutan dengan progress tracking",
  "Komunitas support yang peduli",
];

export default function BenefitsSection() {
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground animate-fade-in-up">
            Keuntungan Menggunakan NutriSys
          </h2>
          <p
            className="text-lg text-muted-foreground animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Transformasi nyata dimulai dari keputusan kecil hari ini
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative p-8 bg-background rounded-xl border border-border hover:border-primary transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredBenefit(index)}
              onMouseLeave={() => setHoveredBenefit(null)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold transition-all duration-300 ${
                    hoveredBenefit === index ? "scale-125" : "scale-100"
                  }`}
                >
                  {index + 1}
                </div>
                <p
                  className={`text-lg font-semibold transition-all duration-300 ${
                    hoveredBenefit === index
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {benefit}
                </p>
              </div>

              {/* Background animation on hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-linear-to-r from-primary via-primary to-transparent rounded-xl`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
