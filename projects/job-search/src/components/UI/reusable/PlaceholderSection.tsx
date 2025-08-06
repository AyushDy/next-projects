import { LucideIcon } from "lucide-react";

interface PlaceholderSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "default" | "small";
}

export default function PlaceholderSection({
  icon: Icon,
  title,
  description,
  variant = "default",
}: PlaceholderSectionProps) {
  const isSmall = variant === "small";

  return (
    <div className="bg-card/15 backdrop-blur-lg border-2 border-dashed border-border/30 rounded-xl p-6 text-center">
      <div className="text-muted-foreground">
        <Icon
          className={`mx-auto mb-2 opacity-50 ${
            isSmall ? "w-6 h-6" : "w-8 h-8 mb-3"
          }`}
        />
        <h3 className={`font-medium mb-1 ${isSmall ? "text-sm" : ""}`}>
          {title}
        </h3>
        <p className={`${isSmall ? "text-xs" : "text-sm"}`}>{description}</p>
      </div>
    </div>
  );
}
