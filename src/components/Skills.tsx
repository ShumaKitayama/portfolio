"use client";

import { achievements, certifications, skills } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 bg-black">
      <div className="max-w-[980px] mx-auto">
        {/* セクションタイトル */}
        <h2 className="text-[48px] md:text-[64px] font-semibold text-center mb-4 leading-[1.08] tracking-[-0.003em] gradient-text">
          使用技術・資格
        </h2>
        <p className="text-center text-[21px] mb-16 md:mb-20 leading-[1.381] tracking-[-0.022em] gradient-purple">
          Skills & Certifications
        </p>

        <div className="space-y-16">
          {/* 使用技術 */}
          <div>
            <h3 className="text-[32px] font-semibold mb-8 text-[#f5f5f7] tracking-[-0.003em]">
              使用技術
            </h3>
            <div className="space-y-8">
              {/* レベル3 */}
              <div className="apple-card p-8 hover:border-white/10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-2 h-2 bg-[#30d158] rounded-full" />
                  <h4 className="text-[19px] font-semibold text-[#f5f5f7] tracking-[-0.022em]">
                    レベル 3（得意）
                  </h4>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.level3.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-[#30d158]/10 border border-[#30d158]/20 rounded-full text-[15px] text-[#f5f5f7] tracking-[-0.022em] hover:bg-[#30d158]/20 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* レベル2 */}
              <div className="apple-card p-8 hover:border-white/10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-2 h-2 bg-[#0a84ff] rounded-full" />
                  <h4 className="text-[19px] font-semibold text-[#f5f5f7] tracking-[-0.022em]">
                    レベル 2（実務経験あり）
                  </h4>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.level2.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-[#0a84ff]/10 border border-[#0a84ff]/20 rounded-full text-[15px] text-[#f5f5f7] tracking-[-0.022em] hover:bg-[#0a84ff]/20 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* レベル1 */}
              <div className="apple-card p-8 hover:border-white/10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-2 h-2 bg-[#bf5af2] rounded-full" />
                  <h4 className="text-[19px] font-semibold text-[#f5f5f7] tracking-[-0.022em]">
                    レベル 1（基礎知識）
                  </h4>
                </div>
                <div className="flex flex-wrap gap-3">
                  {skills.level1.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-[#bf5af2]/10 border border-[#bf5af2]/20 rounded-full text-[15px] text-[#f5f5f7] tracking-[-0.022em] hover:bg-[#bf5af2]/20 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 資格・コンテスト */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* 資格 */}
            <div className="apple-card p-8 hover:border-white/10">
              <h3 className="text-[24px] font-semibold mb-6 text-[#f5f5f7] tracking-[-0.022em]">
                資格
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#86868b] rounded-full mt-2.5 flex-shrink-0" />
                    <p className="text-[15px] text-[#a1a1a6] leading-[1.47] tracking-[-0.022em]">
                      {cert}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ハッカソン・コンテスト */}
            <div className="apple-card p-8 hover:border-white/10">
              <h3 className="text-[24px] font-semibold mb-6 text-[#f5f5f7] tracking-[-0.022em]">
                ハッカソン・コンテスト
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, idx) => (
                  <div key={idx}>
                    <p className="text-[14px] text-[#a1a1a6] mb-2 tracking-[-0.022em]">
                      {achievement.year}
                    </p>
                    <p className="text-[17px] font-semibold mb-2 text-[#f5f5f7] leading-[1.47] tracking-[-0.022em]">
                      {achievement.title}
                    </p>
                    <p className="text-[15px] text-[#a1a1a6] leading-[1.47] tracking-[-0.022em]">
                      プロダクト：{achievement.project}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
