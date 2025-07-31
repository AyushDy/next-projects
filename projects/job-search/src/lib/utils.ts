import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function searchJobs(query:string, page:number = 1) {
  const url =
    `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}&num_pages=1&country=us&date_posted=all`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "9457709c6amsh76f14c2f25643afp1f79bdjsn796f169e3d93",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
    next : {
      revalidate : 3600
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return {success:true, message : "fetched successfully", result:result};
  } catch (error:any) {
    return {success:false, message:error.message}
  }
}
