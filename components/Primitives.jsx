"use client";
import React from 'react';
/* Primitives.jsx — shared atoms */
const { useState, useEffect } = React;

/* Eyebrow — mono micro caps with optional clay section number */
export function Eyebrow({ section, children, style }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--ink-3)",
        fontWeight: 500,
        ...style,
      }}
    >
      {section ? <span style={{ color: "var(--clay)" }}>§ {section}</span> : null}
      {section ? <span style={{ margin: "0 8px" }}>—</span> : null}
      {children}
    </div>
  );
}

/* StatBlock — hairline-divided numeral with footnote.
   Use inside <StatRow /> for the 4-up grid. */
export function StatBlock({ num, unit, label, footnote }) {
  return (
    <div style={{
      padding: "20px 24px",
      borderRight: "1px solid var(--rule)",
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      <div style={{
        fontFamily: "var(--font-serif)",
        fontWeight: 500,
        fontSize: 44,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums lining-nums",
      }}>
        {num}
        {unit ? <span style={{ fontSize: 18, color: "var(--ink-3)", marginLeft: 2, fontWeight: 400 }}>{unit}</span> : null}
      </div>
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--ink-3)",
      }}>{label}</div>
      {footnote ? (
        <div style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: 12,
          color: "var(--ink-3)",
          marginTop: 2,
          lineHeight: 1.4,
        }}>{footnote}</div>
      ) : null}
    </div>
  );
}

export function StatRow({ children }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${React.Children.count(children)}, 1fr)`,
      borderTop: "1px solid var(--rule)",
      borderBottom: "1px solid var(--rule)",
    }}>
      {React.Children.map(children, (c, i) => (
        i === React.Children.count(children) - 1
          ? React.cloneElement(c, { style: { ...(c.props.style || {}), borderRight: 0 } })
          : c
      ))}
    </div>
  );
}

/* ProjectCard — numbered, dated, serif title, tagged */
export function ProjectCard({ num, date, title, desc, tags = [], href = "#" }) {
  return (
    <a href={href} style={{
      display: "block",
      background: "var(--paper)",
      borderRadius: "var(--r-2)",
      boxShadow: "0 1px 0 var(--rule), 0 12px 24px -16px rgba(20,17,14,0.18), inset 0 0 0 1px var(--rule)",
      padding: "20px 22px 18px",
      textDecoration: "none",
      color: "inherit",
      transition: "transform var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)",
    }}
    onMouseEnter={(e)=>{ e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 1px 0 var(--rule), 0 24px 48px -20px rgba(20,17,14,0.28), inset 0 0 0 1px var(--rule)"; }}
    onMouseLeave={(e)=>{ e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 0 var(--rule), 0 12px 24px -16px rgba(20,17,14,0.18), inset 0 0 0 1px var(--rule)"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--clay)", letterSpacing: "0.12em" }}>№ {num}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em" }}>{date}</span>
      </div>
      <div style={{
        fontFamily: "var(--font-serif)",
        fontSize: 24,
        lineHeight: 1.16,
        letterSpacing: "-0.012em",
        margin: "6px 0 8px",
        fontWeight: 500,
      }}>{title}</div>
      <p style={{
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        lineHeight: 1.55,
        color: "var(--ink-2)",
        margin: 0,
      }}>{desc}</p>
      {tags.length ? (
        <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
          {tags.map((t) => (
            <span key={t} style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.04em",
              color: "var(--ink-3)",
              padding: "2px 8px",
              borderRadius: "var(--r-pill)",
              boxShadow: "inset 0 0 0 1px var(--rule)",
            }}>{t}</span>
          ))}
        </div>
      ) : null}
    </a>
  );
}

/* QuantBook — three submitted alphas from the Intl. Quant Championship Stage 1.
   Metrics taken from the WorldQuant Brain submission panel (Sharpe, Turnover,
   Fitness, Returns, Drawdown, Margin). */
export function QuantBook() {
  const rows = [
    { id: "α₁", sharpe: "1.56", turn: "9.53%",  fit: "3.60", ret: "66.72%", dd: "69.77%", mar: "140.04‰" },
    { id: "α₂", sharpe: "1.77", turn: "19.66%", fit: "1.91", ret: "23.01%", dd: "17.61%", mar: "23.40‰"  },
    { id: "α₃", sharpe: "2.68", turn: "35.97%", fit: "1.60", ret: "12.83%", dd: "3.63%",  mar: "7.13‰"   },
  ];
  const grid = "36px 1fr 1fr 1fr 1fr 1fr 1fr";
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
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        color: "#8A8275", borderBottom: "1px solid rgba(244,238,226,0.1)",
        paddingBottom: 8, marginBottom: 8,
        fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
      }}>
        <span>Intl. Quant Championship — Stage 1 · submitted alphas</span>
        <span>rank 3,000 / 152,000</span>
      </div>
      {/* column header */}
      <div style={{
        display: "grid", gridTemplateColumns: grid, gap: 8,
        color: "#8A8275", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
        paddingBottom: 6,
      }}>
        <span></span>
        <span style={{ textAlign: "right" }}>sharpe</span>
        <span style={{ textAlign: "right" }}>turnover</span>
        <span style={{ textAlign: "right" }}>fitness</span>
        <span style={{ textAlign: "right" }}>returns</span>
        <span style={{ textAlign: "right" }}>drawdown</span>
        <span style={{ textAlign: "right" }}>margin</span>
      </div>
      {rows.map((r) => (
        <div key={r.id} style={{
          display: "grid", gridTemplateColumns: grid, gap: 8, alignItems: "baseline",
          fontVariantNumeric: "tabular-nums",
        }}>
          <span style={{ color: "#8A8275" }}>{r.id}</span>
          <span style={{ textAlign: "right" }}>{r.sharpe}</span>
          <span style={{ textAlign: "right" }}>{r.turn}</span>
          <span style={{ textAlign: "right" }}>{r.fit}</span>
          <span style={{ color: "#6FBF73", textAlign: "right" }}>{r.ret}</span>
          <span style={{ color: "#D85A4A", textAlign: "right" }}>{r.dd}</span>
          <span style={{ color: "#6FBF73", textAlign: "right" }}>{r.mar}</span>
        </div>
      ))}
    </div>
  );
}

/* Footnote — italic serif, numbered */
export function Footnote({ n, children }) {
  return (
    <div style={{
      display: "flex", gap: 10, alignItems: "flex-start",
      fontFamily: "var(--font-serif)", fontStyle: "italic",
      fontSize: 13, color: "var(--ink-3)", lineHeight: 1.5,
    }}>
      <span style={{ color: "var(--clay)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}>{n}.</span>
      <span>{children}</span>
    </div>
  );
}


