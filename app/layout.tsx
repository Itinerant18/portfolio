import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aniket Karmakar | Portfolio",
  description: "Aniket Karmakar – Front-end UI Developer | React.js | Web Designer | Full-Stack | AI/ML | Cloud",
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
