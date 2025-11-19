"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    details: "contact@example.com",
    description: "Respons dalam 24 jam",
  },
  {
    icon: Phone,
    title: "Telepon",
    details: "+62 812 3456 7890",
    description: "Senin - Jumat, 09:00 - 17:00",
  },
  {
    icon: MapPin,
    title: "Lokasi",
    details: "Jakarta, Indonesia",
    description: "Kantor pusat kami",
  },
  {
    icon: Clock,
    title: "Jam Operasional",
    details: "09:00 - 17:00 WIB",
    description: "Hari kerja",
  },
];

export default function ContactInfo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".contact-card");
      cards.forEach((card, index) => {
        const htmlCard = card as HTMLElement;

        htmlCard.style.animationDelay = `${index * 0.12}s`;
        observer.observe(card);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="space-y-6">
      <div className="sticky top-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 animate-in fade-in slide-in-from-top-4 duration-500 text-foreground">
          Informasi Kontak
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Card
                key={index}
                className="contact-card p-5 border-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group cursor-pointer opacity-0 hover:bg-primary/5"
                style={{
                  animation: "cardSlideIn 0.6s ease-out forwards",
                }}
              >
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base group-hover:text-primary transition-colors duration-300">
                        {method.title}
                      </h3>
                      <p className="text-primary font-medium text-sm mt-1 truncate">
                        {method.details}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-border/30">
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:border-primary/40 transition-colors duration-300">
            <CardContent className="p-0 text-center">
              <Send className="w-8 h-8 text-primary mx-auto mb-3 opacity-70" />
              <h3 className="font-semibold text-lg text-foreground mb-2">
                Siap untuk memulai?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Jangan ragu untuk menghubungi kami kapan saja.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes cardSlideIn {
          from {
            opacity: 0;
            transform: translateY(1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-visible {
          animation: cardSlideIn 0.6s ease-out forwards !important;
        }
      `}</style>
    </div>
  );
}
