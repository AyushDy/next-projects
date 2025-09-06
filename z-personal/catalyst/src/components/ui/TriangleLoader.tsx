"use client";
import * as React from "react";
import { cn } from "@/lib/utils"; // shadcn utility for merging classNames

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  // Tailwind-style helper classes in case you want to tweak appearance via className
  const sizes = {
    sm: "inline-block",
    md: "inline-block",
    lg: "inline-block",
  } as const;

  // Keep the original animation geometry by driving size with a pixel width.
  // The original loader used 50px; we preserve that for the `md` size so the
  // animation timing and transform-origin look correct.
  const pixelSizes: Record<string, number> = {
    sm: 24,
    md: 50,
    lg: 80,
  };

  const spinnerSize = `${pixelSizes[size]}px`;

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("loader", sizes[size], className)}
      style={{ width: spinnerSize }}
      {...props}
    >
      <style jsx>{`
        .loader {
          /* width is set inline so the animation scales correctly for each size */
          aspect-ratio: 1.154;
          position: relative;
          background: conic-gradient(
            from 120deg at 50% 64%,
            #0000,
            #25b09b 1deg 120deg,
            #0000 121deg
          );
          animation: l27-0 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
        }
        .loader:before,
        .loader:after {
          content: "";
          position: absolute;
          inset: 0;
          background: inherit;
          transform-origin: 50% 66%;
          animation: l27-1 1.5s infinite;
        }
        .loader:after {
          --s: -1;
        }
        @keyframes l27-0 {
          0%,
          30% {
            transform: rotate(0);
          }
          70% {
            transform: rotate(120deg);
          }
          70.01%,
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes l27-1 {
          0% {
            transform: rotate(calc(var(--s, 1) * 120deg)) translate(0);
          }
          30%,
          70% {
            transform: rotate(calc(var(--s, 1) * 120deg))
              translate(calc(var(--s, 1) * -5px), 10px);
          }
          100% {
            transform: rotate(calc(var(--s, 1) * 120deg)) translate(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Spinner;