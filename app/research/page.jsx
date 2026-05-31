"use client";
import React from 'react';
import { Eyebrow, StatBlock, StatRow, Footnote } from "@/components/Primitives";
import InfoGainAnimation from "@/components/InfoGainAnimation";

/* ── figure block helper ──────────────────────────────────────── */

function FigureBlock({ src, alt, caption }) {
  return (
    <div style={{ margin: "32px 0" }}>
      <div style={{
        borderRadius: "var(--r-2)",
        overflow: "hidden",
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--rule)"
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} style={{ width: "100%", display: "block", background: "white" }} />
      </div>
      {caption && <p className="t-caption" style={{ marginTop: 8 }}>{caption}</p>}
    </div>
  );
}

/* ── inline style helpers ─────────────────────────────────────── */

const tableWrap = {
  overflowX: "auto",
  margin: "20px 0",
  borderRadius: "var(--r-2)",
  boxShadow: "inset 0 0 0 1px var(--rule)",
};
const table = {
  width: "100%",
  borderCollapse: "collapse",
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  letterSpacing: "0.02em",
};
const th = {
  textAlign: "left",
  padding: "10px 14px",
  fontSize: 10,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--ink-3)",
  borderBottom: "1px solid var(--rule)",
  fontWeight: 500,
  whiteSpace: "nowrap",
};
const thR = { ...th, textAlign: "right" };
const td = {
  padding: "8px 14px",
  borderBottom: "1px solid var(--rule)",
  color: "var(--ink-2)",
  whiteSpace: "nowrap",
};
const tdR = { ...td, textAlign: "right" };
const tdLabel = { ...td, color: "var(--ink)", fontWeight: 500 };
const tdHighlight = { ...tdR, color: "var(--clay)", fontWeight: 600 };

/* ── terminal-style data block ─────────────────────────────────── */

function TerminalBlock({ title, subtitle, children }) {
  return (
    <div style={{
      background: "#14110E",
      borderRadius: "var(--r-2)",
      padding: "16px 20px",
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "#F4EEE2",
      lineHeight: 1.75,
      letterSpacing: "0.02em",
      boxShadow: "inset 0 0 0 1px rgba(244,238,226,0.08)",
      margin: "20px 0",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        color: "#8A8275", borderBottom: "1px solid rgba(244,238,226,0.1)",
        paddingBottom: 8, marginBottom: 8,
        fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
      }}>
        <span>{title}</span>
        {subtitle && <span>{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

/* ── section divider ──────────────────────────────────────────── */

function SectionRule() {
  return <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: "48px 0 40px" }} />;
}

/* ── page ──────────────────────────────────────────────────────── */

export default function ResearchPage() {
  return (
    <article className="container-prose" style={{ padding: "64px var(--s-7) 32px" }}>

      {/* ── Header ──────────────────────────────────────────── */}
      <Eyebrow section="04">Research · in preparation</Eyebrow>
      <h1 style={{ marginTop: 14, marginBottom: 16, lineHeight: 1.12 }}>
        B-SRM-CHFA: Belief-state regret minimization for adversarial pursuit-evasion under partial observability.
      </h1>

      <div style={{
        display: "flex", gap: 16, alignItems: "baseline", flexWrap: "wrap",
        fontFamily: "var(--font-mono)", fontSize: 11,
        color: "var(--ink-3)", letterSpacing: "0.06em",
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
        padding: "10px 0",
        marginBottom: 32,
      }}>
        <span>A. YADAV</span>
        <span>·</span>
        <span>w/ Prof. D. GUPTA</span>
        <span>·</span>
        <span>ASHOKA UNIV.</span>
        <span style={{ marginLeft: "auto" }}>2026 · IN PREPARATION</span>
      </div>

      {/* ── Abstract ────────────────────────────────────────── */}
      <p style={{
        fontFamily: "var(--font-serif)", fontSize: 17, fontStyle: "italic",
        color: "var(--ink-2)", lineHeight: 1.65, marginBottom: 28,
      }}>
        Abstract.&ensp;We design B-SRM-CHFA, a multi-module belief-state reinforcement learning architecture for partially-observable pursuit-evasion games (POPEG) on grids of width W&thinsp;∈&thinsp;{"{10, 25, 35, 50}"}. The pursuer team maintains a learned posterior over evader positions and computes regret-minimizing strategies against that belief via equilibrium-oriented self-play, under a fixed information-theoretic difficulty invariant α&thinsp;≈&thinsp;0.04. On 10×10 grids B-SRM-CHFA achieves a capture rate of 0.996 against MAPPO&rsquo;s 0.568; the strongest hand-coded three-regime hybrid caps at 0.770 on 25×25; tabular CFR over scalar belief abstractions fails entirely (cap&thinsp;≤&thinsp;0.010), empirically motivating the full spatial belief map. Exploitability ε&thinsp;=&thinsp;2.09 on 10×10. Empirical scaling (slope log&thinsp;T* vs log&thinsp;a&thinsp;=&thinsp;1.63) departs from the theoretical 1.0, with fitted constant C&thinsp;=&thinsp;27.13.
      </p>

      <p className="t-prose">
        Pursuit-evasion is a useful sandbox precisely because the agents <em>do not</em> see the full board. The pursuer maintains a posterior over the evader&rsquo;s location; the evader acts adversarially against the pursuer&rsquo;s <em>policy</em>, not its observation. Belief-state RL gives both of them a place to keep that information honestly.<span className="t-fnref">¹</span>
      </p>

      <SectionRule />

      {/* ── The Game: POPEG ──────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 1</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>The game: POPEG</h2>

      <p className="t-prose">
        A Partially-Observable Pursuit-Evasion Game on a square W×W obstacle-free grid. N<sub>p</sub>&thinsp;=&thinsp;3 pursuers cooperate as a single centralized player against N<sub>e</sub>&thinsp;=&thinsp;2 evaders. Each pursuer has a limited field-of-view of radius r, seeing a (2r+1)² patch. The game is a finite-horizon two-player zero-sum extensive-form game — evaluated against a fixed-policy evader (random-walk or ε-greedy with ε&thinsp;=&thinsp;0.05), making V a best-response capture rate under first-capture termination semantics.
      </p>

      <p className="t-prose">
        The I1 invariant holds the single-pursuer coverage fraction α&thinsp;=&thinsp;(2r+1)²/W² fixed at approximately 0.04 across all grid sizes, with r chosen to satisfy this constraint. The horizon T&thinsp;=&thinsp;max(W²/3, 100) scales with grid area.
      </p>

      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Grid</th>
              <th style={thR}>r (I1)</th>
              <th style={thR}>α</th>
              <th style={thR}>T</th>
              <th style={thR}>N<sub>p</sub> / N<sub>e</sub></th>
            </tr>
          </thead>
          <tbody>
            {[
              ["10×10", "1", "0.090", "100", "3 / 2"],
              ["25×25", "2", "0.040", "208", "3 / 2"],
              ["35×35", "3", "0.040", "408", "3 / 2"],
              ["50×50", "4", "0.032", "833", "3 / 2"],
            ].map(([grid, r, a, t, np], i) => (
              <tr key={i}>
                <td style={tdLabel}>{grid}</td>
                <td style={tdR}>{r}</td>
                <td style={tdR}>{a}</td>
                <td style={tdR}>{t}</td>
                <td style={tdR}>{np}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="t-caption" style={{ marginTop: 4 }}>
        Canonical game configurations. The 50×50 exception (α&thinsp;=&thinsp;0.032 instead of 0.040) is whitelisted.
      </p>

      <SectionRule />

      {/* ── Architecture ────────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 2</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Architecture: CHE + BIE + NRM</h2>

      <p className="t-prose">
        The agent factors into three modules. The <em>Contextual History Encoder</em> (CHE) is an LSTM that maps the observation history — a 3-channel FOV tensor (self, teammates, last-seen-evader), own position, last-known opponent position — into a latent embedding z<sub>t</sub>&thinsp;∈&thinsp;ℝ<sup>256</sup>.
      </p>

      <p className="t-prose">
        The <em>Belief Inference Engine</em> (BIE) takes z<sub>t</sub> and decodes a spatial posterior b<sub>t</sub> over the W×W grid — a learned distribution over evader positions. The reconstruction target is uniform over occupied evader cells (a two-spike distribution at N<sub>e</sub>&thinsp;=&thinsp;2). After five runs of VAE posterior collapse, the BIE was converted from a VAE to a deterministic encoder→decoder bottleneck with latent dimension 64.
      </p>

      <p className="t-prose">
        The <em>Neural Regret Minimizer</em> (NRM) conditions <em>only</em> on the 64-dimensional belief summary b<sub>summary</sub> concatenated with a 5-dimensional action one-hot — a 69-dimensional input. Critically, z<sub>t</sub> is excluded from the NRM input, enforcing the belief bottleneck: all action-relevant information is routed through the learned belief map. This makes Lemma&thinsp;1 (belief = sufficient statistic) architecturally load-bearing rather than decorative.<span className="t-fnref">²</span>
      </p>

      {/* architecture diagram */}
      <FigureBlock 
        src="/research/figures/arch_di.png" 
        alt="B-SRM-CHFA model architecture: CHE (LSTM) → BIE (belief map) → NRM (regret minimizer)"
        caption="B-SRM-CHFA detailed architecture. The CHE encodes observation history; the BIE decodes a spatial belief map; the NRM selects actions conditioned on the belief summary alone."
      />

      <SectionRule />

      {/* ── Headline Results ──────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 3</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Headline results: 10×10</h2>

      <p className="t-prose">
        On the smallest canonical grid, B-SRM-CHFA achieves near-perfect capture against MAPPO&rsquo;s 56.8%. The ablation without the target encoder drops to 92.4%, confirming the BIE&rsquo;s contribution.
      </p>

      <TerminalBlock title="B-SRM-CHFA vs. baselines" subtitle="10×10 · 5 seeds × 5000 episodes">
        {(() => {
          const rows = [
            { method: "B-SRM-CHFA", cap: "0.996 ± 0.008", cost: "20.7 ± 1.9", note: "" },
            { method: "MAPPO", cap: "0.568 ± 0.138", cost: "346.6 ± 91.1", note: "" },
            { method: "No Target Enc.", cap: "0.924 ± 0.066", cost: "46.4 ± 20.0", note: "ablation" },
          ];
          const grid = "1fr 120px 120px 80px";
          return (
            <>
              <div style={{
                display: "grid", gridTemplateColumns: grid, gap: 8,
                color: "#8A8275", fontSize: 10, letterSpacing: "0.14em",
                textTransform: "uppercase", paddingBottom: 6,
              }}>
                <span>Method</span>
                <span style={{ textAlign: "right" }}>cap rate</span>
                <span style={{ textAlign: "right" }}>avg cost</span>
                <span style={{ textAlign: "right" }}></span>
              </div>
              {rows.map(r => (
                <div key={r.method} style={{
                  display: "grid", gridTemplateColumns: grid, gap: 8,
                  fontVariantNumeric: "tabular-nums", alignItems: "baseline",
                }}>
                  <span style={{ color: r.method === "B-SRM-CHFA" ? "#F4EEE2" : "#8A8275" }}>{r.method}</span>
                  <span style={{ textAlign: "right", color: parseFloat(r.cap) > 0.9 ? "#6FBF73" : "#F4EEE2" }}>{r.cap}</span>
                  <span style={{ textAlign: "right", color: parseFloat(r.cost) > 100 ? "#D85A4A" : "#6FBF73" }}>{r.cost}</span>
                  <span style={{ textAlign: "right", color: "#8A8275", fontSize: 10 }}>{r.note}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, fontSize: 10, color: "#8A8275", letterSpacing: "0.06em" }}>
                Exploitability ε = 2.09 (seed_0, ep5000, 10×10)
              </div>
            </>
          );
        })()}
      </TerminalBlock>

      <SectionRule />

      {/* ── Baseline Hierarchy ──────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 4</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>The baseline hierarchy</h2>

      <p className="t-prose">
        On the canonical 25×25 grid, five levels of pursuer capability were established — from random walk floor to omniscient ceiling. The three-regime hybrid is the strongest hand-coded baseline; tabular CFR fails entirely. B-SRM-CHFA must beat the 0.770 bar.
      </p>

      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Pursuer policy</th>
              <th style={th}>Type</th>
              <th style={thR}>Cap rate</th>
              <th style={thR}>Info regret</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Full-obs greedy", "ceiling", "1.000", "—"],
              ["Three-regime hybrid", "hand-coded", "0.770", "0.141"],
              ["Coverage sweep (lawnmower)", "hand-coded", "0.490", "0.385"],
              ["Random walk", "floor", "0.607", "—"],
              ["Tabular belief-CFR (best)", "learned", "0.010", "0.126"],
              ["Pure P_IO (info-optimal)", "hand-coded", "0.070", "0.276"],
              ["MAPPO (ε-greedy evader)", "learned", "0.121", "—"],
            ].map(([policy, type, cap, ir], i) => (
              <tr key={i}>
                <td style={tdLabel}>{policy}</td>
                <td style={{ ...td, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>{type}</td>
                <td style={parseFloat(cap) >= 0.770 ? tdHighlight : tdR}>{cap}</td>
                <td style={tdR}>{ir}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="t-caption" style={{ marginTop: 4 }}>
        Baseline hierarchy on canonical 25×25 (r=2, T=208, N<sub>p</sub>=3, N<sub>e</sub>=2, ε-greedy evader ε=0.05, n=100).
        Random-walk capture rate is from E2 baseline matrix under first-capture semantics. MAPPO from dedicated baseline runs.
      </p>

      <SectionRule />

      {/* ── Why CFR Fails ──────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 5</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Why tabular CFR fails</h2>

      <p className="t-prose">
        Six tabular CFR variants were run — coarse and fine 1D/2D abstractions, bearing-based abstraction, both information-gain and capture-reward value proxies, up to 2000 training episodes. All achieved cap&thinsp;≤&thinsp;0.010. The failure is structural, not a tuning problem.
      </p>

      <p className="t-prose">
        <strong>Capture signal starvation.</strong> During 2000 training episodes, every variant sees 0–6 captures. With a 125-dim joint action space (5³) and 80–264 info sets, per-(I,a) visit counts average 12–33 — far too sparse for RM+ to distinguish anything. The table converges to near-uniform everywhere.
      </p>

      <p className="t-prose">
        <strong>Abstraction kills directionality.</strong> A 2-scalar abstraction (entropy, distance) collapses spatially distinct situations into the same info set. Info set (entropy=3, distance=6) might correspond to pursuers north, east, or south of the belief peak — all requiring different actions but receiving the same regret update. The three-regime hybrid sidesteps this by reading peak-cell coordinates directly; no abstract info set can encode that.
      </p>

      <p className="t-prose">
        The conclusion is clean: you cannot get meaningful capture from a regret table indexed by scalar belief summaries. The W×H belief map is irreducibly spatial. This is the empirical argument for B-SRM-CHFA&rsquo;s architecture — the BIE maps the full belief distribution into a latent summary, and the NRM conditions on that summary.<span className="t-fnref">³</span>
      </p>

      <FigureBlock 
        src="/research/figures/belief_cfr_comparison.png" 
        alt="Bar chart: capture rate and IR across all variants vs reference bars"
        caption="Belief-CFR capture rate and information regret across all 6 tabular variants. Every variant fails to capture the evader meaningfully (≤ 1.0%), falling dramatically short of the 77.0% three-regime baseline."
      />

      <SectionRule />

      {/* ── MAPPO Comparison ──────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 6</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>MAPPO baseline</h2>

      <p className="t-prose">
        MAPPO was run across 7 named configurations × 2 evader types × 3 seeds. Against random evaders MAPPO is competitive on small grids (0.86 on 10×10) but struggles at scale. Against ε-greedy evaders it collapses — 12.1% capture at canonical-medium, 7.2% at canonical-large. The centralized critic&rsquo;s value loss never converges on 25×25; MAPPO has no belief state and no information-gathering objective.
      </p>

      <TerminalBlock title="MAPPO results — 14 conditions × 3 seeds" subtitle="2000 episodes each">
        {(() => {
          const header = ["config", "cap (rand)", "cap (ε-gr)", "len (ε-gr)"];
          const rows = [
            ["canonical-med (25²)", "0.697", "0.137", "189.1"],
            ["canonical-lrg (50²)", "0.473", "0.106", "761.5"],
            ["hard-medium", "0.371", "0.035", "203.8"],
            ["easy-medium", "0.711", "0.085", "195.6"],
            ["small-canonical (10²)", "0.859", "0.301", "25.0"],
            ["coverage-deficit", "0.502", "0.063", "199.9"],
            ["high-delta", "0.829", "0.201", "178.2"],
          ];
          const grid = "1fr 90px 90px 90px";
          return (
            <>
              <div style={{
                display: "grid", gridTemplateColumns: grid, gap: 8,
                color: "#8A8275", fontSize: 10, letterSpacing: "0.14em",
                textTransform: "uppercase", paddingBottom: 6,
              }}>
                {header.map(h => <span key={h} style={{ textAlign: h === "config" ? "left" : "right" }}>{h}</span>)}
              </div>
              {rows.map(([config, capR, capE, len]) => (
                <div key={config} style={{
                  display: "grid", gridTemplateColumns: grid, gap: 8,
                  fontVariantNumeric: "tabular-nums", alignItems: "baseline",
                }}>
                  <span style={{ color: "#8A8275" }}>{config}</span>
                  <span style={{ textAlign: "right" }}>{capR}</span>
                  <span style={{ textAlign: "right", color: parseFloat(capE) < 0.15 ? "#D85A4A" : "#F4EEE2" }}>{capE}</span>
                  <span style={{ textAlign: "right", color: "#8A8275" }}>{len}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, fontSize: 10, color: "#8A8275" }}>
                Cap rates shown are last-500-episode averages. ε-greedy evader is omniscient, ε=0.05.
              </div>
            </>
          );
        })()}
      </TerminalBlock>

      <SectionRule />

      {/* ── Three-Regime Hybrid ──────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 7</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Actions as information-gathering operations</h2>

      <p className="t-prose">
        The three-regime hybrid partitions the pursuit problem by belief entropy: (1) a lawnmower <em>sweep</em> phase when belief is fully diffuse (min<sub>j</sub>&thinsp;H(B<sub>j</sub>)&thinsp;&gt;&thinsp;H<sub>hi</sub>), (2) an <em>information-optimal</em> phase that maximizes expected entropy reduction when belief is partially concentrated, and (3) a <em>capture-optimal</em> phase that greedily pursues the belief peak when min<sub>j</sub>&thinsp;H(B<sub>j</sub>)&thinsp;&lt;&thinsp;H<sub>lo</sub>.
      </p>

      <p className="t-prose">
        The critical finding: <strong>H<sub>hi</sub> is the dominant variable.</strong> Moving H<sub>hi</sub> from 8.0 to 5.0 drops capture rate by ~0.33. H<sub>lo</sub> has almost no effect (≤0.03 variation). H<sub>hi</sub>&thinsp;=&thinsp;8.0 is just below maximum entropy (9.29 bits on 25×25), so the sweep phase lasts only a few steps and belief-driven pursuit dominates the episode.
      </p>

      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>
              <th style={thR}>H<sub>hi</sub></th>
              <th style={thR}>H<sub>lo</sub></th>
              <th style={thR}>cap</th>
              <th style={thR}>IR</th>
              <th style={thR}>η</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["8.0", "2.00", "0.770", "0.141", "0.702"],
              ["7.0", "0.10–0.50", "0.560", "0.223", "0.583"],
              ["6.0", "any", "0.460–0.470", "0.294–0.300", "0.518–0.534"],
              ["5.0", "any", "0.440–0.470", "0.352–0.364", "0.458–0.481"],
            ].map(([hhi, hlo, cap, ir, eta], i) => (
              <tr key={i}>
                <td style={i === 0 ? tdHighlight : tdR}>{hhi}</td>
                <td style={tdR}>{hlo}</td>
                <td style={i === 0 ? tdHighlight : tdR}>{cap}</td>
                <td style={tdR}>{ir}</td>
                <td style={tdR}>{eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FigureBlock 
        src="/research/figures/hybrid_threshold_sweep.png" 
        alt="Capture rate and info regret versus H_threshold for three variants of the hybrid policy"
        caption="Early two-regime threshold sweep across original, min_H, and refined variants."
      />

      <FigureBlock 
        src="/research/figures/three_regime_sweep.png" 
        alt="Heatmap of capture rate and information regret over a grid of H_hi and H_lo thresholds"
        caption="Three-regime grid sweep. Capture rate and mean information regret across the (H_hi, H_lo) hyperparameter space. H_hi governs the transition from pure sweep to info-optimal pursuit and dominates the performance surface."
      />

      <FigureBlock 
        src="/research/figures/three_regime_sweep_lineplot.png" 
        alt="Line plot showing capture rate and info regret versus H_hi, with lines per H_lo"
      />

      <h3 style={{ fontSize: 18, marginTop: 32, marginBottom: 10 }}>Regime-conditioned information regret</h3>

      <p className="t-prose">
        Splitting per-step data at H<sub>ref</sub>&thinsp;=&thinsp;5.0 bits into diffuse (min_H&thinsp;&gt;&thinsp;5.0) and concentrated (min_H&thinsp;≤&thinsp;5.0) bands reveals the entire performance gap is in the diffuse regime. Concentrated-band IR is completely flat at ~0.10 across all conditions. B-SRM-CHFA&rsquo;s incremental value must manifest during diffuse-belief steps — the diagnostic target: does it reduce diffuse-band IR below the three-regime&rsquo;s 0.170?<span className="t-fnref">⁴</span>
      </p>

      <FigureBlock 
        src="/research/figures/regime_conditioned_ir.png" 
        alt="Regime-conditioned information regret and efficiency split by diffuse and concentrated belief bands"
        caption="Regime-conditioned analysis. Information regret drops sharply in the diffuse band as H_hi increases, while remaining largely flat in the concentrated band."
      />

      <h3 style={{ fontSize: 18, marginTop: 32, marginBottom: 10 }}>Cold-start degeneracy</h3>

      <p className="t-prose">
        Pure P<sub>IO</sub> (always exploiting information-optimally) suffers catastrophic cold-start degeneracy. With deterministic argmax, 90.2 actions are tied per step — pursuers freeze at (STAY, STAY, STAY) for the full horizon, yielding cap&thinsp;=&thinsp;0.010. Random tiebreaking gives 7× improvement (cap&thinsp;=&thinsp;0.070) but no tiebreak strategy rescues pure P<sub>IO</sub>. <em>Directionlessness</em>, not tie ambiguity, is the dominant failure mode. The punchline: B-SRM-CHFA must learn structured exploration direction from diffuse belief — an internal analogue of lawnmower traversal that emerges from representation rather than hard-coding.
      </p>

      <FigureBlock 
        src="/research/figures/pio_tiebreak_study.png" 
        alt="Four panel plot: capture rate, info regret, cold-start exit speed, and tie ambiguity across 5 tie-breaking strategies"
        caption="Cold-start degeneracy. Evaluating pure information-optimal pursuit under various tie-breaking strategies reveals severe directionlessness in the early diffuse phase."
      />

      <SectionRule />

      {/* ── Strategic Characterization ──────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 8</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Strategic characterization</h2>

      <p className="t-prose">
        A unified baseline infrastructure was built: exact cell co-occupancy capture (not FOV overlap), five pursuer policies (random walk, greedy-visible, lawnmower-sweep, last-seen, full-obs), two evader policies, Wilson 95% CIs, and a 30-condition evaluation matrix (W&thinsp;∈&thinsp;{"{25, 35, 50}"}&thinsp;×&thinsp;5 pursuers&thinsp;×&thinsp;2 evaders).
      </p>

      <p className="t-prose">
        Switching from all-evaders to first-capture termination raised capture rates substantially (e.g. random walk on W=25: 0.138&thinsp;→&thinsp;0.634, Δ&thinsp;=&thinsp;+0.496). Under first-capture semantics the I1 invariant bounds random-walk capture to the 0.55–0.65 band across W&thinsp;∈&thinsp;{"{25, 35, 50}"} — mild monotonic decline, confirming the mixing-time equalization story.
      </p>

      <p className="t-prose">
        A critical finding: the greedy evader is <em>uncatchable</em> under cell-match capture, even by an omniscient full-obs pursuer (0/20 captures on W=25, T=2000). The evader maximizes minimum L2 distance and always has an escape direction on an open grid — a fundamental consequence of switching from FOV-based to cell-match capture.
      </p>

      <InfoGainAnimation />

      <FigureBlock 
        src="/research/figures/info_gain_canonical.png" 
        alt="Mean summed entropy, chosen joint info gain, mean info regret, and capture rate on canonical W=25 grid"
        caption="Information efficiency on the canonical 25×25 grid. Evaluates random walk, greedy visible, coverage sweep, last seen, and full observation baselines."
      />

      <FigureBlock 
        src="/research/figures/info_gain_comparison.png" 
        alt="Information efficiency on smaller W=15 grid"
        caption="Information efficiency on the smaller 15×15 grid."
      />

      <SectionRule />

      {/* ── VAE Posterior Collapse ──────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 9</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>VAE posterior collapse &amp; the de-VAE fix</h2>

      <p className="t-prose">
        Gate 0 — confirming the BIE learns a meaningful belief map (recon loss&thinsp;&lt;&thinsp;4.5 by ep 200) — failed across five runs. All showed the same failure mode: complete posterior collapse. The decoder output was uniform regardless of input.
      </p>

      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Run</th>
              <th style={th}>Key change</th>
              <th style={thR}>recon loss</th>
              <th style={thR}>active dims</th>
              <th style={th}>Verdict</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["v1", "baseline", "~5.7", "—", "posterior collapse"],
              ["v3", "latent 64→128", "5.72–5.75", "—", "capacity doesn't fix it"],
              ["v4", "training loop changes", "5.71–5.76", "—", "CTDE changes insufficient"],
              ["v5", "curriculum + diagnostics", "6.3–6.4", "0", "confirmed: VAE is the cause"],
            ].map(([run, change, recon, dims, verdict], i) => (
              <tr key={i}>
                <td style={tdLabel}>{run}</td>
                <td style={td}>{change}</td>
                <td style={tdR}>{recon}</td>
                <td style={tdR}>{dims}</td>
                <td style={{ ...td, fontSize: 11, color: "var(--clay)" }}>{verdict}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="t-prose" style={{ marginTop: 16 }}>
        <strong>Three things ruled out:</strong> (1) encoder starvation — z_std&thinsp;&gt;&thinsp;0, the LSTM is producing signal; (2) latent capacity — dim 128 collapses identically to 64; (3) CTDE injection. <strong>One thing confirmed:</strong> the standard β-VAE objective collapses under this regime. The KL term regularizes the posterior to the prior faster than the reconstruction gradient can overcome it, even at β&thinsp;=&thinsp;0.1.
      </p>

      <p className="t-prose">
        <strong>The fix: de-VAE the BIE.</strong> Replace the variational bottleneck with a plain deterministic encoder→decoder (no reparameterization, no KL term, no β). The decoder is forced to actually use the bottleneck. If recon loss drops, the VAE was the problem; if it stays flat, the bottleneck itself lacks position information.<span className="t-fnref">⁵</span>
      </p>

      <SectionRule />

      {/* ── Representation Drift & Training Bugs ────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 10</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Representation drift &amp; training pipeline fixes</h2>

      <p className="t-prose">
        The BIE wasn&rsquo;t drifting — it never formed a representation in the first place. Belief loss was flat at 88–89% of max entropy for 1000 episodes. Three gradient-flow bugs were found and fixed:
      </p>

      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 13,
        background: "var(--paper-2)", padding: "14px 16px",
        borderRadius: "var(--r-2)", boxShadow: "inset 0 0 0 1px var(--rule)",
        margin: "16px 0", lineHeight: 1.7,
      }}>
        <div><span style={{ color: "var(--clay)" }}>Bug 1.</span> compute_loss called with batch_size=1 per backward pass (~128× too small)</div>
        <div><span style={{ color: "var(--clay)" }}>Bug 2.</span> true_positions broadcast across batch — correct for N=1, wrong for N&gt;1</div>
        <div><span style={{ color: "var(--clay)" }}>Bug 3.</span> store_transition hardcoded cost=1.0 instead of actual SSP per-step cost</div>
      </div>

      <p className="t-prose">
        Additional fixes: the reservoir buffer&rsquo;s silent fallback (re-enabling stale entries when fresh entries were scarce — root cause of RegLoss spikes) was replaced with a sliding-window buffer. The KL beta annealing schedule was accelerated from ep/500 to ep/200. And an obs_to_dict bug was discovered: B-SRM-CHFA had <em>never</em> received its true absolute position during training — it was being passed the FOV center (r,&thinsp;r) instead.
      </p>

      <SectionRule />

      {/* ── Paper Formulation ──────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 11</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Paper formulation: Sections 2–4</h2>

      <p className="t-prose">
        The formal front-end went through four review cycles with Prof. Gupta. Key decisions that resolved the docx&rsquo;s contradictions:
      </p>

      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 13,
        background: "var(--paper-2)", padding: "14px 16px",
        borderRadius: "var(--r-2)", boxShadow: "inset 0 0 0 1px var(--rule)",
        margin: "16px 0", lineHeight: 1.7,
      }}>
        <div><span style={{ color: "var(--clay)" }}>Grid:</span> strictly square W×W, obstacle-free (purge all W×H generality)</div>
        <div><span style={{ color: "var(--clay)" }}>Game:</span> EFG object + fixed-evader best-response value (kill symmetric Nash)</div>
        <div><span style={{ color: "var(--clay)" }}>Team:</span> centralized player (full internal state-sharing, joint action ∈ 𝒜^Np)</div>
        <div><span style={{ color: "var(--clay)" }}>NRM:</span> belief-only input (ℝ⁶⁹), z_t excluded — posterior collapse fix reframed as feature</div>
        <div><span style={{ color: "var(--clay)" }}>Value:</span> capture rate is THE value; time-penalty is training-only</div>
        <div><span style={{ color: "var(--clay)" }}>Hitting time:</span> corrected from Θ(W² log W) to Θ(W²) — single-target, not cover time</div>
      </div>

      <p className="t-prose">
        Theorem 1 consolidates the three-term exploitability bound — CFR convergence + NRM approximation error + representation drift — into one numbered theorem with explicit assumptions A1–A6 and proof sketch. The deliverable: <code>popeg_sections.tex</code>, 11 pages, 0 undefined references, internally consistent notation with all symbol collisions resolved (G→Γ, δ→ρ, K→K_mem, K→C_ch).
      </p>

      <SectionRule />

      {/* ── Scaling & Difficulty ──────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 12</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Scaling &amp; the non-triviality threshold</h2>

      <p className="t-prose">
        The trouble with the standard hardness analysis is that it assumes the evader&rsquo;s random walk mixes at the rate a fair coin would. It does not. On a grid the evader&rsquo;s marginal distribution converges sub-diffusively because the walk is reflected at the boundary and re-encounters its own visited set — the effective mixing time scales like W<sup>1.63</sup> rather than the naive W.
      </p>

      <pre style={{
        fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink)",
        background: "var(--paper-2)", padding: "14px 16px", borderRadius: "var(--r-2)",
        boxShadow: "inset 0 0 0 1px var(--rule)", margin: "16px 0", overflow: "auto",
      }}>
{`# scaling: log T* vs log a
slope_emp  = 1.63        # measured across W ∈ {10..50}
slope_th   = 1.00        # naive diffusion
C_fit      = 27.13       # multiplicative gap
alpha      = 0.04        # difficulty invariant (fixed)
alpha_Tstar = 18.8       # non-triviality threshold`}
      </pre>

      <p className="t-prose">
        The 27× gap is what falls out of integrating this against the value of information at α&thinsp;=&thinsp;0.04. The Poisson approximation predicts the 50% capture crossover at α·T&thinsp;=&thinsp;ln(2)&thinsp;≈&thinsp;0.693; empirically α·T*&thinsp;≈&thinsp;18.8 — the formula gets the scaling right (slope ≈ −1 in log-log) but the constant is wrong because capture is cell-exact and random walk mixing is slower than the i.i.d. assumption.
      </p>

      <SectionRule />

      {/* ── Current Status ──────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 13</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Current status &amp; roadmap</h2>

      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 12,
        background: "var(--paper-2)", padding: "16px 18px",
        borderRadius: "var(--r-2)", boxShadow: "inset 0 0 0 1px var(--rule)",
        margin: "16px 0", lineHeight: 1.9,
        letterSpacing: "0.02em",
      }}>
        <div><span style={{ color: "var(--clay)" }}>■</span> Gate 0 — BIE diagnostic (de-VAE fix pending verification)</div>
        <div><span style={{ color: "var(--clay)" }}>■</span> Capture rule reconciliation (exact co-occupancy everywhere)</div>
        <div><span style={{ color: "var(--clay)" }}>■</span> MAPPO re-run under correct capture semantics</div>
        <div><span style={{ color: "var(--ink-3)" }}>□</span> Tier 1 training: B-SRM-CHFA on 25×25, 35×35, 50×50 (3–5 seeds × 2000 eps)</div>
        <div><span style={{ color: "var(--ink-3)" }}>□</span> B-SRM-CHFA information-regret evaluation (diffuse-band IR &lt; 0.170?)</div>
        <div><span style={{ color: "var(--ink-3)" }}>□</span> Headline table assembly (unified schema → paper table + figure)</div>
        <div><span style={{ color: "var(--ink-3)" }}>□</span> Joint belief tracker for correlated evaders (W^{"{2N_e}"} state space)</div>
      </div>

      <p className="t-prose">
        The canonical reference values are frozen: RW capture rates at 0.607/0.597/0.557 for W=25/35/50 (E2 baseline matrix, first-capture semantics). Three-regime ceiling at 0.770. Threshold constant C&thinsp;=&thinsp;27.13 (the draft&rsquo;s C≈99.7 is wrong). The config registry asserts T&thinsp;=&thinsp;max(W²/3,&thinsp;100), α≈0.04 (50×50 exception at 0.032 whitelisted), exact co-occupancy capture, and first-capture termination.
      </p>

      <SectionRule />

      {/* ── Footnotes ──────────────────────────────────── */}
      <div style={{
        marginTop: 36, padding: "20px 22px",
        background: "var(--paper-2)", borderRadius: "var(--r-2)",
        boxShadow: "inset 0 0 0 1px var(--rule)",
      }}>
        <Eyebrow style={{ marginBottom: 10 }}>Footnotes</Eyebrow>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Footnote n="1">Honestly. The whole interest of partial observability is that you cannot bluff your way through it without a calibrated belief.</Footnote>
          <Footnote n="2">The paper draft (line 966) still described the old [z_t ‖ b_summary ‖ a_onehot] ∈ ℝ²⁹³ formulation. The draft is stale on this — the actual NRM input is 69-dimensional.</Footnote>
          <Footnote n="3">The bearing abstraction was the most principled attempt — encoding octant of centroid-to-peak vector (8 bins). It still got 0 captures because team centroid bearing is a team-level feature, but the action space is per-pursuer. At info set (entropy=3, bearing=East), the easternmost pursuer should STAY while the westernmost moves East — CFR must produce one joint strategy for both.</Footnote>
          <Footnote n="4">Regime-conditioned analysis: diffuse IR drops from 0.424 to 0.170 as H_hi rises 5.0 → 8.0. Concentrated IR varies by only 0.024 across the full 4×4 grid. The entire 0.33 capture-rate gap when H_hi falls from 8.0 to 5.0 corresponds to a 0.254-bit increase in diffuse-band IR.</Footnote>
          <Footnote n="5">VAE opponent modeling approach inspired by Papoudakis &amp; Albrecht (2020), &ldquo;Variational Autoencoders for Opponent Modeling in Multi-Agent Systems.&rdquo;</Footnote>
        </div>
      </div>
    </article>
  );
}
