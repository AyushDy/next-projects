import { CheckCircle } from "lucide-react";

interface JobListSectionProps {
  title: string;
  items: string[];
  iconColor?: string;
}

export default function JobListSection({
  title,
  items,
  iconColor = "text-primary",
}: JobListSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-card/20 backdrop-blur-lg border overflow-hidden border-border/20 rounded-xl p-4 sm:p-6 lg:p-8">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-3 sm:mb-4">
        {title}
      </h2>
      <ul className="space-y-2 sm:space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground"
          >
            <CheckCircle
              className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor} mt-0.5 flex-shrink-0`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
