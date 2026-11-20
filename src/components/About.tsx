import { achievements, careers, personalInfo, works } from "@/data/portfolio";
import Image from "next/image";
import { SectionHeader } from "./ui";

export default function About() {
  const stats = [
    { value: careers.length, unit: "社", label: "職歴" },
    { value: works.length, unit: "作", label: "制作物" },
    { value: achievements.length, unit: "回", label: "受賞" },
  ];

  return (
    <section id="about" className="py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader index="01" label="DESIGNER PROFILE" title="自己紹介" />

        <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 md:gap-12 items-start">
          {/* アーティスト写真 + ステッカー */}
          <div className="relative max-w-[440px] w-full mx-auto md:mx-0" data-reveal="pop" data-scroll="through">
            {/* プロフィール写真（ステッチ付きの丸い布） */}
            <div className="photo-frame stitch relative aspect-square rounded-full">
              <div className="absolute inset-[3.5%] rounded-full overflow-hidden bg-canvas">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/avatar.jpg`}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="mt-6 text-center md:text-left">
              <p className="mono text-muted">DESIGNER</p>
              <p className="text-[24px] font-extrabold tracking-[-0.036em]">{personalInfo.nameEn}</p>
            </div>
            <span
              className="sticker absolute -top-4 -right-3 rotate-[8deg] bg-laser"
              style={{ "--i": 0 } as React.CSSProperties}
            >
              {personalInfo.age} 歳
            </span>
            <span
              className="sticker absolute top-[38%] -left-4 rotate-[-7deg] bg-[#ffd400]"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              {personalInfo.location}出身
            </span>
            <span
              className="sticker absolute top-[72%] -right-2 rotate-[-4deg] bg-ink !text-on-ink flex items-center gap-2"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              <span className="laser-dot on-air" /> NOW @ ZOZO SRE
            </span>
          </div>

          {/* プロフィール本文 */}
          <div className="min-w-0 pt-4 md:pt-0" data-reveal style={{ "--d": "150ms" } as React.CSSProperties}>
            <h3 className="text-[44px] md:text-[64px] font-extrabold tracking-[-0.045em] leading-[1]">
              {personalInfo.name}
            </h3>
            <p className="mono text-muted mt-3">{personalInfo.title.toUpperCase()} / SRE · BACKEND · 強化学習</p>

            <p className="mt-6 text-[17px] md:text-[19px] font-bold prose-ja">{personalInfo.description}</p>
            <p className="mt-3 text-[15px] font-medium text-muted prose-ja">
              徳島に来たら{" "}
              <a
                href="https://www.instagram.com/eureka_tokushimacoworking?igsh=MWVybmJveHp5czFqeQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="font-extrabold text-ink marker hover:bg-laser"
              >
                Eureka
              </a>{" "}
              もぜひ利用してみてください。
            </p>

            {/* 数字 */}
            <div className="mt-8 grid grid-cols-3 border-y-2 border-ink">
              {stats.map((stat, i) => (
                <div key={stat.label} className={`py-4 ${i > 0 ? "pl-4 border-l-2 border-stone" : ""}`}>
                  <p className="text-[36px] md:text-[48px] font-extrabold tracking-[-0.045em] leading-none">
                    <span data-count={stat.value}>{stat.value}</span>
                    <span className="text-[16px] md:text-[18px] ml-1">{stat.unit}</span>
                  </p>
                  <p className="mono text-muted mt-2">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* 座右の銘 */}
            <div className="mt-8">
              <p className="mono text-muted mb-3">MOTTO</p>
              <p className="text-[28px] md:text-[40px] font-extrabold leading-[1.2] tracking-[-0.04em]">
                「<span className="marker">{personalInfo.motto}</span>」
              </p>
              <p className="mt-3 text-[15px] font-medium text-muted prose-ja">
                実は星のカービィシリーズのカービィちゃんも同じ座右の銘なんですよ。
                とっても嬉しい。まぁそれを知ってから座右の銘にしたんですけどね。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
