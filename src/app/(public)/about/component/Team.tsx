"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";

export default function Team() {
  const teamMembers = [
    {
      name: "Brucad Al Magribi",
      role: "Chief Nutritionist",
      image: "/Logo/nutrisys.webp",
      description:
        "15 tahun pengalaman dalam nutrisi klinis dan penelitian gizi",
      socials: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@nutrisys.com",
      },
    },
    {
      name: "Mustaqim Nawahhudi Ma'arif",
      role: "Lead Developer",
      image: "/Logo/nutrisys.webp",
      description: "Expert dalam pengembangan aplikasi kesehatan dan AI",
      socials: {
        linkedin: "#",
        twitter: "#",
        email: "michael@nutrisys.com",
      },
    },
  ];
  return (
    <section className="relative py-24 px-6 md:px-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          staggerChildren: 0.15,
          delayChildren: 0.2,
          duration: 0.6,
        }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold font-headline text-center mb-6"
        >
          Meet Our Team
        </motion.h2>

        <motion.p
          transition={{ duration: 0.6 }}
          className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto"
        >
          Tim multidisiplin yang passionate tentang kesehatan dan teknologi
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold font-headline mb-2 text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-primary mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {member.description}
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <a
                      href={member.socials.linkedin}
                      className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.socials.twitter}
                      className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${member.socials.email}`}
                      className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                      aria-label="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
