"use client";

import { motion, Variants } from "framer-motion";
import { Check, Heart, Scale, Zap } from "lucide-react"; 

interface AboutNutriSysProps {
  scrollVariant: Variants;
}

const AboutNutriSys: React.FC<AboutNutriSysProps> = ({ scrollVariant }) => {
  return (
    <motion.section
      variants={scrollVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative py-24 sm:py-32 bg-background text-foreground"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 space-y-8 order-2 lg:order-1">
            <h3 className="text-primary uppercase tracking-widest font-semibold">
              MENGANALISIS GIZI
            </h3>

            {/* Judul Utama */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-card-foreground">
              Apa itu NutriSys?
            </h2>
            <p className="text-muted-foreground max-w-xl">
              NutriSys adalah platform canggih untuk menganalisis dan
              melacak asupan nutrisi Anda. Kami membantu Anda memahami komposisi
              makanan secara mendalam, dari makro hingga mikro nutrisi,
              mendukung gaya hidup sehat berbasis data.
            </p>

            {/* Daftar Poin Kunci (Mirip Poin Aksara Batak) */}
            <ul className="space-y-4 pt-4 text-card-foreground">
              <li className="flex items-start gap-3">
                <Scale className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                <p>
                  <strong className="font-semibold">
                    Analisis Makronutrien Akurat:
                  </strong>{" "}
                  Hitung karbohidrat, protein, dan lemak secara *real-time*.
                </p>
              </li>

              <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                <p>
                  <strong className="font-semibold">
                    Pelacakan Vitamin & Mineral:
                  </strong>{" "}
                  Memastikan Anda mendapatkan semua nutrisi mikro esensial.
                </p>
              </li>

              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                <p>
                  <strong className="font-semibold">
                    Data Dikelola dengan Baik:
                  </strong>{" "}
                  Sumber data gizi terverifikasi dan terus diperbarui.
                </p>
              </li>
            </ul>
          </div>

          {/* BAGIAN KANAN: Visual Aksen (Mirip Bingkai Ulos) */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2 relative">
            <div className="relative w-full max-w-sm aspect-square">
              {/* Bingkai Luar (Aksen Merah/Hijau/Primary) */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  // Border luar yang tebal dan berwarna accent (mirip warna merah pada gambar)
                  border: "8px solid var(--accent)",
                  // Bayangan yang lembut untuk efek 3D (sesuai tema gelap)
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                }}
              />

              {/* Konten Visual di Dalam Bingkai */}
              <div
                className="absolute inset-0 m-4 rounded-xl flex items-center justify-center p-8"
                style={{
                  // Latar belakang Card atau Primary Muted (sesuaikan jika perlu)
                  background: "var(--card)",
                  // Efek gradien/bayangan internal jika diperlukan untuk kedalaman
                }}
              >
                {/* Ikon Gizi/Health yang Besar */}
                <Scale className="w-24 h-24 text-primary opacity-80" />

                {/* Teks/Branding di Dalam Bingkai */}
                <div className="absolute bottom-5 right-5 text-xl font-bold uppercase text-primary-foreground bg-primary px-3 py-1 rounded-md">
                  NutriSys
                </div>
              </div>

              {/* Placeholder untuk Diagram Gizi atau Ikon (Mirip Ikon Rumah Batak) */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary rounded-full flex items-center justify-center shadow-2xl">
                <Heart className="w-16 h-16 text-secondary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutNutriSys;
