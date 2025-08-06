"use client";

import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const getTransform = () => {
    switch (direction) {
      case "up":
        return isVisible ? "translateY(0)" : "translateY(40px)";
      case "down":
        return isVisible ? "translateY(0)" : "translateY(-40px)";
      case "left":
        return isVisible ? "translateX(0)" : "translateX(-40px)";
      case "right":
        return isVisible ? "translateX(0)" : "translateX(40px)";
      case "fade":
        return "translateY(0)";
      default:
        return isVisible ? "translateY(0)" : "translateY(40px)";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
