import { useState, useTransition } from "react"
import { jobEntries } from "@/data/data";
export default function UploadButton(){
    const [isPending, startTransition] = useTransition();

    

    return <button>
        {}
    </button>
}