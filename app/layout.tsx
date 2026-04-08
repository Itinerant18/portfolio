import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aniket Karmakar | Portfolio",
  description: "Aniket Karmakar – Front-end UI Developer | React.js | Web Designer | Full-Stack | AI/ML | Cloud",
  icons: {
    icon: [
      { url: "https://img.icons8.com/?size=16&id=LhC2HfftBElY&format=png", sizes: "16x16", type: "image/png" },
      { url: "https://img.icons8.com/?size=32&id=LhC2HfftBElY&format=png", sizes: "32x32", type: "image/png" },
      { url: "https://img.icons8.com/?size=94&id=LhC2HfftBElY&format=png", sizes: "96x96", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
