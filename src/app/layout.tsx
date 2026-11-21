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

/*
 * 演出の入口（DESIGN.md）。最初の描画の前に html[data-motion] を付け、CSS の演出はすべてこの下に書く。
 * - 動きを減らす設定・JS なしでは付かない → 最初から完成形の静止ページ
 * - オープニングは同じセッションで 1 度だけ（data-opening）
 * - ScrollEffects が動き出すと "live" に変わる。読み込みに失敗したら数秒後に外して完成形へ戻す
 */
const motionGate = `(function(){try{
var d=document.documentElement;
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
d.dataset.motion="on";
try{if(!sessionStorage.getItem("kitayama-lab:opening")){d.dataset.opening="on";sessionStorage.setItem("kitayama-lab:opening","1");}}catch(e){d.dataset.opening="on";}
setTimeout(function(){if(d.dataset.motion==="on"){delete d.dataset.motion;delete d.dataset.opening;}},6000);
}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-motion は描画前のスクリプトが付けるので、属性の食い違いの警告を抑える
    <html lang="ja" className={`${inter.variable} ${notoSansJp.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
