"use client";

import { timeline } from "@/data/portfolio";

export default function Profile() {
  // 西暦を抽出する関数
  const extractYear = (dateString: string) => {
    const match = dateString.match(/(\d{4})/);
    return match ? match[1] : "";
  };

  // 年が変わるタイミングかどうかを判定
  const shouldShowYear = (idx: number) => {
    if (idx === 0) return true; // 最初のアイテムは常に表示
    const currentYear = extractYear(timeline[idx].date);
    const prevYear = extractYear(timeline[idx - 1].date);
    return currentYear !== prevYear; // 前のアイテムと年が違えば表示
  };

  return (
    <section id="profile" className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-[980px] mx-auto">
        {/* セクションタイトル */}
        <h2 className="text-[48px] md:text-[64px] font-semibold text-center mb-4 leading-[1.08] tracking-[-0.003em] gradient-text">
          経歴
        </h2>
        <p className="text-center text-[21px] mb-16 md:mb-20 leading-[1.381] tracking-[-0.022em] gradient-purple">
          Timeline
        </p>

        <div className="relative">
          {/* タイムラインの線 */}
          <div className="absolute left-3 md:left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#424245] via-[#424245] to-transparent" />

          {/* タイムラインアイテム */}
          <div className="space-y-8 md:space-y-12">
            {timeline.map((item, idx) => {
              const showYear = shouldShowYear(idx);
              return (
                <div key={idx} className="relative group pl-12 md:pl-32">
                  {/* 年表示マーカー */}
                  {showYear ? (
                    <div className="absolute left-0 md:left-4 top-0 w-6 h-6 md:w-16 md:h-16 bg-[#1d1d1f] border border-white/10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:border-white/20">
                      <span className="text-white font-semibold text-[10px] md:text-[17px] tracking-[-0.022em]">
                        {extractYear(item.date)}
                      </span>
                    </div>
                  ) : (
                    <div className="absolute left-[9px] md:left-[39px] top-3 w-[6px] h-[6px] bg-[#424245] rounded-full" />
                  )}

                  {/* コンテンツ */}
                  <div className="apple-card p-6 md:p-8 hover:border-white/10">
                    <p className="text-[14px] text-[#a1a1a6] mb-2 tracking-[-0.022em]">
                      {item.date}
                    </p>
                    <h3 className="text-[19px] md:text-[21px] font-semibold mb-3 text-[#f5f5f7] leading-[1.381] tracking-[-0.022em]">
                      {item.event}
                    </h3>
                    {item.description && (
                      <p className="text-[15px] text-[#a1a1a6] leading-[1.47] tracking-[-0.022em]">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
