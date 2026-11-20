import { careers, education, type Role } from "@/data/portfolio";
import { SectionHeader, Tags } from "./ui";

const lookNo = (i: number) => `LOOK ${String(i + 1).padStart(2, "0")}`;

// 開始月からシーズン表記を作る（3〜8 月 = SS、9〜2 月 = AW）
function seasonOf(period: string) {
  const match = period.match(/(\d{4}) 年 (\d{1,2}) 月/);
  if (!match) return "";
  const year = Number(match[1]);
  const month = Number(match[2]);
  if (month >= 3 && month <= 8) return `${String(year).slice(2)}SS`;
  return `${String(month <= 2 ? year - 1 : year).slice(2)}AW`;
}

function RoleBlock({ role, side }: { role: Role; side: string }) {
  return (
    <div className="py-6 border-t-2 border-stone first:border-t-0 first:pt-2">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="mono text-muted mr-1">{side}</span>
          <span className="tag !bg-ink !text-on-ink !border-ink">{role.type}</span>
          {role.team && <span className="tag">{role.team}</span>}
          <span className="mono text-muted">{role.period}</span>
        </div>
        <h4 className="text-[18px] md:text-[20px] font-extrabold tracking-[-0.03em] leading-[1.35] mb-2">{role.title}</h4>
        {role.summary && <p className="text-[15px] font-medium text-graphite prose-ja">{role.summary}</p>}

        {role.sections?.map((section, idx) => (
          <div key={idx} className="mt-4">
            {section.heading && (
              <p className="text-[14px] font-extrabold mb-2">
                <span className="marker">{section.heading}</span>
              </p>
            )}
            <ul className="space-y-[6px]">
              {section.items.map((item, i) => (
                <li key={i} className="flex gap-2 text-[14px] font-medium text-muted prose-ja">
                  <span className="mt-[0.7em] w-[5px] h-[5px] bg-ink flex-shrink-0" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Career() {
  return (
    <section id="career" className="py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader
          index="02"
          label="COLLECTION ARCHIVE"
          title="職歴"
          lead="インターン・アルバイトで、フロントエンドから SRE まで実務を経験してきました。シーズンごとのコレクションのように並べています。選ぶと詳細が開きます。"
        />

        <div className="window overflow-hidden" data-reveal>
          <div className="window-bar">
            <div className="traffic" aria-hidden>
              <span />
              <span />
              <span />
            </div>
            <div className="mono text-muted">collection-archive — {careers.length} brands</div>
          </div>

          <ol>
            {careers.map((career, index) => (
              <li key={career.company} className="border-t-2 border-stone first:border-t-0">
                <details className="group/track" open={index === 0}>
                  <summary className="track-row grid grid-cols-[52px_1fr_auto] md:grid-cols-[72px_1fr_auto_24px] items-center gap-3 md:gap-5 px-5 md:px-8 py-5 md:py-6">
                    <span className="flex items-center">
                      <span className={`season-badge ${career.current ? "is-new" : ""}`}>
                        {career.current ? "NEW" : seasonOf(career.period)}
                      </span>
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[20px] md:text-[28px] font-extrabold tracking-[-0.036em] leading-[1.2]">
                        {career.company}
                      </span>
                      <span className="block mono text-muted mt-1 truncate">
                        {career.roles.map((role) => role.title).join(" / ")}
                      </span>
                    </span>
                    <span className="mono text-muted text-right whitespace-nowrap">
                      {career.period.replace(/ 年 /g, ".").replace(/ 年/g, "").replace(/ 月/g, "")}
                    </span>
                    <span className="hidden md:inline-block chev text-[18px] font-extrabold transition-transform duration-200">
                      ›
                    </span>
                  </summary>

                  <div className="px-5 md:px-8 pb-8">
                    {career.roles.map((role, i) => (
                      <RoleBlock key={i} role={role} side={lookNo(i)} />
                    ))}
                    {career.tech && (
                      <div className="mt-5 pt-5 border-t-2 border-stone">
                        <Tags items={career.tech} />
                      </div>
                    )}
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </div>

        {/* 学歴：縦のツリー（職歴と同じ大きさのウィンドウで見せる） */}
        <div className="mt-16">
          <h3 className="text-[32px] md:text-[48px] font-extrabold tracking-[-0.045em] leading-[1.1] mb-6" data-reveal="left">
            学歴
          </h3>
          <div className="window" data-reveal>
            <div className="window-bar">
              <div className="traffic" aria-hidden>
                <span />
                <span />
                <span />
              </div>
              <div className="mono text-muted">education.log — {education.length} entries</div>
            </div>
            <ol className="edu-tree px-5 md:px-8 py-8 md:py-10" data-scroll="track">
              {education.map((item, i) => {
                const isNow = i === education.length - 1;
                return (
                  <li
                    key={item.date}
                    className="edu-node"
                    data-reveal="left"
                    style={{ "--d": `${i * 110}ms` } as React.CSSProperties}
                  >
                    <span className={`edu-dot ${isNow ? "is-now" : ""}`} aria-hidden />
                    <div className="grid md:grid-cols-[200px_1fr] gap-2 md:gap-8 items-baseline">
                      <p className={`mono !text-[14px] md:!text-[16px] ${isNow ? "text-ink" : "text-muted"}`}>
                        {item.date}
                      </p>
                      <p className="text-[20px] md:text-[28px] font-extrabold tracking-[-0.036em] leading-[1.35]">
                        {isNow ? <span className="marker">{item.event}</span> : item.event}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
