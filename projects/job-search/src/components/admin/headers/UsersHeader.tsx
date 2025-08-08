"use client";

import { Users } from "lucide-react";

interface UsersHeaderProps {
  totalUsers: number;
}

export default function UsersHeader({ totalUsers }: UsersHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 border border-primary/20 rounded-lg">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            User Management
          </h2>
          <p className="text-sm text-muted-foreground">
            {totalUsers} total users
          </p>
        </div>
      </div>
    </div>
  );
}
