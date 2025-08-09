"use client";
import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    }
    return false;
  });

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeDark =
      savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    setIsDark(shouldBeDark);

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    localStorage.setItem("theme", newTheme ? "dark" : "light");

    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return (
      <div className="w-14 h-8 bg-gray-200 rounded-full relative">
        <div className="w-6 h-6 bg-white rounded-full absolute top-1 left-1 transition-transform duration-300" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 relative focus:outline-none focus:ring-2 focus:ring-primary/50 ${
        isDark ? "bg-gray-700" : "bg-gray-200"
      }`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div
        className={`w-6 h-6 rounded-full transition-all duration-300 ease-in-out transform flex items-center justify-center ${
          isDark
            ? "translate-x-6 bg-gray-800 text-gray-300"
            : "translate-x-0 bg-yellow-400 text-yellow-800"
        }`}
      >
        {isDark ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
      </div>
    </button>
  );
}
