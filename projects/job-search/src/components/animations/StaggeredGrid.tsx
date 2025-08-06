"use client";

import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface StaggeredGridProps {
  children: ReactNode[];
  className?: string;
  itemDelay?: number;
}

export default function StaggeredGrid({
  children,
  className = "",
  itemDelay = 100,
}: StaggeredGridProps) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className="transition-all duration-700 ease-out"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            opacity: isVisible ? 1 : 0,
            transitionDelay: `${index * itemDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
