"use client";

import { useSavedContext } from "@/contexts/SavedJobsContext";
import { Bookmark } from "lucide-react";

import SaveButton from "../buttons/SaveButton";
import { JobWithTime } from "@/lib/types";
import { useEffect, useState } from "react";
import { getSavedJobs } from "@/lib/job-actions/saved-jobs/utils";
import Button from "../Button";
import Link from "next/link";

export default function SavedJobsList() {
  const [savedJobs, setSavedJobs] = useState<JobWithTime[]>([]);

  useEffect(() => {
    async function fetchSavedJobs() {
      const jobs = await getSavedJobs();
      if (jobs.success) {
        setSavedJobs(jobs.data);
      }
    }
    fetchSavedJobs();
  }, []);

  if (!Array.isArray(savedJobs) || savedJobs.length === 0) {
    return (
      <div className="text-center py-8">
        <Bookmark className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 className="font-semibold mb-2">No Saved Jobs</h3>
        <p className="text-gray-600 mb-4">
          Start browsing to save jobs you like!
        </p>
        <p className="inline-block px-4 py-2 text-blue-600 rounded">
          Search for Jobs
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 ">
      {savedJobs.map((job: JobWithTime, index) => (
        <div
          key={job.id + index}
          className="flex justify-between p-4 border rounded"
        >
          {job.title}
          <div>
            <Button variant="primary" className="mr-2">
              <Link href={`/jobs/${job.id}`}>View Job</Link>
            </Button>
            <SaveButton job={job} />
          </div>
        </div>
      ))}
    </div>
  );
}
