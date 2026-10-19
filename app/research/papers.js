/* papers.js — single source of truth for the research index.
   Detail pages live at /research/<slug>. Figures, where present, are under
   /public/research/figures. Keep headline numbers here identical to the
   numbers on the detail pages. */

export const PAPERS = [
  {
    slug: "popeg",
    num: "01",
    title: "When does partial observability bind in pursuit–evasion?",
    subtitle: "The POPEG benchmark and a policy-class audit",
    venue: "AAAI",
    status: "under review",
    year: "2026",
    collab: "w/ Prof. Debayan Gupta · Ashoka",
    tags: ["benchmark", "marl", "partial observability"],
    teaser:
      "Partial observability is not always what makes a task hard. POPEG is a controlled grid pursuit benchmark with a three-level policy ladder that says when hidden state actually binds — and a seen→contact→capture funnel that says where learned policies fail.",
    headline: [
      { k: "0.686", v: "best posterior-free" },
      { k: "0.993", v: "privileged reference" },
      { k: "0.7147", v: "belief-using hybrid" },
    ],
    hasDetail: true,
  },
  {
    slug: "coordination-collapse",
    num: "02",
    title: "Measuring coordination-collapse boundaries in reward-mixed cooperative MARL",
    subtitle: "A confidence-intervalled instrument for locating lazy-agent failure",
    venue: "AAAI",
    status: "under review",
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
    title: "Prospect-theoretic gradient dynamics: stability and bifurcations in multi-agent learning",
    subtitle: "Probability weighting traps risk-sensitive learners in multi-agent settings",
    venue: "AAMAS 2027",
    status: "submitted",
    year: "2027",
    collab: "",
    tags: ["theory", "game theory", "dynamical systems"],
    teaser:
      "How do CPT preferences change multi-agent gradient learning? Separating value transformation from nonlinear probability weighting turns out to be decisive: with linear weights no interior equilibrium is stable, and with power weights loss aversion creates one at an exact threshold.",
    headline: [
      { k: "2.2113", v: "λ_SN saddle-node" },
      { k: "42,926", v: "of 45,069 Prelec cells" },
      { k: "80", v: "digit precision sweep" },
    ],
    hasDetail: true,
  },
  {
    slug: "shared-beliefs",
    num: "04",
    title: "When more accurate shared beliefs hurt",
    subtitle: "Memory, diversity, and multi-agent capture geometry",
    venue: "AAMAS 2027",
    status: "submitted",
    year: "2027",
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
