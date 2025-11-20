"use client";

import { useEffect, useState, ReactNode } from "react";

// Definisikan tipe untuk properti FloatingText
interface FloatingText {
  id: number;
  text: string;
  left: number;
  duration: number;
  delay: number;
  size: "sm" | "md" | "lg";
}

// Tambahkan properti 'children' ke props komponen
interface AnimatedBackgroundProps {
  children?: ReactNode;
}

// Ubah fungsi komponen untuk menerima props: AnimatedBackgroundProps
export function AnimatedBackground({ children }: AnimatedBackgroundProps) {
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);

  useEffect(() => {
    // ... (Logika inisialisasi teks tetap sama)
    const texts = [
      "Kesehatan",
      "Nutrisi",
      "Kebugaran",
      "Hidrasi",
      "Protein",
      "Vitamin",
      "Serat",
      "Keseimbangan",
      "Diet",
      "Mindfulness",
      "Gizi",
      "Imun",
      "Energi",
      "Vitalitas",
      "Aktivitas",
      "Istirahat",
    ];

    const newTexts = texts.map((text, idx) => ({
      id: idx,
      text,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 2,
      size: (["sm", "md", "lg"] as const)[Math.floor(Math.random() * 3)],
    }));

    setFloatingTexts(newTexts);
  }, []);

  return (
    // Kontainer utama. Menggunakan bg-background untuk latar belakang
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* Lapisan Latar Belakang Animasi */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs. Menggunakan warna Primary/Accent dengan transparansi dan mix-blend-mode */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-accent/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-4000"></div>

        {/* Gradient pattern di atas orbs untuk efek kedalaman */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50 dark:to-background/70"></div>
      </div>

      {/* Lapisan Teks Mengambang (Floating text elements) */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingTexts.map((item) => (
          <div
            key={item.id}
            // Perubahan Utama di sini:
            // 1. Meningkatkan opasitas menjadi /30 untuk Light Mode.
            // 2. Meningkatkan opasitas menjadi /15 untuk Dark Mode (karena kontras lebih tinggi).
            // 3. Menggunakan font-sans-stack-headline
            className="absolute whitespace-nowrap font-bold text-foreground/30 dark:text-foreground/15 font-sans-stack-headline"
            style={{
              left: `${item.left}%`,
              top: "100%",
              animation: `float ${item.duration}s linear ${item.delay}s infinite`,
              fontSize:
                item.size === "sm"
                  ? "1.25rem"
                  : item.size === "md"
                  ? "1.875rem"
                  : "2.5rem",
              // Perubahan Utama di sini:
              // Meningkatkan rentang opasitas yang dihasilkan (sekarang antara 0.2 hingga 0.5)
              opacity: 0.2 + Math.random() * 0.3,
            }}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* Slot untuk Konten (Children) */}
      <div className="relative z-10 w-full h-full">{children}</div>

      {/* Style untuk Animasi */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            /* Meningkatkan opasitas awal */
            opacity: 0.1;
          }
          10% {
            /* Meningkatkan opasitas di tengah jalan */
            opacity: 0.2;
          }
          50% {
            /* Meningkatkan opasitas maksimal */
            opacity: 0.5;
            transform: translateY(-50vh) translateX(0);
          }
          90% {
            /* Meningkatkan opasitas kembali */
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100vh) translateX(0);
            /* Opasitas akhir (sebelum hilang) ditingkatkan sedikit */
            opacity: 0.1;
          }
        }

        .delay-2000 {
          animation-delay: 2s;
        }

        .delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
