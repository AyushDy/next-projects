"use client";

import { MessageCircle, Star } from "lucide-react";
import Button from "@/components/UI/Button";

interface ReviewsSectionHeaderProps {
  user?: any;
  companyName: string;
  onLeaveReviewClick: () => void;
}

export default function ReviewsSectionHeader({
  user,
  companyName,
  onLeaveReviewClick,
}: ReviewsSectionHeaderProps) {
  return (
    <div className="bg-card/20 backdrop-blur-lg border border-border/30 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
            <MessageCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Company Reviews
            </h2>
            <p className="text-sm text-muted-foreground">
              Share your experience with {companyName}
            </p>
          </div>
        </div>

        {user && (
          <Button
            onClick={onLeaveReviewClick}
            className="flex items-center gap-2 bg-primary/90 hover:bg-primary text-primary-foreground px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            <Star className="w-4 h-4" />
            Leave Review
          </Button>
        )}
      </div>

      {!user && (
        <div className="bg-muted/10 border border-border/20 rounded-xl p-4">
          <p className="text-sm text-muted-foreground text-center">
            <span className="font-medium">Want to leave a review?</span> Sign in
            to share your experience with this company.
          </p>
        </div>
      )}
    </div>
  );
}
