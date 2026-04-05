import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aniket Karmakar | Portfolio",
  description: "Software Engineer portfolio – Full-Stack, AI/ML, IoT, and Cloud.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
