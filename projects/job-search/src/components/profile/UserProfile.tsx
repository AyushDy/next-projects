"use client";

import { User } from "lucide-react";
import LoginButton from "@/components/UI/buttons/LoginButton";
import Spinner from "@/components/UI/loaders/Spinner";
import UserProfileHeader from "@/components/profile/UserProfileHeader";
import Links from "@/components/UI/links/Links";
import { AuthContextType, useAuthContext } from "@/contexts/AuthContext";

export default function UserProfile() {
  const { user, isAuthenticated, loading } =
    useAuthContext() as AuthContextType;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20">
        <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="text-xl font-semibold text-foreground mb-2">
            Profile Access
          </h1>
          <p className="text-muted-foreground mb-6">
            Please log in to view your profile
          </p>
          <LoginButton />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {user && <UserProfileHeader user={user} />}
      <Links />
    </div>
  );
}
