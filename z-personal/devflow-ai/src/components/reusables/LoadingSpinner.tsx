// components/ui/spinner.tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // shadcn utility for merging classNames

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-4",
  };

  return (
    <div
      role="status"
      className={cn(
        "animate-spin rounded-full border-gray-500/20 border-t-gray-500",
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
