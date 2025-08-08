"use client"

import { AuthContextType, useAuthContext } from "@/contexts/AuthContext";
import { jobEntries } from "@/data/data";
import { addJob } from "@/lib/admin-client/admin-utils";
import axios from "axios";

export default  function page(){
    const { company  } = useAuthContext() as AuthContextType;

    const formattedEntries = jobEntries.map((job) => ({
        ...job,
        companyId : company?.id,
        employerName : company?.name,
        employerLogo : company?.logo,
    }));

    async function handleJobUpload(job:any){
        const response = await axios.post("/api/companies/jobs", job);
        if(response.data.success){
            alert("Job uploaded successfully");
        }else{
            alert("Failed to upload job");
        }
    }


    return (
        <>
            {formattedEntries.map((job, index) =>(
                <div key={job.title+index}>
                    <h2>{job.title}</h2>
                    <p>{job.description}</p>
                    <button className="py-2 my-2 px-5 bg-black text-white" onClick={() => handleJobUpload(job)}>Upload</button>
                </div>
            ))}
        </>
    )
}