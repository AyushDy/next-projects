import axios from "axios";

export async function deleteJobCompany(id: string) {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/companies/jobs/${id}`, {
      withCredentials: true,
    });
    return {success :true};
  } catch (error) {
    return { success : false};
  }
}