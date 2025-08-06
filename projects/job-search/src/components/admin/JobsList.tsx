"use client"

import { useEffect, useRef, useState } from "react"
import { getAllJobs } from "@/lib/admin-client/admin-utils"
import Spinner from "../UI/loaders/Spinner";
import { JobData, JobWithTime } from "@/lib/types";
import JobCard from "./cards/JobCard";
import { useSearchParams } from "next/navigation";
import PaginationButtons from "../UI/reusable/PaginationButtons";
import { de } from "zod/locales";
import { deleteJobCompany } from "@/lib/admin-client/company-utils";

export default function JobList(){
    const [jobs, setJobs] = useState<JobWithTime[]|[]>([]);
    const [prevJobs, setPrevJobs] = useState<JobWithTime[]|[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const totalPagesRef = useRef<number>(1);

    const page = parseInt(searchParams.get("page") || "1", 10);

    useEffect(()=>{
        const fetchJobs = async () => {
            try {
                const result = await getAllJobs(page);
                setJobs(result.data.jobs);
                setPrevJobs(result.data.jobs);
                totalPagesRef.current = result.data.totalPages || 1;
            } catch (error) {
                setError("Error fetching jobs");
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [page])

    async function handleDelete(jobId: string) {
        try{
            const res = await deleteJobCompany(jobId);
            if (res.success) {
                const updatedJobs = prevJobs.filter(job => job.id !== jobId);
                setJobs(updatedJobs);
                setPrevJobs(updatedJobs);
            } else {
                setPrevJobs(prevJobs);
                setError("Failed to delete job");
            }
        }catch(error){
            setPrevJobs(prevJobs);
            console.error("Error deleting job:", error);
            setError("Failed to delete job");
        }
    }



    if (loading) {
        return (
            <div className="flex items-center justify-center ">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!Array.isArray(jobs) || !jobs.length) {
        return <div>No jobs found</div>;
    }

    return (
        <div>
            <ul>
                {jobs.map(job => (
                    <JobCard key={job.id} job={job} handleDelete={handleDelete} />
                ))}
            </ul>
            <PaginationButtons currentPage={page} totalPages={totalPagesRef.current} />
        </div>
    )

}