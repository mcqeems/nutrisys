// types/feature.ts

import { LucideIcon } from "lucide-react";

// Tipe data dasar untuk satu fitur
export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon; // Menggunakan LucideIcon untuk tipe data icon
  color: string;
  details: string[];
}

// Tipe untuk props FeatureCard
export interface FeatureCardProps {
  feature: Feature & {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  style: React.CSSProperties;
}

// Tipe data untuk langkah-langkah penggunaan
export interface Step {
  step: string;
  title: string;
  description: string;
}
