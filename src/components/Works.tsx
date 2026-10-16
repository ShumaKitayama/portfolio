"use client";

import { works, type Work } from "@/data/portfolio";
import { useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { CdCover, CdDisc, catalogNo, yearOf } from "./Cd";
import { SectionHeader, Tags } from "./ui";

const liveStatuses = ["公開中", "運用中 (Demo)", "実店舗導入済み", "体験会で運用中", "敢闘賞"];

function StatusLabel({ status }: { status: string }) {
  return (
    <span className="mono flex items-center gap-2 text-muted">
      {liveStatuses.includes(status) ? (
        <span className="laser-dot" />
      ) : (
        <span className="w-2 h-2 rounded-full bg-silver" />
      )}
      {status}
    </span>
  );
}

// ライナーノーツ：CD を開いたときの詳細
function LinerNotes({ work, index, onClose }: { work: Work; index: number; onClose: () => void }) {
  return (
    <div className="window max-h-[88vh] overflow-y-auto">
      <div className="window-bar sticky top-0 bg-surface z-10 rounded-t-[25px]">
        <button onClick={onClose} className="traffic group" aria-label="閉じる">
          <span className="group-hover:!bg-laser" />
          <span />
          <span />
        </button>
        <div className="mono text-muted truncate">
          {catalogNo(index)} / liner-notes.txt
        </div>
        <button onClick={onClose} className="ml-auto mono text-muted hover:text-ink">
          ESC ×
        </button>
      </div>

      <div className="p-6 md:p-8 grid md:grid-cols-[260px_1fr] gap-6 md:gap-10">
        <div className="relative w-[200px] md:w-full aspect-square mx-auto md:mx-0">
          <CdCover cover={work.cover} catalog={catalogNo(index)} year={yearOf(work.period)} />
        </div>

        <div className="min-w-0">
          <StatusLabel status={work.status} />
          <h3 className="mt-3 text-[28px] md:text-[36px] font-extrabold tracking-[-0.036em] leading-[1.15]">
            {work.title}
          </h3>
          {(work.period || work.team) && (
            <p className="mono text-muted mt-2">{[work.period, work.team].filter(Boolean).join(" · ")}</p>
          )}

          <p className="mt-5 text-[15px] font-medium text-graphite prose-ja">{work.description}</p>

          {work.highlights && (
            <div className="mt-6">
              <p className="mono text-muted mb-3">TRACKLIST</p>
              <ol className="space-y-[10px]">
                {work.highlights.map((item, i) => (
                  <li key={i} className="flex gap-3 text-[14px] font-medium prose-ja">
                    <span className="mono text-ink pt-[3px] flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="mt-6 pt-6 border-t-2 border-stone">
            <Tags items={work.tech} />
            {(work.url || work.repo) && (
              <div className="mt-5 flex flex-wrap gap-2">
                {work.url && (
                  <a href={work.url} target="_blank" rel="noopener noreferrer" className="btn">
                    サイトを見る <span aria-hidden>›</span>
                  </a>
                )}
                {work.repo && (
                  <a href={work.repo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    <FaGithub size={13} /> GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Works() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const open = (index: number) => {
    setSelected(index);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <section id="works" className="py-24 md:py-32 px-4 md:px-8 overflow-x-clip">
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader
          index="04"
          label="DISCOGRAPHY"
          title="制作物"
          lead="1 作品 = 1 枚の CD。ジャケットを選ぶと、ライナーノーツ（詳細）が開きます。"
        />

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {works.map((work, index) => (
            <li key={work.title} className="cd-item">
              <button
                onClick={() => open(index)}
                className="cd-slot text-left"
                aria-label={`${work.title} の詳細を開く`}
              >
                <span className="cd-disc-wrap">
                  <CdDisc label={work.cover.bg} />
                </span>
                <span className="cd-case">
                  <CdCover cover={work.cover} catalog={catalogNo(index)} year={yearOf(work.period)} />
                </span>
              </button>

              <div className="mt-5 pr-[30%]">
                <StatusLabel status={work.status} />
                <h3 className="mt-2 text-[20px] font-extrabold tracking-[-0.03em] leading-[1.3]">{work.title}</h3>
                {work.team && <p className="mono text-muted mt-1">{work.team}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        className="liner"
        onClose={() => setSelected(null)}
        onClick={(e) => {
          // 背景（dialog 自身）をクリックしたら閉じる
          if (e.target === e.currentTarget) close();
        }}
      >
        {selected !== null && <LinerNotes work={works[selected]} index={selected} onClose={close} />}
      </dialog>
    </section>
  );
}
