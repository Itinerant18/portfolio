import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cursorfolio IDE",
  description: "A developer portfolio that behaves like a mini IDE.",
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
