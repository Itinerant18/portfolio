import type { Metadata } from "next";
import AppShell from "@/components/AppShell";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { ReactNode } from "react";
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/lora/400.css";
import "@fontsource/lora/500.css";
import "@fontsource/dm-mono/300.css";
import "@fontsource/dm-mono/400.css";
import "@fontsource/dm-mono/500.css";
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
    <html
      lang="en"
      data-theme="aniket-dark"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
