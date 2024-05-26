import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import "./globals.css";
import React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Jean Monnet",
  description: "Jean Monnet serious game for learning European Union history and institutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="h-[100vh] bg-background text-foreground">
      <ThemeProvider
        attribute="class"
        enableSystem
        disableTransitionOnChange
      >
        <main className="max-h-screen h-full flex flex-col items-center">
          {children}
        </main>
        <Toaster />
        <Sonner expand={true} visibleToasts={9}/>
      </ThemeProvider>
      </body>
    </html>
  );
}
