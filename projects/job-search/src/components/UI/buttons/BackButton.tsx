"use client"
import { ArrowLeft } from "lucide-react";
import Button from "../Button";
import { useRouter } from "next/navigation";


export default function BackButton(){
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

    return(
        <Button variant="secondary" icon={ArrowLeft} iconPosition="left" onClick={handleBack}>
          Back
        </Button>
    )
}