import React from "react";
import { Manrope } from "next/font/google";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Head from "next/head";

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
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
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
