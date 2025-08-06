"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import Button from "@/components/UI/Button";

interface ReviewModalProps {
  isOpen: boolean;
  companyName: string;
  onClose: () => void;
  onSubmit: (rating: number, review: string) => Promise<void>;
}

export default function ReviewModal({
  isOpen,
  companyName,
  onClose,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!rating || !review.trim()) return;

    setSubmitting(true);
    try {
      await onSubmit(rating, review);
      setRating(0);
      setReview("");
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card/95 backdrop-blur-xl border border-border/30 rounded-2xl shadow-2xl max-w-md w-full m-4 p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Leave a Review for {companyName}
        </h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Rating
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="p-1"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Review
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with this company..."
            className="w-full h-32 px-4 py-3 bg-muted/20 border border-border/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!rating || !review.trim() || submitting}
            className="bg-gradient-to-r from-primary to-primary/80"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </div>
    </div>
  );
}
