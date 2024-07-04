import React from "react";
import { Manrope } from "next/font/google";
import type { Metadata } from "next";
import { cookies } from "next/headers";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import Navbar from "@/components/Navbar/Navbar";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobSync",
  description: "A Job Search Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieProvider = cookies();
  const theme = cookieProvider.get("theme")?.value || "light";
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <body className={`${manrope.className} ${theme} `}>
          <main className=" min-h-screen bg-natural-3 px-5 dark:bg-darkBg-1">
            <div className="mx-auto flex max-w-[1280px] flex-col items-center">
              <Navbar />
              {children}
            </div>
            <Toaster />
          </main>
        </body>
      </html>
    </ThemeProvider>
  );
}
