import { getCurrentUser } from "@/actions/auth-actions"
import ProfileCard from "@/components/UI/cards/ProfileCard";
import { redirect } from "next/navigation";



export default async function Page(){

    const user = await getCurrentUser() as any;

    if(!user){
        redirect('/');
    }

    return (
        <div className="py-10 flex justify-center">
            <ProfileCard user={user} />
        </div>
    )
}