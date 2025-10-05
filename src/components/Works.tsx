"use client";

import { works } from "@/data/portfolio";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Works() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "公開中":
        return "bg-[#30d158]/20 text-[#30d158] border-[#30d158]/30";
      case "実店舗導入済み":
        return "bg-[#0a84ff]/20 text-[#0a84ff] border-[#0a84ff]/30";
      case "運用予定":
        return "bg-[#ffd60a]/20 text-[#ffd60a] border-[#ffd60a]/30";
      default:
        return "bg-[#bf5af2]/20 text-[#bf5af2] border-[#bf5af2]/30";
    }
  };

  return (
    <section id="works" className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-[980px] mx-auto">
        {/* セクションタイトル */}
        <h2 className="text-[48px] md:text-[64px] font-semibold text-center mb-4 leading-[1.08] tracking-[-0.003em] gradient-text">
          制作物
        </h2>
        <p className="text-center text-[21px] mb-16 md:mb-20 leading-[1.381] tracking-[-0.022em] gradient-purple">
          Works
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {works.map((work, idx) => (
            <div key={idx} className="apple-card p-8 hover:border-white/10 group">
              {/* ヘッダー */}
              <div className="flex items-start justify-between mb-6">
                <span
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium border ${getStatusColor(
                    work.status
                  )}`}
                >
                  {work.status}
                </span>
                {work.url && (
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0071e3] hover:text-[#0077ed] transition-colors"
                  >
                    <FaExternalLinkAlt size={16} />
                  </a>
                )}
              </div>

              {/* タイトル */}
              <h3 className="text-[24px] font-semibold mb-4 text-[#f5f5f7] tracking-[-0.022em] group-hover:text-[#0071e3] transition-colors duration-300">
                {work.title}
              </h3>

              {/* 説明 */}
              <p className="text-[15px] text-[#a1a1a6] leading-[1.47] tracking-[-0.022em] mb-6">
                {work.description}
              </p>

              {/* 技術スタック */}
              <div className="border-t border-white/5 pt-6">
                <p className="text-[12px] text-[#a1a1a6] mb-3 uppercase tracking-wide">使用技術</p>
                <div className="flex flex-wrap gap-2">
                  {work.tech.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[13px] text-[#a1a1a6] hover:bg-white/10 hover:text-[#f5f5f7] transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
