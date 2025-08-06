import { Star } from "lucide-react";
import PlaceholderSection from "@/components/UI/reusable/PlaceholderSection";

interface CompanyInfoSectionProps {
  showPlaceholder?: boolean;
}

export default function CompanyInfoSection({
  showPlaceholder = true,
}: CompanyInfoSectionProps) {
  if (!showPlaceholder) return null;

  return (
    <div className="mt-12 bg-card/15 backdrop-blur-lg border border-border/20 rounded-2xl p-8">
      <div className="text-center text-muted-foreground">
        <div className="w-16 h-16 bg-muted/20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Star className="w-8 h-8 opacity-50" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Company Information</h3>
        <p className="text-sm max-w-md mx-auto">
          Detailed company profile, culture, and additional job openings will be
          displayed here
        </p>
      </div>
    </div>
  );
}
