import { Star } from "lucide-react";

interface CompanyInfoSectionProps {
  showPlaceholder?: boolean;
}

export default function CompanyInfoSection({
  showPlaceholder = true,
}: CompanyInfoSectionProps) {
  if (!showPlaceholder) return null;

  return (
    <div className="mt-8 sm:mt-12 bg-card/15 backdrop-blur-lg border border-border/20 rounded-2xl p-4 sm:p-6 lg:p-8">
      <div className="text-center text-muted-foreground">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted/20 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
          <Star className="w-6 h-6 sm:w-8 sm:h-8 opacity-50" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold mb-2">Company Information</h3>
        <p className="text-xs sm:text-sm max-w-md mx-auto">
          Detailed company profile, culture, and additional job openings will be
          displayed here
        </p>
      </div>
    </div>
  );
}
