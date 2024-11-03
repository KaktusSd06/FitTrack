// app/providers.tsx

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "./context/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </ThemeProvider>
  );
}
