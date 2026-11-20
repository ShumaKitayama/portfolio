"use client";

import { achievements, certifications, skillGroups, skillLevels } from "@/data/portfolio";
import { useEffect, useRef, useState } from "react";
import { SectionHeader, Window } from "./ui";

const SEGMENTS = 5;
const levelLabel = (level: number) => skillLevels.find((l) => l.level === level)?.label ?? "";

// 画面に入ったらメーターを点灯させる
function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function Meter({ level }: { level: number }) {
  return (
    <span className="meter" role="img" aria-label={`レベル ${level} / ${SEGMENTS}：${levelLabel(level)}`}>
      {Array.from({ length: SEGMENTS }, (_, i) => (
        <span
          key={i}
          className={i < level ? `seg on ${i >= 4 ? "peak" : i >= 3 ? "hot" : ""}` : "seg"}
          style={{ transitionDelay: `${i * 35}ms`, "--s": i } as React.CSSProperties}
        />
      ))}
    </span>
  );
}

export default function Skills() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="skills" className="py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader
          index="05"
          label="MATERIAL"
          title="スキル・実績"
          lead="使った経験と、今どのくらい扱えるかを 5 段階のメーターで表しています。"
        />

        {/* レベルの凡例 */}
        <ol className="mb-8 flex flex-wrap gap-2" data-reveal>
          {skillLevels.map(({ level, label }) => (
            <li key={level} className="tag !text-[12px] !py-[6px] gap-2">
              <span className="mono">LV.{level}</span>
              {label}
            </li>
          ))}
        </ol>

        <div ref={ref} className={`mixer ${inView ? "is-live" : ""} grid md:grid-cols-2 gap-5`}>
          {skillGroups.map((group, i) => (
            <Window
              revealDelay={(i % 2) * 120}
              className="min-w-0"
              key={group.channel}
              title={group.channel}
              right={<span className="text-[13px] font-extrabold">{group.label}</span>}
            >
              <ul className="p-5 md:p-6 space-y-4">
                {group.items.map((skill) => (
                  <li key={skill.name} data-scroll="enter">
                    <div className="flex items-baseline justify-between gap-3 mb-[6px]">
                      <span className="text-[15px] font-extrabold tracking-[-0.02em]">{skill.name}</span>
                      <span className="mono text-muted text-right">
                        LV.{skill.level}
                      </span>
                    </div>
                    <Meter level={skill.level} />
                    {skill.used && <p className="mono !font-bold text-muted mt-[6px] truncate">{skill.used}</p>}
                  </li>
                ))}
              </ul>
            </Window>
          ))}
        </div>

        <div className="mt-5 grid md:grid-cols-2 gap-5">
          {/* 受賞：金のボタン */}
          <Window title="awards / gold-button" revealDelay={0}>
            <ul className="p-6 md:p-8 space-y-6">
              {achievements.map((achievement) => (
                <li key={achievement.year + achievement.project} className="flex gap-4 items-start">
                  <span className="gold-button flex-shrink-0" aria-hidden />
                  <div className="min-w-0">
                    <p className="mono text-muted mb-1">{achievement.year}</p>
                    <p className="text-[16px] md:text-[17px] font-extrabold leading-[1.45] tracking-[-0.02em]">
                      {achievement.title}
                    </p>
                    <p className="mt-1 text-[14px] font-bold text-muted">
                      作品：<span className="marker text-ink">{achievement.project}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Window>

          <Window title="certifications.txt" revealDelay={120}>
            <ul className="p-6 md:p-8 space-y-4">
              {certifications.map((cert) => (
                <li key={cert} className="flex gap-3 text-[15px] font-bold prose-ja">
                  <span className="mt-[0.65em] w-[6px] h-[6px] bg-ink flex-shrink-0" aria-hidden />
                  {cert}
                </li>
              ))}
            </ul>
          </Window>
        </div>
      </div>
    </section>
  );
}
