"use client";
import React from 'react';

/* Charts.jsx — hand-authored inline SVG figures for the research pages.
   Geometry is computed from the numbers stated in each paper (fitted
   coefficients, closed forms, reported table values), not traced from the
   original plots. Strokes use currentColor so the figures theme with the
   page; the clay accent marks the one element carrying the claim. */

const INK = "currentColor";
const CLAY = "#B84A2C";

/* shared frame: caption + accessible wrapper */
export function Figure({ caption, label, children, viewBox }) {
  return (
    <figure style={{ margin: "32px 0" }}>
      <div style={{
        borderRadius: "var(--r-2)",
        border: "1px solid var(--rule)",
        background: "var(--paper-2)",
        padding: "18px 16px 10px",
        color: "var(--ink)",
      }}>
        <svg
          role="img"
          aria-label={label}
          viewBox={viewBox}
          style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
        >
          {children}
        </svg>
      </div>
      {caption && <figcaption className="t-caption" style={{ marginTop: 8 }}>{caption}</figcaption>}
    </figure>
  );
}

/* axis helpers ------------------------------------------------------ */

function Axes({ x0, x1, y0, y1, xTicks, yTicks, xLabel, yLabel }) {
  return (
    <g>
      <line x1={x0} y1={y0} x2={x1} y2={y0} stroke={INK} strokeWidth="1" opacity="0.45" />
      <line x1={x0} y1={y0} x2={x0} y2={y1} stroke={INK} strokeWidth="1" opacity="0.45" />
      {xTicks.map((t) => (
        <g key={`x${t.x}`}>
          <line x1={t.x} y1={y0} x2={t.x} y2={y0 + 4} stroke={INK} strokeWidth="1" opacity="0.45" />
          <text x={t.x} y={y0 + 16} textAnchor="middle" fontSize="11" fill={INK} opacity="0.7"
            fontFamily="var(--font-mono)">{t.label}</text>
        </g>
      ))}
      {yTicks.map((t) => (
        <g key={`y${t.y}`}>
          <line x1={x0 - 4} y1={t.y} x2={x0} y2={t.y} stroke={INK} strokeWidth="1" opacity="0.45" />
          <text x={x0 - 8} y={t.y + 4} textAnchor="end" fontSize="11" fill={INK} opacity="0.7"
            fontFamily="var(--font-mono)">{t.label}</text>
        </g>
      ))}
      {xLabel && (
        <text x={(x0 + x1) / 2} y={y0 + 33} textAnchor="middle" fontSize="11" fill={INK}
          opacity="0.6" fontFamily="var(--font-mono)" letterSpacing="0.08em">{xLabel}</text>
      )}
      {yLabel && (
        <text x={14} y={(y0 + y1) / 2} textAnchor="middle" fontSize="11" fill={INK}
          opacity="0.6" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          transform={`rotate(-90 14 ${(y0 + y1) / 2})`}>{yLabel}</text>
      )}
    </g>
  );
}

function Legend({ items, x, y }) {
  return (
    <g>
      {items.map((it, i) => (
        <g key={it.label} transform={`translate(${x} ${y + i * 16})`}>
          <line x1="0" y1="0" x2="18" y2="0" stroke={it.color} strokeWidth="2"
            strokeDasharray={it.dash || "none"} />
          <text x="24" y="4" fontSize="11" fill={INK} opacity="0.8"
            fontFamily="var(--font-mono)">{it.label}</text>
        </g>
      ))}
    </g>
  );
}

/* ══ 1. collapse boundary: fitted P(collapse | w) at two horizons ══ */

const P300 = "52.0,18.1 59.0,18.1 65.9,18.1 72.9,18.1 79.9,18.2 86.8,18.2 93.8,18.3 100.8,18.4 107.7,18.5 114.7,18.7 121.6,18.9 128.6,19.2 135.6,19.5 142.5,20.0 149.5,20.7 156.5,21.5 163.4,22.6 170.4,24.0 177.4,25.8 184.3,28.2 191.3,31.2 198.2,35.0 205.2,39.8 212.2,45.6 219.1,52.8 226.1,61.2 233.1,71.0 240.0,82.0 247.0,93.9 254.0,106.4 260.9,119.1 267.9,131.4 274.9,143.0 281.8,153.5 288.8,162.7 295.7,170.5 302.7,177.1 309.7,182.5 316.6,186.8 323.6,190.2 330.6,192.9 337.5,195.0 344.5,196.7 351.5,197.9 358.4,198.9 365.4,199.6 372.4,200.2 379.3,200.6 386.3,201.0 393.2,201.2 400.2,201.4 407.2,201.5 414.1,201.7 421.1,201.7 428.1,201.8 435.0,201.8 442.0,201.9";
const P150 = "52.0,18.0 59.0,18.0 65.9,18.0 72.9,18.0 79.9,18.0 86.8,18.0 93.8,18.0 100.8,18.0 107.7,18.0 114.7,18.0 121.6,18.0 128.6,18.0 135.6,18.0 142.5,18.1 149.5,18.1 156.5,18.1 163.4,18.2 170.4,18.2 177.4,18.3 184.3,18.3 191.3,18.5 198.2,18.6 205.2,18.8 212.2,19.0 219.1,19.4 226.1,19.8 233.1,20.3 240.0,21.1 247.0,22.0 254.0,23.3 260.9,24.9 267.9,27.0 274.9,29.7 281.8,33.1 288.8,37.3 295.7,42.7 302.7,49.2 309.7,57.0 316.6,66.1 323.6,76.6 330.6,88.1 337.5,100.4 344.5,113.0 351.5,125.6 358.4,137.6 365.4,148.6 372.4,158.4 379.3,166.9 386.3,174.1 393.2,180.0 400.2,184.8 407.2,188.7 414.1,191.7 421.1,194.1 428.1,195.9 435.0,197.4 442.0,198.5";

export function CollapseBoundaryChart() {
  return (
    <Figure
      viewBox="0 0 460 240"
      label="Fitted probability of coordination collapse against reward centralization w, at 150k and 300k training steps. Both curves fall steeply with w; the 300k curve crosses 0.5 at w = 0.666 and the 150k curve at w = 0.822."
      caption="Collapse probability against reward centralization at two training budgets. Curves are the fitted logistic P(collapse | w) reconstructed from the reported midpoints and the 10–90 transition width Δw = 0.199; dotted lines mark w_crit. More team signal reduces collapse, and the crossing has a location."
    >
      <Axes
        x0={52} x1={442} y0={202} y1={18}
        xTicks={[{ x: 52, label: "0.3" }, { x: 163.4, label: "0.5" }, { x: 274.9, label: "0.7" }, { x: 386.3, label: "0.9" }]}
        yTicks={[{ y: 202, label: "0" }, { y: 110, label: "0.5" }, { y: 18, label: "1" }]}
        xLabel="centralization w"
        yLabel="P(collapse)"
      />
      <line x1={52} y1={110} x2={442} y2={110} stroke={INK} strokeWidth="1" strokeDasharray="2 3" opacity="0.22" />

      <polyline points={P150} fill="none" stroke={INK} strokeWidth="2" opacity="0.55" />
      <polyline points={P300} fill="none" stroke={CLAY} strokeWidth="2.2" />

      {/* midpoint drops */}
      <line x1={255.9} y1={110} x2={255.9} y2={202} stroke={CLAY} strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
      <circle cx={255.9} cy={110} r="3.2" fill={CLAY} />
      <text x={251} y={103} textAnchor="end" fontSize="11" fill={CLAY} fontFamily="var(--font-mono)">0.666</text>

      <line x1={342.8} y1={110} x2={342.8} y2={202} stroke={INK} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      <circle cx={342.8} cy={110} r="3.2" fill={INK} opacity="0.65" />
      <text x={348} y={103} fontSize="11" fill={INK} opacity="0.75" fontFamily="var(--font-mono)">0.822</text>

      <Legend x={66} y={36} items={[
        { label: "300k steps", color: CLAY },
        { label: "150k steps", color: INK },
      ]} />
    </Figure>
  );
}

/* ══ 2. horizon slide: w_crit vs log T with fitted line ══ */

const FIT = "65.8,61.8 76.7,65.5 87.6,69.2 98.5,72.9 109.3,76.6 120.2,80.3 131.1,84.0 142.0,87.7 152.9,91.4 163.7,95.1 174.6,98.8 185.5,102.5 196.4,106.2 207.3,109.9 218.1,113.6 229.0,117.3 239.9,121.0 250.8,124.7 261.6,128.4 272.5,132.1 283.4,135.8 294.3,139.5 305.2,143.2 316.0,146.9 326.9,150.6 337.8,154.3 348.7,158.0 359.5,161.7 370.4,165.4 381.3,169.1 392.2,172.8 403.1,176.5 413.9,180.2 424.8,183.9";

export function HorizonSlideChart() {
  const pts = [
    { x: 78.7, y: 53.9, hi: 37.3, lo: 70.4, v: "0.822" },
    { x: 208.1, y: 125.6, hi: 111.8, lo: 139.4, v: "0.666" },
    { x: 283.8, y: 145.9, hi: 132.1, lo: 159.7, v: "0.622" },
    { x: 413.2, y: 168.4, hi: 154.6, lo: 182.2, v: "0.573" },
  ];
  return (
    <Figure
      viewBox="0 0 460 240"
      label="Measured collapse boundary against training horizon on a logarithmic axis, with a fitted log-linear line. The boundary slides left from 0.822 at 150k steps to 0.573 at 900k steps."
      caption="The boundary is finite-horizon. Four matched risk-neutral horizons, 20 seeds per w-cell; bars are the reported CI widths. Longer training rescues runs that collapse at shorter budgets, so w_crit slides left log-linearly in T — which is why a quoted threshold is meaningless without its training budget."
    >
      <Axes
        x0={52} x1={442} y0={202} y1={18}
        xTicks={[{ x: 78.7, label: "150k" }, { x: 208.1, label: "300k" }, { x: 283.8, label: "450k" }, { x: 413.2, label: "900k" }]}
        yTicks={[{ y: 202, label: "0.50" }, { y: 156, label: "0.60" }, { y: 110, label: "0.70" }, { y: 64, label: "0.80" }, { y: 18, label: "0.90" }]}
        xLabel="training horizon T  (log scale)"
        yLabel="w_crit"
      />

      <polyline points={FIT} fill="none" stroke={INK} strokeWidth="1.6" strokeDasharray="5 4" opacity="0.5" />

      {pts.map((p) => (
        <g key={p.x}>
          <line x1={p.x} y1={p.hi} x2={p.x} y2={p.lo} stroke={CLAY} strokeWidth="1.4" opacity="0.75" />
          <line x1={p.x - 3.5} y1={p.hi} x2={p.x + 3.5} y2={p.hi} stroke={CLAY} strokeWidth="1.4" opacity="0.75" />
          <line x1={p.x - 3.5} y1={p.lo} x2={p.x + 3.5} y2={p.lo} stroke={CLAY} strokeWidth="1.4" opacity="0.75" />
          <circle cx={p.x} cy={p.y} r="3.6" fill={CLAY} />
          <text x={p.x + 9} y={p.y - 6} fontSize="11" fill={CLAY}
            fontFamily="var(--font-mono)">{p.v}</text>
        </g>
      ))}

      <text x={246} y={64} fontSize="11" fill={INK} opacity="0.6" fontFamily="var(--font-mono)">
        w_crit = 2.44 − 0.138 ln T
      </text>
      <text x={246} y={78} fontSize="11" fill={INK} opacity="0.45" fontFamily="var(--font-mono)">
        RMSE 0.027
      </text>
    </Figure>
  );
}

/* ══ 3. loss-aversion transfer across four settings ══ */

export function LossAversionTransferChart() {
  // λ=1 → last interior λ, per Table 3. x: λ 1..7, y: w_crit 0.2..1.0
  const X = (l) => 92 + (l - 1) / 6 * 332;
  const Y = (w) => 186 - (w - 0.20) / 0.80 * 158;
  const series = [
    { name: "Supply · PPO",   a: 0.585, b: 0.854, lb: 7, color: CLAY,  dash: "none" },
    { name: "Supply · MAPPO", a: 0.796, b: 0.889, lb: 7, color: INK,   dash: "none" },
    { name: "MPE · MAPPO",    a: 0.78,  b: 0.89,  lb: 7, color: INK,   dash: "6 3" },
    { name: "LBF · MAPPO",    a: 0.26,  b: 0.83,  lb: 4, color: INK,   dash: "2 3" },
  ];
  return (
    <Figure
      viewBox="0 0 460 262"
      label="Collapse boundary against loss aversion lambda in four environment-algorithm settings. In every setting the boundary rises with lambda, though the starting levels differ widely."
      caption="The loss-aversion direction transfers; the levels do not. Endpoints are the reported within-sweep values (α=β=0.88) from λ=1 to each setting's last interior λ — 7 for supply and MPE, 4 for LBF, which saturates against the w=1 ceiling beyond that. Interiors are drawn as straight segments between measured endpoints, not as fitted curves."
    >
      <Axes
        x0={92} x1={440} y0={186} y1={28}
        xTicks={[1, 2, 3, 4, 5, 6, 7].map((l) => ({ x: X(l), label: String(l) }))}
        yTicks={[{ y: Y(0.2), label: "0.2" }, { y: Y(0.4), label: "0.4" }, { y: Y(0.6), label: "0.6" }, { y: Y(0.8), label: "0.8" }, { y: Y(1.0), label: "1.0" }]}
        xLabel="loss aversion λ"
        yLabel="w_crit"
      />
      {/* w = 1 ceiling */}
      <line x1={92} y1={Y(1.0)} x2={440} y2={Y(1.0)} stroke={INK} strokeWidth="1" strokeDasharray="2 3" opacity="0.3" />
      <text x={436} y={Y(1.0) - 5} textAnchor="end" fontSize="10" fill={INK} opacity="0.5"
        fontFamily="var(--font-mono)">w = 1 ceiling</text>

      {series.map((s) => (
        <g key={s.name}>
          <line x1={X(1)} y1={Y(s.a)} x2={X(s.lb)} y2={Y(s.b)}
            stroke={s.color} strokeWidth="2" strokeDasharray={s.dash}
            opacity={s.color === CLAY ? 1 : 0.6} />
          <circle cx={X(1)} cy={Y(s.a)} r="3.4" fill={s.color} opacity={s.color === CLAY ? 1 : 0.7} />
          <circle cx={X(s.lb)} cy={Y(s.b)} r="3.4" fill={s.color} opacity={s.color === CLAY ? 1 : 0.7} />
        </g>
      ))}

      {/* endpoint callouts */}
      <text x={X(1) - 7} y={Y(0.585) + 12} textAnchor="end" fontSize="10" fill={CLAY} fontFamily="var(--font-mono)">0.585</text>
      <text x={X(7)} y={Y(0.854) - 9} textAnchor="middle" fontSize="10" fill={CLAY} fontFamily="var(--font-mono)">0.854</text>
      <text x={X(1) - 7} y={Y(0.26) + 4} textAnchor="end" fontSize="10" fill={INK} opacity="0.6" fontFamily="var(--font-mono)">0.26</text>
      <text x={X(4)} y={Y(0.83) - 9} textAnchor="middle" fontSize="10" fill={INK} opacity="0.6" fontFamily="var(--font-mono)">0.83</text>

      <Legend x={96} y={238} items={[{ label: "Supply · PPO  (+0.269)", color: CLAY }]} />
      <Legend x={268} y={238} items={[{ label: "MAPPO transfers", color: INK }]} />
    </Figure>
  );
}

/* ══ 4. CPT exact saddle-node ══ */

const STABLE = "78.6,140.7 80.3,148.7 85.5,157.1 90.7,162.7 95.9,167.2 101.1,171.1 106.3,174.5 111.5,177.6 116.7,180.5 121.9,183.1 127.1,185.5 132.3,187.7 137.5,189.8 142.7,191.6 147.9,193.4 153.1,194.9 158.3,196.3 163.5,197.5 168.7,198.6 173.9,199.5 179.1,200.3 184.3,201.0 189.5,201.4 194.7,201.8 199.9,202.0";
const SADDLE = "78.6,140.7 80.3,132.9 85.5,125.4 90.7,120.7 95.9,117.0 101.1,113.9 106.3,111.1 111.5,108.6 116.7,106.3 121.9,104.2 127.1,102.2 132.3,100.2 137.5,98.4 142.7,96.7 147.9,95.0 153.1,93.3 158.3,91.8 163.5,90.2 168.7,88.7 173.9,87.3 179.1,85.8 184.3,84.4 189.5,83.0 194.7,81.6 199.9,80.3 205.1,79.0 210.3,77.6 215.5,76.3 220.7,75.0 225.9,73.8 231.1,72.5 236.3,71.2 241.5,69.9 246.7,68.7 251.9,67.4 257.1,66.1 262.3,64.9 267.5,63.6 272.7,62.3 277.9,61.0 283.1,59.7 288.3,58.5 293.5,57.2 298.7,55.8 303.9,54.5 309.1,53.2 314.3,51.9 319.5,50.5 324.7,49.1 329.9,47.7 335.1,46.3 340.3,44.9 345.5,43.4 350.7,41.9 355.9,40.4 361.1,38.9 366.3,37.3 371.5,35.7 376.7,34.0 381.9,32.3 387.1,30.6 392.3,28.8 397.5,26.9 402.7,25.0 407.9,23.0 413.1,21.0 418.3,18.9";

export function SaddleNodeChart() {
  return (
    <Figure
      viewBox="0 0 460 240"
      label="Exact stable and saddle branches of the interior stationary point against loss aversion. The two branches are created together at the saddle-node threshold lambda = 2.2113 and separate as lambda increases; the stable branch reaches the boundary at lambda = 2.5."
      caption="The exact loss-aversion-induced saddle-node (Theorem 4). Branches are solved from the closed form R(x) = (2−3x)√x·(3x²−4x+2)^(−3/4) against C = 5−2λ, so this is the analytic curve rather than a sampled fit. Below λ_SN there is no finite interior equilibrium at all: the pair is created, not destabilized."
    >
      <Axes
        x0={52} x1={442} y0={202} y1={18}
        xTicks={[{ x: 73.7, label: "2.2" }, { x: 160.3, label: "2.4" }, { x: 247.0, label: "2.6" }, { x: 333.7, label: "2.8" }, { x: 420.3, label: "3.0" }]}
        yTicks={[{ y: 202, label: "0" }, { y: 156, label: "0.25" }, { y: 110, label: "0.5" }, { y: 64, label: "0.75" }, { y: 18, label: "1" }]}
        xLabel="loss aversion λ"
        yLabel="stationary probability x"
      />

      {/* region with no interior equilibrium */}
      <rect x={52} y={18} width={26.6} height={184} fill={INK} opacity="0.05" />
      <text x={65} y={34} textAnchor="middle" fontSize="9" fill={INK} opacity="0.5"
        fontFamily="var(--font-mono)" transform="rotate(-90 65 34)">no interior eq.</text>

      <polyline points={SADDLE} fill="none" stroke={INK} strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
      <polyline points={STABLE} fill="none" stroke={CLAY} strokeWidth="2.4" />

      {/* the fold */}
      <circle cx={78.6} cy={140.7} r="4.2" fill="none" stroke={CLAY} strokeWidth="2" />
      <line x1={78.6} y1={18} x2={78.6} y2={202} stroke={INK} strokeWidth="1" strokeDasharray="2 3" opacity="0.3" />
      <text x={88} y={120} fontSize="11" fill={CLAY} fontFamily="var(--font-mono)">λ_SN = 2.2113</text>
      <text x={88} y={133} fontSize="10" fill={INK} opacity="0.55" fontFamily="var(--font-mono)">fold at x = 1/3</text>

      {/* stable branch hits boundary at 2.5 */}
      <line x1={203.7} y1={18} x2={203.7} y2={202} stroke={INK} strokeWidth="1" strokeDasharray="2 3" opacity="0.25" />
      <text x={209} y={196} fontSize="10" fill={INK} opacity="0.55" fontFamily="var(--font-mono)">λ = 5/2</text>

      <Legend x={250} y={150} items={[
        { label: "stable mixed policy", color: CLAY },
        { label: "saddle", color: INK, dash: "6 4" },
      ]} />
    </Figure>
  );
}

/* ══ 5. shared-belief precision/utility reversal ══ */

export function PrecisionUtilityChart() {
  // two panels: angular MSE (lower=better) and capture probability
  const bar = (x, y, w, h, fill, op) => <rect x={x} y={y} width={w} height={h} fill={fill} opacity={op} rx="1.5" />;
  // panel A: MSE, max 0.80 -> 120px ; panel B: capture, max 1.0 -> 120px
  const mA = (v) => v / 0.80 * 120;
  const mB = (v) => v * 120;
  const baseY = 168;
  return (
    <Figure
      viewBox="0 0 460 250"
      label="Two panels comparing a shared pooled belief against independent beliefs. The shared belief has strictly lower angular error at both fresh and stale lag, yet its capture probability is higher when fresh and far lower when stale."
      caption="The four-collector reversal (Theorem 4.2), exact finite-distribution values over all 2⁴ observation configurations. Pooling wins on the estimator at both lags and loses badly on the task at stale lag: a small chance that one collector points usefully outweighs lowering every collector's mean squared error."
    >
      {/* panel titles */}
      <text x={118} y={22} textAnchor="middle" fontSize="11" fill={INK} opacity="0.7"
        fontFamily="var(--font-mono)" letterSpacing="0.08em">ANGULAR MSE (rad²)</text>
      <text x={340} y={22} textAnchor="middle" fontSize="11" fill={INK} opacity="0.7"
        fontFamily="var(--font-mono)" letterSpacing="0.08em">CAPTURE PROBABILITY</text>
      <text x={118} y={35} textAnchor="middle" fontSize="10" fill={INK} opacity="0.45"
        fontFamily="var(--font-mono)">lower is better</text>
      <text x={340} y={35} textAnchor="middle" fontSize="10" fill={INK} opacity="0.45"
        fontFamily="var(--font-mono)">higher is better</text>

      {/* panel A axis */}
      <line x1={46} y1={baseY} x2={198} y2={baseY} stroke={INK} strokeWidth="1" opacity="0.45" />
      {/* panel B axis */}
      <line x1={268} y1={baseY} x2={420} y2={baseY} stroke={INK} strokeWidth="1" opacity="0.45" />

      {/* ---- panel A: MSE ---- */}
      {bar(62, baseY - mA(0.099315), 26, mA(0.099315), CLAY, 1)}
      {bar(92, baseY - mA(0.36), 26, mA(0.36), INK, 0.45)}
      {bar(134, baseY - mA(0.459315), 26, mA(0.459315), CLAY, 1)}
      {bar(164, baseY - mA(0.72), 26, mA(0.72), INK, 0.45)}
      <text x={75} y={baseY - mA(0.099315) - 6} textAnchor="middle" fontSize="10" fill={CLAY} fontFamily="var(--font-mono)">0.099</text>
      <text x={105} y={baseY - mA(0.36) - 6} textAnchor="middle" fontSize="10" fill={INK} opacity="0.6" fontFamily="var(--font-mono)">0.360</text>
      <text x={147} y={baseY - mA(0.459315) - 6} textAnchor="middle" fontSize="10" fill={CLAY} fontFamily="var(--font-mono)">0.459</text>
      <text x={177} y={baseY - mA(0.72) - 6} textAnchor="middle" fontSize="10" fill={INK} opacity="0.6" fontFamily="var(--font-mono)">0.720</text>
      <text x={90} y={baseY + 15} textAnchor="middle" fontSize="11" fill={INK} opacity="0.7" fontFamily="var(--font-mono)">fresh</text>
      <text x={162} y={baseY + 15} textAnchor="middle" fontSize="11" fill={INK} opacity="0.7" fontFamily="var(--font-mono)">stale</text>

      {/* ---- panel B: capture ---- */}
      {bar(284, baseY - mB(6 / 16), 26, mB(6 / 16), CLAY, 1)}
      {bar(314, baseY - 1.5, 26, 1.5, INK, 0.45)}
      {bar(356, baseY - mB(1 / 16), 26, mB(1 / 16), CLAY, 1)}
      {bar(386, baseY - mB(15 / 16), 26, mB(15 / 16), INK, 0.45)}
      <text x={297} y={baseY - mB(6 / 16) - 6} textAnchor="middle" fontSize="10" fill={CLAY} fontFamily="var(--font-mono)">6/16</text>
      <text x={327} y={baseY - 8} textAnchor="middle" fontSize="10" fill={INK} opacity="0.6" fontFamily="var(--font-mono)">0</text>
      <text x={369} y={baseY - mB(1 / 16) - 6} textAnchor="middle" fontSize="10" fill={CLAY} fontFamily="var(--font-mono)">1/16</text>
      <text x={399} y={baseY - mB(15 / 16) - 6} textAnchor="middle" fontSize="10" fill={INK} opacity="0.6" fontFamily="var(--font-mono)">15/16</text>
      <text x={312} y={baseY + 15} textAnchor="middle" fontSize="11" fill={INK} opacity="0.7" fontFamily="var(--font-mono)">fresh</text>
      <text x={384} y={baseY + 15} textAnchor="middle" fontSize="11" fill={INK} opacity="0.7" fontFamily="var(--font-mono)">stale</text>

      {/* the reversal callout */}
      <path d="M 300 196 L 300 206 L 404 206 L 404 196" fill="none" stroke={CLAY} strokeWidth="1.3" opacity="0.8" />
      <text x={352} y={222} textAnchor="middle" fontSize="11" fill={CLAY} fontFamily="var(--font-mono)">
        ordering reverses
      </text>

      <Legend x={46} y={212} items={[
        { label: "shared (pooled)", color: CLAY },
        { label: "independent", color: INK },
      ]} />
    </Figure>
  );
}

/* ══ 6. policy-matched diagnostic grid: what resolved, what didn't ══ */

export function PolicyMatchedChart() {
  // captures (S−I) with 95% paired-t intervals, ω = 5 row
  const X = (v) => 236 + v / 2.0 * 78;      // capture difference axis, −1.5..+3
  const rows = [
    { L: "1",  m: -0.19, lo: -0.90, hi: 0.52,  mse: -0.92 },
    { L: "3",  m: 1.75,  lo: 0.86,  hi: 2.64,  mse: -0.87 },
    { L: "10", m: 0.69,  lo: -0.23, hi: 1.60,  mse: -0.40 },
    { L: "20", m: -0.06, lo: -1.20, hi: 1.07,  mse: -0.31 },
    { L: "45", m: -0.28, lo: -1.16, hi: 0.60,  mse: -0.16 },
    { L: "67", m: -0.47, lo: -1.40, hi: 0.46,  mse: -0.01 },
  ];
  const y0 = 54, dy = 26;
  const MX = (v) => 150 + v / 1.0 * 60;      // MSE axis, −1..0
  return (
    <Figure
      viewBox="0 0 460 236"
      label="Policy-matched diagnostics at rotation rate five. Shared minus independent angular error is negative with intervals excluding zero at nearly every memory length, while the capture difference intervals all straddle zero."
      caption="Policy-matched grid at ω = 5, n = 32 paired seeds per cell, 95% paired-t intervals. The estimator prediction resolves — shared error is lower almost everywhere — while every capture interval crosses zero. The reward reversal that the construction proves exactly does not resolve in the canonical system, and is not claimed to."
    >
      <text x={92} y={26} textAnchor="middle" fontSize="11" fill={INK} opacity="0.7"
        fontFamily="var(--font-mono)" letterSpacing="0.08em">ANGULAR MSE (S−I)</text>
      <text x={314} y={26} textAnchor="middle" fontSize="11" fill={INK} opacity="0.7"
        fontFamily="var(--font-mono)" letterSpacing="0.08em">CAPTURES (S−I)</text>

      {/* zero lines */}
      <line x1={MX(0)} y1={38} x2={MX(0)} y2={y0 + dy * 6} stroke={INK} strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
      <line x1={X(0)} y1={38} x2={X(0)} y2={y0 + dy * 6} stroke={INK} strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
      <text x={MX(0)} y={y0 + dy * 6 + 14} textAnchor="middle" fontSize="10" fill={INK} opacity="0.5" fontFamily="var(--font-mono)">0</text>
      <text x={X(0)} y={y0 + dy * 6 + 14} textAnchor="middle" fontSize="10" fill={INK} opacity="0.5" fontFamily="var(--font-mono)">0</text>
      <text x={MX(-1)} y={y0 + dy * 6 + 14} textAnchor="middle" fontSize="10" fill={INK} opacity="0.5" fontFamily="var(--font-mono)">−1</text>
      <text x={X(2)} y={y0 + dy * 6 + 14} textAnchor="middle" fontSize="10" fill={INK} opacity="0.5" fontFamily="var(--font-mono)">+2</text>

      {rows.map((r, i) => {
        const y = y0 + i * dy;
        return (
          <g key={r.L}>
            <text x={36} y={y + 4} textAnchor="end" fontSize="11" fill={INK} opacity="0.7"
              fontFamily="var(--font-mono)">L={r.L}</text>
            {/* MSE bar — resolved, clay */}
            <line x1={MX(0)} y1={y} x2={MX(r.mse)} y2={y} stroke={CLAY} strokeWidth="3" opacity="0.85" />
            <circle cx={MX(r.mse)} cy={y} r="3" fill={CLAY} />
            {/* capture interval — unresolved, ink */}
            <line x1={X(r.lo)} y1={y} x2={X(r.hi)} y2={y} stroke={INK} strokeWidth="1.4" opacity="0.55" />
            <line x1={X(r.lo)} y1={y - 3.5} x2={X(r.lo)} y2={y + 3.5} stroke={INK} strokeWidth="1.4" opacity="0.55" />
            <line x1={X(r.hi)} y1={y - 3.5} x2={X(r.hi)} y2={y + 3.5} stroke={INK} strokeWidth="1.4" opacity="0.55" />
            <circle cx={X(r.m)} cy={y} r="3" fill={INK} opacity="0.75" />
          </g>
        );
      })}

      <text x={92} y={y0 + dy * 6 + 32} textAnchor="middle" fontSize="10" fill={CLAY}
        fontFamily="var(--font-mono)">resolved: 11 of 12 cells</text>
      <text x={314} y={y0 + dy * 6 + 32} textAnchor="middle" fontSize="10" fill={INK} opacity="0.6"
        fontFamily="var(--font-mono)">every interval crosses zero</text>
    </Figure>
  );
}
