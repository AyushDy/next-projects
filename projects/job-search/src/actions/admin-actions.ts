"use server";

import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";


export async function getAllJobs(page=1, limit=10) {
    try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
        return { success: false, message: "Unauthorized" };
    }
    const response = await db.job.findMany({
        skip: (page - 1) * limit,
        take: limit
    });
    if (!response || response.length === 0) {
        return { success: false, message: "No jobs found" };
    }
    return { success: true, jobs: response };
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return { success: false, message: "Internal Server Error" };
    }
}

