import axios from "axios";

export async function deleteJobCompany(id: string) {
  try {
    await axios.delete(`/api/companies/jobs/${id}`, {
      withCredentials: true,
    });
    return {success :true};
  } catch (error) {
    return { success : false};
  }
}