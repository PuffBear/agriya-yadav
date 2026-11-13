"use client";
import React from 'react';
import { Card, SectionHead, Eyebrow, StatBlock, Tag, ArrowRight, StatRow, ProjectCard, QuantBook, Footnote } from "@/components/Primitives";
/* NowPage.jsx — short, personal, sparse */

function NowPage() {
  const pins = [
    { city: "Sonipat",   country: "IN", lat: "28.99° N",  lng: "77.02° E",  when: "Ashoka University · senior" },
    { city: "Gurgaon",   country: "IN", lat: "28.46° N",  lng: "77.03° E",  when: "May — Jun 2026 · Wipro" },
    { city: "London",    country: "UK", lat: "51.50° N",  lng: "0.12° W",   when: "Jul — Aug 2025 · LSE" },
    { city: "Melbourne", country: "AU", lat: "37.81° S",  lng: "144.96° E", when: "Jr Aus. Open · semis" },
  ];
  return (
    <div className="container-prose" style={{ padding: "64px var(--s-7) 32px" }}>
      <Eyebrow section="05">Now · November 2026</Eyebrow>
      <h1 style={{ marginTop: 14, marginBottom: 28 }}>What I&rsquo;m doing this month.</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <NowLine label="Where" body="Ashoka University. Dorm, classes, library — in that order." />
        <NowLine label="Studying" body="Graduate Reinforcement Learning, Supply Chain and Operations Optimisation, Data Science Methods." />
        <NowLine label="Writing" body={<><a href="/research">Papers submitted</a>, and on a break for a month or two. Still open to conversations.</>} />
        <NowLine label="Reading" body={<><a href="https://web.stanford.edu/class/psych209/Readings/SuttonBartoIPRLBook2ndEd.pdf" target="_blank" rel="noopener noreferrer"><em>Reinforcement Learning</em></a>, Sutton &amp; Barto.</>} />
        <NowLine label="Tennis" body="Twice a month. Picking up the frequency from next year." />
        <NowLine label="Listening" body={<><em>Before the Flood</em> by Keinemusik, <em>No Flockin</em> by Kodak Black, and <em>MET GALA</em> by Gunna.</>} />
        <NowLine label="Watching" body={<>Just finished <a href="https://www.imdb.com/title/tt0387199/" target="_blank" rel="noopener noreferrer"><em>Entourage</em></a> (twice). Rewatching <a href="https://www.imdb.com/title/tt0491738/" target="_blank" rel="noopener noreferrer"><em>Psych</em></a>. Also watching <a href="https://www.imdb.com/title/tt6151526/" target="_blank" rel="noopener noreferrer"><em>The Rainmaker</em></a> and <a href="https://www.imdb.com/title/tt39365612/" target="_blank" rel="noopener noreferrer"><em>Line of Fire</em></a>.</>} />
        <NowLine label="Open to" body={<>ML and RL research conversations for the next stretch. <a href="mailto:agriya.yadav_ug2023@ashoka.edu.in">Reach out</a>.</>} />
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
        Inspired by <a href="#">nownownow.com</a>. Last updated 2026-11-13.
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
