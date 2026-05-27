"use client";
import React from 'react';
import { Card, SectionHead, Eyebrow, StatBlock, Tag, ArrowRight, StatRow, ProjectCard, QuantBook, Footnote } from "@/components/Primitives";
/* HomePage.jsx — landing page */

function HomePage({ onNavigate }) {
  return (
    <div>
      {/* Hero — grid bg + serif headline + sans bio */}
      <section className="grid-bg" style={{ borderBottom: "1px solid var(--rule)" }}>
        <div className="container" style={{ padding: "80px var(--s-7) 96px" }}>
          <Eyebrow section="01">Index · 2026</Eyebrow>
          <h1 className="t-display" style={{ marginTop: 18, maxWidth: 980 }}>
            Math, code, and the occasional <em style={{ fontStyle: "italic" }}>winning</em><span className="t-fnref">¹</span> shot.
          </h1>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            marginTop: 56,
            maxWidth: 1080,
          }}>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.6, margin: 0, color: "var(--ink-2)" }}>
              I'm an undergraduate at <a href="#">Ashoka</a> reading mathematics and computer science. My work sits where probability, search, and reinforcement learning overlap — most recently on belief-state agents for pursuit-evasion, and an ATP match-outcome model that holds <em>93.26%</em> accuracy on 12,018 unseen matches.
            </p>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.6, margin: 0, color: "var(--ink-2)" }}>
              Before all of this I was a tennis player — ranked first in India in the AITA u-14/u-16 draws, semifinalist at the Junior Australian Open. The court is where I learned what serious practice feels like. Mostly the rest is the same exercise on different terrain.
            </p>
          </div>
        </div>
      </section>

      {/* Stat row — the receipts */}
      <section className="container" style={{ padding: "56px var(--s-7) 0" }}>
        <Eyebrow section="02" style={{ marginBottom: 18 }}>Receipts</Eyebrow>
        <StatRow>
          <StatBlock num="#1" label="AITA u-14 / u-16" footnote="Ranked first, singles, India." />
          <StatBlock num="SF" label="Junior Aus. Open" footnote="Semifinals, Melbourne." />
          <StatBlock num="3,000" unit="/152k" label="Int'l Quant Champ. — S1" footnote="Top 2% of the global field." />
          <StatBlock num="83.6" unit="%" label="ICWSM · NLP" footnote="Multilingual sentiment, 7.1M tweets." />
        </StatRow>
      </section>

      {/* Quant championship — strategy book, full width */}
      <section className="container" style={{ padding: "56px var(--s-7) 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
          <Eyebrow section="03">Quant championship · alphas</Eyebrow>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em" }}>
            stage 1 · 152k entrants
          </span>
        </div>
        <QuantBook/>
        <p className="t-caption" style={{ marginTop: 10 }}>
          Three of my submitted alphas, with the panel metrics from the BRAIN platform.
        </p>
      </section>

      {/* Research, in progress — two items side by side */}
      <section className="container" style={{ padding: "72px var(--s-7) 0" }}>
        <Eyebrow section="04" style={{ marginBottom: 18 }}>Research, in progress</Eyebrow>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 8 }}>
              w/ Prof. Debayan Gupta &nbsp;·&nbsp; Ashoka
            </div>
            <h2 style={{ fontSize: 28, marginBottom: 14 }}>
              Belief-state RL under an information-theoretic difficulty invariant.
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6, margin: 0 }}>
              A multi-module belief-state architecture for partially-observable pursuit-evasion games, trained via equilibrium-oriented self-play under fixed α = 0.04. The slope of log T<sup>*</sup> against log a is 1.63 — the textbook approximation underestimates difficulty by ~27×.<span className="t-fnref">²</span>
            </p>
            <button onClick={() => onNavigate("research")} style={{
              marginTop: 18, padding: "8px 14px", borderRadius: "var(--r-2)",
              background: "var(--ink)", color: "var(--paper)", border: 0,
              fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, cursor: "pointer",
            }}>
              Read the note &nbsp;→
            </button>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 8 }}>
              w/ Prof. Anirban Sen &nbsp;·&nbsp; Ashoka &nbsp;·&nbsp; <span style={{ color: "var(--clay)" }}>submitted to ICWSM '26</span>
            </div>
            <h2 style={{ fontSize: 28, marginBottom: 14 }}>
              Sentiment & stance on 7.1M multilingual Indian political tweets.
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6, margin: 0 }}>
              Benchmarked XLM-RoBERTa, DistilBERT, and a small clutch of LLMs for sentiment classification — <em>83.6%</em> across all categories. Keyword extraction, text normalization, translational drift, and polarity analysis on a corpus with a mean polarity of 0.06.
            </p>

          </div>
        </div>
      </section>

      {/* Project teaser — 3 cards */}
      <section className="container" style={{ padding: "72px var(--s-7) 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
          <Eyebrow section="05">Selected work</Eyebrow>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("work"); }} style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ink-2)" }}>
            see all 8 →
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <ProjectCard
            num="04"
            date="FEB — MAY 2025"
            title="turnsports.ai"
            desc="ATP match-outcome predictor. 93.26% test accuracy on 12,018 unseen matches; custom TennisElo with surface-specific K-factors. Production Node + React, 150 ms / 2,000 QPS."
            tags={["tennis", "ml", "full-stack"]}
          />
          <ProjectCard
            num="08"
            date="DEC 2025 — PRESENT"
            title="h-ShARC"
            desc="Novel HCARP-DS under compound distribution shifts. Shift-conditioned transformer decoder + CVaR-REINFORCE with within-tail advantage norm. 14% lower CVaR₀.₁ tail risk at 6% mean makespan overhead."
            tags={["research", "rl", "transformer"]}
          />
          <ProjectCard
            num="03"
            date="OCT 2025 — JAN 2026"
            title="Order matching engine"
            desc="Multi-threaded Python OME simulating a 20-security, 200-trader exchange. SkipList price-time priority, FIFO queues, 85% match accuracy."
            tags={["trading", "python", "systems"]}
          />
        </div>
      </section>

      {/* Footnotes */}
      <section className="container" style={{ padding: "72px var(--s-7) 24px" }}>
        <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 18, display: "flex", flexDirection: "column", gap: 8, maxWidth: 720 }}>
          <Footnote n="1">Winning is a strong word. The model is wrong 6.74% of the time, and on grass it is wrong more.</Footnote>
          <Footnote n="2">Sub-diffusive random walk mixing on grids W ∈ {"{10, 15, 20, 25, 35, 50}"}; fitted C = 27.13.</Footnote>
        </div>
      </section>
    </div>
  );
}



export default HomePage;
