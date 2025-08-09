import { CheckCircle } from "lucide-react";

interface JobBenefitsProps {
  benefits: string[];
}

export default function JobBenefits({ benefits }: JobBenefitsProps) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
        Benefits & Perks
      </h3>
      <div className="space-y-2">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="text-xs sm:text-sm">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
