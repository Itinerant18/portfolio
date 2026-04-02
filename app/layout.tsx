import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cursorfolio IDE",
  description: "A developer portfolio that behaves like a mini IDE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
