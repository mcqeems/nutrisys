import { Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-background via-background to-background overflow-hidden">
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
  );
}
