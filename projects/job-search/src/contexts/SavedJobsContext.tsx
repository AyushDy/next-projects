"use client";

import {
  getLocalJobIds,
  getSavedJobIds,
  removeSavedJob,
  saveJobInDB,
  saveJobIdsInLocal,
} from "@/lib/job-actions/saved-jobs/utils";
import { useContext, createContext, useState, useEffect, useRef } from "react";
import { AuthContextType, useAuthContext } from "./AuthContext";
import {
  getAppliedjobIds,
  applyForJob,
} from "@/lib/job-actions/appy-actions/utils";

type SavedJobsContextType = {
  savedJobIds: string[];
  saveJobId: (job_id: string) => Promise<{ success: boolean }>;
  removeJobId: (job_id: string) => Promise<{ success: boolean }>;
  isJobSaved: (job_id: string) => boolean;
  isApplied: (job_id: string) => boolean;
  applyForJobId: (job_id: string) => Promise<{ success: boolean }>;
  savingJobId: string | null;
  removingJobId: string | null;
  applyingJobId: string | null;
};

const SavedJobsContext = createContext<SavedJobsContextType>({
  savedJobIds: [],
  saveJobId: async (job_id: string) => ({ success: false }),
  removeJobId: async (job_id: string) => ({ success: false }),
  isJobSaved: (job_id: string) => true,
  isApplied: (job_id: string) => false,
  applyForJobId: async (job_id: string) => ({ success: false }),
  savingJobId: null,
  removingJobId: null,
  applyingJobId: null,
});

export default function SavedJobsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const jobIdsSavedRef = useRef<Set<string>>(new Set<string>());
  const [appliedJobIds, setAppliedIds] = useState<string[]>([]);

  const [savingJobId, setSavingJobId] = useState<string | null>(null);
  const [removingJobId, setRemovingJobId] = useState<string | null>(null);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [jajaja, forceUpdate] = useState({});
  const { isAuthenticated, loading: authLoading } =
    useAuthContext() as AuthContextType;

  const getSavedJobsArray = () => Array.from(jobIdsSavedRef.current);

  const isApplied = (job_id: string) => {
    return appliedJobIds?.includes(job_id);
  };

  const updateSavedJobs = (jobIds: string[]) => {
    jobIdsSavedRef.current.clear();
    jobIds.forEach((job_id) => jobIdsSavedRef.current.add(job_id));
    saveJobIdsInLocal(jobIds);
    forceUpdate({});
  };

  useEffect(() => {
    if (authLoading) return;

    async function initialiseCart() {
      if (isAuthenticated) {
        try {
          const [savedIds, appliedIds] = await Promise.all([
            getSavedJobIds(),
            getAppliedjobIds(),
          ]);
          updateSavedJobs(savedIds.data || []);
          setAppliedIds(appliedIds.data);
        } catch {
          updateSavedJobs([]);
        }
      } else {
        const localJobs = getLocalJobIds();
        updateSavedJobs(localJobs);
      }
    }
    initialiseCart();
  }, [isAuthenticated, authLoading]);

  async function saveJobId(job_id: string) {
    if (jobIdsSavedRef.current.has(job_id)) return { success: false };
    setSavingJobId(job_id);
    try {
      const res = await saveJobInDB(job_id);
      if (res.success) {
        jobIdsSavedRef.current.add(job_id);
        const updated = Array.from(jobIdsSavedRef.current);
        updateSavedJobs(updated);
        setSavingJobId(null);
        return { success: true };
      }
    } catch (error) {}
    setSavingJobId(null);
    return { success: false };
  }

  async function removeJobId(job_id: string) {
    setRemovingJobId(job_id);
    try {
      const res = await removeSavedJob(job_id);
      if (res.success) {
        jobIdsSavedRef.current.delete(job_id);
        const updated = Array.from(jobIdsSavedRef.current);
        updateSavedJobs(updated);
        setRemovingJobId(null);
        return { success: true };
      }
    } catch {}
    setRemovingJobId(null);
    return { success: false };
  }

  function isJobSaved(job_id: string) {
    return jobIdsSavedRef.current.has(job_id);
  }

  async function applyForJobId(job_id: string) {
    if (appliedJobIds.includes(job_id)) return { success: false };
    setApplyingJobId(job_id);
    try {
      const res = await applyForJob(job_id);
      if (res.success) {
        setAppliedIds((prev) => [...prev, job_id]);
        setApplyingJobId(null);
        return { success: true };
      }
    } catch (error) {}
    setApplyingJobId(null);
    return { success: false };
  }

  return (
    <SavedJobsContext.Provider
      value={{
        savedJobIds: getSavedJobsArray(),
        saveJobId,
        removeJobId,
        savingJobId,
        removingJobId,
        isJobSaved,
        isApplied,
        applyForJobId,
        applyingJobId,
      }}
    >
      {children}
    </SavedJobsContext.Provider>
  );
}

export const useSavedContext = () => useContext(SavedJobsContext);
