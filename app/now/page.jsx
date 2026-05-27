"use client";
import React from 'react';
import { Card, SectionHead, Eyebrow, StatBlock, Tag, ArrowRight, StatRow, ProjectCard, QuantBook, Footnote } from "@/components/Primitives";
/* NowPage.jsx — short, personal, sparse */

function NowPage() {
  const pins = [
    { city: "Gurgaon",   country: "IN", lat: "28.46° N",  lng: "77.03° E",  when: "Wipro · current" },
    { city: "Sonipat",   country: "IN", lat: "28.99° N",  lng: "77.02° E",  when: "Ashoka University" },
    { city: "London",    country: "UK", lat: "51.50° N",  lng: "0.12° W",   when: "Jul — Aug 2025 · LSE" },
    { city: "Melbourne", country: "AU", lat: "37.81° S",  lng: "144.96° E", when: "Jr Aus. Open · semis" },
  ];
  return (
    <div className="container-prose" style={{ padding: "64px var(--s-7) 32px" }}>
      <Eyebrow section="05">Now · May 2026</Eyebrow>
      <h1 style={{ marginTop: 14, marginBottom: 28 }}>What I'm doing this month.</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <NowLine label="Where" body="Gurgaon, India. Office, court, dorm — in that order." />
        <NowLine label="Working" body={<>At <strong>Wipro</strong>. Day job is the day job; the rest of this site is the rest of the day.</>} />
        <NowLine label="Reading" body={<><em>The Volatility Surface</em> by Jim Gatheral. Re-reading <em>Sutton & Barto</em> ch. 13 (policy gradient).</>} />
        <NowLine label="Training" body="Belief-Conditioned Regret Systems with exploitability analysis" />
        <NowLine label="Tennis" body="Twice a week on clay. Last set went 7–5 against the coach. Backhand leaking." />
        <NowLine label="Listening" body="Iceman by Drake" />
        <NowLine label="Watching" body="Just finished all seasons of Entourage, open to suggestions." />
        <NowLine label="Open to" body={<>ML and RL research conversations for the next stretch. <a href="#">Reach out</a>.</>} />
      </div>

      <hr/>

      <Eyebrow style={{ marginBottom: 14 }}>Pins · recent</Eyebrow>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {pins.map(p => (
          <div key={p.city} style={{
            display: "grid", gridTemplateColumns: "20px 1fr",
            gap: 12, alignItems: "start",
            padding: "12px 14px",
            background: "var(--paper-2)",
            borderRadius: "var(--r-2)",
            boxShadow: "inset 0 0 0 1px var(--rule)",
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--clay)", width: 18, height: 18, marginTop: 2 }}>
              <path d="M12 21 C 7 15 4 12 4 9 a 8 8 0 0 1 16 0 c 0 3 -3 6 -8 12 z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}>{p.city}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.1em" }}>{p.country}</span>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.04em", marginTop: 2 }}>
                {p.lat} · {p.lng}
              </div>
              <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 13, color: "var(--ink-3)", marginTop: 4 }}>
                {p.when}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p style={{
        fontFamily: "var(--font-serif)", fontStyle: "italic",
        fontSize: 13, color: "var(--ink-3)", lineHeight: 1.5,
        marginTop: 28,
      }}>
        Inspired by <a href="#">nownownow.com</a>. Last updated 2026-05-27.
      </p>
    </div>
  );
}

function NowLine({ label, body }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 16, alignItems: "baseline", paddingBottom: 16, borderBottom: "1px solid var(--rule)" }}>
      <div style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--ink-3)",
      }}>{label}</div>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.55, color: "var(--ink)" }}>{body}</div>
    </div>
  );
}



export default NowPage;
