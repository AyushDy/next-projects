import { JobType } from "@/data/data";
import axios from "axios";
import { success } from "zod";

export async function getAllJobs(page: number = 1) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/jobs`,
      {
        params: { page },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}


export async function addJob(JobData: JobType) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/jobs`,
      JobData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding job:", error);
    throw error;
  }
}

export async function deleteJobAdmin(id: string) {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/jobs/${id}`, {
      withCredentials: true,
    });
    return {success :true};
  } catch (error) {
    return { success : false};
  }
}

