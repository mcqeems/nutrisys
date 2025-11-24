"use client";

import { motion } from "framer-motion";
export default function Philosophy () {
    return (
      <section className="relative py-24 px-6 md:px-12 bg-muted">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            staggerChildren: 0.2,
            delayChildren: 0.3,
            duration: 0.6,
          }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold font-headline text-center mb-16"
          >
            Filosofi Nutrisys
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Personal & Presisi",
                description:
                  "Setiap individu unik. Kami menyediakan analisis yang disesuaikan dengan kebutuhan personal Anda.",
                icon: "🎯",
              },
              {
                title: "Berbasis Sains",
                description:
                  "Semua rekomendasi kami didukung oleh penelitian ilmiah terkini dan standar nutrisi internasional.",
                icon: "🔬",
              },
              {
                title: "Mudah & Praktis",
                description:
                  "Teknologi canggih dikemas dalam interface yang intuitif untuk pengalaman pengguna yang menyenangkan.",
                icon: "✨",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="p-8 bg-card border border-border rounded-2xl shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold font-headline mb-4 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    );
}