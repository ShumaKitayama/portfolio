"use client";

import { personalInfo, works } from "@/data/portfolio";
import Image from "next/image";
import AccentMixer from "./AccentMixer";
import { Garment } from "./Garment";

// ラックに掛ける 3 着
const byTitle = (prefix: string) => works.find((w) => w.title.startsWith(prefix)) ?? works[0];
const featured = [byTitle("VideoShare"), byTitle("Project HADAL"), byTitle("Juice")].map((work) => ({ work }));

export default function Hero() {
  const scrollToWorks = () => {
    const element = document.getElementById("works");
    if (element) {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16">
      <div className="absolute inset-0 grid-bg" aria-hidden />

      {/* 小さなハンガーラック（主役のオブジェクト） */}
      <button
        onClick={scrollToWorks}
        className="group relative w-[min(88vw,520px)] rise"
        style={{ animationDelay: "0.1s" }}
        aria-label="制作物を見る"
      >
        <span className="rack-bar block mx-[4%]" aria-hidden />
        <span className="grid grid-cols-3 gap-[3%] px-[6%]">
          {featured.map(({ work }, i) => (
            <span
              key={work.title}
              className="hero-hanger block"
              style={{ "--i": i } as React.CSSProperties}
            >
              <Garment cover={work.cover} />
            </span>
          ))}
        </span>
      </button>

      {/* ウィンドウカード */}
      <div className="relative mt-[30px] rise" style={{ animationDelay: "0.35s" }}>
        <div className="window w-[min(92vw,420px)]">
          <div className="window-bar">
            <div className="traffic" aria-hidden>
              <span />
              <span />
              <span />
            </div>
            <div className="mono text-muted">kitayama-lab.app</div>
          </div>
          <div className="p-5 md:p-6 flex items-center gap-4">
            <div className="relative w-16 h-16 md:w-[72px] md:h-[72px] rounded-full overflow-hidden flex-shrink-0 ring-2 ring-laser ring-offset-2 ring-offset-surface">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/avatar.jpg`}
                alt={personalInfo.name}
                fill
                className="object-cover scale-[2.1]"
                // 小さいアイコンなので顔のあたりを拡大する
                style={{ transformOrigin: "33% 30%" }}
                priority
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-[28px] md:text-[32px] font-extrabold leading-[1.1] tracking-[-0.036em]">
                Kitayama Lab
              </h1>
              <p className="mt-1 text-[14px] font-bold text-muted">
                {personalInfo.name} · SRE / Backend / 強化学習
              </p>
            </div>
          </div>
          <div className="px-5 md:px-6 pb-5 md:pb-6 flex flex-wrap items-center gap-2">
            <button onClick={scrollToWorks} className="btn">
              制作物を見る <span aria-hidden>›</span>
            </button>
            <span className="mono text-muted flex items-center gap-2 ml-auto">
              <span className="laser-dot" />
              NOW @ ZOZO SRE
            </span>
          </div>
          {/* カラーバリエーション：サイト全体のアクセント色を変えられる */}
          <div className="px-5 md:px-6 py-3 border-t-2 border-stone flex items-center justify-between gap-3">
            <span className="mono text-muted">COLOR</span>
            <AccentMixer />
          </div>
        </div>
      </div>

      {/* スクロール誘導 */}
      <button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="scroll-cue mt-10 rise"
        style={{ animationDelay: "0.6s" }}
        aria-label="自己紹介へスクロール"
      >
        <span className="mono text-muted">SCROLL</span>
        <span className="scroll-cue-line" aria-hidden />
      </button>
    </section>
  );
}
