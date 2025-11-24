import { ChevronDown } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordian";

import Image from "next/image";
import FaqSection from "../../(home)/FaqSection";

const About = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}

      <section className="min-h-screen relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
        {/* Animated background orbs */}

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-[orb-pulse_8s_ease-in-out_infinite]" />

          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-[orb-pulse_10s_ease-in-out_infinite_2s]" />

          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-[orb-pulse_12s_ease-in-out_infinite_4s]" />
        </div>

        <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-[slide-up_0.8s_ease-out]">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                About{" "}
                <span className="text-linear animate-[pulse-glow_3s_ease-in-out_infinite]">
                  NutriSys
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed animate-[fade-in_1s_ease-out_0.3s_backwards]">
                Empowering healthier lives through intelligent nutrition
                {/* analysis. Your personal companion for understanding what you */}
                eat.
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground animate-[fade-in_1s_ease-out_0.6s_backwards]">
                <div className="flex items-center gap-2 group">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse group-hover:scale-150 transition-transform" />

                  <span className="group-hover:text-primary transition-colors">
                    AI-Powered
                  </span>
                </div>

                <div className="flex items-center gap-2 group">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse group-hover:scale-150 transition-transform" />

                  <span className="group-hover:text-primary transition-colors">
                    Privacy-First
                  </span>
                </div>

                <div className="flex items-center gap-2 group">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse group-hover:scale-150 transition-transform" />

                  <span className="group-hover:text-primary transition-colors">
                    Easy to Use
                  </span>
                </div>
              </div>
            </div>

            <div className="relative animate-[float-up_1s_ease-out_0.2s_backwards] hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-linear-to-br from-primary/30 to-accent/30 rounded-3xl blur-3xl animate-[pulse-glow_4s_ease-in-out_infinite]" />

              <Image
                src="/Logo/nutrisys.webp"
                width={150}
                height={150}
                alt="NutriSys Nutrition Analysis"
                className="relative rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>

        <ChevronDown className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 text-primary/40 animate-bounce" />
      </section>

      {/* What is NutriSys Section */}

      <section className="py-16 md:py-24 bg-linear-to-b from-transparent to-muted/30 relative overflow-hidden">
        {/* Floating decorative elements */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-1/4 w-32 h-32 border-2 border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />

          <div className="absolute bottom-20 right-1/4 w-24 h-24 border-2 border-accent/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold animate-[slide-up_0.8s_ease-out]">
              Nutrition Analysis{" "}
              <span className="text-linear animate-[pulse-glow_3s_ease-in-out_infinite]">
                Made Simple
              </span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed animate-[fade-in_1s_ease-out_0.2s_backwards]">
              NutriSys adalah aplikasi revolusioner yang menggunakan kecerdasan
              buatan untuk menganalisis kandungan nutrisi makanan Anda. Dengan
              teknologi computer vision canggih, kami dapat mengenali berbagai
              jenis makanan hanya dari foto dan memberikan informasi nutrisi
              yang detail dan akurat.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed animate-[fade-in_1s_ease-out_0.4s_backwards]">
              Didirikan dengan misi untuk membuat informasi nutrisi lebih
              accessible bagi semua orang, NutriSys membantu Anda membuat
              keputusan yang lebih baik tentang kesehatan Anda setiap hari.
            </p>
          </div>
        </div>
      </section>

      {/* Developer Section */}

      <section className="py-16 md:py-24 bg-linear-to-b from-muted/30 to-transparent relative overflow-hidden">
        {/* Animated particles */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-2 h-2 bg-primary rounded-full animate-[text-float_15s_ease-in-out_infinite]" />

          <div className="absolute top-1/3 right-20 w-3 h-3 bg-accent rounded-full animate-[text-float_18s_ease-in-out_infinite_2s]" />

          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary rounded-full animate-[text-float_20s_ease-in-out_infinite_4s]" />

          <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-accent rounded-full animate-[text-float_16s_ease-in-out_infinite_3s]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 animate-[slide-up_0.8s_ease-out]">
              Meet the{" "}
              <span className="text-linear animate-[pulse-glow_3s_ease-in-out_infinite]">
                Developers
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Developer 1 */}

              <div className="group relative animate-[float-up_1s_ease-out_0.2s_backwards]">
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

                <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground group-hover:scale-110 transition-transform duration-500">
                      A
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                        Developer 1
                      </h3>

                      <p className="text-muted-foreground">Lead AI Engineer</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Spesialis dalam machine learning dan computer vision.
                    Bertanggung jawab mengembangkan algoritma AI yang dapat
                    mengenali dan menganalisis berbagai jenis makanan dengan
                    akurasi tinggi.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium group-hover:bg-primary/20 transition-colors">
                      AI/ML
                    </span>

                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium group-hover:bg-primary/20 transition-colors">
                      Computer Vision
                    </span>

                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium group-hover:bg-primary/20 transition-colors">
                      Python
                    </span>
                  </div>
                </div>
              </div>

              {/* Developer 2 */}

              <div className="group relative animate-[float-up_1s_ease-out_0.4s_backwards]">
                <div className="absolute inset-0 bg-linear-to-br from-accent/20 to-primary/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

                <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-linear-to-br from-accent to-primary flex items-center justify-center text-2xl font-bold text-primary-foreground group-hover:scale-110 transition-transform duration-500">
                      B
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                        Developer 2
                      </h3>

                      <p className="text-muted-foreground">
                        Full Stack Developer
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Expert dalam web development dan nutrition science.
                    Membangun interface yang user-friendly dan memastikan data
                    nutrisi yang akurat berdasarkan penelitian ilmiah terkini.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-primary text-xs font-medium group-hover:bg-accent/20 transition-colors">
                      React
                    </span>

                    <span className="px-3 py-1 rounded-full bg-accent/10 text-primary text-xs font-medium group-hover:bg-accent/20 transition-colors">
                      Nutrition Science
                    </span>

                    <span className="px-3 py-1 rounded-full bg-accent/10 text-primary text-xs font-medium group-hover:bg-accent/20 transition-colors">
                      UX Design
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Quote */}

            <div className="mt-16 text-center animate-[fade-in_1s_ease-out_0.8s_backwards]">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-linear-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl" />

                <blockquote className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl px-8 py-6 max-w-2xl mx-auto">
                  <p className="text-xl md:text-2xl font-medium text-foreground italic">
                    "Technology should empower people to live healthier lives,
                    not complicate them."
                  </p>

                  <p className="text-sm text-muted-foreground mt-4">
                    - NutriSys Team
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}

      <FaqSection />

      {/* CTA Section */}

      <section className="py-16 md:py-24 bg-linear-to-br from-primary/10 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Start Your{" "}
              <span className="text-linear">Health Journey?</span>
            </h2>

            <p className="text-lg text-muted-foreground">
              Join thousands of users who are already making smarter nutrition
              choices with NutriSys
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover-lift">
                Get Started Free
              </button>

              <button className="px-8 py-4 bg-card border border-border rounded-xl font-semibold hover:bg-muted transition-all hover-lift">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
