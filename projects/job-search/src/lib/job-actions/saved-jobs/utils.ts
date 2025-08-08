import axios from "axios";
import { JobWithTime } from "../../types";
import { success } from "zod";

export function getLocalJobs() {
  try {
    const jobIds = localStorage.getItem("saved-jobs");
    return jobIds ? JSON.parse(jobIds) : [];
  } catch {
    return [];
  }
}


export async function getAppliedJobs(){
  try{
    const result = await axios.get("/api/jobs/applications", {
      withCredentials: true,
    });
    if (!result.status) {
      return {success:false, message: "Failed to get applied jobs"};
    }
    return {success:true, data: result.data};
  } catch(error) {
    return {success:false, message: "Failed to get applied jobs"};
  }
}


export async function getAppliedJobIds(){

}

export function saveJobsInLocal(jobIds: string[]) {
  try {
    localStorage.setItem("saved-jobs", JSON.stringify(jobIds));
  } catch {
    throw new Error("Failed to save item.");
  }
}

export async function getSavedJobs() {
  try {
    const response = await axios.get("/api/jobs/saved", {
      withCredentials: true,
    });
    if (!response.status) {
      return { success: false };
    }
    return { success: true, data: response.data.savedJobs };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "failed to fetch saved jobs",
      data: [],
    };
  }
}

export async function saveJobInDB(jobId: string) {
  try {
    const response = await axios.post(
      `/api/jobs/saved/save`,
      {
        jobId,
      },
      {
        withCredentials: true,
      }
    );
    if (!response.status) {
      return { success: false, message: "Failed to save job" };
    }
    return {
      success: true,
      message: "Job saved successfully",
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to save job",
    };
  }
}



export async function removeSavedJob(jobId: string) {
  try {
    const response = await axios.delete(`/api/jobs/saved/remove`, {
      data: {id : jobId},
      withCredentials: true,
    });
    if (!response.status) {
      return { success: false, message: "Failed to remove saved job" };
    }
    return {
      success: true,
      message: "Job removed from saved jobs",
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to remove saved job",
    };
  }
}
