"use client";

import { useEffect, useState } from "react";

// 数値を 0 から目標値まで数え上げる（data-count="52" data-decimals="2"）
function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const decimals = Number(el.dataset.decimals ?? 0);
  if (Number.isNaN(target)) return;
  const duration = 1200;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = (target * eased).toFixed(decimals);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/**
 * ページ全体のスクロール演出をまとめて受け持つ。
 * - [data-reveal]：画面に入ったらフェードイン（--d で遅延）
 *   - "left" / "pop"：横から・ポンと出る
 *   - "hang"：枠はフェードだけ、中の服がラックに掛かって揺れる
 *   - "stage"：枠は動かさず、中の演出（比較バーなど）のきっかけにする
 * - [data-count]：画面に入ったら数え上げ
 * - 上部の再生バー（スクロール進捗）と、トップへ戻るボタン
 */
export default function ScrollEffects() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    if (!reduced) root.dataset.revealReady = "on";

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal], [data-count]");
    if (reduced || typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("is-visible");
          if (el.dataset.count !== undefined) countUp(el);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setShowTop(window.scrollY > 640);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* 再生バー：どこまで聴いたか（読んだか） */}
      <div className="fixed top-0 inset-x-0 h-[3px] z-[60] pointer-events-none" aria-hidden>
        <div className="h-full bg-laser origin-left" style={{ transform: `scaleX(${progress})` }} />
      </div>

      {/* トップへ戻る：ハンガー */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`back-to-top ${showTop ? "is-shown" : ""}`}
        aria-label="ページの先頭へ戻る"
        tabIndex={showTop ? 0 : -1}
      >
        <svg viewBox="0 0 40 28" className="back-to-top-hanger w-8 relative -mt-1" aria-hidden>
          <path
            d="M20 9 L20 6 Q20 3 23 2.5 Q26 2 25.5 0"
            fill="none"
            stroke="var(--laser)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path d="M20 9 L3 19 L37 19 Z" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinejoin="round" />
        </svg>
        <span className="mono text-white relative -mt-3">TOP</span>
      </button>
    </>
  );
}
