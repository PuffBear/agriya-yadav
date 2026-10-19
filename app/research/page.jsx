"use client";
import React from 'react';
import Link from "next/link";
import { Eyebrow } from "@/components/Primitives";
import { PAPERS } from "./papers";

/* ResearchPage.jsx — index of papers. Detail pages at /research/<slug>. */

function PaperRow({ p }) {
  const [hover, setHover] = React.useState(false);

  return (
    <Link
      href={`/research/${p.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        padding: "28px 0",
        borderBottom: "1px solid var(--rule)",
        transition: "opacity var(--dur-fast) var(--ease-standard)",
      }}
    >
      {/* meta line */}
      <div style={{
        display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap",
        fontFamily: "var(--font-mono)", fontSize: 10,
        letterSpacing: "0.14em", textTransform: "uppercase",
        color: "var(--ink-3)", marginBottom: 10,
      }}>
        <span style={{ color: "var(--clay)" }}>№ {p.num}</span>
        <span>{p.venue}</span>
        <span>·</span>
        <span>{p.status}</span>
        {p.collab ? (<><span>·</span><span>{p.collab}</span></>) : null}
        <span style={{ marginLeft: "auto", color: hover ? "var(--clay)" : "var(--ink-3)" }}>
          read →
        </span>
      </div>

      <h2 style={{
        fontSize: 28, lineHeight: 1.18, margin: "0 0 6px",
        textDecoration: hover ? "underline" : "none",
        textDecorationColor: "var(--clay)",
        textUnderlineOffset: "4px",
      }}>
        {p.title}
      </h2>

      <div style={{
        fontFamily: "var(--font-serif)", fontStyle: "italic",
        fontSize: 15, color: "var(--ink-3)", marginBottom: 12,
      }}>
        {p.subtitle}
      </div>

      <p style={{
        fontFamily: "var(--font-sans)", fontSize: 15,
        color: "var(--ink-2)", lineHeight: 1.6, margin: "0 0 16px",
        maxWidth: 680,
      }}>
        {p.teaser}
      </p>

      {/* headline numbers */}
      <div style={{ display: "flex", gap: 28, flexWrap: "wrap", marginBottom: 12 }}>
        {p.headline.map((h) => (
          <div key={h.v}>
            <div style={{
              fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 500,
              letterSpacing: "-0.01em", lineHeight: 1.1,
              fontVariantNumeric: "tabular-nums lining-nums",
            }}>{h.k}</div>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              letterSpacing: "0.1em", textTransform: "uppercase",
              color: "var(--ink-3)", marginTop: 3,
            }}>{h.v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {p.tags.map((t) => (
          <span key={t} style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: "0.04em", color: "var(--ink-3)",
            padding: "2px 8px", borderRadius: "var(--r-pill)",
            boxShadow: "inset 0 0 0 1px var(--rule)",
          }}>{t}</span>
        ))}
      </div>
    </Link>
  );
}

export default function ResearchPage() {
  return (
    <div>
      <section className="container" style={{ padding: "64px var(--s-7) 24px" }}>
        <Eyebrow section="01">Research · 2026 → 2027</Eyebrow>
        <h1 style={{ marginTop: 14, marginBottom: 16, maxWidth: 900 }}>
          Four papers on what breaks when agents cannot see everything.
        </h1>
        <p style={{
          fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.6,
          margin: 0, color: "var(--ink-2)", maxWidth: 720,
        }}>
          Two measurement papers and two theory papers, all circling the same question
          from different sides: when does an information or incentive structure stop a
          team of learners from doing the obvious thing? I care about where the
          boundary <em>is</em>, with an interval around it — not just which direction
          helps.
        </p>
      </section>

      <section className="container" style={{ padding: "0 var(--s-7) 48px" }}>
        <div style={{ borderTop: "1px solid var(--rule)" }}>
          {PAPERS.map((p) => <PaperRow key={p.slug} p={p} />)}
        </div>

        <p className="t-caption" style={{ marginTop: 24, maxWidth: 680 }}>
          All four are under review or submitted; several are anonymised for
          double-blind review, so these pages give the question, method, and headline
          numbers rather than the manuscripts. Happy to talk about any of them —{" "}
          <a href="mailto:agriya.yadav_ug2023@ashoka.edu.in">get in touch</a>.
        </p>
      </section>
    </div>
  );
}
