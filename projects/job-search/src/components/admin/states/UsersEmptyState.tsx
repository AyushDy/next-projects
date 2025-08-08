"use client";

import { User } from "lucide-react";

interface UsersEmptyStateProps {
  hasFilters: boolean;
}

export default function UsersEmptyState({ hasFilters }: UsersEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <User className="w-12 h-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">
        No Users Found
      </h3>
      <p className="text-muted-foreground">
        {hasFilters
          ? "Try adjusting your filters to see more users."
          : "No users have been registered yet."}
      </p>
    </div>
  );
}
