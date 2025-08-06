"use client";

import { User, Mail, Shield } from "lucide-react";
import { UserWithpassword } from "@/lib/types";

interface UserProfileHeaderProps {
  user: UserWithpassword;
}

export default function UserProfileHeader({ user }: UserProfileHeaderProps) {
  return (
    <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-muted/30 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            {user.username}
          </h1>
          <p className="text-muted-foreground text-sm">{user.email}</p>
        </div>
      </div>

      <div className="space-y-3 pt-3 border-t border-border/20">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{user.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Shield className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground capitalize">{user.role}</span>
        </div>
      </div>
    </div>
  );
}
