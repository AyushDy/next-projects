"use client";

import { Star, MessageSquare } from "lucide-react";

interface ReviewsHeaderProps {
  reviewCount: number;
  averageRating?: number;
}

export default function ReviewsHeader({
  reviewCount,
  averageRating,
}: ReviewsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">Reviews</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              {reviewCount} review{reviewCount !== 1 ? "s" : ""}
            </span>
            {averageRating && reviewCount > 0 && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-medium">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
