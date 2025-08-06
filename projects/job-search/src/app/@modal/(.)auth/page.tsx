import AuthForm from "@/components/forms/AuthForm";
import { getCurrentUser } from "@/lib/jwt";
import { redirect } from "next/navigation";

export default async function page(){

    const user = await getCurrentUser();
        if(user && user.email){
            redirect('/')
        }


    return (
        <div className="fixed inset-0 z-50 backdrop-blur-lg bg-black/20 dark:bg-black/40 flex justify-center items-center">
            <AuthForm intercepted={true}/>
        </div>
    )
}