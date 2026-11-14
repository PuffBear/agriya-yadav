/* papers.js — single source of truth for the research index.
   Detail pages live at /research/<slug>. Figures, where present, are under
   /public/research/figures. Keep headline numbers here identical to the
   numbers on the detail pages. */

export const PAPERS = [
  {
    slug: "popeg",
    num: "01",
    title: "POPEG: Selecting pursuit tasks and characterizing controller failures",
    subtitle: "A controlled pursuit–evasion benchmark, a joint reference map, and event diagnostics",
    venue: "AAMAS 2027",
    status: "submitted",
    year: "2027",
    collab: "w/ Prof. Debayan Gupta · Ashoka",
    tags: ["benchmark", "marl", "partial observability"],
    teaser:
      "A high capture rate can mean reasoning about a hidden evader or just sweeping the arena. POPEG maps 60 conditions to show where coverage alone succeeds, and records seen → contact → capture to show where learned controllers fail.",
    headline: [
      { k: "68.2%", v: "best baseline capture" },
      { k: "99.25%", v: "privileged reference" },
      { k: "7–13%", v: "learned capture after contact" },
    ],
    hasDetail: true,
  },
  {
    slug: "coordination-collapse",
    num: "02",
    title: "Measuring coordination-collapse boundaries in reward-mixed cooperative MARL",
    subtitle: "A confidence-intervalled instrument for locating lazy-agent failure",
    venue: "TMLR",
    status: "submitted",
    year: "2026",
    collab: "",
    tags: ["marl", "reward design", "prospect theory"],
    teaser:
      "Reward centralization is usually treated as a direction — more team signal helps. It also has a measurable location. We sweep the local-to-team reward mixture w, fit P(collapse | w), and report the midpoint with bootstrap CIs.",
    headline: [
      { k: "0.666", v: "w_crit [0.635, 0.694]" },
      { k: "+0.269", v: "loss-aversion shift" },
      { k: "4", v: "env–algorithm pairs" },
    ],
    hasDetail: true,
  },
  {
    slug: "cpt-gradient-dynamics",
    num: "03",
    title: "Probability weighting traps risk-sensitive learners in multi-agent coordination",
    subtitle: "A stable coordination failure created by prospect-theoretic preferences",
    venue: "AAMAS 2027",
    status: "submitted",
    year: "2027",
    collab: "",
    tags: ["theory", "game theory", "dynamical systems"],
    teaser:
      "Expected-reward learners coordinate from almost every start. Learners with prospect-theoretic preferences can get stuck randomising forever — a trap caused by probability weighting, not loss aversion, that exists under power weighting exactly when γ < 1/n.",
    headline: [
      { k: "2.2113", v: "λ_SN saddle-node" },
      { k: "γ < 1/n", v: "exact existence law" },
      { k: "418/800", v: "starts trapped at λ = 2.3" },
    ],
    hasDetail: true,
  },
  {
    slug: "shared-beliefs",
    num: "04",
    title: "When more accurate shared beliefs hurt",
    subtitle: "Memory, diversity, and multi-agent capture geometry",
    venue: "TMLR",
    status: "submitted",
    year: "2026",
    collab: "",
    tags: ["theory", "multi-agent", "particle systems"],
    teaser:
      "Pooling noisy observations improves estimation precision, but agreement also changes how a team explores. An exact four-collector construction shows a team can hold a strictly more accurate shared belief and collect strictly less.",
    headline: [
      { k: "6/16", v: "shared, fresh" },
      { k: "15/16", v: "independent, stale" },
      { k: "11/12", v: "cells, lower shared MSE" },
    ],
    hasDetail: true,
  },
];

export function getPaper(slug) {
  return PAPERS.find((p) => p.slug === slug);
}
