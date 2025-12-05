'use client';
export function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 md:py-32 flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-6 inline-block">
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
            ✨ Kecerdasan untuk Kesejahteraan Anda
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-snug">
          <span className="bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Temukan Fitur
          </span>
          <br />
          <span className="text-foreground">Untuk Hidup Lebih Sehat</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
          Platform AI kami menyajikan alat lengkap mulai dari konsultasi instan
          hingga analisis mendalam, dirancang untuk mendukung setiap langkah
          perjalanan kesehatan Anda.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          {[
            "NutriAI Chat",
            "Analisis Nutrisi",
            "Wellness Journal",
            "Smart Target",
          ].map((pill, i) => (
            <div
              key={i}
              className="px-4 py-2 rounded-full bg-gray-100/80 text-sm font-medium"
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
