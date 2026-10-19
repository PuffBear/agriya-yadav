"use client";
import React from 'react';
import InfoGainAnimation from "@/components/InfoGainAnimation";
import {
  FigureBlock, TerminalBlock, SectionRule, PaperHeader, ReviewNotice,
  RequestFullWriteup,
} from "@/components/Paper";

export default function PopegPage() {
  return (
    <article className="container-prose" style={{ padding: "48px var(--s-7) 32px" }}>

      <PaperHeader
        eyebrow="01"
        venue="AAAI"
        status="under review"
        year="2026"
        title="When does partial observability bind in pursuit–evasion? The POPEG benchmark and a policy-class audit."
        authors={["A. YADAV", "w/ Prof. D. GUPTA", "ASHOKA UNIV."]}
        abstract={<>
          Partial observability is common in multi-agent reinforcement learning, but it is
          not always the source of task difficulty: structured coverage may succeed without
          estimating hidden state. We ask when partial observability becomes <em>binding</em> —
          when structured posterior-free policies fail while privileged state information
          remains useful. We introduce POPEG, a controlled pursuit–evasion benchmark, and
          audit random pursuit, posterior-free strategies, a belief-using controller, and a
          privileged full-observability reference. Against a random-walk evader, structured
          coverage closes the observability gap, indicating only apparent hardness. Against
          an evasive evader, the strongest audited posterior-free policy captures 68.6% of
          episodes versus 99.3% for the privileged reference, and the gap grows with grid
          size under fixed sensing. A belief-using three-regime controller reaches 71.5%
          under the same local observations, a statistically significant margin at the
          canonical grid size, but this advantage does not persist at larger fixed-sensor
          grids. A seen–contact–capture diagnostic localizes the failure.
        </>}
      />

      <p className="t-prose">
        The premise most pursuit benchmarks quietly assume is that if a task is partially
        observable and a method does well on it, the method must be reasoning about hidden
        state. That does not follow. A lawnmower sweep estimates nothing at all and still
        captures a random-walk evader every single time. So a high capture rate is not, by
        itself, evidence of anything interesting — which is what the benchmark is built to
        measure.
      </p>

      <SectionRule />

      {/* ── headline result ──────────────────────────────────── */}

      <TerminalBlock title="The value ladder at the canonical point" subtitle="W=25 · r=2 · 2000 episodes/cell">
        {(() => {
          const grid = "1.6fr 90px 1fr";
          const rows = [
            ["P_RW — random walk",            "0.000", "zero-information anchor"],
            ["P⁵ — stride-tuned sweep",       "0.686", "best posterior-free"],
            ["three-regime hybrid",           "0.7147", "belief-using control"],
            ["P_FO — full observability",     "0.993", "privileged reference"],
          ];
          return (
            <>
              <div style={{
                display: "grid", gridTemplateColumns: grid, gap: 8,
                color: "#8A8275", fontSize: 10, letterSpacing: "0.14em",
                textTransform: "uppercase", paddingBottom: 6,
              }}>
                <span>pursuer</span>
                <span style={{ textAlign: "right" }}>capture</span>
                <span style={{ textAlign: "right" }}>information regime</span>
              </div>
              {rows.map(([m, v, note]) => (
                <div key={m} style={{
                  display: "grid", gridTemplateColumns: grid, gap: 8,
                  fontVariantNumeric: "tabular-nums", alignItems: "baseline",
                }}>
                  <span style={{ color: m.startsWith("three") ? "#F4EEE2" : "#8A8275" }}>{m}</span>
                  <span style={{
                    textAlign: "right",
                    color: parseFloat(v) >= 0.68 ? "#6FBF73" : "#D85A4A",
                  }}>{v}</span>
                  <span style={{ textAlign: "right", color: "#8A8275", fontSize: 10 }}>{note}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, fontSize: 10, color: "#8A8275", letterSpacing: "0.06em" }}>
                Δ_priv = 0.307, and it grows with scale under a fixed sensor: 0.307, 0.404, 0.476 at W = 25, 35, 50
              </div>
            </>
          );
        })()}
      </TerminalBlock>

      <p className="t-prose">
        Against a random-walk evader every audited posterior-free policy closes most of the
        gap — this regime is only <em>apparently</em> hard. Against a lightly randomized
        evasive evader, random walk captures nothing and every posterior-free policy falls
        well short of the privileged reference. That is the regime the benchmark certifies
        as strategically hard, and it deepens rather than eases as the grid grows under a
        fixed physical sensor.
      </p>

      <p className="t-prose">
        Across five representative MARL architectures trained at the canonical point, none
        comes within an order of magnitude of the engineered controller against the evasive
        evader. The seen → contact → capture funnel localizes where they fail, and it is
        not only search.
      </p>

      <InfoGainAnimation />

      <FigureBlock
        src="/research/figures/info_gain_canonical.png"
        alt="Mean summed entropy, chosen joint info gain, mean info regret, and capture rate on the canonical W=25 grid"
        caption="Information efficiency on the canonical 25×25 grid, across the random walk, greedy-visible, coverage sweep, last-seen and full-observability baselines."
      />

      <FigureBlock
        src="/research/figures/three_regime_sweep.png"
        alt="Heatmap of capture rate and information regret over a grid of entropy thresholds"
        caption="Three-regime threshold sweep. The high entropy threshold governs the transition from pure sweep into belief-driven pursuit and dominates the performance surface; the low threshold barely matters."
      />

      <FigureBlock
        src="/research/figures/regime_conditioned_ir.png"
        alt="Regime-conditioned information regret split by diffuse and concentrated belief bands"
        caption="Regime-conditioned analysis. Information regret falls sharply in the diffuse band as the sweep threshold rises, while the concentrated band stays essentially flat — the whole performance gap lives in diffuse-belief steps."
      />

      <RequestFullWriteup
        paper="POPEG: when does partial observability bind in pursuit-evasion?"
        covers={[
          "The benchmark: first-capture termination, the two scaling protocols, and the belief-sufficiency proposition",
          "The full eight-class policy ladder and the strategic-hardness certification test",
          "The fixed-sensor baseline matrix across W = 25, 35, 50 against both evaders",
          "The architecture sweep: MAPPO, R-MAPPO, QMIX, MAT, MAVEN, plus oracle-belief and shaping controls",
          "The seen → contact → capture funnel, and the per-paradigm failure mechanisms behind it",
          "Limitations, including the controller's own scale-limited advantage",
        ]}
      />

      <ReviewNotice>
        Under double-blind review, so the manuscript itself stays off the site for now.
      </ReviewNotice>
    </article>
  );
}
