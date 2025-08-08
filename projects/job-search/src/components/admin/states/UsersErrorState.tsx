"use client";

import { AlertCircle } from "lucide-react";

interface UsersErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function UsersErrorState({
  error,
  onRetry,
}: UsersErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <AlertCircle className="w-12 h-12 text-destructive mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Error Loading Users
      </h3>
      <p className="text-muted-foreground mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
