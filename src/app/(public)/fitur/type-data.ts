
import { LucideIcon } from "lucide-react";

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon; 
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

export interface Step {
  step: string;
  title: string;
  description: string;
}
