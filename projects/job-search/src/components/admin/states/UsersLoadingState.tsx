"use client";

import LoadingSpinner from "../../UI/LoadingSpinner";

interface UsersLoadingStateProps {
  message?: string;
}

export default function UsersLoadingState({
  message = "Loading users...",
}: UsersLoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <LoadingSpinner size="lg" />
      <p className="text-muted-foreground mt-4">{message}</p>
    </div>
  );
}
