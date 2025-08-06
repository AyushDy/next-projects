"use server";

import { getCompanyById } from "@/lib/company/utils";
import { getCurrentUser } from "@/lib/jwt";
import { getJobById } from "@/lib/utils";


export async function getJobWithPermissions(companyId:string, jobId:string){
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, message: "User not authenticated" };
  }
  const [companyRes, jobRes ] = await Promise.all([
    getCompanyById(companyId),
    getJobById(jobId)
  ])
  const company = companyRes?.data;
  const job = jobRes?.data?.data;



  const hasPermission = ((company?.ownerId === user.id && job?.company_id === company.id));

  if(user.role === "admin"){
    return { hasPermission: true, user, company, job, isAdmin: true };
  }

  

  if (!hasPermission) {
    return { success: false, message: "You do not have permission to access this job" };
  }

  return { hasPermission, user, company, job, isAdmin: false };
}


// Old job type (with job_posted_at)
type OldJobType = {
  job_title: string;
  employer_name: string;
  employer_logo: string;
  job_publisher: string;
  job_description: string;
  job_employment_type: string;
  job_is_remote: boolean | string;
  job_posted_at: string;
  job_city: string;
  job_location: string;
  job_benefits: string[];
  job_salary: number;
  job_min_salary: number;
  job_max_salary: number;
  job_salary_period: string;
  job_qualifications: string[];
  job_responsibilities: string[];
};

// New job type (current schema)
type JobType = {
  job_title: string;
  employer_name: string;
  employer_logo: string;
  job_publisher: string;
  job_description: string;
  job_employment_type: string;
  job_is_remote: boolean;
  job_city: string;
  job_location: string;
  job_benefits: string[];
  job_salary: number;
  job_min_salary: number;
  job_max_salary: number;
  job_salary_period: string;
  job_qualifications: string[];
  job_responsibilities: string[];
};

function mapOldJobToNew(oldJob: OldJobType): JobType {
  let isRemote: boolean;

  if (typeof oldJob.job_is_remote === "boolean") {
    isRemote = oldJob.job_is_remote;
  } else if (typeof oldJob.job_is_remote === "string") {
    const remoteStr = oldJob.job_is_remote.toLowerCase().trim();
    isRemote =
      remoteStr === "remote" ||
      remoteStr === "yes" ||
      remoteStr === "true" ||
      remoteStr === "1";
  } else {
    isRemote = false;
  }

  return {
    job_title: oldJob.job_title,
    employer_name: oldJob.employer_name,
    employer_logo: oldJob.employer_logo,
    job_publisher: oldJob.job_publisher,
    job_description: oldJob.job_description,
    job_employment_type: oldJob.job_employment_type,
    job_is_remote: isRemote,
    job_city: oldJob.job_city,
    job_location: oldJob.job_location,
    job_benefits: oldJob.job_benefits,
    job_salary: oldJob.job_salary,
    job_min_salary: oldJob.job_min_salary,
    job_max_salary: oldJob.job_max_salary,
    job_salary_period: oldJob.job_salary_period,
    job_qualifications: oldJob.job_qualifications,
    job_responsibilities: oldJob.job_responsibilities,
  };
}

// export async function uploadMany(jobsData: OldJobType[]) {
//   try {
//     // Validate input
//     if (!Array.isArray(jobsData) || jobsData.length === 0) {
//       return {
//         success: false,
//         error: "Invalid input: jobsData must be a non-empty array",
//         count: 0,
//       };
//     }

//     const jobsToUpload: JobType[] = jobsData.map(mapOldJobToNew);

//     const result = await db.job.createMany({
//       data: jobsToUpload,
//     });

//     return {
//       success: true,
//       count: result.count,
//       message: `Successfully uploaded ${result.count} job records`,
//     };
//   } catch (error) {
//     console.error("Error uploading jobs:", error);

//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Unknown error occurred",
//       count: 0,
//     };
//   }
// }

// export async function uploadManyWithDetails(jobsData: OldJobType[]) {
//   try {
//     if (!Array.isArray(jobsData) || jobsData.length === 0) {
//       return {
//         success: false,
//         error: "Invalid input: jobsData must be a non-empty array",
//         results: [],
//       };
//     }

//     const jobsToUpload: JobType[] = jobsData.map(mapOldJobToNew);

//     const results = [];
//     let successCount = 0;
//     let errorCount = 0;

//     for (let i = 0; i < jobsToUpload.length; i++) {
//       try {
//         const job = await db.job.create({
//           data: jobsToUpload[i],
//         });

//         results.push({
//           index: i,
//           success: true,
//           id: job.id,
//           job_title: job.job_title,
//         });
//         successCount++;
//       } catch (error) {
//         results.push({
//           index: i,
//           success: false,
//           error: error instanceof Error ? error.message : "Unknown error",
//           job_title: jobsToUpload[i].job_title,
//         });
//         errorCount++;
//       }
//     }

//     return {
//       success: errorCount === 0,
//       successCount,
//       errorCount,
//       total: jobsData.length,
//       results,
//       message: `Processed ${jobsData.length} jobs: ${successCount} successful, ${errorCount} failed`,
//     };
//   } catch (error) {
//     console.error("Error in uploadManyWithDetails:", error);

//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Unknown error occurred",
//       results: [],
//     };
//   }
// }



// export async function fillNullCompanyEntries() {

//   try {
//     const user = await getCurrentUser();
//     console.log("Current user:", user);
    
//     const company = await db.company.findUnique({
//       where: { ownerId: user?.id },
//     });
//     if (!company) {
//       return { success: false, message: "No company found for the user." };
//     }
//     const jobsWithMissingCompanyId = await db.job.aggregateRaw({
//       pipeline: [
//         {
//           $match: {
//             company_id: { $exists: false },
//           },
//         },
//         {
//           $limit: 20,
//         },
//       ],
//     });

//     if (!jobsWithMissingCompanyId || jobsWithMissingCompanyId.length === 0) {
//       return { success: false, message: "No jobs found without company." };
//     }

//     let jobIds: string[] = [];
//     if (Array.isArray(jobsWithMissingCompanyId)) {
//       jobIds = jobsWithMissingCompanyId
//         .filter((job: any) => job && typeof job === "object" && "id" in job)
//         .map((job: any) => job.id);
//     }
//     console.log("Jobs without owner:", jobIds);
//     await db.job.updateMany({
//       where: {
//         id: { in: jobIds },
//       },
//       data: {
//         company_id: company.id,
//       },
//     });
//     return {
//       success: true,
//       message: `Updated ${jobIds.length} jobs with company ID ${company.id}`,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message:
//         error instanceof Error ? error.message : "Unknown error occurred",
//     };
//   }
// }
