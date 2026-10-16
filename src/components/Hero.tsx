"use client";

import { personalInfo, works } from "@/data/portfolio";
import Image from "next/image";
import { CdCover, CdDisc, catalogNo, yearOf } from "./Cd";

// 扇に並べる 3 枚（中央が最新作）
const featured = [works[1], works[0], works[3]].map((work) => ({ work, index: works.indexOf(work) }));

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

      {/* CD ジャケットの扇（主役のオブジェクト） */}
      <button
        onClick={scrollToWorks}
        className="group relative w-[min(78vw,460px)] aspect-[1.5/1] rise"
        style={{ animationDelay: "0.1s" }}
        aria-label="制作物を見る"
      >
        {featured.map(({ work, index }, i) => {
          const offset = i - 1; // -1, 0, 1
          return (
            <span
              key={work.title}
              className="absolute top-[6%] left-1/2 h-[88%] aspect-square transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
              style={{
                zIndex: i === 1 ? 3 : 1,
                transform: `translateX(calc(-50% + ${offset * 34}%)) rotate(${offset * 8}deg) translateY(${Math.abs(offset) * 6}%)`,
              }}
            >
              <span className="absolute inset-[4%] -translate-y-[12%] transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-y-[34%]">
                <CdDisc label={work.cover.bg} />
              </span>
              <span className="absolute inset-0">
                <CdCover cover={work.cover} catalog={catalogNo(index)} year={yearOf(work.period)} />
              </span>
            </span>
          );
        })}
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
            <div className="relative w-16 h-16 md:w-[72px] md:h-[72px] rounded-full overflow-hidden flex-shrink-0 ring-2 ring-laser ring-offset-2">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/profile.jpeg`}
                alt={personalInfo.name}
                fill
                className="object-cover scale-[1.25]"
                style={{ objectPosition: "center 53%" }}
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
        </div>
      </div>
    </section>
  );
}
