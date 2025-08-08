"use client";

import { useEffect, useState } from "react";
import ReviewsHeader from "./ReviewsHeader";
import ReviewsGrid from "./ReviewsGrid";
import ReviewsLoading from "./ReviewsLoading";

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

interface ReviewsListProps {
  companyId: string;
}

export default function ReviewsList({ companyId }: ReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [companyId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/companies/${companyId}/reviews`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews || []);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    setDeletingReviewId(reviewId);
    try {
      const response = await fetch(
        `/api/companies/${companyId}/reviews?reviewId=${reviewId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setReviews((prev) => prev.filter((review) => review.id !== reviewId));
      } else {
        console.error("Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    } finally {
      setDeletingReviewId(null);
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;
  if (loading) {
    return <ReviewsLoading />;
  }

  return (
    <div className="bg-card/20 backdrop-blur-lg border border-border/30 rounded-2xl p-6">
      <ReviewsHeader
        reviewCount={reviews.length}
        averageRating={averageRating}
      />
      <ReviewsGrid
        reviews={reviews}
        onDeleteReview={handleDeleteReview}
        deletingReviewId={deletingReviewId}
      />
    </div>
  );
}
