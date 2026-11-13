"use client";
import React from 'react';
import { Card, SectionHead, Eyebrow, StatBlock, Tag, ArrowRight, StatRow, ProjectCard, QuantBook, Footnote } from "@/components/Primitives";
/* Shelf — what I am reading, watching, listening to and doing. Full width. */

function ShelfPage() {
  return (
    <div className="container" style={{ padding: "64px var(--s-7) 32px" }}>
      <Eyebrow section="05" style={{ marginBottom: 28 }}>Shelf · November 2026</Eyebrow>

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
    </div>
  );
}

function NowLine({ label, body }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 24, alignItems: "baseline", paddingBottom: 16, borderBottom: "1px solid var(--rule)" }}>
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



export default ShelfPage;
