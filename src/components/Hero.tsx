"use client";

import { personalInfo } from "@/data/portfolio";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* シンプルな背景グラデーション */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(30,30,30,1)_0%,_rgba(0,0,0,1)_100%)]" />

      {/* コンテンツ */}
      <div className="relative z-10 text-center px-6 max-w-[980px] mx-auto">
        {/* プロフィール画像 */}
        <div className="flex justify-center mb-12 opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]">
          <div className="relative group">
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border border-white/10 shadow-2xl bg-[#1d1d1f] transition-transform duration-500 group-hover:scale-105">
              <Image
                src="/images/profile.jpeg"
                alt={personalInfo.name}
                fill
                className="object-cover scale-[1.25]"
                style={{ objectPosition: "center 53%" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* メインテキスト */}
        <h1 className="text-[56px] md:text-[80px] lg:text-[96px] font-semibold mb-6 leading-[1.05] tracking-[-0.015em] opacity-0 animate-[fadeInUp_1s_ease-out_0.4s_forwards] gradient-text">
          Kitayama Lab
        </h1>

        <p className="text-[21px] md:text-[24px] text-[#f5f5f7] mb-3 font-normal leading-[1.4] tracking-[-0.022em] opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]">
          {personalInfo.title} · {personalInfo.name}
        </p>

        <p className="text-[17px] md:text-[19px] text-[#a1a1a6] max-w-[690px] mx-auto font-normal leading-[1.47] tracking-[-0.022em] opacity-0 animate-[fadeInUp_1s_ease-out_0.8s_forwards]">
          {personalInfo.description}
        </p>
      </div>

      {/* スクロールダウンインジケーター */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#a1a1a6] hover:text-[#f5f5f7] transition-all duration-300 animate-bounce cursor-pointer opacity-60 hover:opacity-100"
        aria-label="スクロールダウン"
      >
        <FaChevronDown size={24} />
      </button>
    </section>
  );
}
