import AuthForm from "@/components/forms/AuthForm";
import { getCurrentUser } from "@/lib/jwt";
import { redirect } from "next/navigation";

export default async function page(){

    const user = await getCurrentUser();
    if(user && user.email){
        redirect('/')
    }


    return (
        <div  className="fixed inset-0 z-50 backdrop-blur-md bg-black/10 flex justify-center items-center">
            <AuthForm intercepted={false} />
        </div>
    )
}