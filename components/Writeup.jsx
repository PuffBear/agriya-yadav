"use client";
import React from 'react';
import Link from "next/link";
import { tableWrap, table, th, thR, td, tdR, tdLabel } from "@/components/Paper";

/* Writeup.jsx — furniture for the /work/<slug> project write-ups.
   Shape: title | GitHub, a meta line (year · kind · length), tags, an
   optional note, then h2-sectioned prose with figures, lists and tables. */

export function WriteupHeader({ title, github, year, kind = "Project", words, tags = [], note }) {
  return (
    <header style={{ marginBottom: 36 }}>
      <div style={{ marginBottom: 14 }}>
        <Link href="/work" style={{
          fontFamily: "var(--font-mono)", fontSize: 11,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: "var(--ink-3)", textDecoration: "none",
        }}>← All work</Link>
      </div>

      <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)", lineHeight: 1.14, marginBottom: 16 }}>
        {title}
        <span style={{ color: "var(--ink-4)", fontWeight: 400 }}> | </span>
        <a href={github} target="_blank" rel="noopener noreferrer" style={{ color: "var(--clay)", textDecorationColor: "var(--clay)" }}>GitHub</a>
      </h1>

      <div style={{
        fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em",
        color: "var(--ink-3)", borderTop: "1px solid var(--rule)",
        borderBottom: "1px solid var(--rule)", padding: "10px 0",
        display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center",
      }}>
        <span>{year} · {kind}{words ? ` · ${words} words` : ""}</span>
        <span style={{ display: "flex", gap: 6, flexWrap: "wrap", marginLeft: "auto" }}>
          {tags.map((t) => (
            <span key={t} style={{
              fontSize: 10, letterSpacing: "0.04em", padding: "2px 8px",
              borderRadius: "var(--r-pill)", boxShadow: "inset 0 0 0 1px var(--rule)",
            }}>{t}</span>
          ))}
        </span>
      </div>

      {note ? (
        <p style={{
          fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 16,
          lineHeight: 1.55, color: "var(--ink-3)", margin: "18px 0 0",
        }}>{note}</p>
      ) : null}
    </header>
  );
}

export function H2({ children }) {
  return <h2 style={{ fontSize: 30, lineHeight: 1.18, margin: "52px 0 16px" }}>{children}</h2>;
}

export function H3({ children }) {
  return <h3 style={{ fontSize: 17, margin: "30px 0 10px" }}>{children}</h3>;
}

export function P({ children }) {
  return <p className="t-prose" style={{ margin: "0 0 18px", color: "var(--ink-2)" }}>{children}</p>;
}

export function List({ ordered, items }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className="t-prose" style={{ margin: "0 0 18px", paddingLeft: 24, color: "var(--ink-2)" }}>
      {items.map((it, i) => <li key={i} style={{ marginBottom: 8 }}>{it}</li>)}
    </Tag>
  );
}

/* head: column labels; rows: arrays of cells; numeric: column indexes to right-align */
export function DataTable({ head, rows, numeric = [], caption }) {
  return (
    <figure style={{ margin: "24px 0" }}>
      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>{head.map((h, i) => <th key={i} style={numeric.includes(i) ? thR : th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri}>
                {r.map((c, ci) => (
                  <td key={ci} style={ci === 0 ? tdLabel : numeric.includes(ci) ? tdR : td}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption ? <figcaption className="t-caption" style={{ marginTop: 8 }}>{caption}</figcaption> : null}
    </figure>
  );
}

export function Code({ children }) {
  return (
    <pre style={{
      background: "#14110E", color: "#F4EEE2", borderRadius: "var(--r-2)",
      padding: "16px 20px", margin: "20px 0", overflowX: "auto",
      fontFamily: "var(--font-mono)", fontSize: 12.5, lineHeight: 1.7,
    }}><code style={{ fontSize: "inherit" }}>{children}</code></pre>
  );
}

export function RepoLink({ href, children }) {
  return (
    <p style={{ margin: "36px 0 0", paddingTop: 18, borderTop: "1px solid var(--rule)" }}>
      <a href={href} target="_blank" rel="noopener noreferrer" style={{
        display: "inline-block", padding: "10px 18px", borderRadius: "var(--r-2)",
        background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-sans)",
        fontSize: 14, fontWeight: 500, textDecoration: "none",
      }}>{children || "Code on GitHub"} &nbsp;→</a>
    </p>
  );
}
