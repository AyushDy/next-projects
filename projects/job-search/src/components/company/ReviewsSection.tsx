"use client";

import { useState } from "react";
import { Company } from "@/lib/types";
import ReviewsList from "./ReviewsList";
import ReviewModal from "./ReviewModal";
import ReviewsSectionHeader from "./ReviewsSectionHeader";
import { AuthContextType, useAuthContext } from "@/contexts/AuthContext";

interface ReviewsSectionProps {
  company: Company;
  user?: any;
}

export default function ReviewsSection({ company }: ReviewsSectionProps) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [refreshReviews, setRefreshReviews] = useState(0);
  const { user } = useAuthContext() as AuthContextType;

  const handleSubmitReview = async (rating: number, review: string) => {
    const response = await fetch(`/api/companies/${company.id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, content: review }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit review");
    }

    setRefreshReviews((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <ReviewsSectionHeader
        user={user}
        companyName={company.name}
        onLeaveReviewClick={() => setShowReviewModal(true)}
      />
      
      <ReviewsList 
        companyId={company.id} 
        key={refreshReviews} 
      />

      <ReviewModal
        isOpen={showReviewModal}
        companyName={company.name}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
}
