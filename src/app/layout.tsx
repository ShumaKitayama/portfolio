import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kitayama Lab - Portfolio",
  description:
    "北山秀磨のポートフォリオサイト。エンジニアとしての経歴、スキル、制作物をまとめています。",
  keywords: [
    "北山秀磨",
    "Kitayama",
    "エンジニア",
    "ポートフォリオ",
    "TypeScript",
    "React",
    "Golang",
  ],
  authors: [{ name: "北山秀磨" }],
  openGraph: {
    title: "Kitayama Lab - Portfolio",
    description: "北山秀磨のポートフォリオサイト",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
