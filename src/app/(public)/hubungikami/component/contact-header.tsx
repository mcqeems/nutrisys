"use client";

import { useEffect, useRef } from "react";

export default function ContactHeader() {
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const titleObserver = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add("animate-in");
  //         }
  //       });
  //     },
  //     { threshold: 0.1 }
  //   );

  //   if (titleRef.current) titleObserver.observe(titleRef.current);
  //   if (descRef.current) titleObserver.observe(descRef.current);

  //   return () => {
  //     titleObserver.disconnect();
  //   };
  // }, []);

  return (
    <div className="relative overflow-hidden bg-linear-to-b from-primary/5 to-transparent py-16 md:py-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div
            ref={titleRef}
            className="opacity-0 translate-y-8 transition-all duration-700"
            style={{
              animation: "fadeInUp 0.8s ease-out forwards",
            }}
          >
            <h1 className="text-5xl md:text-7xl text-center font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-primary via-primary to-primary/70 leading-tight">
              Mari Terhubung
            </h1>
          </div>

          <div
            ref={descRef}
            className="opacity-0 translate-y-8 transition-all duration-700"
            style={{
              animation: "fadeInUp 0.8s ease-out 0.2s forwards",
            }}
          >
            <p className="text-lg md:text-xl text-center text-muted-foreground leading-relaxed">
              Kami ingin mendengar dari Anda. Hubungi kami dengan pertanyaan,
              masukan, atau sekadar untuk mengucapkan salam.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
