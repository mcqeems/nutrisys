import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";
import LogoLoop from "./CardLoop"; 
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Sarah Wijaya",
    role: "Fitness Enthusiast",
    content:
      "NutriSys mengubah cara saya memandang nutrisi. Analisis AI-nya sangat akurat dan membantu saya mencapai target fitness dengan lebih efisien!",
    rating: 5,
    initials: "SW",
  },
  {
    name: "Budi Santoso",
    role: "Atlet Profesional",
    content:
      "Sebagai atlet, nutrisi adalah segalanya. NutriSys memberikan rekomendasi personal yang benar-benar sesuai dengan kebutuhan latihan saya.",
    rating: 5,
    initials: "BS",
  },
  {
    name: "Diana Putri",
    role: "Ibu Rumah Tangga",
    content:
      "Aplikasi yang sangat membantu untuk mengatur pola makan keluarga. Interface-nya mudah dipahami dan fitur trackingnya sangat lengkap!",
    rating: 5,
    initials: "DP",
  },
  {
    name: "Ahmad Rizki",
    role: "Nutritionist",
    content:
      "Sebagai ahli gizi, saya terkesan dengan akurasi data dan analisis yang diberikan. Sangat membantu dalam memberikan konsultasi kepada klien.",
    rating: 5,
    initials: "AR",
  },
  {
    name: "Lina Marlina",
    role: "Yoga Instructor",
    content:
      "NutriSys sempurna untuk gaya hidup sehat saya. Rekomendasi makanan berbasis plant-based sangat membantu dalam perjalanan wellness saya.",
    rating: 5,
    initials: "LM",
  },
  {
    name: "Eko Prasetyo",
    role: "Software Developer",
    content:
      "Akhirnya aplikasi nutrisi yang tech-savvy! Integrasi AI-nya smooth dan data visualization-nya memudahkan tracking progress harian.",
    rating: 5,
    initials: "EP",
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
          "{testimonial.content}"
        </p>
      </div>

      <div className="flex text-amber-400 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-current" />
        ))}
      </div>

      <div className="flex items-center gap-3 mt-auto">
        <Avatar className="w-12 h-12">
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


const Testimonials = () => {
  const [fadeColor, setFadeColor] = useState(); 

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
        <div className="text-center mb-16 animate-fade-in">
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
            Ribuan pengguna telah merasakan manfaat NutriSys dalam perjalanan
            hidup sehat mereka
          </p>
        </div>
      </div>

      <div
        className="h-[450px] relative overflow-hidden"
      >
        <LogoLoop
          logos={testimonialLogos}
          speed={50}
          direction="left"
          // logoHeight dihilangkan agar Card menentukan tingginya
          hoverSpeed={0}
          fadeOut
          // Menggunakan warna latar belakang yang terdeteksi secara dinamis
          fadeOutColor={fadeColor}
          ariaLabel="Testimonial Loop"
        />
      </div>
    </section>
  );
};

export default Testimonials;
