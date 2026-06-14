import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Webtoon App",
  description: "Interactive Webtoon Reader",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}