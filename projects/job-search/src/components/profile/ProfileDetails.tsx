"use client";
import { User, Mail, Shield } from "lucide-react";
import LoginButton from "@/components/UI/buttons/LoginButton";
import LogoutButton from "@/components/UI/buttons/LogoutButton";
import { AuthContextType, useAuthContext } from "@/contexts/AuthContext";
import Links from "../UI/links/Links";
import Spinner from "../UI/loaders/Spinner";

export default function ProfileDetails() {
  const { user, isAuthenticated, loading=true } =
    useAuthContext() as AuthContextType;

  if(loading && !isAuthenticated){
    return (
        <div className="flex items-center justify-center h-screen p-4">
            <Spinner />
        </div>
    )
  }  

  if (!isAuthenticated && !loading) {
    return (
      <div className="flex items-center justify-center h-screen p-4">
        <div className="bg-white dark:bg-white/10 rounded-lg shadow p-8 text-center flex flex-col items justify-center max-w-sm">
          <User className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h1 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            Profile Access
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Please log in to view your profile
          </p>
          <LoginButton />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 p-4 max-w-2xl mx-auto">
        
\      <div className="bg-white dark:bg-white/10 rounded-lg shadow p-6 mb-4">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3">
            <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Welcome, {user?.username}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
          </div>
          <LogoutButton />
        </div>
      </div>


       <Links />

      <div className="bg-white  dark:bg-white/10 rounded-lg shadow p-6 mb-4">
        <h2 className="font-semibold mb-4 text-gray-900 dark:text-white">
          Profile Information
        </h2>
        <div className="space-y-3">
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-900 dark:text-white">{user?.email}</span>
          </div>
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-3 text-gray-500 dark:text-gray-400" />
            <span className="capitalize text-gray-900 dark:text-white">
              {user?.role}
            </span>
          </div>
        </div>
      </div>
     
    </div>
  );
}
