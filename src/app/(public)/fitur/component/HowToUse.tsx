import { Step } from "../type-data";

const steps: Step[] = [
  {
    step: "1",
    title: "Buka Dashboard",
    description: "Masuk ke akun Anda dan lihat overview nutrisi Anda",
  },
  {
    step: "2",
    title: "Catat Makanan",
    description: "Cari dan tambahkan makanan ke log harian Anda",
  },
  {
    step: "3",
    title: "Analisis Data",
    description: "Lihat rekomendasi dari AI berdasarkan data Anda",
  },
  {
    step: "4",
    title: "Terapkan Saran",
    description: "Ikuti rekomendasi dan track hasilnya setiap minggu",
  },
];

export default function HowToUseSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground animate-fade-in-up">
            Cara Menggunakan Fitur-Fitur
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative p-8 bg-background rounded-xl border border-border hover:border-primary transition-all duration-500 group animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {item.step}
                  </span>
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Hover indicator */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
