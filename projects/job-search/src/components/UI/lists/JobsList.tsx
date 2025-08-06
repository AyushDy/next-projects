"use client";

import { Eye } from "lucide-react";
import { useState, useEffect } from "react";
import JobCard from "../../company/JobCard";
import { JobWithTime } from "@/lib/types";
import { deleteJobCompany } from "@/lib/admin-client/company-utils";

interface JobsListProps {
  companyId: string;
}

export default function JobsList({ companyId }: JobsListProps) {
  const [jobs, setJobs] = useState<JobWithTime[]>([]);
  const [prevJobs, setPrevJobs] = useState<JobWithTime[]>([]);
  const [loading, setLoading] = useState(true);

  async function handleDelete(jobId: string) {
    try {
      const res = await deleteJobCompany(jobId);
      if (res.success) {
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
        setPrevJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      } else {
        setJobs(prevJobs);
        throw new Error("Failed to delete job");
      }
    } catch (error) {
      setJobs(prevJobs);
      console.error("Error deleting job:", error);
    }
  }

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch(`/api/companies/jobs`);
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data.jobs || []);
        setPrevJobs(data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [companyId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!Array.isArray(jobs) || jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-muted/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Eye className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          No jobs posted yet
        </h3>
        <p className="text-muted-foreground">
          Start by creating your first job posting.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard handleDelete={handleDelete} key={job.id} job={job} />
      ))}
    </div>
  );
}
