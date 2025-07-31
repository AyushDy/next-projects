"use client"
import React from "react";

export default function SkeletonButton() {
  return (
    <div className="skeleton">
      <style jsx>{`
        .skeleton {
          position: relative;
          overflow: hidden;
          height: 2.25rem;        /* h-9 */
          width: 5rem;            /* w-20 */
          border-radius: 0.375rem;/* rounded */
          background-color: rgba(209, 213, 219, 0.2); /* bg-gray-300/50 */
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .skeleton::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: translateX(-100%);
          animation: shimmer 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
