// app/components/ThemeWrapper.tsx
"use client";

import { useTheme } from "./context/ThemeContext";
import { useEffect } from "react";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  return <>{children}</>;
};

export default ThemeWrapper;
