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
      "Wellness",
      "Health",
      "Growth",
      "Balance",
      "Energy",
      "Vitality",
      "Care",
      "Mindfulness",
      "Strength",
      "Harmony",
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
    // Kontainer utama dengan latar belakang dan efek animasi
    <div className="relative w-full h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 overflow-hidden">
      {/* Lapisan Latar Belakang Animasi */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-400/20 dark:bg-green-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-400/10 dark:bg-teal-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-4000"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-100/5 dark:to-green-900/5"></div>
      </div>

      {/* Lapisan Teks Mengambang (Floating text elements) */}
      <div className="absolute inset-0 pointer-events-none">
        {" "}
        {/* Tambahkan pointer-events-none */}
        {floatingTexts.map((item) => (
          <div
            key={item.id}
            className="absolute whitespace-nowrap font-bold text-foreground/20 dark:text-foreground/15"
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
              opacity: 0.3 + Math.random() * 0.4,
            }}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* Slot untuk Konten (Children) */}
      {/* Konten akan diletakkan di sini, di atas latar belakang animasi */}
      <div className="relative z-10 w-full h-full">{children}</div>

      {/* Style untuk Animasi */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
            /* Perhatikan: Math.sin(Math.random() * Math.PI) * 100 harusnya di luar template literal jika Anda ingin nilai yang sama di 50% setiap loop */
            /* Menggunakan nilai statis atau mengizinkan Math.random di setiap render (jika tidak diletakkan di useEffect) */
            transform: translateY(-50vh) translateX(0); /* Sederhanakan atau biarkan seperti sebelumnya */
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(0);
            opacity: 0;
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
