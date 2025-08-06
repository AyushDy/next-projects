"use client";

import ReviewItem from "./ReviewItem";

interface Review {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
  userId: string;
  user: {
    username: string;
    logo: string | null;
  } | null;
}

interface ReviewsGridProps {
  reviews: Review[];
  onDeleteReview: (reviewId: string) => void;
  deletingReviewId: string | null;
}

export default function ReviewsGrid({
  reviews,
  onDeleteReview,
  deletingReviewId,
}: ReviewsGridProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/5 border border-dashed border-border/40 rounded-xl">
        <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-7 h-7 text-muted-foreground/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <p className="text-foreground/60 font-medium mb-1">No reviews yet</p>
        <p className="text-sm text-muted-foreground/70">
          Share your experience and be the first to review
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          onDelete={onDeleteReview}
          isDeleting={deletingReviewId === review.id}
        />
      ))}
    </div>
  );
}
