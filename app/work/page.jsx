"use client";
import React from 'react';
import { Card, SectionHead, Eyebrow, StatBlock, Tag, ArrowRight, StatRow, ProjectCard, QuantBook, Footnote } from "@/components/Primitives";
/* WorkPage.jsx — projects index */

const WORK_ITEMS = [
  { num: "12", date: "MAY — JUN 2026", title: "Wipro · AI intern",
    desc: "Applied AI work over the summer, in Gurgaon.",
    tags: ["software", "ai"], cat: "Software" },
  { num: "11", date: "2026 — PRESENT", title: "Coordination-collapse boundaries in MARL",
    desc: "A confidence-intervalled protocol for locating where reward-mixed cooperative teams cross into lazy-agent collapse. w_crit = 0.666 [0.635, 0.694] on a six-node supply chain; loss aversion moves the boundary right, value curvature left. Four environment-algorithm combinations. Under review, AAAI.",
    tags: ["marl", "reward design", "research"], cat: "Research" },
  { num: "10", date: "2026 — PRESENT", title: "Prospect-theoretic gradient dynamics",
    desc: "Probability weighting traps risk-sensitive learners in multi-agent settings. Exact scalar reduction of interior stationarity under general weighting, plus a loss-aversion-induced saddle-node at λ = (5 − 1/√3)/2. An 80-digit inverse-S Prelec sweep finds the mechanism at every sampled exponent. Submitted, AAMAS 2027.",
    tags: ["theory", "game theory", "research"], cat: "Research" },
  { num: "09", date: "2026 — PRESENT", title: "When more accurate shared beliefs hurt",
    desc: "Multi-agent stochastic particle systems. Exact decomposition of unique capture into opportunity minus redundancy, and a four-collector construction where pooling strictly lowers angular MSE while reversing capture advantage. Submitted, AAMAS 2027.",
    tags: ["theory", "multi-agent", "research"], cat: "Research" },
  { num: "08", date: "DEC 2025 — PRESENT", title: "h-ShARC",
    desc: "Novel HCARP-DS problem under compound distribution shifts (demand, traversal cost, service availability) with a shift-conditioned transformer decoder and CVaR-REINFORCE with within-tail advantage normalization. 14% lower CVaR₀.₁ tail-risk across shift severities φ ∈ [0,1] at 6% mean makespan overhead.",
    tags: ["research", "rl", "transformer"], cat: "Research" },
  { num: "07", date: "APR 2026 — PRESENT", title: "POPEG — when does partial observability bind?",
    desc: "A controlled pursuit-evasion benchmark and policy-class audit. Three-level policy ladder (zero-information, posterior-free, privileged) certifies when hidden state is actually binding; a seen→contact→capture funnel localizes where learned policies fail. 0.686 best posterior-free vs 0.993 privileged at the canonical point. Under review, AAAI.",
    tags: ["benchmark", "marl", "research"], cat: "Research" },
  { num: "06", date: "SEP 2025 — JAN 2026", title: "Multilingual political-tweet sentiment",
    desc: "EDA on 7.1M multilingual Indian political tweets. Benchmarked LLMs, XLM-RoBERTa, DistilBERT — up to 83.6% accuracy across categories. Keyword extraction, normalization, translational drift, polarity (mean 0.06). Submitted to ICWSM '26.",
    tags: ["nlp", "research", "ICWSM '26"], cat: "Research" },
  { num: "05", date: "MAY — JUL 2025", title: "Austere · ML SDE intern",
    desc: "Supervised fuzzy-matching pipeline cutting query mismatches by 68% across 5 enterprise MySQL deployments. Hybrid OCR (PyMuPDF + OpenCV + Cascade TabNet + Tesseract) for the Anti-Corruption Bureau. Fine-tuned Mistral-7B (PEFT-LoRA + 4-bit) on A100 SXM.",
    tags: ["software", "ocr", "llm"], cat: "Software" },
  { num: "04", date: "FEB — MAY 2025", title: "turnsports.ai",
    desc: "ATP match-outcome predictor. 93.26% test accuracy on 12,018 unseen matches; custom TennisElo with surface-specific K-factors. Production Node + React, MySQL-indexed, 120k+ precomputed predictions, 150 ms p50 / 2,000 QPS simulated load.",
    tags: ["tennis", "ml", "full-stack"], cat: "Sport" },
  { num: "03", date: "OCT 2025 — JAN 2026", title: "Order matching engine",
    desc: "Multi-threaded Python OME simulating a 20-security, 200-trader stock exchange. SkipList-based price-time priority + FIFO queues. 85% match accuracy, 15% fewer unmatched trades. TradingView chart API.",
    tags: ["trading", "python", "systems"], cat: "Trading" },
  { num: "02", date: "JUL 2020 — PRESENT", title: "eCPPL — extending CPP to logistics",
    desc: "Hybrid GNN + RL layer over classical CPP solvers. Three variants (CPP-LC, CPP-TW, k-CPP), masked-action PPO + feasibility checks, validated on graphs up to 500 nodes / 1,000 edges. Benchmarking suite across grid, random-geometric, clustered, OSM-derived.",
    tags: ["rl", "research", "open-source"], cat: "Research" },
  { num: "01", date: "2023 — PRESENT", title: "Quant championship · Stage 1",
    desc: "Placed 3,000 / 152,000 in the International Quant Championship Stage 1. Top 2% of the global field. Carry-over learnings into the order-matching engine and trading book.",
    tags: ["trading", "competition"], cat: "Trading" },
];

function WorkPage() {
  const [filter, setFilter] = React.useState("All");
  const cats = ["All", "Research", "Software", "Sport", "Trading"];
  const items = filter === "All" ? WORK_ITEMS : WORK_ITEMS.filter(i => i.cat === filter);

  return (
    <div>
      <section className="container" style={{ padding: "64px var(--s-7) 32px" }}>
        <Eyebrow section="01">Work · 2020 → 2027</Eyebrow>
        <h1 style={{ marginTop: 14, marginBottom: 16 }}>
          Twelve projects, give or take.
        </h1>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.6, margin: 0, color: "var(--ink-2)", maxWidth: 720 }}>
          Most of these are research notes, ML systems, or trading experiments. A couple were shipped to real users; most were shipped to me. I keep a numerical record so I can tell when I'm fooling myself.
        </p>
      </section>

      <section className="container" style={{ padding: "0 var(--s-7) 16px" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "16px 0", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", marginBottom: 24 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", marginRight: 8 }}>Filter</span>
          {cats.map(c => {
            const on = filter === c;
            const count = c === "All" ? WORK_ITEMS.length : WORK_ITEMS.filter(i => i.cat === c).length;
            return (
              <button key={c} onClick={() => setFilter(c)} style={{
                fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500,
                padding: "5px 10px", borderRadius: "var(--r-1)",
                background: on ? "var(--ink)" : "var(--paper)",
                color: on ? "var(--paper)" : "var(--ink-2)",
                boxShadow: on ? "none" : "inset 0 0 0 1px var(--rule)",
                border: 0, cursor: "pointer",
              }}>{c} · {count}</button>
            );
          })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {items.map(it => (
            <ProjectCard key={it.num} {...it}/>
          ))}
        </div>
      </section>
    </div>
  );
}



export default WorkPage;
