"use client";

import { AuthContextType, useAuthContext } from "@/contexts/AuthContext";
import LoginButton from "../buttons/LoginButton";
import AdminPanelButton from "../buttons/AdminPanelButton";
import ProfileButton from "../buttons/ProfileButton";
import DotsLoader from "../loaders/DotsLoaders";
import Link from "next/link";




export default function HeaderNavLinks(){
    const { user, isAuthenticated=false, loading=true } =  useAuthContext() as AuthContextType

    if(loading && !isAuthenticated){
        return <div className="w-30 h-full flex items-center justify-center">
            <DotsLoader />
        </div>
    }

    return (
        <div className="flex items-center justify-between h-full">
            <Link href={"/companies"} className="mr-5">Companies</Link>
            {isAuthenticated ? <ProfileButton /> : <LoginButton />}
            {user && user.role === "admin" && (
                <AdminPanelButton />
            )}
        </div>
    )
}