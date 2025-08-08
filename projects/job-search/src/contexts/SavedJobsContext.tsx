"use client";

import {
  removeSavedJob,
  saveJobInDB,
  getSavedJobs,
} from "@/lib/job-actions/saved-jobs/utils";
import { useContext, createContext, useState, useEffect, useRef } from "react";
import { AuthContextType, useAuthContext } from "./AuthContext";
import { JobWithTime } from "@/lib/types";

type SavedJobsContextType = {
  savedJobsList: JobWithTime[];
  saveJob: (job: JobWithTime) => Promise<{ success: boolean }>;
  removeJob: (id: string) => Promise<{ success: boolean }>;
  isJobSaved: (id: string) => boolean;
  savingJobId: string | null;
  removingJobId: string | null;
};

const SavedJobsContext = createContext<SavedJobsContextType>({
  savedJobsList: [],
  saveJob: async (job: JobWithTime) => ({ success: false }),
  removeJob: async (id: string) => ({ success: false }),
  isJobSaved: (id: string) => true,
  savingJobId: null,
  removingJobId: null,
});

export default function SavedJobsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const jobsSavedRef = useRef<Map<string, JobWithTime>>(new Map<string, JobWithTime>());
  const [savingJobId, setSavingJobId] = useState<string | null>(null);
  const [removingJobId, setRemovingJobId] = useState<string | null>(null);
  const [jajaja, forceUpdate] = useState({});
  const { isAuthenticated, loading: authLoading } =
    useAuthContext() as AuthContextType;

  const getSavedJobsArray = () => Array.from(jobsSavedRef.current.values());

  const updateSavedJobs = (jobs: JobWithTime[]) => {
    jobsSavedRef.current.clear();
    jobs.forEach((job) => jobsSavedRef.current.set(job.id, job));
    forceUpdate({});
  };

  useEffect(() => {
    if (authLoading) return;
    async function initialiseCart() {
      if (isAuthenticated) {
        try {
          const savedJobs = await getSavedJobs();
          const jobs = savedJobs?.data?.map((savedJob: any) => savedJob.job);
          updateSavedJobs(jobs);
        } catch {
          updateSavedJobs([]);
        }
      }
    }
    initialiseCart();
  }, [isAuthenticated, authLoading]);

  async function saveJob(job: JobWithTime) : Promise<{ success: boolean }> {
    if (jobsSavedRef.current.has(job.id)) return { success: false };
    setSavingJobId(job.id);
    try {
      const res = await saveJobInDB(job.id);
      if (res.success) {
        jobsSavedRef.current.set(job.id, job);
        const updated = Array.from(jobsSavedRef.current.values());
        updateSavedJobs(updated);
        setSavingJobId(null);
        return { success: true };
      }
    } catch (error) {}
    setSavingJobId(null);
    return { success: false };
  }

  async function removeJob(id: string) {
    setRemovingJobId(id);
    try {
      const res = await removeSavedJob(id);
      if (res.success) {
        jobsSavedRef.current.delete(id);
        const updated = Array.from(jobsSavedRef.current.values());
        updateSavedJobs(updated);
        setRemovingJobId(null);
        return { success: true };
      }
    } catch {}
    setRemovingJobId(null);
    return { success: false };
  }

  function isJobSaved(id: string) {
    return jobsSavedRef.current.has(id);
  }

  return (
    <SavedJobsContext.Provider
      value={{

        savedJobsList: getSavedJobsArray(),
        saveJob,
        removeJob,
        savingJobId,
        removingJobId,
        isJobSaved,
      }}
    >
      {children}
    </SavedJobsContext.Provider>
  );
}

export const useSavedContext = () => useContext(SavedJobsContext);
