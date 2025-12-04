"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion"; 
import { Button } from "@/components/ui/butons";
import { Card } from "@/components/ui/card";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
      when: "beforeChildren",
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getMailtoString = () => {
    const recipient = "brucadalm@gmail.com";

    const subject = `Pesan dari Website: ${formData.subject}`;

    const body = `
Nama: ${formData.name}
Email: ${formData.email}

Pesan:
${formData.message}
      `;
    return `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <motion.form 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      action={getMailtoString()}
      method="GET"
      className="space-y-6"
    >
      <Card className="p-8 border-2 border-border bg-card/50 hover:border-primary/30">
        <motion.h2 
          variants={itemVariants}
          className="text-2xl md:text-3xl font-bold mb-8 text-foreground"
        >
          Kirim Pesan Kami
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="form-group md:col-span-1">
            <label
              htmlFor="name"
              className="block text-sm font-semibold mb-3 text-foreground"
            >
              Nama Lengkap
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              placeholder="Nama Anda"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-background/80 focus:outline-none ${
                focusedField === "name"
                  ? "border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                  : "border-border hover:border-primary/50"
              }`}
            />
          </div>

          <div className="form-group md:col-span-1">
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-3 text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              placeholder="email@example.com"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-background/80 focus:outline-none ${
                focusedField === "email"
                  ? "border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                  : "border-border hover:border-primary/50"
              }`}
            />
          </div>
        </motion.div>

        {/* Subjek */}
        <motion.div variants={itemVariants} className="form-group mt-6">
          <label
            htmlFor="subject"
            className="block text-sm font-semibold mb-3 text-foreground"
          >
            Subjek
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            onFocus={() => setFocusedField("subject")}
            onBlur={() => setFocusedField(null)}
            placeholder="Subjek pesan Anda"
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-background/80 focus:outline-none ${
              focusedField === "subject"
                ? "border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                : "border-border hover:border-primary/50"
            }`}
          />
        </motion.div>

        {/* Pesan */}
        <motion.div variants={itemVariants} className="form-group mt-6">
          <label
            htmlFor="message"
            className="block text-sm font-semibold mb-3 text-foreground"
          >
            Pesan
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            placeholder="Tulis pesan Anda di sini..."
            rows={5}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 bg-background/80 focus:outline-none resize-none ${
              focusedField === "message"
                ? "border-primary shadow-lg shadow-primary/20"
                : "border-border hover:border-primary/50"
            }`}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8">
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-95 text-base"
          >
            Kirim Pesan
          </Button>
        </motion.div>
      </Card>
    </motion.form>
  );
}
