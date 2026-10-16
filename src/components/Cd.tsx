import type { CSSProperties } from "react";
import type { Cover } from "@/data/portfolio";

export const catalogNo = (index: number) => `KL-${String(index + 1).padStart(3, "0")}`;

export const yearOf = (period?: string) => period?.match(/\d{4}/)?.[0] ?? "";

// CD ジャケット
export function CdCover({ cover, catalog, year }: { cover: Cover; catalog: string; year?: string }) {
  return (
    <div className="cd-cover" style={{ background: cover.bg, color: cover.fg }}>
      <div className={`cd-pattern cd-pattern-${cover.pattern}`} aria-hidden />
      <div className="absolute inset-0 p-[9%] flex flex-col justify-between">
        <div className="cd-cover-meta flex justify-between gap-2">
          <span>{catalog}</span>
          <span>{year}</span>
        </div>
        <p className="cd-cover-title">{cover.title}</p>
      </div>
    </div>
  );
}

// ディスク（中央のレーベル色はジャケットの色）
export function CdDisc({ label }: { label: string }) {
  return <div className="cd-disc" style={{ "--label": label } as CSSProperties} aria-hidden />;
}

// 再生中を示す小さなイコライザー
export function PlayingBars({ className = "" }: { className?: string }) {
  return (
    <span className={`playing-bars ${className}`} aria-hidden>
      <span />
      <span />
      <span />
    </span>
  );
}
