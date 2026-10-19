"use client";

import { useEffect, useState } from "react";

// カラーバリエーション。どれも黒文字が読める明るさにしている
const SWATCHES = [
  { name: "LIME", color: "#3dff7a" },
  { name: "PINK", color: "#ff6b8b" },
  { name: "YELLOW", color: "#ffd400" },
  { name: "ORANGE", color: "#ff9f1c" },
  { name: "LILAC", color: "#c58cff" },
  { name: "SKY", color: "#5ab8ff" },
  { name: "MINT", color: "#3de8e0" },
];

const STORAGE_KEY = "kitayama-lab:accent-color";

function apply(color: string) {
  document.documentElement.style.setProperty("--laser", color);
}

/**
 * 色違いの生地チップ。選んだ色がサイト全体のアクセント色になる。
 */
export default function AccentMixer() {
  const [current, setCurrent] = useState(SWATCHES[0].name);

  // 前回の色を復元（保存できない環境でも表示は壊さない）
  useEffect(() => {
    try {
      const saved = SWATCHES.find((s) => s.name === localStorage.getItem(STORAGE_KEY));
      if (saved) {
        setCurrent(saved.name);
        apply(saved.color);
      }
    } catch {
      // 何もしない
    }
  }, []);

  const select = (name: string, color: string) => {
    setCurrent(name);
    apply(color);
    try {
      localStorage.setItem(STORAGE_KEY, name);
    } catch {
      // 何もしない
    }
  };

  return (
    <div className="flex items-center gap-[6px]" role="radiogroup" aria-label="アクセントカラーを選ぶ">
      {SWATCHES.map(({ name, color }) => (
        <button
          key={name}
          role="radio"
          aria-checked={current === name}
          aria-label={name}
          title={name}
          onClick={() => select(name, color)}
          className="swatch"
          style={{ "--swatch": color } as React.CSSProperties}
        />
      ))}
      <span className="mono text-muted w-[52px] text-right">{current}</span>
    </div>
  );
}
