"use client";

import { Company } from "@/lib/types";
import GuestCompanyHeader from "./GuestCompanyHeader";
import CompanyJobsSection from "./CompanyJobsSection";
import ReviewsSection from "./ReviewsSection";

interface CompanyGuestViewProps {
  company: Company;
  user?: any;
}

export default function CompanyGuestView({
  company,
  user,
}: CompanyGuestViewProps) {
  return (
    <div className="min-h-screen bg-background pt-32">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <GuestCompanyHeader company={company} />
        <CompanyJobsSection />
        <ReviewsSection company={company} user={user} />
      </div>
    </div>
  );
}
