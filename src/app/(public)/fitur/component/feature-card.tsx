import { Check, ArrowRight } from "lucide-react";
import { FeatureCardProps } from "../type-data";

export default function FeatureCard({ feature, style }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <div
      key={feature.id}
      className="group relative animate-fade-in-up cursor-pointer"
      style={style}
      onMouseEnter={feature.onMouseEnter}
      onMouseLeave={feature.onMouseLeave}
    >
      <div className="relative p-8 bg-card rounded-2xl border border-border hover:border-primary transition-all duration-500 h-full overflow-hidden">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-primary/5 to-transparent rounded-2xl"></div>

        <div className="relative space-y-6">
          {/* Icon Container */}
          <div className="inline-flex">
            <div
              className={`p-3 bg-linear-to-br ${feature.color} rounded-xl text-white shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110`}
            >
              <Icon className="w-6 h-6" />
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>

          {/* Details List */}
          <ul className="space-y-2 pt-4 border-t border-border/50">
            {feature.details.map((detail, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
              >
                <Check className="w-4 h-4 text-primary shrink-0" />
                {detail}
              </li>
            ))}
          </ul>

          {/* Arrow indicator */}
          <div className="pt-2 flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
            <span className="text-sm font-semibold">Pelajari lebih</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
