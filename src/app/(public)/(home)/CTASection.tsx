import { Button } from '@/components/ui/butons';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

const benefits = [
  'Analisis nutrisi real-time',
  'Rekomendasi menu personal',
  'Tracking progress harian',
  'Reminder Cerdas',
];

const CTASection = () => {
  return (
    <section className="relative pb-24 px-4 overflow-hiddena bg-background">
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="backdrop-blur-xl bg-card/80 rounded-3xl border-2 border-primary/30 shadow-2xl shadow-primary/20 p-8 md:p-12 lg:p-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* konten kiri */}
            <div>
              <div className="inline-block px-4 py-2 bg-primary/20 rounded-full text-sm font-semibold text-primary mb-6">
                🚀 Mulai Perjalanan Sehat Anda
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Transformasi Kesehatan Anda{' '}
                <span
                  className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-shift"
                  style={{ backgroundSize: '200%' }}
                >
                  Dimulai Hari Ini
                </span>
              </h2>

              <p className="text-lg text-muted-foreground mb-8">
                Bergabunglah dengan ribuan pengguna yang telah merasakan manfaat hidup lebih sehat dengan NutriSys.
              </p>

              {/* list benefit */}
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* button */}
              <Link href="/register">
                <Button
                  size="lg"
                  className="group w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg font-bold rounded-xl transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 cursor-pointer"
                >
                  Daftar Gratis Sekarang
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">✨ Gratis Pemakaian • Tidak perlu berbayar</p>
            </div>

            {/* konten kanan card stats */}
            <div className="space-y-6">
              {[
                {
                  value: '100%',
                  label: 'Pemakaian Gratis',
                  color: 'from-primary to-accent',
                },
                {
                  value: '95%+',
                  label: 'Akurasi AI yang tinggi.',
                  color: 'from-chart-1 to-chart-2',
                },
                {
                  value: '24 Jam',
                  label: 'Akses tanpa henti',
                  color: 'from-chart-4 to-chart-5',
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group backdrop-blur-sm bg-background/60 rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 "
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className={`text-3xl font-bold mb-2 bg-linear-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
