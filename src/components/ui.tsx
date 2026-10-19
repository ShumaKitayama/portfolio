import type { ReactNode } from "react";

type WindowProps = {
  title?: ReactNode;
  right?: ReactNode;
  hover?: boolean;
  className?: string;
  // スクロールで出現させる（遅延 ms）
  revealDelay?: number;
  children: ReactNode;
};

// macOS 風のウィンドウカード
export function Window({ title, right, hover = false, className = "", revealDelay, children }: WindowProps) {
  return (
    <div
      className={`window ${hover ? "window-hover" : ""} ${className}`}
      data-reveal={revealDelay !== undefined ? "" : undefined}
      style={revealDelay !== undefined ? ({ "--d": `${revealDelay}ms` } as React.CSSProperties) : undefined}
    >
      <div className="window-bar">
        <div className="traffic" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        {title && <div className="mono text-muted truncate min-w-0">{title}</div>}
        {right && <div className="ml-auto flex-shrink-0">{right}</div>}
      </div>
      {children}
    </div>
  );
}

type SectionHeaderProps = {
  index: string;
  label: string;
  title: string;
  lead?: string;
};

export function SectionHeader({ index, label, title, lead }: SectionHeaderProps) {
  return (
    <div className="mb-12 md:mb-16" data-reveal="left">
      <p className="mono text-muted mb-4 flex items-center gap-2">
        <span className="laser-dot" />
        {index} / {label}
      </p>
      <h2 className="section-title">{title}</h2>
      {lead && <p className="mt-5 text-[16px] md:text-[18px] font-bold text-muted prose-ja">{lead}</p>}
    </div>
  );
}

export function Tags({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-[6px]">
      {items.map((item) => (
        <span key={item} className="tag">
          {item}
        </span>
      ))}
    </div>
  );
}
