"use client";
import React from 'react';
import Link from "next/link";
import { Eyebrow } from "@/components/Primitives";

/* Paper.jsx — shared furniture for the /research/<slug> detail pages.
   Everything here is presentational; the numbers live in the pages. */

/* ── figure ───────────────────────────────────────────────────── */

export function FigureBlock({ src, alt, caption }) {
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

/* ── table styles ─────────────────────────────────────────────── */

export const tableWrap = {
  overflowX: "auto",
  margin: "20px 0",
  borderRadius: "var(--r-2)",
  boxShadow: "inset 0 0 0 1px var(--rule)",
};
export const table = {
  width: "100%",
  borderCollapse: "collapse",
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  letterSpacing: "0.02em",
};
export const th = {
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
export const thR = { ...th, textAlign: "right" };
export const td = {
  padding: "8px 14px",
  borderBottom: "1px solid var(--rule)",
  color: "var(--ink-2)",
};
export const tdR = { ...td, textAlign: "right", fontVariantNumeric: "tabular-nums" };
export const tdLabel = { ...td, color: "var(--ink)" };
export const tdHighlight = { ...tdR, color: "var(--clay)", fontWeight: 600 };

/* ── terminal-style data block ────────────────────────────────── */

export function TerminalBlock({ title, subtitle, children }) {
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
      overflowX: "auto",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        color: "#8A8275", borderBottom: "1px solid rgba(244,238,226,0.1)",
        paddingBottom: 8, marginBottom: 8,
        fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
        gap: 12,
      }}>
        <span>{title}</span>
        {subtitle && <span style={{ whiteSpace: "nowrap" }}>{subtitle}</span>}
      </div>
      {children}
    </div>
  );
}

/* ── callout: a boxed mono list, used for scope/limits ────────── */

export function NoteBox({ children }) {
  return (
    <div style={{
      fontFamily: "var(--font-mono)", fontSize: 13,
      background: "var(--paper-2)", padding: "14px 16px",
      borderRadius: "var(--r-2)", boxShadow: "inset 0 0 0 1px var(--rule)",
      margin: "16px 0", lineHeight: 1.7,
    }}>
      {children}
    </div>
  );
}

export function NoteLine({ label, children }) {
  return (
    <div><span style={{ color: "var(--clay)" }}>{label}</span> {children}</div>
  );
}

/* ── section divider ──────────────────────────────────────────── */

export function SectionRule() {
  return <hr style={{ border: 0, borderTop: "1px solid var(--rule)", margin: "48px 0 40px" }} />;
}

/* ── paper header: title, byline rule, abstract ───────────────── */

export function PaperHeader({ eyebrow, title, authors, venue, status, year, abstract }) {
  return (
    <>
      <div style={{ marginBottom: 14 }}>
        <Link href="/research" style={{
          fontFamily: "var(--font-mono)", fontSize: 11,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: "var(--ink-3)", textDecoration: "none",
        }}>← All research</Link>
      </div>

      <Eyebrow section={eyebrow}>{venue} · {status}</Eyebrow>

      <h1 style={{ marginTop: 14, marginBottom: 16, lineHeight: 1.12 }}>{title}</h1>

      <div style={{
        display: "flex", gap: 16, alignItems: "baseline", flexWrap: "wrap",
        fontFamily: "var(--font-mono)", fontSize: 11,
        color: "var(--ink-3)", letterSpacing: "0.06em",
        borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)",
        padding: "10px 0",
        marginBottom: 32,
      }}>
        {authors.map((a, i) => (
          <React.Fragment key={a}>
            {i > 0 && <span>·</span>}
            <span>{a}</span>
          </React.Fragment>
        ))}
        <span style={{ marginLeft: "auto" }}>{year} · {status.toUpperCase()}</span>
      </div>

      <p style={{
        fontFamily: "var(--font-serif)", fontSize: 17, fontStyle: "italic",
        color: "var(--ink-2)", lineHeight: 1.65, marginBottom: 28,
      }}>
        <strong style={{ fontStyle: "normal" }}>Abstract.</strong>&ensp;{abstract}
      </p>
    </>
  );
}

/* ── under-review notice ──────────────────────────────────────── */

export function ReviewNotice({ children }) {
  return (
    <p className="t-caption" style={{
      margin: "28px 0 0",
      paddingTop: 14,
      borderTop: "1px solid var(--rule)",
      color: "var(--ink-3)",
    }}>
      {children}
    </p>
  );
}

/* ── request block: what replaces the detailed sections ───────── */

const EMAIL = "agriya.yadav_ug2023@ashoka.edu.in";

export function RequestFullWriteup({ paper, covers }) {
  const subject = encodeURIComponent(`Full write-up request: ${paper}`);
  const body = encodeURIComponent(
    `Hi Agriya,\n\nI'd like to read the full write-up for "${paper}".\n\n` +
    `A little about me and my interest:\n\n\n— `
  );
  return (
    <section style={{
      margin: "44px 0 8px",
      padding: "28px 30px",
      borderRadius: "var(--r-2)",
      background: "var(--paper-2)",
      boxShadow: "inset 0 0 0 1px var(--rule)",
    }}>
      <Eyebrow style={{ marginBottom: 12 }}>The rest of this one</Eyebrow>

      <h2 style={{ fontSize: 24, marginBottom: 12, lineHeight: 1.2 }}>
        Happy to send the full write-up.
      </h2>

      <p style={{
        fontFamily: "var(--font-serif)", fontSize: 17, lineHeight: 1.6,
        color: "var(--ink-2)", margin: "0 0 16px", maxWidth: 580,
      }}>
        What&rsquo;s above is the abstract and the headline result. The longer
        version — method, ablations, failure modes, and the parts that
        didn&rsquo;t work — goes out by email while this is under review.
        Drop me a line and say roughly what you&rsquo;re interested in.
      </p>

      {covers?.length ? (
        <div style={{ margin: "0 0 20px" }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "var(--ink-3)", marginBottom: 8,
          }}>
            The full version covers
          </div>
          <ul style={{
            margin: 0, paddingLeft: 18,
            fontFamily: "var(--font-sans)", fontSize: 14,
            color: "var(--ink-2)", lineHeight: 1.8, maxWidth: 560,
          }}>
            {covers.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
      ) : null}

      <a
        href={`mailto:${EMAIL}?subject=${subject}&body=${body}`}
        style={{
          display: "inline-block",
          padding: "10px 18px",
          borderRadius: "var(--r-2)",
          background: "var(--ink)",
          color: "var(--paper)",
          fontFamily: "var(--font-sans)",
          fontSize: 14,
          fontWeight: 500,
          textDecoration: "none",
        }}
      >
        Email me for the full write-up &nbsp;→
      </a>

      <p className="t-caption" style={{ marginTop: 14, marginBottom: 0 }}>
        Or write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a> directly.
        No code, no form — I just reply.
      </p>
    </section>
  );
}
