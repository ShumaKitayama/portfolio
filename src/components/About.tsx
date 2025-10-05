"use client";

import { personalInfo } from "@/data/portfolio";

export default function About() {
  const infoItems = [
    { label: "名前", value: personalInfo.name },
    { label: "年齢", value: `${personalInfo.age} 歳` },
    { label: "出身", value: personalInfo.location },
  ];

  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-black">
      <div className="max-w-[980px] mx-auto">
        {/* セクションタイトル */}
        <h2 className="text-[48px] md:text-[64px] font-semibold text-center mb-4 leading-[1.08] tracking-[-0.003em] gradient-text">
          自己紹介
        </h2>
        <p className="text-center text-[21px] mb-16 md:mb-20 leading-[1.381] tracking-[-0.022em] gradient-purple">
          About Me
        </p>

        {/* 基本情報 */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {infoItems.map((item, idx) => (
            <div
              key={idx}
              className="apple-card p-8 text-center hover:border-white/10 transition-all duration-400"
            >
              <p className="text-[14px] text-[#a1a1a6] mb-2 uppercase tracking-wide">
                {item.label}
              </p>
              <p className="text-[28px] font-semibold text-[#f5f5f7] tracking-[-0.022em]">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* メインコンテンツ */}
        <div className="space-y-12">
          {/* プロフィール */}
          <div className="apple-card p-10 md:p-12">
            <h3 className="text-[24px] font-semibold mb-6 text-[#f5f5f7] tracking-[-0.022em]">
              プロフィール
            </h3>
            <p className="text-[17px] text-[#a1a1a6] leading-[1.47] tracking-[-0.022em] mb-4">
              {personalInfo.description}
            </p>
            <p className="text-[17px] text-[#a1a1a6] leading-[1.47] tracking-[-0.022em]">
              徳島に来たら{" "}
              <a
                href="https://www.instagram.com/eureka_tokushimacoworking?igsh=MWVybmJveHp5czFqeQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0071e3] hover:underline transition-all duration-300"
              >
                Eureka
              </a>{" "}
              もぜひ利用してみてください。
            </p>
          </div>

          {/* 座右の銘 */}
          <div className="apple-card p-10 md:p-12">
            <h3 className="text-[24px] font-semibold mb-6 text-[#f5f5f7] tracking-[-0.022em]">
              座右の銘
            </h3>
            <p className="text-[32px] md:text-[40px] font-semibold mb-6 text-[#f5f5f7] leading-[1.1] tracking-[-0.003em]">
              「{personalInfo.motto}」
            </p>
            <p className="text-[17px] text-[#a1a1a6] leading-[1.47] tracking-[-0.022em]">
              実は星のカービィシリーズのカービィちゃんも同じ座右の銘なんですよ。
              とっても嬉しい。まぁそれを知ってから座右の銘にしたんですけどね。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
