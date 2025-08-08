"use client";

import { useSavedContext } from "@/contexts/SavedJobsContext";
import { Bookmark } from "lucide-react";

import { JobWithTime } from "@/lib/types";
import { useAppliedContext } from "@/contexts/AppliedJobsContext";
import ProfileJobCard from "./ProfileJobCard";

export default function ProfileJobsList({type = "saved" }: { type?: string }) {
  const { savedJobsList } = useSavedContext();
  const { appliedJobs } = useAppliedContext();



  const jobList = type === "saved" ? savedJobsList : appliedJobs;


  if (!Array.isArray(jobList) || jobList.length === 0) {
    return (
      <div className="text-center py-8">
        <Bookmark className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 className="font-semibold mb-2">
          No {type === "saved" ? "Saved" : "Applied"} Jobs
        </h3>
        <p className="text-gray-600 mb-4">
          Start browsing to {type === "saved" ? "save" : "apply for"} jobs you
          like!
        </p>
        <p className="inline-block px-4 py-2 text-blue-600 rounded">
          Search for Jobs
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4 ">
      {jobList.map((job: JobWithTime) => (
        <ProfileJobCard key={job.id} type={type} job={job} />
      ))}
    </div>
  );
}
