"use client";

import { uploadMany } from "@/actions/server-actions";
import { FormEvent, useState } from "react";


export default function Page() {
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e:FormEvent){
        e.preventDefault();
        setIsLoading(true);
        const result = await uploadMany();
        setStatus(result);
        setIsLoading(false);
    }
 

  return (
    <form onSubmit={handleSubmit} className="p-30">
      <button type="submit" disabled={isLoading} className="px-5 py-2 bg-black text-white">
        {!isLoading? "UPLOAD" : "UPLOADING..." }
      </button>
      <p className="text-red-500">{status}</p>
    </form>
  );
}
