"use client";

import { works, type Work } from "@/data/portfolio";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Garment, HangTag, itemNo, yearOf } from "./Garment";
import { SectionHeader, Tags } from "./ui";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const liveStatuses = ["公開中", "運用中 (Demo)", "実店舗導入済み", "体験会で運用中", "敢闘賞", "動作確認済み"];

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

// 商品詳細：服を手に取ったときの詳細
type ItemDetailProps = {
  work: Work;
  index: number;
  total: number;
  onClose: () => void;
  onSkip: (step: number) => void;
};

function ItemDetail({ work, index, total, onClose, onSkip }: ItemDetailProps) {
  return (
    <div key={index} className="window max-h-[88vh] overflow-y-auto liner-body">
      <div className="window-bar sticky top-0 bg-surface z-10 rounded-t-[25px]">
        <button onClick={onClose} className="traffic group" aria-label="閉じる">
          <span className="group-hover:!bg-laser" />
          <span />
          <span />
        </button>
        <div className="mono text-muted truncate">
          {itemNo(index)} / item-detail
        </div>
        {/* 前後のアイテムへ（← → キーでも操作できる） */}
        <div className="ml-auto flex items-center gap-1">
          <button onClick={() => onSkip(-1)} className="skip-btn" aria-label="前のアイテム">
            ⏮
          </button>
          <span className="mono text-muted px-1 tabular-nums">
            {index + 1}/{total}
          </span>
          <button onClick={() => onSkip(1)} className="skip-btn" aria-label="次のアイテム">
            ⏭
          </button>
          <button onClick={onClose} className="mono text-muted hover:text-ink ml-2">
            ESC ×
          </button>
        </div>
      </div>

      {/* 画面のスクリーンショット */}
      {work.shots && work.shots.length > 0 && (
        <div className="px-6 md:px-8 pt-6 md:pt-8">
          <p className="mono text-muted mb-3">LOOKBOOK — 実際の画面</p>
          {/* 複数枚あるときは横に並べる */}
          <div className={`grid gap-5 items-start ${work.shots.length > 1 ? "md:grid-cols-2" : ""}`}>
            {work.shots.map((shot) => (
              <figure
                key={shot.src}
                // 縦長（スマホ）の画面は幅を絞って中央に置く
                className={shot.height > shot.width * 1.4 ? "max-w-[240px] mx-auto" : shot.height > shot.width ? "max-w-[560px] mx-auto" : ""}
              >
                <a
                  href={`${basePath}${shot.src}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shot-frame block"
                  aria-label={`${shot.alt}（画像を別タブで開く）`}
                >
                  <span className="shot-bar" aria-hidden>
                    <span />
                    <span />
                    <span />
                  </span>
                  <Image
                    src={`${basePath}${shot.src}`}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes="(min-width: 860px) 800px, 92vw"
                    className="block w-full h-auto"
                  />
                </a>
                <figcaption className="mt-2 text-[13px] font-medium text-muted">{shot.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      <div className="p-6 md:p-8 grid md:grid-cols-[260px_1fr] gap-6 md:gap-10">
        <div className="relative w-[200px] md:w-full mx-auto md:mx-0 self-start rounded-[13px] bg-canvas px-6 py-5">
          <Garment cover={work.cover} hanger={false} />
          <span className="absolute left-4 top-8">
            <HangTag no={itemNo(index)} sub={yearOf(work.period)} />
          </span>
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
              <p className="mono text-muted mb-3">POINT</p>
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
  // 前後のアイテムへ：端まで行ったら反対側へループ
  const skip = (step: number) =>
    setSelected((current) => (current === null ? current : (current + step + works.length) % works.length));

  return (
    <section id="works" className="py-24 md:py-32 px-4 md:px-8 overflow-x-clip">
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader
          index="04"
          label="COLLECTION"
          title="制作物"
          lead="1 作品 = 1 着。ラックの服を手に取ると、アイテムの詳細が開きます。"
        />

        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-16">
          {works.map((work, index) => (
            <li
              key={work.title}
              className="rack-slot"
              data-reveal="pop"
              style={{ "--d": `${(index % 4) * 110}ms` } as React.CSSProperties}
            >
              <button
                onClick={() => open(index)}
                className="hanger-item text-left"
                aria-label={`${work.title} の詳細を開く`}
              >
                <Garment cover={work.cover} />
                <span className="absolute right-0 top-[20%]">
                  <HangTag no={itemNo(index)} sub={yearOf(work.period)} />
                </span>
              </button>

              <div className="mt-4">
                <StatusLabel status={work.status} />
                <h3 className="mt-2 text-[17px] md:text-[20px] font-extrabold tracking-[-0.03em] leading-[1.3]">{work.title}</h3>
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
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") skip(1);
          if (e.key === "ArrowLeft") skip(-1);
        }}
        onClick={(e) => {
          // 背景（dialog 自身）をクリックしたら閉じる
          if (e.target === e.currentTarget) close();
        }}
      >
        {selected !== null && (
          <ItemDetail
            work={works[selected]}
            index={selected}
            total={works.length}
            onClose={close}
            onSkip={skip}
          />
        )}
      </dialog>
    </section>
  );
}
