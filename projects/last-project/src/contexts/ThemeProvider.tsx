"use client";

import { Theme } from "@radix-ui/themes";
import { Children, createContext, useState } from "react";

type ThemeContextType = {
  isDark: boolean;
  setIsDark: (theme: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(true);

  return(
  <ThemeContext.Provider value={{ isDark, setIsDark }}>
    <Theme appearance={isDark ? "dark" : "light"}>{children}</Theme>
  </ThemeContext.Provider>
  )
}
