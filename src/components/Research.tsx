import { research } from "@/data/portfolio";
import { Garment, HangTag } from "./Garment";
import { SectionHeader } from "./ui";

// 「52」「0.48%」のような数値は数え上げる。「4〜8×」などはそのまま表示
function MetricValue({ value }: { value: string }) {
  const match = value.match(/^(\d+(?:\.(\d+))?)(%?)$/);
  if (!match) return <>{value}</>;
  return (
    <>
      <span data-count={match[1]} data-decimals={match[2]?.length ?? 0}>
        {match[1]}
      </span>
      {match[3]}
    </>
  );
}

export default function Research() {
  return (
    <section id="research" className="py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader index="03" label="LIMITED EDITION" title="研究" lead={research.lab} />

        {/* 限定アイテム：黒いパネル */}
        <div data-reveal className="rounded-[25px] bg-surface text-white overflow-hidden shadow-[0_0_0_1px_var(--stone),0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="p-6 md:p-12 grid lg:grid-cols-[minmax(0,320px)_1fr] gap-10 lg:gap-14">
            {/* ハンガーに掛かった限定の一着 */}
            <div>
              <div className="max-w-[300px] mx-auto lg:mx-0">
                <span className="rack-bar block" aria-hidden />
                <span className="hanger-item group">
                  <Garment cover={research.cover} className="research-garment" />
                  <span className="absolute right-0 top-[20%]">
                    <HangTag no="LIMITED" sub="2025—" />
                  </span>
                </span>
              </div>
              <p className="mono text-white/60 mt-5 flex items-center gap-2">
                <span className="laser-dot" />
                {research.status}
              </p>
            </div>

            <div className="min-w-0">
              <h3 className="text-[26px] md:text-[38px] font-extrabold tracking-[-0.04em] leading-[1.25]">
                {research.title}
              </h3>
              <p className="mt-5 text-[15px] md:text-[16px] font-medium text-white/70 prose-ja">{research.background}</p>

              {/* 数値 */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/15 rounded-[13px] overflow-hidden">
                {research.metrics.map((metric) => (
                  <div key={metric.label} className="bg-surface p-5">
                    <p className="text-[40px] md:text-[48px] font-extrabold tracking-[-0.045em] leading-none text-laser">
                      <MetricValue value={metric.value} />
                    </p>
                    <p className="mt-3 text-[14px] font-extrabold">{metric.label}</p>
                    <p className="mono text-white/50 mt-1">{metric.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDE A / SIDE B */}
          <div className="grid md:grid-cols-2 border-t border-white/15">
            {research.steps.map((step, i) => (
              <div key={step.label} className={`p-6 md:p-10 ${i > 0 ? "md:border-l border-t md:border-t-0 border-white/15" : ""}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="mono text-laser">SIDE {String.fromCharCode(65 + i)}</span>
                  <span className="mono text-white/50">{step.label}</span>
                  <span
                    className={`ml-auto mono px-2 py-1 rounded-[1.5px] ${
                      step.status === "完了" ? "bg-white text-[#111]" : "bg-laser text-[#111]"
                    }`}
                  >
                    {step.status}
                  </span>
                </div>
                <h4 className="text-[20px] md:text-[22px] font-extrabold tracking-[-0.03em] mb-4">{step.title}</h4>
                <ol className="space-y-[10px]">
                  {step.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-[14px] font-medium text-white/75 prose-ja">
                      <span className="mono text-white/40 pt-[3px] flex-shrink-0">{String(j + 1).padStart(2, "0")}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div className="px-6 md:px-10 py-6 border-t border-white/15 flex flex-wrap gap-[6px]">
            {research.tech.map((tech) => (
              <span key={tech} className="tag !bg-transparent !border-white/25 !text-white">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
