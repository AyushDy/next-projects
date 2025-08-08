import axios from "axios";
import { success } from "zod";


export async function applyForJob(jobId: string,content : string){
    try{
        const res = await axios.post("/api/jobs/applications",{
            jobId,
            content
        },{
            withCredentials: true
        });
        return res.data;
    }catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message || "Internal server error"
            };
        }
        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}


export async function withdrawApplicationFromDB(jobId: string) {
    try {
        const res = await axios.delete(`/api/jobs/applications/`,{
            data: { jobId },
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message || "Internal server error"
            };
        }
        return {
            success: false,
            message: "An unexpected error occurred"
        };
    }
}


export async function getAppliedjobs(){
    try{
        const result = await axios.get('/api/jobs/applications',{
            withCredentials : true
        })
        return result.data;
    }catch(error){
        return {
            success: false,
            message: error instanceof Error? error.message : "Failed to fetch Applied jobIds"
        }
    }
}