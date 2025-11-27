import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

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

const Testimonials = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-secondary">

      <div className="relative z-10 max-w-7xl mx-auto ">
        {/* Section Header */}
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group p-6 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="mb-4 text-primary/20 group-hover:text-primary/40 transition-colors">
                <Quote className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/90 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <Avatar className="h-10 w-10 border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="text-center p-6 rounded-xl bg-primary/5 backdrop-blur-sm border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-1">4.9</div>
            <div className="text-sm text-muted-foreground">
              Rating Rata-rata
            </div>
          </div>
          <div className="text-center p-6 rounded-xl bg-primary/5 backdrop-blur-sm border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-1">10K+</div>
            <div className="text-sm text-muted-foreground">Ulasan Positif</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-primary/5 backdrop-blur-sm border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-1">98%</div>
            <div className="text-sm text-muted-foreground">Kepuasan</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-primary/5 backdrop-blur-sm border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-1">15K+</div>
            <div className="text-sm text-muted-foreground">Pengguna Aktif</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
