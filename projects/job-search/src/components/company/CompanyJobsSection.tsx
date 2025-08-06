"use client";

import { AuthContextType, useAuthContext } from "@/contexts/AuthContext";
import { JobWithTime } from "@/lib/types";
import { useEffect, useState } from "react";
import ViewDetails from "../UI/buttons/ViewDetails";

export default function CompanyJobsSection() {
  const [jobs, setJobs] = useState<JobWithTime[]>([]);

  const { company } = useAuthContext() as AuthContextType;
  const companyId = company?.id;

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch(`/api/companies/jobs`);
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } finally {
      }
    }
    fetchJobs();
  }, [companyId]);

  return (
    <div className="bg-card/30 backdrop-blur-lg border-2 border-border/30 rounded-2xl p-8">
      <h2 className="text-2xl font-semibold text-foreground mb-6">
        Current Openings
      </h2>
      <div className="flex flex-col w-full p-4 space-y-4 bg-muted/10 border border-border/20 rounded-xl">
        {jobs &&
          jobs?.map((job: JobWithTime) => (
            <div
              key={job.job_id}
              className="w-full p-4 flex justify-between items-center rounded-lg bg-card/40 border border-border/20 hover:bg-card/60 transition-colors shadow-sm"
            >
              <span className="font-medium text-foreground">
                {job.job_title}
              </span>
              <ViewDetails job_id={job.job_id} />
            </div>
          ))}
        {(!jobs || jobs.length === 0) && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No job openings available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
