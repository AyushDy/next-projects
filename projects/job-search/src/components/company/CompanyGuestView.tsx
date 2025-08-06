"use client";

import { useState } from "react";
import { Company } from "@/lib/types";
import GuestCompanyHeader from "./GuestCompanyHeader";
import CompanyJobsSection from "./CompanyJobsSection";
import ReviewModal from "./ReviewModal";
import ReviewsList from "./ReviewsList";

interface CompanyGuestViewProps {
  company: Company;
  user?: any;
}

export default function CompanyGuestView({
  company,
  user,
}: CompanyGuestViewProps) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [refreshReviews, setRefreshReviews] = useState(0);

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
    <div className="min-h-screen bg-background pt-32">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <GuestCompanyHeader
          company={company}
          user={user}
          onReviewClick={() => setShowReviewModal(true)}
        />
        <CompanyJobsSection />
        <ReviewsList companyId={company.id} key={refreshReviews} />
      </div>

      <ReviewModal
        isOpen={showReviewModal}
        companyName={company.name}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
}
