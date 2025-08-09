"use client";

import { ArrowLeft, Plus } from "lucide-react";
import CompanyHeader from "./CompanyHeader";
import JobsList from "../UI/lists/JobsList";
import Button from "@/components/UI/Button";
import { Company,  } from "@/lib/types";
import { useState } from "react";
import AddJobFormWrapper from "../admin/AddJobFormWrapper";
import { JWTPayload } from "jose";
import ReviewsSection from "./ReviewsSection";

interface CompanyJobManagerProps {
  company: Company;
  user: JWTPayload
}

export default function CompanyJobManager({
  company,
}: CompanyJobManagerProps) {
  const [tab, setTab] = useState<"job-list" | "add">("job-list");

  function toggleTab() {
    setTab((prevTab) => (prevTab === "job-list" ? "add" : "job-list"));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br  from-background/50 to-background pt-20 p-4">
      <div className="max-w-6xl shadow mx-auto space-y-6">
        <CompanyHeader company={company} />

        <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Job Posting
            </h2>
            <Button
              variant="primary"
              icon={tab === "job-list" ? Plus : ArrowLeft}
              iconPosition="left"
              onClick={toggleTab}
            >
              {tab === "job-list" ? "Add Job" : "Back"}
            </Button>
          </div>

          {tab === "job-list" && <JobsList companyId={company.id} />}
          {tab === "add" && <AddJobFormWrapper />}


        </div>

        < ReviewsSection company={company} />
      </div>
    </div>
  );
}
