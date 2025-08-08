"use client";

import { useContext, createContext, useState, useEffect, useRef } from "react";
import { AuthContextType, useAuthContext } from "./AuthContext";
import { JobWithTime } from "@/lib/types";
import { applyForJob, getAppliedjobs, withdrawApplicationFromDB } from "@/lib/job-actions/appy-actions/utils";

export type AppliedJobsContextType = {
  applyJob: (job: JobWithTime, content: string ) => Promise<{ success: boolean }>;
  withdrawApplication: (jobId: string) => Promise<{ success: boolean }>;
  isJobApplied: (id: string) => boolean;
  appliedJobs: JobWithTime[];
  applyingJobId: string | null;
  withdrawingJobId: string | null;
};

const AppliedJobsContext = createContext<AppliedJobsContextType>({
  applyJob: async (job: JobWithTime, content: string) => ({ success: false }),
  withdrawApplication: async (jobId: string) => ({ success: false }),
  isJobApplied: (id: string) => true,
  appliedJobs: [],
  applyingJobId: null,
  withdrawingJobId: null,
});

export default function AppliedJobsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const jobsAppliedRef = useRef<Map<string, JobWithTime>>(
    new Map<string, JobWithTime>()
  );
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [withdrawingJobId, setWithdrawingJobId] = useState<string | null>(null);
  const [jajaja, forceUpdate] = useState({});
  const { isAuthenticated, loading: authLoading } =
    useAuthContext() as AuthContextType;

  const updateAppliedJobs = (jobs: JobWithTime[]) => {
    jobsAppliedRef.current.clear();
    jobs.forEach((job) => jobsAppliedRef.current.set(job.id, job));
    forceUpdate({});
  };

  useEffect(() => {
    if (authLoading) return;
    async function initialiseCart() {
      if (isAuthenticated) {
        try {
          const appliedJobs = await getAppliedjobs();
          const jobs = appliedJobs?.data.map(
            (appliedJob: any) => appliedJob.job
          );
          updateAppliedJobs(jobs || []);
        } catch {
          updateAppliedJobs([]);
        }
      } else {
        updateAppliedJobs([]);
      }
    }
    initialiseCart();
  }, [isAuthenticated, authLoading]);

  async function applyJob(job: JobWithTime, content: string): Promise<{ success: boolean }> {
    if (jobsAppliedRef.current.has(job.id)) return { success: false };
    setApplyingJobId(job.id);
    try {
      const res = await applyForJob(job.id, content);
      if (res.success) {
        jobsAppliedRef.current.set(job.id, job);
        const updated = Array.from(jobsAppliedRef.current.values());
        updateAppliedJobs(updated);
        setApplyingJobId(null);
        return { success: true };
      }
    } catch (error) {}
    setApplyingJobId(null);
    return { success: false };
  }

  async function withdrawApplication(jobId: string) {
    setWithdrawingJobId(jobId);
    try {
      const res = await withdrawApplicationFromDB(jobId);
      if (res.success) {
        jobsAppliedRef.current.delete(jobId);
        const updated = Array.from(jobsAppliedRef.current.values());
        updateAppliedJobs(updated);
        setWithdrawingJobId(null);
        return { success: true };
      }
    } catch {}
    setWithdrawingJobId(null);
    return { success: false };
  }

  function isJobApplied(jobId: string) {
    return jobsAppliedRef.current.has(jobId);
  }

    function getAppliedJobs() {
        return Array.from(jobsAppliedRef.current.values());
    }
  return (
    <AppliedJobsContext.Provider
      value={{
        applyJob,
        appliedJobs: getAppliedJobs(),
        withdrawApplication,
        applyingJobId,
        withdrawingJobId,
        isJobApplied,
      }}
    >
      {children}
    </AppliedJobsContext.Provider>
  );
}

export const useAppliedContext = () => useContext(AppliedJobsContext);
