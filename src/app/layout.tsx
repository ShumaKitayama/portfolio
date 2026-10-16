import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-inter" });
const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-noto-jp",
});

export const metadata: Metadata = {
  title: "Kitayama Lab - Portfolio",
  description:
    "北山秀磨のポートフォリオサイト。エンジニアとしての職歴、研究、スキル、制作物をまとめています。",
  keywords: [
    "北山秀磨",
    "Kitayama",
    "エンジニア",
    "ポートフォリオ",
    "SRE",
    "AWS",
    "TypeScript",
    "React",
    "Golang",
    "強化学習",
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
    <html lang="ja" className={`${inter.variable} ${notoSansJp.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
