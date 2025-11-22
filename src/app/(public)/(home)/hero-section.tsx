"use client";
import { Leaf, Apple, ChevronRight, Scale, Clock } from "lucide-react";
import { FloatingText } from "@/components/ui/floating-text";
import TextType from "@/components/TextType";
import Image from "next/image";

const HEALTH_MODEL_URL = "/Logo/nutrisys.webp";

const HeroSection = () => {
  return (
    <div
      className="min-h-screen text-foreground relative flex items-center justify-center 
      bg-[url('/Background/bg_2.webp')] bg-cover bg-center filter 
      dark:bg-black dark:filter-none dark:blur-0"
    >
      <div className="absolute inset-0 bg-white/75 z-1 dark:bg-background/90" />

      {/* Container Utama Konten - Beri z-10 agar selalu di atas overlay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full z-10">
        <div className="flex flex-col lg:flex-row items-center lg:pt-16">
          <div className="w-full lg:w-1/2 z-10 space-y-4 md:space-y-6 lg:space-y-8 pb-8 lg:pb-0 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 p-2 pr-4 rounded-full bg-secondary/50 border border-border text-sm font-medium shadow-sm">
              <Leaf className="h-5 w-5 text-primary" />
              <span>Optimal Nutrition, Optimal Life</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tighter">
              <TextType
                text={["Rencana Nutrisi", "Khusus Untukmu"]}
                typingSpeed={40}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
              />
              <span
                className="block title-accent-span"
                style={{
                  color: "var(--color-primary)",
                }}
              >
                Partner Kesehatan Nutrisi Harian Anda
              </span>
            </h1>
            {/* ... sisa konten ... */}
            <p className="text-muted-foreground max-w-lg text-lg mx-auto lg:mx-0">
              Hitung kalori, lacak makro, dan temukan rencana makan yang
              dipersonalisasi. Mulai perjalanan kesehatan Anda hari ini.
            </p>

            <div className="flex space-x-4 pt-4 justify-center lg:justify-start">
              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-full px-5 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold
                           bg-primary text-primary-foreground shadow-lg shadow-primary/30
                           hover:opacity-90 transition-opacity duration-200"
              >
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>

              <a
                href="/fitur"
                className="inline-flex items-center justify-center rounded-full px-5 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold
                           border border-border text-foreground hover:bg-accent/50 transition-colors duration-200"
              >
                Explore Features
              </a>
            </div>
          </div>

          {/* sisi kanan logo & budget*/}
          <div className="lg:w-1/2 relative h-[400px] sm:h-[500px] lg:h-[600px] justify-center items-center mt-12 lg:mt-0 hidden md:flex">
            <Image
              src={HEALTH_MODEL_URL}
              alt="Healthy food bowl with fresh ingredients"
              className="relative z-10 w-11/12 object-cover rounded-full"
              width={500}
              height={500}
            />
            {/* Badge 1 */}
            <div className="absolute top-1/4 left-4 sm:left-0">
              <FloatingText
                icon={<Scale className="h-5 w-5 text-primary" />}
                title="Track Calories"
              />
            </div>
            {/* Badge 2 */}
            <div className="absolute bottom-1/4 right-4 sm:right-0 px-30">
              <FloatingText
                icon={<Clock className="h-5 w-5 text-primary" />}
                title="Quick Meals"
              />
            </div>
            {/* Logo Lingkaran */}
            <div className="absolute top-0 right-4 sm:right-0 p-3 rounded-full bg-primary/10 border border-border shadow-lg">
              <Apple className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
