"use client";

import { motion } from "framer-motion";

export default function VisiMisi() {
    return (
      <section className="relative py-24 px-6 md:px-12">
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
            Visi & Misi Kami
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <motion.div
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-8 md:p-10 bg-card border border-border rounded-2xl shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <div className="w-8 h-8 bg-primary rounded-lg" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-headline mb-4 text-foreground">
                  Visi
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi platform analisis nutrisi terdepan di Indonesia yang
                memberdayakan setiap individu untuk mencapai kesehatan optimal
                melalui pemahaman mendalam tentang nutrisi personal mereka.
              </p>
            </motion.div>

            <motion.div
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-8 md:p-10 bg-card border border-border rounded-2xl shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <div className="w-8 h-8 bg-accent rounded-lg" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold font-headline mb-4 text-foreground">
                  Misi
                </h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>
                    Menyediakan analisis nutrisi yang akurat dan mudah dipahami
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>
                    Membangun ekosistem kesehatan digital yang terintegrasi
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span>
                    Mendorong gaya hidup sehat melalui edukasi berkelanjutan
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>
    );
}