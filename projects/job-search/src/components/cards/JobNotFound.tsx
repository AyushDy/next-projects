"use client"

import { ArrowLeft } from "lucide-react"
import Button from "../UI/Button"
import { useRouter } from "next/navigation";



export default function JobNotFound(){
    const router = useRouter();

    function handleClick(){
        router.back();
    }


    return (
        <div className="bg-foreground/10 flex flex-col space-y-4 items-center border border-foreground/20 rounded-lg p-5 lg:p-10">
            <h1 className="text-red-400/50 text-center ">Job Details Not Found</h1>
            <Button className=" border-foreground/20" size="md" variant="ghost" onClick={handleClick} icon={ArrowLeft}>
                Back
            </Button>
        </div>
    )
}