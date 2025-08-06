"use client";

import { Star, User, Calendar, Trash2 } from "lucide-react";
import { useAuthContext } from "@/contexts/AuthContext";

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

interface ReviewItemProps {
  review: Review;
  onDelete: (reviewId: string) => void;
  isDeleting: boolean;
}

export default function ReviewItem({
  review,
  onDelete,
  isDeleting,
}: ReviewItemProps) {
  const authContext = useAuthContext();
  const currentUser = authContext?.user;
  const isOwner = currentUser?.id === review.userId;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  return (
    <div className="group relative bg-background/40 border border-border/40 rounded-xl p-5 hover:border-border/60 transition-all duration-200">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-11 h-11 bg-gradient-to-br from-muted/30 to-muted/10 border border-border/30 rounded-full flex items-center justify-center">
            {review.user?.logo ? (
              <img
                src={review.user.logo}
                alt={review.user.username}
                className="w-9 h-9 rounded-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-muted-foreground/70" />
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-medium text-foreground/90 text-sm">
                {review.user?.username || "Anonymous User"}
              </h4>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/20"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground/70 ml-1.5">
                    {review.rating}/5
                  </span>
                </div>
                <span className="text-xs text-muted-foreground/60">•</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground/60">
                  <Calendar className="w-3 h-3" />
                  {formatDate(review.createdAt)}
                </div>
              </div>
            </div>

            {isOwner && (
              <button
                onClick={() => onDelete(review.id)}
                disabled={isDeleting}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-red-400/70 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200 disabled:opacity-50"
                title="Delete review"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="mt-3 text-sm text-foreground/80 leading-relaxed">
            {review.content}
          </div>
        </div>
      </div>
    </div>
  );
}
