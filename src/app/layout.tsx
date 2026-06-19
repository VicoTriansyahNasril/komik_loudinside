import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Loud Inside - Webtoon",
  description: "Interactive Webtoon Reader",
  icons: {
    icon: '/assets/icon_web.png',
  },
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