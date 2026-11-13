"use client";
import React from 'react';
import { Card, SectionHead, Eyebrow, StatBlock, Tag, ArrowRight, StatRow, ProjectCard, QuantBook, Footnote } from "@/components/Primitives";
/* WorkPage.jsx — projects index */

const LINKEDIN_EXPERIENCE = "https://www.linkedin.com/in/agriya-yadav/details/experience/";

const WORK_ITEMS = [
  { num: "14", date: "ASHOKA UNIVERSITY", title: "Teaching assistant · Machine Learning",
    desc: "Teaching assistant for the Machine Learning course at Ashoka University.",
    href: LINKEDIN_EXPERIENCE,
    tags: ["teaching"], cat: "Teaching" },
  { num: "13", date: "SEP 2026", title: "TaskBound — a prompt-injection defense for AgentDojo",
    desc: "A deterministic authorization gate at the tool-execution boundary. Every proposed call is checked against an authority envelope derived from the user's task: action, destination, resource, data, delegation, scope. Benchmark attack success 6/12 → 0/12 on the development set with no benign regressions; attacked utility 4/12 → 9/12 on the sealed run.",
    href: "/work/taskbound",
    tags: ["ai security", "agents", "evaluation"], cat: "Research" },
  { num: "12", date: "MAY — JUN 2026", title: "Wipro · AI intern",
    desc: "Applied AI work over the summer, in Gurgaon.",
    href: LINKEDIN_EXPERIENCE,
    tags: ["software", "ai"], cat: "Software" },
  { num: "11", date: "2026 — PRESENT", title: "Coordination-collapse boundaries in MARL",
    desc: "A confidence-intervalled protocol for locating where reward-mixed cooperative teams cross into lazy-agent collapse. w_crit = 0.666 [0.635, 0.694] on a six-node supply chain; loss aversion moves the boundary right, value curvature left. Four environment-algorithm combinations. Submitted, TMLR.",
    href: "/research/coordination-collapse",
    tags: ["marl", "reward design", "research"], cat: "Research" },
  { num: "10", date: "2026 — PRESENT", title: "Prospect-theoretic gradient dynamics",
    desc: "Probability weighting traps risk-sensitive learners in multi-agent settings. Exact scalar reduction of interior stationarity under general weighting, plus a loss-aversion-induced saddle-node at λ = (5 − 1/√3)/2. An 80-digit inverse-S Prelec sweep finds the mechanism at every sampled exponent. Submitted, AAMAS 2027.",
    href: "/research/cpt-gradient-dynamics",
    tags: ["theory", "game theory", "research"], cat: "Research" },
  { num: "09", date: "2026 — PRESENT", title: "When more accurate shared beliefs hurt",
    desc: "Multi-agent stochastic particle systems. Exact decomposition of unique capture into opportunity minus redundancy, and a four-collector construction where pooling strictly lowers angular MSE while reversing capture advantage. Submitted, TMLR.",
    href: "/research/shared-beliefs",
    tags: ["theory", "multi-agent", "research"], cat: "Research" },
  { num: "08", date: "DEC 2025 — PRESENT", title: "h-ShARC",
    desc: "Novel HCARP-DS problem under compound distribution shifts (demand, traversal cost, service availability) with a shift-conditioned transformer decoder and CVaR-REINFORCE with within-tail advantage normalization. 14% lower CVaR₀.₁ tail-risk across shift severities φ ∈ [0,1] at 6% mean makespan overhead.",
    href: "/work/h-sharc",
    tags: ["research", "rl", "transformer"], cat: "Research" },
  { num: "07", date: "APR 2026 — PRESENT", title: "POPEG — when does partial observability bind?",
    desc: "A controlled pursuit-evasion benchmark and policy-class audit. Three-level policy ladder (zero-information, posterior-free, privileged) certifies when hidden state is actually binding; a seen→contact→capture funnel localizes where learned policies fail. 0.686 best posterior-free vs 0.993 privileged at the canonical point. Submitted, AAMAS 2027.",
    href: "/research/popeg",
    tags: ["benchmark", "marl", "research"], cat: "Research" },
  { num: "06", date: "SEP 2025 — JAN 2026", title: "Political partisanship in Indian influencer discourse",
    desc: "7.1M retweets of 960 Indian influencers by politicians, 2020–2023, in English and Hindi. Retweet-based polarity scores, KeyBERT aspect extraction, and a LoRA-tuned Mistral-7B stance classifier at 77.5% accuracy against 52–58% for BERT, RoBERTa and PyABSA. Political alignment predicts stance on 30 of 35 aspects. Submitted to CSCW.",
    href: "/work/influencer-partisanship",
    tags: ["nlp", "research", "CSCW"], cat: "Research" },
  { num: "05", date: "MAY — JUL 2025", title: "Austere · ML SDE intern",
    desc: "Supervised fuzzy-matching pipeline cutting query mismatches by 68% across 5 enterprise MySQL deployments. Hybrid OCR (PyMuPDF + OpenCV + Cascade TabNet + Tesseract) for the Anti-Corruption Bureau. Fine-tuned Mistral-7B (PEFT-LoRA + 4-bit) on A100 SXM.",
    href: LINKEDIN_EXPERIENCE,
    tags: ["software", "ocr", "llm"], cat: "Software" },
  { num: "04", date: "FEB — MAY 2025", title: "turnsports.ai",
    desc: "ATP match-outcome predictor. 93.26% test accuracy on 12,018 unseen matches; custom TennisElo with surface-specific K-factors. Production Node + React, MySQL-indexed, 120k+ precomputed predictions, 150 ms p50 / 2,000 QPS simulated load.",
    href: "/work/turnsports",
    tags: ["tennis", "ml", "full-stack"], cat: "Sport" },
  { num: "03", date: "OCT 2025 — JAN 2026", title: "Order matching engine",
    desc: "Multi-threaded Python OME simulating a 20-security, 200-trader stock exchange. SkipList-based price-time priority + FIFO queues. 85% match accuracy, 15% fewer unmatched trades. TradingView chart API.",
    href: "/work/order-matching-engine",
    tags: ["trading", "python", "systems"], cat: "Trading" },
  { num: "02", date: "JUL 2020 — PRESENT", title: "eCPPL — extending CPP to logistics",
    desc: "Hybrid GNN + RL layer over classical CPP solvers. Three variants (CPP-LC, CPP-TW, k-CPP), masked-action PPO + feasibility checks, validated on graphs up to 500 nodes / 1,000 edges. Benchmarking suite across grid, random-geometric, clustered, OSM-derived.",
    href: "https://github.com/PuffBear/extending-cpp-routing",
    tags: ["rl", "research", "open-source"], cat: "Research" },
  { num: "01", date: "2023 — PRESENT", title: "Quant championship · Stage 1",
    desc: "Placed 3,000 / 152,000 in the International Quant Championship Stage 1. Top 2% of the global field. Carry-over learnings into the order-matching engine and trading book.",
    tags: ["trading", "competition"], cat: "Trading" },
];

function WorkPage() {
  const [filter, setFilter] = React.useState("All");
  const cats = ["All", "Research", "Software", "Teaching", "Sport", "Trading"];
  const items = filter === "All" ? WORK_ITEMS : WORK_ITEMS.filter(i => i.cat === filter);

  return (
    <div>
      <section className="container" style={{ padding: "64px var(--s-7) 32px" }}>
        <Eyebrow section="01">Work · 2020 → 2027</Eyebrow>
        <h1 style={{ marginTop: 14, marginBottom: 16 }}>
          Research, projects, and a few jobs.
        </h1>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.6, margin: 0, color: "var(--ink-2)", maxWidth: 720 }}>
          Papers under review, ML systems, and trading experiments, alongside two internships and a teaching assistantship. A couple of the projects were shipped to real users; most were shipped to me. I keep a numerical record so I can tell when I&rsquo;m fooling myself.
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
