"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/butons";
import { Card } from "@/components/ui/card";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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

    if (formRef.current) {
      observer.observe(formRef.current);
      const inputs = formRef.current.querySelectorAll("input, textarea");
      inputs.forEach((input, index) => {
        const htmlInput = input as HTMLElement;
        htmlInput.style.animationDelay = `${index * 0.1}s`;
        observer.observe(input);
      });
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-8 border-2 border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">
          Kirim Pesan Kami
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Name Field */}
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
              style={{
                animation: "slideInField 0.6s ease-out forwards",
                opacity: 0,
              }}
            />
          </div>

          {/* Email Field */}
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
              style={{
                animation: "slideInField 0.6s ease-out 0.1s forwards",
                opacity: 0,
              }}
            />
          </div>
        </div>

        {/* Subject Field */}
        <div className="form-group mt-6">
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
            style={{
              animation: "slideInField 0.6s ease-out 0.2s forwards",
              opacity: 0,
            }}
          />
        </div>

        {/* Message Field */}
        <div className="form-group mt-6">
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
            style={{
              animation: "slideInField 0.6s ease-out 0.3s forwards",
              opacity: 0,
            }}
          />
        </div>

        {/* Submit Button */}
        <div
          className="mt-8"
          style={{
            animation: "slideInField 0.6s ease-out 0.4s forwards",
            opacity: 0,
          }}
        >
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-95 text-base"
          >
            {submitted ? "✓ Pesan Terkirim!" : "Kirim Pesan"}
          </Button>
        </div>

        {submitted && (
          <Card className="mt-6 p-4 bg-primary/10 border-primary/30 animate-in fade-in slide-in-from-bottom-4">
            <p className="text-sm text-primary font-medium">
              ✓ Terima kasih! Kami akan segera menghubungi Anda dalam 24 jam.
            </p>
          </Card>
        )}
      </Card>

      <style jsx>{`
        @keyframes slideInField {
          from {
            opacity: 0;
            transform: translateX(-1rem);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .form-group {
          animation: slideInField 0.6s ease-out forwards;
        }

        .animate-visible {
          animation: slideInField 0.6s ease-out forwards !important;
        }
      `}</style>
    </form>
  );
}
