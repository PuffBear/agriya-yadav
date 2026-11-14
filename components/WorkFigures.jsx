"use client";
import React from 'react';
import { Figure } from "@/components/Charts";

/* WorkFigures.jsx — inline SVG charts and diagrams for the /work write-ups.
   Same conventions as Charts.jsx: ink for the comparison, clay for the thing
   the page is about, every value drawn from the numbers stated in the text. */

const INK = "currentColor";
const CLAY = "#B84A2C";
const MONO = "var(--font-mono)";
const SANS = "var(--font-sans)";

function LegendRow({ items, x, y }) {
  const offsets = items.map((_, i) =>
    items.slice(0, i).reduce((acc, it) => acc + 15 + it.label.length * 6.8 + 18, x));
  return (
    <g>
      {items.map((it, i) => (
        <g key={it.label}>
          <rect x={offsets[i]} y={y - 8} width="10" height="10" rx="2" fill={it.color} opacity={it.color === INK ? 0.55 : 1} />
          <text x={offsets[i] + 15} y={y + 1} fontSize="11" fill={INK} opacity="0.8" fontFamily={MONO}>{it.label}</text>
        </g>
      ))}
    </g>
  );
}

/* ── paired vertical bars: baseline (ink) vs treatment (clay) ───────── */

export function PairedBars({ groups, legend, caption, label, yLabel = "share of runs" }) {
  const W = 640, H = 270, x0 = 46, x1 = 624, yBase = 214, yTop = 52;
  const gw = (x1 - x0) / groups.length;
  const bw = Math.min(46, gw / 2 - 16);
  const h = (v) => Math.max(2, v * (yBase - yTop));
  return (
    <Figure caption={caption} label={label} viewBox={`0 0 ${W} ${H}`}>
      <LegendRow x={x0} y={18} items={[{ label: legend[0], color: INK }, { label: legend[1], color: CLAY }]} />
      {[0, 0.5, 1].map((t) => {
        const y = yBase - t * (yBase - yTop);
        return (
          <g key={t}>
            <line x1={x0} y1={y} x2={x1} y2={y} stroke={INK} strokeWidth="1" opacity={t === 0 ? 0.45 : 0.12} />
            <text x={x0 - 8} y={y + 4} textAnchor="end" fontSize="11" fill={INK} opacity="0.7" fontFamily={MONO}>{t * 100}%</text>
          </g>
        );
      })}
      <text x={x0} y={yTop - 12} fontSize="10" fill={INK} opacity="0.6" fontFamily={MONO}>{yLabel}</text>
      {groups.map((g, i) => {
        const cx = x0 + gw * (i + 0.5);
        const bars = [
          { v: g.a, t: g.aText, color: INK, x: cx - bw - 1, who: legend[0] },
          { v: g.b, t: g.bText, color: CLAY, x: cx + 1, who: legend[1] },
        ];
        return (
          <g key={g.label}>
            {bars.map((b) => (
              <g key={b.who}>
                <title>{`${g.label} — ${b.who}: ${b.t}`}</title>
                <rect x={b.x} y={yBase - h(b.v)} width={bw} height={h(b.v)} rx="3"
                  fill={b.color} opacity={b.color === INK ? 0.55 : 1} />
                <text x={b.x + bw / 2} y={yBase - h(b.v) - 6} textAnchor="middle" fontSize="11"
                  fill={INK} fontFamily={MONO}>{b.t}</text>
              </g>
            ))}
            {g.label.split("\n").map((line, li) => (
              <text key={li} x={cx} y={yBase + 18 + li * 14} textAnchor="middle" fontSize="11"
                fill={INK} opacity="0.8" fontFamily={SANS}>{line}</text>
            ))}
          </g>
        );
      })}
    </Figure>
  );
}

/* ── horizontal bars, one highlighted ───────────────────────────────── */

export function RankedBars({ rows, max = 1, fmt = (v) => v.toFixed(3), caption, label, axisLabel }) {
  const W = 640, rowH = 30, x0 = 190, x1 = 580, top = 26;
  const H = top + rows.length * rowH + 30;
  return (
    <Figure caption={caption} label={label} viewBox={`0 0 ${W} ${H}`}>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const x = x0 + t * (x1 - x0);
        return (
          <g key={t}>
            <line x1={x} y1={top - 6} x2={x} y2={H - 26} stroke={INK} strokeWidth="1" opacity={t === 0 ? 0.45 : 0.12} />
            <text x={x} y={H - 10} textAnchor="middle" fontSize="11" fill={INK} opacity="0.7" fontFamily={MONO}>{fmt(t * max).replace(/0+$/, "").replace(/\.$/, "")}</text>
          </g>
        );
      })}
      {axisLabel && <text x={x1} y={12} textAnchor="end" fontSize="10" fill={INK} opacity="0.6" fontFamily={MONO}>{axisLabel}</text>}
      {rows.map((r, i) => {
        const y = top + i * rowH;
        const w = (r.v / max) * (x1 - x0);
        return (
          <g key={r.label}>
            <title>{`${r.label}: ${fmt(r.v)}`}</title>
            <text x={x0 - 10} y={y + 14} textAnchor="end" fontSize="12" fill={INK}
              opacity={r.hi ? 1 : 0.8} fontWeight={r.hi ? 600 : 400} fontFamily={SANS}>{r.label}</text>
            <rect x={x0} y={y + 3} width={w} height={rowH - 12} rx="3" fill={r.hi ? CLAY : INK} opacity={r.hi ? 1 : 0.5} />
            <text x={x0 + w + 8} y={y + 15} fontSize="11" fill={INK} fontFamily={MONO}>{fmt(r.v)}</text>
          </g>
        );
      })}
    </Figure>
  );
}

/* ── two small-multiple line panels with ±1 sd bands ────────────────── */

function LinePanel({ ox, title, xs, series, yMin, yMax, yTicks }) {
  const w = 250, x0 = ox + 40, x1 = x0 + w, y0 = 208, y1 = 50;
  const X = (v) => x0 + v * (x1 - x0);
  const Y = (v) => y0 - ((v - yMin) / (yMax - yMin)) * (y0 - y1);
  return (
    <g>
      <text x={x0} y={34} fontSize="12" fontWeight="600" fill={INK} fontFamily={SANS}>{title}</text>
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={x0} y1={Y(t)} x2={x1} y2={Y(t)} stroke={INK} strokeWidth="1" opacity="0.12" />
          <text x={x0 - 8} y={Y(t) + 4} textAnchor="end" fontSize="11" fill={INK} opacity="0.7" fontFamily={MONO}>{t}</text>
        </g>
      ))}
      <line x1={x0} y1={y0} x2={x1} y2={y0} stroke={INK} strokeWidth="1" opacity="0.45" />
      {xs.map((v) => (
        <text key={v} x={X(v)} y={y0 + 16} textAnchor="middle" fontSize="11" fill={INK} opacity="0.7" fontFamily={MONO}>{v.toFixed(1)}</text>
      ))}
      <text x={(x0 + x1) / 2} y={y0 + 34} textAnchor="middle" fontSize="11" fill={INK} opacity="0.7" fontFamily={MONO}>shift severity φ</text>
      {series.map((s) => {
        const band = [
          ...xs.map((v, i) => `${X(v)},${Y(s.mean[i] + s.sd[i])}`),
          ...xs.map((v, i) => `${X(v)},${Y(s.mean[i] - s.sd[i])}`).reverse(),
        ].join(" ");
        const last = s.mean.length - 1;
        return (
          <g key={s.name}>
            <polygon points={band} fill={s.color} opacity="0.14" />
            <polyline points={xs.map((v, i) => `${X(v)},${Y(s.mean[i])}`).join(" ")}
              fill="none" stroke={s.color} strokeWidth="2" opacity={s.color === INK ? 0.7 : 1} />
            {xs.map((v, i) => (
              <g key={v}>
                <title>{`${s.name}, φ = ${v.toFixed(1)}: ${s.mean[i].toFixed(2)} ± ${s.sd[i].toFixed(2)}`}</title>
                <circle cx={X(v)} cy={Y(s.mean[i])} r="7" fill="transparent" />
                <circle cx={X(v)} cy={Y(s.mean[i])} r="3.5" fill={s.color} stroke="var(--paper-2)" strokeWidth="1.5" />
              </g>
            ))}
            <text x={X(xs[last]) + 8} y={Y(s.mean[last]) + 4} fontSize="11" fill={INK} fontFamily={MONO}>{s.name}</text>
          </g>
        );
      })}
    </g>
  );
}

export function SeverityCurves() {
  const xs = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
  const sharc = {
    mean: [46.38, 47.37, 48.37, 49.35, 50.40, 51.43], msd: [0.25, 0.30, 0.30, 0.34, 0.40, 0.48],
    cvar: [82.02, 83.62, 85.46, 87.42, 89.64, 91.72], csd: [1.25, 1.39, 1.96, 2.31, 2.41, 2.73],
  };
  const rn = {
    mean: [43.93, 45.41, 47.08, 47.30, 48.70, 49.96], msd: [0.38, 0.69, 1.07, 0.56, 0.60, 0.62],
    cvar: [96.28, 98.81, 100.43, 103.19, 104.72, 106.27], csd: [1.86, 3.01, 1.48, 3.45, 2.44, 2.88],
  };
  return (
    <Figure
      label="Two line charts of makespan against shift severity. Mean makespan: the risk-neutral policy is slightly lower at every severity. Tail makespan: ShARC is about fourteen percent lower at every severity."
      caption="Makespan against shift severity; lower is better, bands are ±1 standard deviation over five seeds. The risk-neutral policy is a little better on average (left) and much worse in the tail (right). The two panels have different vertical scales."
      viewBox="0 0 680 250"
    >
      <LinePanel ox={0} title="Mean makespan" xs={xs} yMin={42} yMax={54} yTicks={[42, 46, 50, 54]}
        series={[
          { name: "RN", color: INK, mean: rn.mean, sd: rn.msd },
          { name: "ShARC", color: CLAY, mean: sharc.mean, sd: sharc.msd },
        ]} />
      <LinePanel ox={340} title="Worst 10% (CVaR₀.₁)" xs={xs} yMin={75} yMax={111} yTicks={[75, 87, 99, 111]}
        series={[
          { name: "RN", color: INK, mean: rn.cvar, sd: rn.csd },
          { name: "ShARC", color: CLAY, mean: sharc.cvar, sd: sharc.csd },
        ]} />
    </Figure>
  );
}

/* ── dot plot on a log axis ─────────────────────────────────────────── */

export function ExploitabilityDots() {
  const W = 640, x0 = 200, x1 = 600, top = 30, rowH = 40;
  const X = (v) => x0 + ((Math.log10(v) + 1) / 2.5) * (x1 - x0); // 0.1 … ~31.6
  const rows = [
    { label: "Hash buckets · 50k iters", pts: [{ v: 15, t: "≈ 15" }] },
    { label: "K-means · 5k iters", pts: [{ v: 2.5, t: "≈ 2.5" }] },
    { label: "K-means · 25k iters", pts: [{ v: 0.17, t: "0.17 best", hi: true }, { v: 0.75, t: "0.75 final", hi: true }] },
  ];
  const H = top + rows.length * rowH + 34;
  return (
    <Figure
      label="Dot plot of exploitability on a logarithmic axis: about 15 for hash buckets, about 2.5 for k-means at 5,000 iterations, and between 0.17 and 0.75 for k-means at 25,000 iterations."
      caption="Exploitability in big blinds per hand, on a log scale; further left is better. Fixing the card abstraction mattered far more than training longer on the broken one."
      viewBox={`0 0 ${W} ${H}`}
    >
      {[0.1, 1, 10].map((t) => (
        <g key={t}>
          <line x1={X(t)} y1={top - 8} x2={X(t)} y2={H - 30} stroke={INK} strokeWidth="1" opacity="0.14" />
          <text x={X(t)} y={H - 12} textAnchor="middle" fontSize="11" fill={INK} opacity="0.7" fontFamily={MONO}>{t}</text>
        </g>
      ))}
      <text x={x1} y={12} textAnchor="end" fontSize="10" fill={INK} opacity="0.6" fontFamily={MONO}>BB / hand (log)</text>
      {rows.map((r, i) => {
        const y = top + i * rowH + 14;
        return (
          <g key={r.label}>
            <text x={x0 - 14} y={y + 4} textAnchor="end" fontSize="12" fill={INK} opacity="0.85" fontFamily={SANS}>{r.label}</text>
            <line x1={x0} y1={y} x2={x1} y2={y} stroke={INK} strokeWidth="1" opacity="0.1" />
            {r.pts.length === 2 && (
              <line x1={X(r.pts[0].v)} y1={y} x2={X(r.pts[1].v)} y2={y} stroke={CLAY} strokeWidth="2" opacity="0.5" />
            )}
            {r.pts.map((p, pi) => (
              <g key={p.t}>
                <title>{`${r.label}: ${p.t} BB/hand`}</title>
                <circle cx={X(p.v)} cy={y} r="6" fill={p.hi ? CLAY : INK} opacity={p.hi ? 1 : 0.6} stroke="var(--paper-2)" strokeWidth="2" />
                <text x={X(p.v)} y={pi === 0 && r.pts.length === 2 ? y - 12 : y + (r.pts.length === 2 ? 22 : -12)}
                  textAnchor="middle" fontSize="11" fill={INK} fontFamily={MONO}>{p.t}</text>
              </g>
            ))}
          </g>
        );
      })}
    </Figure>
  );
}

/* ── left-to-right flow of labelled boxes ───────────────────────────── */

export function Flow({ steps, caption, label, note }) {
  const W = 680, gap = 20, pad = 4;
  const bw = (W - pad * 2 - gap * (steps.length - 1)) / steps.length;
  const lines = Math.max(...steps.map((s) => (s.sub || []).length));
  const bh = 40 + lines * 15;
  const H = bh + (note ? 44 : 16);
  return (
    <Figure caption={caption} label={label} viewBox={`0 0 ${W} ${H}`}>
      {steps.map((s, i) => {
        const x = pad + i * (bw + gap);
        return (
          <g key={s.title}>
            <rect x={x} y={6} width={bw} height={bh} rx="4"
              fill={s.hi ? CLAY : "var(--paper)"} fillOpacity={s.hi ? 0.12 : 1}
              stroke={s.hi ? CLAY : INK} strokeOpacity={s.hi ? 1 : 0.4} strokeWidth={s.hi ? 1.5 : 1}
              strokeDasharray={s.dashed ? "5 4" : undefined} />
            <text x={x + bw / 2} y={28} textAnchor="middle" fontSize="12.5" fontWeight="600" fill={INK} fontFamily={SANS}>{s.title}</text>
            {(s.sub || []).map((t, li) => (
              <text key={li} x={x + bw / 2} y={46 + li * 15} textAnchor="middle" fontSize="9.5" fill={INK} opacity="0.8" fontFamily={MONO}>{t}</text>
            ))}
            {i < steps.length - 1 && (
              <g stroke={INK} strokeOpacity="0.6" strokeWidth="1.5" fill="none">
                <line x1={x + bw + 4} y1={6 + bh / 2} x2={x + bw + gap - 5} y2={6 + bh / 2} />
                <polyline points={`${x + bw + gap - 10},${bh / 2 + 1} ${x + bw + gap - 5},${6 + bh / 2} ${x + bw + gap - 10},${bh / 2 + 11}`} />
              </g>
            )}
          </g>
        );
      })}
      {note && <text x={W / 2} y={bh + 32} textAnchor="middle" fontSize="11" fill={INK} opacity="0.7" fontFamily={MONO}>{note}</text>}
    </Figure>
  );
}

/* ── order book: price levels (skip list) × FIFO queues ─────────────── */

export function OrderBookDiagram() {
  const asks = [
    { p: "216", q: [12, 4] },
    { p: "215", q: [7] },
    { p: "214", q: [5, 9, 3], best: true },
  ];
  const bids = [
    { p: "213", q: [10, 6], best: true },
    { p: "212", q: [8, 2, 15] },
    { p: "210", q: [20] },
  ];
  const rowH = 30, x0 = 150, qx = 236, qw = 52;
  const Row = ({ lvl, y, side }) => (
    <g>
      <rect x={x0} y={y} width="64" height="22" rx="3" fill={lvl.best ? CLAY : "var(--paper)"}
        fillOpacity={lvl.best ? 0.14 : 1} stroke={lvl.best ? CLAY : INK} strokeOpacity={lvl.best ? 1 : 0.4} />
      <text x={x0 + 32} y={y + 15} textAnchor="middle" fontSize="12" fill={INK} fontFamily={MONO}>{lvl.p}</text>
      {lvl.best && <text x={x0 - 10} y={y + 15} textAnchor="end" fontSize="11" fill={INK} fontFamily={MONO}>best {side}</text>}
      <line x1={x0 + 64} y1={y + 11} x2={qx - 4} y2={y + 11} stroke={INK} strokeOpacity="0.5" />
      {lvl.q.map((n, i) => (
        <g key={i}>
          <rect x={qx + i * (qw + 6)} y={y} width={qw} height="22" rx="3" fill="var(--paper)" stroke={INK}
            strokeOpacity={i === 0 ? 0.9 : 0.35} strokeWidth={i === 0 ? 1.5 : 1} />
          <text x={qx + i * (qw + 6) + qw / 2} y={y + 15} textAnchor="middle" fontSize="11" fill={INK} opacity={i === 0 ? 1 : 0.7} fontFamily={MONO}>{n} sh</text>
        </g>
      ))}
    </g>
  );
  return (
    <Figure
      label="Diagram of an order book. Ask price levels 216, 215 and 214 sit above bid price levels 213, 212 and 210. Each price level holds a queue of orders from oldest to newest. The best ask is 214 and the best bid is 213."
      caption="One symbol’s book. Each side is a skip list of price levels; each level holds a first-in-first-out queue of resting orders. Matching always takes the oldest order (heavier outline) at the best price on each side."
      viewBox="0 0 640 262"
    >
      <text x={x0} y={16} fontSize="10" letterSpacing="1.2" fill={INK} opacity="0.6" fontFamily={MONO}>PRICE</text>
      <text x={qx} y={16} fontSize="10" letterSpacing="1.2" fill={INK} opacity="0.6" fontFamily={MONO}>QUEUE · OLDEST → NEWEST</text>
      <text x={20} y={44} fontSize="12" fontWeight="600" fill={INK} fontFamily={SANS}>Asks (sell)</text>
      {asks.map((l, i) => <Row key={l.p} lvl={l} y={28 + i * rowH} side="ask" />)}
      <line x1={20} y1={126} x2={620} y2={126} stroke={INK} strokeOpacity="0.3" strokeDasharray="4 4" />
      <text x={620} y={121} textAnchor="end" fontSize="10.5" fill={INK} opacity="0.7" fontFamily={MONO}>spread — a trade fires when best bid ≥ best ask</text>
      <text x={20} y={156} fontSize="12" fontWeight="600" fill={INK} fontFamily={SANS}>Bids (buy)</text>
      {bids.map((l, i) => <Row key={l.p} lvl={l} y={140 + i * rowH} side="bid" />)}
      <text x={20} y={250} fontSize="10.5" fill={INK} opacity="0.7" fontFamily={MONO}>prices rise ↑ · cancel = unlink one box from its queue, O(1)</text>
    </Figure>
  );
}

/* ── POPEG joint reference map (paper Fig. 1) ───────────────────────
   Cells: best coverage/reactive baseline % / privileged %, rounded, at
   W = 25, threshold 0.80. S = baseline sufficient, F = baseline shortfall,
   A = all below threshold; u marks labels unresolved under the
   simultaneous Wilson intervals. Values transcribed from the manuscript. */

const MAP_COLORS = { S: "#2E8B57", F: "#D9962B", A: "#6A7FD6" };
const MAP_TEXT = { S: "#FFFFFF", F: "#14110E", A: "#FFFFFF" };
const MAP_LABELS = { S: "Baseline sufficient", F: "Baseline shortfall", A: "All below threshold" };
const EPS = ["0", ".025", ".05", ".10", ".20"];
const MAP = {
  104: [ // r = 4, 3, 2, 1
    [["2/0","A"],["65/74","A"],["82/93","S","u"],["92/99","S"],["98/100","S"]],
    [["2/0","A"],["57/74","A"],["75/93","F"],["88/99","S"],["96/100","S"]],
    [["2/0","A"],["32/74","A"],["44/93","F"],["55/99","F"],["74/100","F"]],
    [["1/0","A"],["20/74","A"],["25/93","F"],["29/99","F"],["32/100","F"]],
  ],
  208: [
    [["2/0","A"],["92/94","S"],["99/99","S"],["100/100","S"],["100/100","S"]],
    [["2/0","A"],["89/94","S"],["97/99","S"],["99/100","S"],["100/100","S"]],
    [["2/0","A"],["56/94","F"],["68/99","F","c"],["84/100","S"],["98/100","S"]],
    [["1/0","A"],["36/94","F"],["47/99","F"],["54/100","F"],["66/100","F"]],
  ],
  416: [
    [["2/0","A"],["99/99","S"],["100/100","S"],["100/100","S"],["100/100","S"]],
    [["3/0","A"],["98/99","S"],["100/100","S"],["100/100","S"],["100/100","S"]],
    [["3/0","A"],["83/99","S"],["89/100","S"],["96/100","S"],["100/100","S"]],
    [["2/0","A"],["66/99","F"],["71/100","F"],["78/100","F","u"],["92/100","S"]],
  ],
};

export function ReferenceMap() {
  const cw = 64, ch = 30, panelW = cw * 5, gapX = 40, x0 = 34, y0 = 62;
  const W = x0 + panelW * 3 + gapX * 2 + 6, H = y0 + ch * 4 + 48;
  return (
    <Figure
      label="Joint reference map for the POPEG benchmark at grid size 25: three panels for horizons 104, 208 and 416 steps; rows are sensing radius 1 to 4 and columns are evader randomness 0 to 0.20. Each cell shows best baseline capture and privileged capture in percent and is classed as baseline sufficient, baseline shortfall or all below threshold."
      caption="Joint reference map at W = 25 and an 80% capture threshold. Each cell is best coverage/reactive baseline / privileged capture, in percent. Green: a baseline already reaches 80%. Ochre: only the privileged reference does. Blue: nothing does. Hatched cells are unresolved within sampling error; the outlined cell is the canonical setting."
      viewBox={`0 0 ${W} ${H}`}
    >
      <defs>
        <pattern id="popeg-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#14110E" strokeWidth="1.4" strokeOpacity="0.55" />
        </pattern>
      </defs>
      {Object.keys(MAP_LABELS).map((k, i) => (
        <g key={k}>
          <rect x={x0 + i * 168} y={6} width="12" height="12" rx="2" fill={MAP_COLORS[k]} />
          <text x={x0 + i * 168 + 18} y={16} fontSize="11.5" fill="currentColor" opacity="0.85" fontFamily={MONO}>{MAP_LABELS[k]}</text>
        </g>
      ))}
      <g>
        <rect x={x0 + 3 * 168 - 4} y={6} width="12" height="12" rx="2" fill="url(#popeg-hatch)" stroke="currentColor" strokeOpacity="0.4" />
        <text x={x0 + 3 * 168 + 14} y={16} fontSize="11.5" fill="currentColor" opacity="0.85" fontFamily={MONO}>Uncertain</text>
      </g>
      {[104, 208, 416].map((T, pi) => {
        const px = x0 + pi * (panelW + gapX);
        return (
          <g key={T}>
            <text x={px + panelW / 2} y={y0 - 10} textAnchor="middle" fontSize="13" fontWeight="600" fill="currentColor" fontFamily={SANS}>T = {T}</text>
            {MAP[T].map((row, ri) => row.map(([v, k, flag], ci) => {
              const x = px + ci * cw, y = y0 + ri * ch;
              return (
                <g key={`${ri}-${ci}`}>
                  <title>{`T = ${T}, r = ${4 - ri}, ε = ${EPS[ci]}: ${v} (${MAP_LABELS[k]}${flag === "u" ? ", unresolved" : ""})`}</title>
                  <rect x={x + 1} y={y + 1} width={cw - 2} height={ch - 2} fill={MAP_COLORS[k]} />
                  {flag === "u" && <rect x={x + 1} y={y + 1} width={cw - 2} height={ch - 2} fill="url(#popeg-hatch)" />}
                  {flag === "c" && <rect x={x + 2} y={y + 2} width={cw - 4} height={ch - 4} fill="none" stroke="#14110E" strokeWidth="2.5" />}
                  <text x={x + cw / 2} y={y + ch / 2 + 4} textAnchor="middle" fontSize="11" fill={MAP_TEXT[k]} fontFamily={MONO}>{v}</text>
                </g>
              );
            }))}
            {EPS.map((e, ci) => (
              <text key={e} x={px + ci * cw + cw / 2} y={y0 + ch * 4 + 16} textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.7" fontFamily={MONO}>{e}</text>
            ))}
            {pi === 0 && [4, 3, 2, 1].map((r, ri) => (
              <text key={r} x={px - 10} y={y0 + ri * ch + ch / 2 + 4} textAnchor="end" fontSize="11" fill="currentColor" opacity="0.7" fontFamily={MONO}>{r}</text>
            ))}
          </g>
        );
      })}
      <text x={x0 + (panelW * 3 + gapX * 2) / 2} y={H - 6} textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.7" fontFamily={MONO}>evader randomness ε  ·  rows: sensing radius r</text>
    </Figure>
  );
}
