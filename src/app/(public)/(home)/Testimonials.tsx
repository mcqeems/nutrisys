"use client";

import React, { useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";
import LogoLoop from "./CardLoop"; 

const testimonials = [
  {
    name: "Nur Ihsan",
    role: "Fitness Enthusiast",
    content:
      "NutriSys mengubah cara saya memandang nutrisi. Analisis AI-nya sangat akurat dan membantu saya mencapai target fitness dengan lebih efisien!",
    rating: 5,
    initials: "FF",
    image: "/Testimonials/ihsan.webp",
  },
  {
    name: "Rizky Cahyono",
    role: "Atlet Profesional",
    content:
      "Sebagai atlet, nutrisi adalah segalanya. NutriSys memberikan rekomendasi personal yang benar-benar sesuai dengan kebutuhan latihan saya.",
    rating: 5,
    initials: "RC",
    image: "/Testimonials/rizky.webp",
  },
  {
    name: "Nabil Andara",
    role: "Guru SD",
    content:
      "Aplikasi yang sangat membantu untuk mengatur pola makan keluarga. Interface-nya mudah dipahami dan fitur trackingnya sangat lengkap!",
    rating: 5,
    initials: "NA",
    image: "/Testimonials/nabil.webp",
  },
  {
    name: "Iqbal Maulana",
    role: "Nutritionist",
    content:
      "Sebagai ahli gizi, saya terkesan dengan akurasi data dan analisis yang diberikan. Sangat membantu dalam memberikan konsultasi kepada klien.",
    rating: 5,
    initials: "IM",
    image: "/Testimonials/iqbal.webp",
  },
  {
    name: "Dafi Alhaq",
    role: "Yoga Instructor",
    content:
      "NutriSys sempurna untuk gaya hidup sehat saya. Rekomendasi makanan berbasis plant-based sangat membantu dalam perjalanan wellness saya.",
    rating: 5,
    initials: "RG",
    image: "/Testimonials/dafi.webp",
  },
  {
    name: "Zahid Ahnaful",
    role: "Software Developer",
    content:
      "Akhirnya aplikasi nutrisi yang tech-savvy! Integrasi AI-nya smooth dan data visualization-nya memudahkan tracking progress harian.",
    rating: 5,
    initials: "ZA",
    image: "/Testimonials/zahid.webp",
  },
];

const testimonialLogos = testimonials.map((testimonial, index) => ({
  node: (
    <Card
      key={index}
      className="w-[320px] h-full p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 bg-card border border-border/70"
    >
      <div className="flex-1 mb-4">
        <Quote className="w-6 h-6 text-primary mb-3 opacity-70" />
        <p className="text-sm italic text-foreground/80 leading-relaxed mb-4">
          {testimonial.content}
        </p>
      </div>

      <div className="flex text-amber-400 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-current" />
        ))}
      </div>

      <div className="flex items-center gap-3 mt-auto">
        <Avatar className="w-12 h-12">
          <AvatarImage src={testimonial.image} alt={testimonial.name} />
          <AvatarFallback className="bg-primary/20 text-primary text-2xl">
            {testimonial.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-base font-semibold text-foreground">
            {testimonial.name}
          </div>
          <div className="text-sm text-muted-foreground">
            {testimonial.role}
          </div>
        </div>
      </div>
    </Card>
  ),
  title: testimonial.name,
}));

const headerContainerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

const loopVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.2,
    },
  },
};

const Testimonials = () => {
  useEffect(() => {
    const updateFadeColor = () => {
      const rootStyle = getComputedStyle(document.documentElement);
      let backgroundValue = rootStyle.getPropertyValue("--background").trim();

      if (!backgroundValue || backgroundValue.includes("oklch")) {
        const isDark = document.documentElement.classList.contains("dark");
        backgroundValue = isDark ? "rgb(30, 38, 38)" : "rgb(255, 255, 255)";
      }
    };

    updateFadeColor();

    const observer = new MutationObserver(updateFadeColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative pt-24 lg:px-100 overflow-hidden bg-background">
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={headerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} 
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-4">
            <Quote className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Testimoni Pengguna
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Apa Kata{" "}
            <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Mereka
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Banyak pengguna telah merasakan manfaat NutriSys dalam perjalanan
            hidup sehat mereka
          </p>
        </motion.div>
      </div>

      <motion.div
        className="h-[450px] relative overflow-hidden"
        variants={loopVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} 
      >
        <LogoLoop
          logos={testimonialLogos}
          speed={50}
          direction="left"
          className="p-5"
          hoverSpeed={0}
          fadeOut
          ariaLabel="Testimonial Loop"
        />
      </motion.div>
    </section>
  );
};

export default Testimonials;
