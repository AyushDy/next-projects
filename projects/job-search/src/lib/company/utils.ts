import axios from "axios";

export async function getCompanyById(id: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/companies/by-id/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    return null;
  }
}

export async function getCompanyByUserId(id: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/companies/by-user-id/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
}



export async function getApplicantsByJobId(jobId: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/companies/jobs/applicants`,
      { jobId },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching applicants by job ID:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
}

// to-do
export async function deleteCompany(id:string){

}


export async function acceptApplication(applicationId:string){
  try{
    const res = await axios.patch(`/api/companies/jobs/applicants/accept`,{
      applicationId
    },{
      withCredentials : true
    })
    return {success:true};
  }catch{
    return{success :false};
  }
}

export async function rejectApplication(applicationId:string){
  try{
    await axios.patch(`/api/companies/jobs/applicants/reject`,{
      applicationId
    },{
      withCredentials : true
    })
    return {success:true};
  }catch{
    return{success :false};
  }
}
