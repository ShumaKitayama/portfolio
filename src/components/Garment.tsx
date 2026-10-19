import { useId } from "react";
import type { Cover, GarmentType } from "@/data/portfolio";

export const itemNo = (index: number) => `No.${String(index + 1).padStart(3, "0")}`;

export const yearOf = (period?: string) => period?.match(/\d{4}/)?.[0] ?? "";

// 服のシルエット（viewBox 200 x 240、上 40px はハンガー用）。どれも肩を落としたオーバーサイズ
const SHAPES: Record<GarmentType, string> = {
  tee: "M72 44 Q100 60 128 44 L176 64 L196 112 L166 124 L158 108 L160 236 L40 236 L42 108 L34 124 L4 112 L24 64 Z",
  hoodie:
    "M68 46 Q100 66 132 46 L172 64 Q188 124 192 220 L164 224 L158 124 L160 236 L40 236 L42 124 L36 224 L8 220 Q12 124 28 64 Z",
  shirt:
    "M76 44 L100 56 L124 44 L172 62 Q186 132 190 216 L164 218 L158 116 L162 238 L38 238 L42 116 L36 218 L10 216 Q14 132 28 62 Z",
  jacket:
    "M82 44 L118 44 L178 64 Q192 120 196 224 L168 228 L160 130 L164 238 L36 238 L40 130 L32 228 L4 224 Q8 120 22 64 Z",
  // ロングコート：裾に向かって少し広がる
  coat: "M84 44 L116 44 L176 62 Q190 122 194 222 L168 226 L162 128 L172 240 L28 240 L38 128 L32 226 L6 222 Q10 122 24 62 Z",
  // 野良着（羽織）：まっすぐ落ちる広い袖
  noragi: "M86 44 L114 44 L190 58 L194 142 L158 144 L158 238 L42 238 L42 144 L6 142 L10 58 Z",
  // ニット：丸首と、袖口・裾のリブ
  knit: "M74 46 Q100 60 126 46 L170 62 Q186 124 190 222 L164 226 L158 124 L160 236 L40 236 L42 124 L36 226 L10 222 Q14 124 30 62 Z",
};

// ピークドラペル（左右）
const PEAK_LAPELS = "M82 44 L72 62 L54 88 L68 98 L100 156 Z M118 44 L128 62 L146 88 L132 98 L100 156 Z";
// コートのノッチドラペル（左右）
const NOTCH_LAPELS = "M84 44 L74 64 L66 96 L80 92 L100 132 Z M116 44 L126 64 L134 96 L120 92 L100 132 Z";

const initialsOf = (title: string) =>
  title.includes(" ")
    ? title
        .split(" ")
        .map((word) => word[0])
        .join("")
    : Array.from(title).slice(0, 3).join("");

// 暗い色の服かどうか（黒背景で縁を光らせるため）
function isDark(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 70;
}

// 胸のプリント。large は胸いっぱい、small は胸元に小さく
function Print({ title, color, size }: { title: string; color: string; size: "large" | "small" }) {
  const words = title.split(" ");
  const lines = words.length > 1 ? words : [title];
  const longest = Math.max(
    ...lines.map((line) => Array.from(line).reduce((w, ch) => w + (/[ -~]/.test(ch) ? 0.62 : 1), 0)),
  );
  const max = size === "large" ? 28 : 9;
  const width = size === "large" ? 100 : 46;
  const fontSize = Math.min(max, width / Math.max(longest, 1));
  const centerY = size === "large" ? 138 : 92;
  const startY = centerY - ((lines.length - 1) * fontSize * 0.95) / 2;
  return (
    <g
      fill={color}
      fontWeight={800}
      textAnchor="middle"
      style={{ letterSpacing: size === "large" ? "-0.04em" : "0.18em" }}
    >
      {lines.map((line, i) => (
        <text key={line} x="100" y={startY + i * fontSize * 0.95} fontSize={fontSize}>
          {line}
        </text>
      ))}
    </g>
  );
}

// 胸元の刺繍ネーム（羽織り物用）
function Embroidery({ title, color, x = 139, y = 134 }: { title: string; color: string; x?: number; y?: number }) {
  return (
    <g fill={color} fontWeight={800} textAnchor="middle" fontSize="6.5" style={{ letterSpacing: "0.06em" }}>
      {title.split(" ").map((word, i) => (
        <text key={word} x={x} y={y + i * 7.5}>
          {word}
        </text>
      ))}
    </g>
  );
}

// 柄（色は fg を薄く重ねる）
function Pattern({ type, id, color }: { type: Cover["pattern"]; id: string; color: string }) {
  switch (type) {
    case "stripes":
      return (
        <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="14" fill={color} />
        </pattern>
      );
    case "pinstripe":
      return (
        <pattern id={id} width="7" height="7" patternUnits="userSpaceOnUse">
          <line x1="3.5" y1="0" x2="3.5" y2="7" stroke={color} strokeWidth="0.5" />
        </pattern>
      );
    case "rib":
      return (
        <pattern id={id} width="3.5" height="4" patternUnits="userSpaceOnUse">
          <line x1="1.75" y1="0" x2="1.75" y2="4" stroke={color} strokeWidth="1.2" />
        </pattern>
      );
    case "dots":
      return (
        <pattern id={id} width="13" height="13" patternUnits="userSpaceOnUse">
          <circle cx="6.5" cy="6.5" r="2.6" fill={color} />
        </pattern>
      );
    case "grid":
      return (
        <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0 L0 0 0 16" fill="none" stroke={color} strokeWidth="1.5" />
        </pattern>
      );
    case "twill":
      return (
        <pattern id={id} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke={color} strokeWidth="0.6" />
        </pattern>
      );
    case "wave":
      return (
        // 青海波
        <pattern id={id} width="20" height="10" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth="0.9">
            {[9, 6, 3].map((r) => (
              <path key={r} d={`M${10 - r} 10 A${r} ${r} 0 0 1 ${10 + r} 10`} />
            ))}
            {[9, 6, 3].map((r) => (
              <path key={`a${r}`} d={`M${-r} 5 A${r} ${r} 0 0 1 ${r} 5 M${20 - r} 5 A${r} ${r} 0 0 1 ${20 + r} 5`} />
            ))}
          </g>
        </pattern>
      );
    default:
      return null;
  }
}

function Rings({ cx, cy, color }: { cx: number; cy: number; color: string }) {
  return (
    <g fill="none" stroke={color} strokeWidth="1.2">
      {Array.from({ length: 14 }, (_, i) => (
        <circle key={i} cx={cx} cy={cy} r={6 + i * 11} />
      ))}
    </g>
  );
}

// 光沢・陰影を乗せる面（ラペルなど）
function Satin({ d, base, satinId }: { d: string; base: string; satinId: string }) {
  return (
    <>
      <path d={d} fill={base} />
      <path d={d} fill={`url(#${satinId})`} />
      <path d={d} fill="none" stroke="#fff" strokeOpacity="0.18" strokeWidth="0.8" strokeLinejoin="round" />
    </>
  );
}

type GarmentProps = {
  cover: Cover;
  className?: string;
  // ハンガーを描くか（詳細表示では服だけにする）
  hanger?: boolean;
};

// ハンガーに掛かった服
export function Garment({ cover, className = "", hanger = true }: GarmentProps) {
  const uid = useId().replace(/:/g, "");
  const shape = SHAPES[cover.garment];
  const patternId = `pat-${uid}`;
  const clipId = `clip-${uid}`;
  const shadeId = `shade-${uid}`;
  const satinId = `satin-${uid}`;
  const dark = isDark(cover.bg);
  // 縫い目・ボタンなど、生地の上に乗せる線の色
  const line = dark ? "#fff" : "#000";
  const print = cover.print ?? "large";

  return (
    <svg viewBox="0 0 200 240" className={`garment ${className}`} role="img" aria-label={`${cover.title} の服`}>
      <defs>
        <clipPath id={clipId}>
          <path d={shape} />
        </clipPath>
        <Pattern type={cover.pattern} id={patternId} color={cover.fg} />
        {/* 生地の陰影 */}
        <linearGradient id={shadeId} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity={dark ? 0.12 : 0.22} />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity={dark ? 0.3 : 0.14} />
        </linearGradient>
        {/* サテンの光沢 */}
        <linearGradient id={satinId} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {hanger && (
        <g fill="none" stroke="#c9c9cd" strokeLinecap="round" strokeLinejoin="round">
          <path d="M100 30 L100 20 Q100 12 107 10 Q114 8 113 2" strokeWidth="3" />
          <path d="M100 30 L30 58 L170 58 Z" strokeWidth="3.5" />
        </g>
      )}

      <g clipPath={`url(#${clipId})`}>
        <rect width="200" height="240" fill={cover.bg} />
        <g opacity={cover.pattern === "twill" || cover.pattern === "pinstripe" ? 0.14 : 0.2}>
          {cover.pattern === "sonar" && <Rings cx={150} cy={214} color={cover.fg} />}
          {cover.pattern === "rings" && <Rings cx={100} cy={140} color={cover.fg} />}
          {cover.pattern !== "sonar" && cover.pattern !== "rings" && cover.pattern !== "none" && (
            <rect width="200" height="240" fill={`url(#${patternId})`} />
          )}
        </g>

        {/* ===== 服の種類ごとのディテール ===== */}

        {cover.garment === "tee" && (
          <path d="M72 44 Q100 60 128 44" fill="none" stroke={line} strokeOpacity="0.22" strokeWidth="5" />
        )}

        {cover.garment === "hoodie" && (
          <g>
            <path d="M68 46 Q100 16 132 46 Q100 62 68 46 Z" fill="#000" opacity="0.28" />
            {/* 紐 */}
            <path d="M92 56 L90 92 M108 56 L110 92" stroke={line} strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M60 178 L140 178 L150 218 L50 218 Z" fill="none" stroke={line} strokeOpacity="0.16" strokeWidth="1.5" />
            <path d="M40 228 L160 228" stroke={line} strokeOpacity="0.14" strokeWidth="1" />
          </g>
        )}

        {cover.garment === "knit" && (
          <g stroke={line} strokeOpacity="0.2">
            {/* リブ編みの首・裾・袖口 */}
            <path d="M74 46 Q100 62 126 46" fill="none" strokeWidth="6" />
            <path d="M40 222 L160 222" strokeWidth="1" />
            <path d="M14 208 L38 210 M162 210 L186 208" strokeWidth="1" />
          </g>
        )}

        {cover.garment === "shirt" && (
          <g>
            {/* 襟と前立て */}
            <path
              d="M76 44 L100 56 L86 74 Z M124 44 L100 56 L114 74 Z"
              fill={dark ? "#fff" : "#000"}
              fillOpacity="0.1"
              stroke={line}
              strokeOpacity="0.3"
              strokeWidth="1"
            />
            <path d="M100 58 L100 238" stroke={line} strokeOpacity="0.2" strokeWidth="1.2" />
            {[84, 114, 144, 174, 204].map((y) => (
              <circle key={y} cx="104" cy={y} r="2" fill={line} opacity="0.35" />
            ))}
            {/* 裾のスリット */}
            <path d="M42 238 L46 222 M158 238 L154 222" stroke={line} strokeOpacity="0.2" strokeWidth="1" />
          </g>
        )}

        {cover.garment === "jacket" && (
          <g>
            <path d="M82 44 L100 156 L118 44 Z" fill="#050506" />
            {/* 首元の織りネーム */}
            <rect x="92" y="46" width="16" height="8" rx="1" fill="#f4f4f5" />
            <text x="100" y="51.8" fontSize="4.2" fontWeight={800} textAnchor="middle" fill="#111">
              {initialsOf(cover.title)}
            </text>
            <Satin d={PEAK_LAPELS} base={cover.bg} satinId={satinId} />
            <path d="M100 156 L100 238" stroke="#000" strokeOpacity="0.6" strokeWidth="1.4" />
            <circle cx="104" cy="170" r="4.2" fill={`url(#${satinId})`} stroke="#fff" strokeOpacity="0.25" strokeWidth="0.6" />
            <path
              d="M128 122 L150 119 M48 200 L84 200 M116 200 L152 200"
              stroke="#000"
              strokeOpacity="0.7"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M24 70 Q34 100 40 130 M176 70 Q166 100 160 130"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.1"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />
            {[184, 190, 10, 16].map((x) => (
              <circle key={x} cx={x} cy="214" r="1.6" fill="#fff" opacity="0.25" />
            ))}
          </g>
        )}

        {cover.garment === "coat" && (
          <g>
            <path d="M84 44 L100 132 L116 44 Z" fill="#0a0a0b" />
            <Satin d={NOTCH_LAPELS} base={cover.bg} satinId={satinId} />
            {/* ダブルブレストのボタンとベルト */}
            {[148, 176].map((y) => (
              <g key={y}>
                <circle cx="84" cy={y} r="3" fill={line} opacity="0.3" />
                <circle cx="116" cy={y} r="3" fill={line} opacity="0.3" />
              </g>
            ))}
            <path d="M116 132 L116 240" stroke="#000" strokeOpacity="0.45" strokeWidth="1.2" />
            <rect x="38" y="192" width="124" height="9" fill="#000" fillOpacity="0.25" />
            <path d="M38 192 L162 192 M38 201 L162 201" stroke={line} strokeOpacity="0.15" strokeWidth="0.8" />
            {/* ベルトの垂れ */}
            <path d="M120 201 L124 232 L130 232 L128 201 Z" fill="#000" fillOpacity="0.25" />
            {/* 裾のベント */}
            <path d="M100 240 L100 214" stroke={line} strokeOpacity="0.12" strokeWidth="1" />
          </g>
        )}

        {cover.garment === "noragi" && (
          <g>
            {/* 打ち合わせの衿：着る人の左側（画面の右側）を上に重ねる。逆だと「左前」になる */}
            <path d="M86 44 L108 150" stroke={dark ? "#cfcabd" : "#111"} strokeOpacity="0.55" strokeWidth="10" />
            <path d="M114 44 L84 150" stroke="#000" strokeOpacity="0.35" strokeWidth="13" />
            <path d="M114 44 L84 150" stroke={dark ? "#e9e6dd" : "#111"} strokeOpacity="0.92" strokeWidth="10" />
            {/* 紐 */}
            <path d="M90 136 Q76 146 80 166 M90 136 Q100 150 96 170" fill="none" stroke={line} strokeOpacity="0.5" strokeWidth="1.2" />
            {/* 袖付けのステッチ */}
            <path d="M42 58 L42 144 M158 58 L158 144" stroke={line} strokeOpacity="0.14" strokeWidth="0.8" strokeDasharray="2 2" />
          </g>
        )}

        {print !== "none" && !["shirt", "jacket", "coat", "noragi"].includes(cover.garment) && (
          <Print title={cover.title} color={cover.fg} size={print} />
        )}
        <rect width="200" height="240" fill={`url(#${shadeId})`} />
      </g>

      {/* 羽織り物は胸元に刺繍ネーム */}
      {(cover.garment === "jacket" || cover.garment === "coat") && <Embroidery title={cover.title} color={cover.fg} />}
      {cover.garment === "noragi" && <Embroidery title={cover.title} color={cover.fg} x={140} y={110} />}
      {cover.garment === "shirt" && print !== "none" && (
        <Embroidery title={initialsOf(cover.title)} color={cover.fg} x={136} y={100} />
      )}

      {/* 暗い服は縁に光を入れて、黒背景から浮かせる */}
      <path
        d={shape}
        fill="none"
        stroke={dark ? "#fff" : "#000"}
        strokeOpacity={dark ? 0.22 : 0.14}
        strokeWidth={dark ? 1 : 1.5}
      />
    </svg>
  );
}

// 下げ札（タグ）
export function HangTag({ no, sub }: { no: string; sub?: string }) {
  return (
    <span className="hang-tag">
      <span className="hang-tag-hole" aria-hidden />
      <span className="mono block">{no}</span>
      {sub && <span className="mono block text-muted">{sub}</span>}
    </span>
  );
}
