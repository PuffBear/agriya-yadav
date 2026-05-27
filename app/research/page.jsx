"use client";
import React from 'react';
import { Card, SectionHead, Eyebrow, StatBlock, Tag, ArrowRight, StatRow, ProjectCard, QuantBook, Footnote } from "@/components/Primitives";
/* ResearchPage.jsx — long-form research note, paper style */

function ResearchPage() {
  return (
    <article className="container-prose" style={{ padding: "64px var(--s-7) 32px" }}>
      <Eyebrow section="04">Research note · draft 0.3</Eyebrow>
      <h1 style={{ marginTop: 14, marginBottom: 16 }}>
        Strategic hardness of adversarial pursuit-evasion under a fixed difficulty invariant.
      </h1>

      <div style={{
        display: "flex", gap: 16, alignItems: "baseline",
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

      <p style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontStyle: "italic", color: "var(--ink-2)", lineHeight: 1.65, marginBottom: 28 }}>
        Abstract. We design a multi-module belief-state RL architecture for partially-observable pursuit-evasion games on grids of width W ∈ {"{10, 15, 20, 25, 35, 50}"}, trained via equilibrium-oriented self-play under a fixed information-theoretic difficulty invariant α = 0.04. The empirical non-triviality threshold is α · T* = 18.8 with fitted constant C = 27.13 — the textbook approximation underestimates difficulty by roughly 27× due to sub-diffusive random walk mixing. Empirical scaling (slope log T* vs log a = 1.63) departs substantially from the theoretical 1.0.
      </p>

      <p className="t-prose">
        Pursuit-evasion is a useful sandbox precisely because the agents <em>do not</em> see the full board. The pursuer has to maintain a posterior over the evader's location; the evader has to act adversarially against the pursuer's <em>policy</em>, not its observation. Belief-state RL gives both of them a place to keep that information honestly.<span className="t-fnref">¹</span>
      </p>

      <p className="t-prose">
        The trouble with the standard hardness analysis is that it assumes the evader's random walk mixes at the rate a fair coin would. It does not. On a grid the evader's marginal distribution converges sub-diffusively because the walk is reflected at the boundary and re-encounters its own visited set — the effective mixing time scales like W<sup>1.63</sup> rather than the naive W. The 27× gap is what falls out of integrating this against the value of information at α = 0.04.
      </p>

      <h2 style={{ fontSize: 26, marginTop: 36, marginBottom: 12 }}>Method</h2>
      <p className="t-prose">
        The agent factors into three modules: (i) a <em>belief encoder</em> that maps observation history to a posterior over evader positions; (ii) a <em>contextual history</em> module that summarizes prior trajectories at fixed temporal resolution; and (iii) a policy head trained with equilibrium-oriented self-play. We hold α fixed at 0.04 across runs and vary W to measure scaling.
      </p>

      <pre style={{
        fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink)",
        background: "var(--paper-2)", padding: "14px 16px", borderRadius: "var(--r-2)",
        boxShadow: "inset 0 0 0 1px var(--rule)",
        margin: "16px 0", overflow: "auto",
      }}>
{`# scaling: log T* vs log a
slope_emp  = 1.63        # measured across W ∈ {10..50}
slope_th   = 1.00        # naive diffusion
C_fit      = 27.13       # multiplicative gap
alpha      = 0.04        # difficulty invariant (fixed)
alpha_Tstar = 18.8       # non-triviality threshold`}
      </pre>

      <h2 style={{ fontSize: 26, marginTop: 36, marginBottom: 12 }}>Result</h2>
      <p className="t-prose">
        The pursuer trained with belief-state RL closes the gap predicted by the corrected analysis. The evader's expected-survival curve fits the W<sup>1.63</sup> envelope to within 4% across all W tested. The result is small and specific — that is the point.
      </p>

      <div style={{
        marginTop: 36, padding: "20px 22px",
        background: "var(--paper-2)", borderRadius: "var(--r-2)",
        boxShadow: "inset 0 0 0 1px var(--rule)",
      }}>
        <Eyebrow style={{ marginBottom: 10 }}>Footnotes</Eyebrow>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Footnote n="1">Honestly. The whole interest of partial observability is that you cannot bluff your way through it without a calibrated belief.</Footnote>
          <Footnote n="2">A small note on poker — the same calibration problem appears, with the river replacing the boundary reflection. Different game, same constant up to a factor.</Footnote>
        </div>
      </div>
    </article>
  );
}



export default ResearchPage;
