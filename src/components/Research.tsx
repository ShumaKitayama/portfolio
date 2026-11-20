"use client";

import { research } from "@/data/portfolio";
import { useRef } from "react";
import { Garment, HangTag } from "./Garment";
import { SectionHeader } from "./ui";

// 「52」「0.48%」のような数値は数え上げる。「4〜8×」などはそのまま表示
function MetricValue({ value }: { value: string }) {
  const match = value.match(/^(\d+(?:\.(\d+))?)(%?)$/);
  if (!match) return <>{value}</>;
  return (
    <>
      <span data-count={match[1]} data-decimals={match[2]?.length ?? 0}>
        {match[1]}
      </span>
      {match[3]}
    </>
  );
}

export default function Research() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <section id="research" className="py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-[1120px] mx-auto">
        <SectionHeader index="03" label="LIMITED EDITION" title="研究" lead={research.lab} />

        {/* 限定アイテム：黒いパネル */}
        <div data-reveal data-scroll="enter" className="research-panel laser-sweep rounded-[25px] bg-surface text-white overflow-hidden shadow-[0_0_0_1px_var(--stone),0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="p-6 md:p-12 grid lg:grid-cols-[minmax(0,320px)_1fr] gap-10 lg:gap-14">
            {/* ハンガーに掛かった限定の一着 */}
            <div>
              <div
                className="max-w-[300px] mx-auto lg:mx-0"
                data-reveal="hang"
                style={{ "--d": "150ms" } as React.CSSProperties}
              >
                <span className="rack-bar block" aria-hidden />
                <button onClick={open} className="hanger-item group" aria-label="研究の詳細を開く">
                  <Garment cover={research.cover} className="research-garment" />
                  <span className="absolute right-0 top-[20%]">
                    <HangTag no="LIMITED" sub="2025—" />
                  </span>
                </button>
              </div>
              <p className="mono text-white/60 mt-5 flex items-center gap-2">
                <span className="laser-dot on-air" />
                {research.status}
              </p>
            </div>

            <div className="research-copy min-w-0">
              <h3 className="text-[26px] md:text-[38px] font-extrabold tracking-[-0.04em] leading-[1.25]">
                {research.title}
              </h3>
              <p className="mt-5 text-[15px] md:text-[16px] font-medium text-white/70 prose-ja">{research.background}</p>

              {/* 最新の進捗 */}
              <p className="mt-5 rounded-[13px] bg-canvas px-4 py-3 text-[14px] font-bold prose-ja shadow-[inset_0_0_0_1px_var(--stone)]">
                <span className="mono text-laser mr-2">UPDATE {research.updatedAt}</span>
                {research.latestSummary}
              </p>

              {/* 数値 */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/15 rounded-[13px] overflow-hidden">
                {research.metrics.map((metric) => (
                  <div key={metric.label} className="bg-surface p-5">
                    <p className="text-[40px] md:text-[48px] font-extrabold tracking-[-0.045em] leading-none text-laser">
                      <MetricValue value={metric.value} />
                    </p>
                    <p className="mt-3 text-[14px] font-extrabold">{metric.label}</p>
                    <p className="mono text-white/50 mt-1">{metric.note}</p>
                  </div>
                ))}
              </div>

              <button onClick={open} className="btn mt-8">
                研究の詳細を見る <span aria-hidden>›</span>
              </button>
            </div>
          </div>

          <div className="px-6 md:px-10 py-6 border-t border-white/15 flex flex-wrap gap-[6px]">
            {research.tech.map((tech) => (
              <span key={tech} className="tag !bg-transparent !border-white/25 !text-white">
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* 研究の詳細はポップアップにまとめる */}
      <dialog
        ref={dialogRef}
        className="liner liner-wide"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="window max-h-[88vh] overflow-y-auto liner-body">
          <div className="window-bar sticky top-0 bg-surface z-10 rounded-t-[25px]">
            <button onClick={close} className="traffic group" aria-label="閉じる">
              <span className="group-hover:!bg-laser" />
              <span />
              <span />
            </button>
            <div className="mono text-muted truncate">LIMITED / research-detail</div>
            <button onClick={close} className="ml-auto mono text-muted hover:text-ink">
              ESC ×
            </button>
          </div>
          <div className="px-6 md:px-10 pt-8">
            <p className="mono text-muted mb-2">{research.lab}</p>
            <h3 className="text-[24px] md:text-[34px] font-extrabold tracking-[-0.04em] leading-[1.3]">
              {research.title}
            </h3>
          </div>
          <ResearchDetail />
        </div>
      </dialog>
    </section>
  );
}

// 小見出し
function BlockTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-5">
      <p className="mono text-muted mb-2">{label}</p>
      <h4 className="text-[22px] md:text-[28px] font-extrabold tracking-[-0.036em] leading-[1.3]">{title}</h4>
    </div>
  );
}

function StatusChip({ status }: { status: string }) {
  return (
    <span
      className={`mono px-2 py-1 rounded-[1.5px] ${status === "完了" ? "bg-white text-[#111]" : "bg-laser text-[#111]"}`}
    >
      {status}
    </span>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ol className="space-y-[10px]">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[14px] md:text-[15px] font-medium text-graphite prose-ja">
          <span className="mono text-muted pt-[3px] flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

// 研究の詳細：背景の流れ・手法・結果・今後
function ResearchDetail() {
  const { flow, flowNote, method, step1, step2, roadmap, latest, updatedAt } = research;
  const raceMax = Math.max(...step1.race.map((r) => r.md));

  return (
    <div className="pb-4">
      {/* ===== 背景：今の構造決定の流れ ===== */}
      <section className="research-block">
        <div className="flex items-center gap-3 mb-4">
          <span className="mono text-muted">01 / why</span>
        </div>
        <div>
          <BlockTitle label="BACKGROUND" title="表面の原子配置は、実験と計算の往復で決まる" />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {flow.map((node, i) => (
              <li key={node.label} className={`flow-node ${node.target ? "is-target" : ""}`}>
                <p className="mono mb-2 flex items-center gap-2">
                  <span className="text-muted">{String(i + 1).padStart(2, "0")}</span>
                  {node.label}
                  {node.target && <span className="ml-auto mono flow-badge">DQN</span>}
                </p>
                <p className="text-[15px] font-bold prose-ja">{node.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-[15px] md:text-[16px] font-bold flex items-center gap-2">
            <span className="laser-dot flex-shrink-0" />
            <span className="marker">{flowNote}</span>
          </p>
        </div>
      </section>

      {/* ===== 最新の進捗 ===== */}
      <section className="research-block">
        <div className="flex items-center gap-3 mb-4">
          <span className="mono text-muted">02 / latest</span>
          <span className="ml-auto mono flow-badge">UPDATE {updatedAt}</span>
        </div>
        <div>
          <BlockTitle label="PROGRESS" title="最新の進捗：DQN と第一原理計算がつながった" />
          <div className="grid lg:grid-cols-3 gap-3">
            {latest.map((l) => (
              <div key={l.label} className="rounded-[13px] bg-canvas p-5 shadow-[inset_0_0_0_1px_var(--stone)]">
                <p className="mono text-laser mb-3">{l.label}</p>
                <p className="text-[16px] font-extrabold tracking-[-0.02em] leading-[1.4]">{l.title}</p>
                <p className="mt-4 text-[34px] font-extrabold tracking-[-0.045em] leading-none text-laser">{l.value}</p>
                <p className="mono text-muted mt-2 mb-4">{l.valueNote}</p>
                <ul className="space-y-2">
                  {l.items.map((item) => (
                    <li key={item} className="flex gap-2 text-[13px] font-medium text-graphite prose-ja">
                      <span className="mt-[0.7em] w-[4px] h-[4px] bg-ink flex-shrink-0" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 手法 ===== */}
      <section className="research-block">
        <div className="flex items-center gap-3 mb-4">
          <span className="mono text-muted">03 / method</span>
        </div>
        <div>
          <BlockTitle label="METHOD" title="独立型マルチエージェント DQN の設計" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {method.map((m) => (
              <div key={m.label} className="rounded-[13px] bg-canvas p-5">
                <p className="mono text-laser mb-3">{m.label}</p>
                <p className="text-[16px] font-extrabold tracking-[-0.02em] leading-[1.4] mb-2">{m.title}</p>
                <p className="text-[13px] font-medium text-muted prose-ja">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STEP 1 ===== */}
      <section className="research-block">
        <div className="flex items-center gap-3 mb-4">
          <span className="mono text-muted">04 / step-1</span>
          <span className="ml-auto"><StatusChip status={step1.status} /></span>
        </div>
        <div>
          <BlockTitle label="RESULT" title={step1.title} />

          {/* 段階的に粒子を増やした流れ */}
          <ol className="flex flex-wrap items-center gap-2 mb-8">
            {step1.stages.map((stage, i) => (
              <li key={stage} className="flex items-center gap-2">
                <span className="tag">
                  <span className="text-laser mr-1">✓</span>
                  {stage}
                </span>
                {i < step1.stages.length - 1 && <span className="text-muted" aria-hidden>→</span>}
              </li>
            ))}
          </ol>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* ステップ数の比較 */}
            <div>
              <p className="text-[15px] font-extrabold mb-4">安定構造に着くまでのステップ数</p>
              <div className="space-y-6" data-reveal="stage">
                {step1.race.map((r) => (
                  <div key={r.label}>
                    <p className="mono text-muted mb-2">{r.label}</p>
                    <div className="space-y-2">
                      <div className="race-row">
                        <span className="mono w-[44px] flex-shrink-0">DQN</span>
                        <span className="race-track">
                          <span className="race-bar is-dqn" style={{ width: `${Math.max(1.2, (r.dqn / raceMax) * 100)}%` }} />
                        </span>
                        <span className="mono w-[64px] text-right flex-shrink-0">{r.dqn}</span>
                      </div>
                      <div className="race-row">
                        <span className="mono w-[44px] flex-shrink-0 text-muted">MD</span>
                        <span className="race-track">
                          <span className="race-bar" style={{ width: `${(r.md / raceMax) * 100}%` }} />
                        </span>
                        <span className="mono w-[64px] text-right flex-shrink-0 text-muted">約 {r.md.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[13px] font-medium text-muted prose-ja">
                MD：減衰付き Velocity-Verlet による分子動力学シミュレーション
              </p>
            </div>

            {/* 精度 */}
            <div>
              <p className="text-[15px] font-extrabold mb-4">理論値との比較</p>
              <div className="rounded-[13px] overflow-hidden border border-stone">
                <table className="w-full text-left">
                  <tbody>
                    {step1.accuracy.map((row) => (
                      <tr key={row.label} className="border-b border-stone last:border-b-0">
                        <th scope="row" className="p-3 md:p-4 text-[13px] font-bold text-muted align-top">
                          {row.label}
                        </th>
                        <td className="p-3 md:p-4 align-top">
                          <p className="text-[16px] font-extrabold">{row.value}</p>
                          <p className="mono text-muted mt-1">{row.ref}</p>
                        </td>
                        <td className="p-3 md:p-4 align-top text-right">
                          <span className="mono text-laser">{row.diff}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* わかったこと */}
          <ul className="mt-8 grid md:grid-cols-3 gap-3">
            {step1.findings.map((f) => (
              <li key={f.text} className={`finding ${f.kind === "good" ? "is-good" : ""}`}>
                <p className="mono mb-2">{f.kind === "good" ? "FINDING" : "ISSUE"}</p>
                <p className="text-[14px] font-medium prose-ja">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== STEP 2 ===== */}
      <section className="research-block">
        <div className="flex items-center gap-3 mb-4">
          <span className="mono text-muted">05 / step-2</span>
          <span className="ml-auto"><StatusChip status={step2.status} /></span>
        </div>
        <div>
          <BlockTitle label="IN PROGRESS" title={step2.title} />

          <div className="grid lg:grid-cols-[1fr_minmax(0,360px)] gap-8 lg:gap-12">
            <div>
              <p className="text-[15px] font-extrabold mb-4">計算パイプラインの構築</p>
              <Bullets items={step2.pipeline} />
            </div>
            <div className="rounded-[13px] bg-canvas p-6 self-start">
              <p className="mono text-muted mb-3">VERIFICATION</p>
              <p className="text-[44px] font-extrabold tracking-[-0.045em] leading-none text-laser">
                {step2.verification.value}
              </p>
              <p className="mt-3 text-[15px] font-extrabold">{step2.verification.label}</p>
              <p className="mt-2 text-[13px] font-medium text-muted prose-ja">{step2.verification.note}</p>
            </div>
          </div>

          {/* 報酬設計 */}
          <div className="mt-10 pt-8 border-t-2 border-stone">
            <p className="text-[15px] font-extrabold mb-4">評価回数を抑える報酬設計</p>
            <p className="finding mb-5">
              <span className="mono block mb-2">PROBLEM</span>
              <span className="text-[14px] font-medium prose-ja">{step2.problem}</span>
            </p>
            <div className="formula mb-6">
              <span className="mono text-muted mr-3">REWARD</span>
              {step2.reward}
            </div>
            <Bullets items={step2.design} />
          </div>
        </div>
      </section>

      {/* ===== 今後 ===== */}
      <section className="research-block">
        <div className="flex items-center gap-3 mb-4">
          <span className="mono text-muted">06 / roadmap</span>
        </div>
        <div>
          <BlockTitle label="ROADMAP" title="これからの予定（段階的に広げていく）" />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {roadmap.map((r) => (
              <li key={r.month} className={`roadmap-node ${r.now ? "is-now" : ""} ${r.done ? "is-done" : ""}`}>
                <p className="mono mb-2 flex items-center gap-2">
                  {r.now && <span className="laser-dot on-air" />}
                  {r.done && <span className="text-laser">✓</span>}
                  {r.month}
                  {r.now && <span className="ml-auto mono text-laser">NOW</span>}
                </p>
                <p className="text-[15px] font-bold prose-ja">{r.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
