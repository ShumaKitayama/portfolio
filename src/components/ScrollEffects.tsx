"use client";

import { useEffect, useRef, useState } from "react";

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

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
// enter：下から入って、画面の上 4 割の位置に来たら 1
const ENTER_SPAN = 0.6;
// track：画面の 7 割の高さを再生ヘッドとし、要素のどこまでを通り過ぎたか
const PLAYHEAD = 0.7;

// スクロールの進み具合（0〜1）。data-scroll の値で測り方を変える
function progressOf(mode: string | undefined, rect: DOMRectReadOnly, vh: number) {
  switch (mode) {
    case "exit":
      return clamp01(-rect.top / rect.height);
    case "enter":
      return clamp01((vh - rect.top) / (vh * ENTER_SPAN));
    case "track":
      return clamp01((vh * PLAYHEAD - rect.top) / rect.height);
    default:
      // through：画面の下から入って上へ抜けるまで
      return clamp01((vh - rect.top) / (vh + rect.height));
  }
}

/**
 * ページ全体のスクロール演出をまとめて受け持つ。
 * - [data-reveal]：画面に入ったらフェードイン（--d で遅延）
 *   - "left" / "pop"：横から・ポンと出る
 *   - "hang"：枠はフェードだけ、中の服がラックに掛かって揺れる
 *   - "stage"：枠は動かさず、中の演出（比較バーなど）のきっかけにする
 * - [data-count]：画面に入ったら数え上げ
 * - [data-scroll]：スクロール位置に連動して --p（0〜1）を書き込む（exit / enter / track / through）
 *   動きは CSS 側（html[data-scroll-ready="on"]）。動きを減らす設定では書き込まない
 * - 上部の再生バー（スクロール進捗）と、トップへ戻るボタン
 */
export default function ScrollEffects() {
  const barRef = useRef<HTMLDivElement>(null);
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
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]"));
    // 画面の近くにある要素だけ毎フレーム計算する
    const active = new Set<HTMLElement>(targets);
    const written = new WeakMap<HTMLElement, string>();
    let linked = !media.matches;
    let frame = 0;

    const write = (el: HTMLElement, value: string) => {
      if (written.get(el) === value) return;
      written.set(el, value);
      el.style.setProperty("--p", value);
    };

    // 1 フレームに 1 回：先にまとめて読み、あとでまとめて書く
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;
      const max = root.scrollHeight - vh;
      const list = linked ? Array.from(active) : [];
      const values = list.map((el) => progressOf(el.dataset.scroll, el.getBoundingClientRect(), vh).toFixed(3));

      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      setShowTop(y > 640);
      list.forEach((el, i) => write(el, values[i]));
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const applyMotionSetting = () => {
      linked = !media.matches;
      if (linked) root.dataset.scrollReady = "on";
      else delete root.dataset.scrollReady;
      request();
    };
    applyMotionSetting();

    // 遠くへ離れた要素は外す。外すときに最後の値を書いておき、途中の状態で止まらないようにする
    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const el = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              active.add(el);
            } else {
              active.delete(el);
              if (linked) {
                write(el, progressOf(el.dataset.scroll, entry.boundingClientRect, window.innerHeight).toFixed(3));
              }
            }
          }
          request();
        },
        { rootMargin: "25% 0px" },
      );
      targets.forEach((el) => observer?.observe(el));
    }

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    media.addEventListener("change", applyMotionSetting);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      media.removeEventListener("change", applyMotionSetting);
      delete root.dataset.scrollReady;
    };
  }, []);

  return (
    <>
      {/* 再生バー：どこまで聴いたか（読んだか） */}
      <div className="fixed top-0 inset-x-0 h-[3px] z-[60] pointer-events-none" aria-hidden>
        <div ref={barRef} className="h-full bg-laser origin-left" style={{ transform: "scaleX(0)" }} />
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
