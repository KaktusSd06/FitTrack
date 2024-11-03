// app/layout.tsx

import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import localFont from "next/font/local";
import { Providers } from "./providers";
import ThemeWrapper from "./ThemeWrapper";
import "./globals.css";

const notoSans = Noto_Sans({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FitTrack",
  description:
    "Зручне програмне забезпечення для тренувань та працівників спортивних залів.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ThemeWrapper>{children}</ThemeWrapper>
        </Providers>
      </body>
    </html>
  );
}
