'use client';
import { Leaf, Apple, ChevronRight, Scale, Clock } from 'lucide-react';
import { FloatingText } from '@/components/ui/floating-text';
import { AnimatedBackground } from '@/components/ui/animated-background';
import TextType from '@/components/TextType';
import { SmoothButton } from '@/components/ui/button';
import Image from 'next/image';

const HEALTH_MODEL_URL = '/dokter.png';

const HeroSection = () => {
  const categories = [
    'Diet Plans',
    'Supplements',
    'Recipe Ideas',
    'Meal Prep',
    'Hydration',
    'Weight Management',
    'Fitness Tips',
  ];

  return (
    <AnimatedBackground>
      <div className="min-h-screen text-foreground relative">
        {/* Container Utama Konten */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center lg:pt-16">
            {/* Sisi Kiri: Teks dan CTA (w-full agar mengambil lebar penuh di mobile) */}
            <div className="w-full lg:w-1/2 z-10 space-y-4 md:space-y-6 lg:space-y-8 pb-8 lg:pb-0 text-center lg:text-left">
              {/* Tagline */}
              <div className="inline-flex items-center space-x-2 p-2 pr-4 rounded-full bg-secondary/50 border border-border text-sm font-medium shadow-sm">
                <Leaf className="h-5 w-5 text-primary" />
                <span>Optimal Nutrition, Optimal Life</span>
              </div>

              {/* Judul Utama */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tighter">
                <TextType
                  text={['Rencana Nutrisi', 'Khusus Untukmu']}
                  typingSpeed={40}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
                <span
                  className="block title-accent-span"
                  style={{
                    color: 'var(--color-primary)',
                  }}
                >
                  Partner Kesehatan Nutrisi Harian Anda
                </span>
              </h1>

              {/* Deskripsi */}
              <p className="text-muted-foreground max-w-lg text-lg mx-auto lg:mx-0">
                Hitung kalori, lacak makro, dan temukan rencana makan yang dipersonalisasi. Mulai perjalanan kesehatan
                Anda hari ini.
              </p>

              {/* Buttons */}
              <div className="flex space-x-4 pt-4 justify-center lg:justify-start">
                {/* Button Primary  */}
                <SmoothButton
                  variant="primary"
                  // href="/login"
                  // className="inline-flex items-center justify-center rounded-full px-5 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold
                  //            bg-primary text-primary-foreground shadow-lg shadow-primary/30
                  //            hover:opacity-90 transition-opacity duration-200"
                >
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </SmoothButton>

                {/* Button Outline */}
                <SmoothButton
                  variant="outline"
                  className="inline-flex items-center justify-center rounded-full px-5 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold
                           border border-border text-foreground hover:bg-accent/50 transition-colors duration-200"
                >
                  Explore Features
                </SmoothButton>
              </div>
            </div>

            {/*  Sisi Kanan: Visual dan Badges (hidden md:block untuk menyembunyikan di mobile & menampilkan di tablet+) */}
            <div className="lg:w-1/2 relative h-[400px] sm:h-[500px] lg:h-[600px] justify-center items-center mt-12 lg:mt-0 hidden md:flex">
              {/* Gambar Dokter */}
              <Image
                src={HEALTH_MODEL_URL}
                alt="Healthy food bowl with fresh ingredients"
                className="relative z-10 w-11/12 object-cover rounded-full shadow-2xl"
                width={500}
                height={500}
              />
              {/* Badge 1 */}
              <div className="absolute top-1/4 left-4 sm:left-0">
                <FloatingText icon={<Scale className="h-5 w-5 text-primary" />} title="Track Calories" />
              </div>
              {/* Badge 2 */}
              <div className="absolute bottom-1/4 right-4 sm:right-0 px-30">
                <FloatingText icon={<Clock className="h-5 w-5 text-primary" />} title="Quick Meals" />
              </div>
              {/* Logo Lingkaran */}
              <div className="absolute top-0 right-4 sm:right-0 p-3 rounded-full bg-primary/10 border border-border shadow-lg">
                <Apple className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Kategori Bar di Bawah */}
        {/* <div className="absolute bottom-0 left-0 w-full bg-primary py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-6 md:space-x-10 overflow-x-auto whitespace-nowrap text-primary-foreground font-semibold">
              {categories.map((category, index) => (
                <span
                  key={index}
                  // Mengganti flex-shrink-0 menjadi shrink-0 (Saran Intellisense)
                  className="hover:text-yellow-300 transition-colors cursor-pointer text-sm md:text-base shrink-0"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </AnimatedBackground>
  );
};

export default HeroSection;
