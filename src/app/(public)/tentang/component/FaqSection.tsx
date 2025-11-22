import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordian";

function FaqSection() {
  const faqs = [
    {
      question: "Apa itu NutriSys?",

      answer:
        "NutriSys adalah aplikasi analisis nutrisi yang menggunakan teknologi AI untuk membantu Anda memahami kandungan nutrisi makanan Anda. Cukup foto makanan Anda, dan kami akan memberikan informasi lengkap tentang kalori, protein, karbohidrat, lemak, vitamin, dan mineral.",
    },

    {
      question: "Bagaimana cara kerja NutriSys?",

      answer:
        "NutriSys menggunakan teknologi computer vision dan machine learning untuk mengenali makanan dari foto yang Anda upload. Sistem kami kemudian menganalisis kandungan nutrisi berdasarkan database makanan yang komprehensif dan memberikan hasil yang akurat dalam hitungan detik.",
    },

    {
      question: "Apakah NutriSys gratis?",

      answer:
        "NutriSys menawarkan versi gratis dengan fitur dasar analisis nutrisi. Untuk fitur premium seperti tracking jangka panjang, meal planning, dan konsultasi dengan ahli gizi, tersedia paket berlangganan dengan harga terjangkau.",
    },

    {
      question: "Apakah data saya aman?",

      answer:
        "Keamanan data adalah prioritas utama kami. Semua informasi kesehatan Anda dienkripsi dan disimpan dengan standar keamanan tinggi. Kami tidak akan pernah membagikan data Anda tanpa izin eksplisit dari Anda.",
    },

    {
      question: "Makanan apa saja yang bisa dianalisis?",

      answer:
        "NutriSys dapat menganalisis hampir semua jenis makanan, mulai dari makanan tradisional Indonesia, makanan internasional, hingga makanan kemasan. Database kami terus diperbarui untuk mencakup lebih banyak variasi makanan.",
    },

    {
      question: "Apakah NutriSys bisa membantu diet saya?",

      answer:
        "Ya! NutriSys tidak hanya menganalisis nutrisi, tetapi juga memberikan rekomendasi personal berdasarkan tujuan kesehatan Anda. Anda bisa set target kalori harian, pantau progress, dan dapatkan saran meal plan yang sesuai dengan kebutuhan diet Anda.",
    },
  ];
  return (
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Animated background elements */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-[orb-pulse_10s_ease-in-out_infinite]" />

          <div className="absolute bottom-20 left-10 w-56 h-56 bg-accent/10 rounded-full blur-3xl animate-[orb-pulse_12s_ease-in-out_infinite_3s]" />

          <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-primary/5 rounded-full blur-2xl animate-[orb-pulse_14s_ease-in-out_infinite_2s]" />
        </div>

        <div className="container  mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-[slide-up_0.8s_ease-out]">
              <h2 className="text-5xl md:text-4xl font-bold mb-4">
                Frequently Asked{" "}
                <span className="text-linear animate-[pulse-glow_3s_ease-in-out_infinite]">
                  Questions
                </span>
              </h2>

              <p className="text-muted-foreground animate-[fade-in_1s_ease-out_0.3s_backwards]">
                Temukan jawaban untuk pertanyaan umum tentang NutriSys
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="relative border border-border/50 p-4 text-xl rounded-xl bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02] animate-[fade-in_0.6s_ease-out_backwards] group overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Animated linear background on hover */}

                  <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Shimmer effect */}

                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-primary/10 to-transparent" />

                  <AccordionTrigger className="relative text-left font-semibold hover:text-primary hover:no-underline py-6 transition-all duration-300 &data-state=open:text-primary">
                    <span className="flex items-center gap-3 group-hover:translate-x-2 transition-transform duration-300">
                      <span className="w-2 h-2 rounded-full bg-primary/50 group-hover:bg-primary group-hover:scale-150 transition-all duration-300" />

                      {faq.question}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="relative text-muted-foreground leading-relaxed pb-6 animate-[fade-in_0.5s_ease-out]">
                    <div className="pl-5 border-l-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      
  );
}

export default FaqSection;