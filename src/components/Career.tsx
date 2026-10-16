import { careers, education, type Role } from "@/data/portfolio";
import { PlayingBars } from "./Cd";
import { SectionHeader, Tags } from "./ui";

const sideLetter = (i: number) => String.fromCharCode(65 + i); // A, B, C...

function RoleBlock({ role, side }: { role: Role; side: string }) {
  return (
    <div className="grid grid-cols-[36px_1fr] gap-3 py-5 border-t-2 border-stone first:border-t-0 first:pt-0">
      <span className="mono text-muted pt-[3px]">{side}</span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="tag !bg-ink !text-white !border-ink">{role.type}</span>
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
          label="TRACKLIST"
          title="職歴"
          lead="インターン・アルバイトで、フロントエンドから SRE まで実務を経験してきました。曲名を選ぶと詳細が開きます。"
        />

        <div className="window overflow-hidden">
          <div className="window-bar">
            <div className="traffic" aria-hidden>
              <span />
              <span />
              <span />
            </div>
            <div className="mono text-muted">career.m3u — {careers.length} tracks</div>
          </div>

          <ol>
            {careers.map((career, index) => (
              <li key={career.company} className="border-t-2 border-stone first:border-t-0">
                <details className="group/track" open={index === 0}>
                  <summary className="track-row grid grid-cols-[44px_1fr_auto] md:grid-cols-[64px_1fr_auto_24px] items-center gap-3 md:gap-5 px-5 md:px-8 py-5 md:py-6">
                    <span className="flex items-center">
                      {career.current ? (
                        <PlayingBars />
                      ) : (
                        <span className="mono text-[14px] text-muted">{String(index + 1).padStart(2, "0")}</span>
                      )}
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

                  <div className="px-5 md:px-8 pb-8 md:pl-[116px]">
                    {career.roles.map((role, i) => (
                      <RoleBlock key={i} role={role} side={sideLetter(i)} />
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

        {/* 学歴：B 面 */}
        <div className="mt-12">
          <p className="mono text-muted mb-5">B-SIDE / EDUCATION</p>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {education.map((item, i) => (
              <li key={item.date} className="window p-5">
                <p className="mono text-muted mb-2">
                  B{i + 1} · {item.date}
                </p>
                <p className="text-[15px] font-bold prose-ja">{item.event}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
