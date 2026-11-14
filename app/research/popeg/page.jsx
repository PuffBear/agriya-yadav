"use client";
import React from 'react';
import {
  TerminalBlock, SectionRule, PaperHeader, ReviewNotice, RequestFullWriteup,
  tableWrap, table, th, thR, td, tdR, tdLabel,
} from "@/components/Paper";
import { ReferenceMap } from "@/components/WorkFigures";

export default function PopegPage() {
  return (
    <article className="container-prose" style={{ padding: "48px var(--s-7) 32px" }}>

      <PaperHeader
        eyebrow="01"
        venue="AAMAS 2027"
        status="submitted"
        year="2027"
        title="POPEG: Selecting pursuit tasks and characterizing controller failures."
        authors={["A. YADAV", "w/ Prof. D. GUPTA", "ASHOKA UNIV."]}
        abstract={<>
          Pursuit benchmarks need to distinguish success from systematic coverage from
          performance against opponents that evade detection and capture. We introduce the
          Partially Observable Pursuit–Evasion Game (POPEG), a controlled grid benchmark for
          selecting evaluation tasks and interpreting controller performance. Its reference
          suite measures what random pursuit, coverage/reactive strategies, belief-based
          pursuit, and privileged sensing achieve; its seen–contact–capture diagnostic shows
          where unsuccessful episodes stop progressing. A joint map of evader randomness,
          sensing radius, and horizon evaluates 60 conditions with seven reference
          controllers and 2000 episodes per controller and condition. At an 80% capture
          threshold, 28 conditions are baseline-sufficient, 16 show baseline shortfalls, and
          16 place all references below threshold; two labels are uncertain under sampling
          intervals. At the canonical point, the strongest coverage/reactive baseline
          captures 68.2% versus 99.25% for the privileged reference. Increasing sensing
          radius from 2 to 3 raises baseline capture to 97.25%; doubling the horizon raises
          it to 88.65%. For five learned configurations, sightings occur in 30–44% of
          evasive-opponent episodes and only 7–13% of contacted episodes end in capture.
        </>}
      />

      <p className="t-prose">
        A high capture rate in a pursuit benchmark can mean two very different things. A
        team can be reasoning well about where a hidden evader is, or it can simply be
        sweeping the arena systematically, which needs no reasoning at all. A low capture
        rate is just as ambiguous: the pursuers may never see the evader, see it but never
        reach it, or reach it and fail to close. A single score hides all of this.
      </p>

      <p className="t-prose">
        POPEG is built to make two decisions explicit. Before training, which conditions are
        worth testing a new controller on? And after evaluation, where did it fail? It fixes
        the arena and movement rules, supplies a suite of reference controllers from random
        pursuit up to a privileged one that sees everything, and records three events in
        every episode: whether the evader was ever seen, ever contacted, and finally captured.
      </p>

      <SectionRule />

      <TerminalBlock title="Reference capture at the canonical point" subtitle="W=25 · r=2 · T=208 · ε=0.05 · 2000 episodes">
        {(() => {
          const grid = "1.7fr 90px 1.1fr";
          const rows = [
            ["Random pursuit",                  "0.05%", "no sensing, no memory"],
            ["Best coverage/reactive baseline", "68.2%", "stride-tuned sweep"],
            ["  … with sensing radius 3",        "97.25%", "same controller"],
            ["  … with horizon doubled to 416",  "88.65%", "same controller"],
            ["Privileged greedy",               "99.25%", "sees every evader"],
          ];
          return (
            <>
              <div style={{
                display: "grid", gridTemplateColumns: grid, gap: 8,
                color: "#8A8275", fontSize: 10, letterSpacing: "0.14em",
                textTransform: "uppercase", paddingBottom: 6,
              }}>
                <span>pursuer</span>
                <span style={{ textAlign: "right" }}>capture</span>
                <span style={{ textAlign: "right" }}>note</span>
              </div>
              {rows.map(([m, v, note]) => (
                <div key={m} style={{
                  display: "grid", gridTemplateColumns: grid, gap: 8,
                  fontVariantNumeric: "tabular-nums", alignItems: "baseline",
                }}>
                  <span style={{ color: m.startsWith("Best") ? "#F4EEE2" : "#8A8275", whiteSpace: "pre" }}>{m}</span>
                  <span style={{ textAlign: "right", color: parseFloat(v) >= 80 ? "#6FBF73" : "#D85A4A" }}>{v}</span>
                  <span style={{ textAlign: "right", color: "#8A8275", fontSize: 10 }}>{note}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, fontSize: 10, color: "#8A8275", letterSpacing: "0.06em" }}>
                A modest change in sensing or time turns a baseline-shortfall task into a coverage control.
              </div>
            </>
          );
        })()}
      </TerminalBlock>

      <p className="t-prose">
        That sensitivity is the reason for the map below. Instead of treating arena size as a
        proxy for difficulty, POPEG measures every reference controller across 60
        combinations of evader randomness, sensing radius and time budget, and labels each
        one by what the references achieve. Green cells are <em>coverage controls</em>:
        sweeping alone already succeeds, so a new controller should too. Ochre cells are
        where the evaluation is informative: only the privileged reference succeeds, so
        there is measured room to improve.
      </p>

      <ReferenceMap />

      <p className="t-prose">
        The second half of the benchmark is diagnostic. Five standard multi-agent RL
        configurations — MAPPO, R-MAPPO, QMIX, MAT and MAVEN — were trained for 20,000
        episodes per seed over five seeds at the canonical point. Against the evasive
        opponent every one of them captures in under 4% of episodes. The event frequencies
        say why, and the answer is not only search:
      </p>

      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>vs. evasive evader</th>
              <th style={thR}>seen</th>
              <th style={thR}>contact | seen</th>
              <th style={thR}>capture | contact</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["MAPPO", 44, 48, 11], ["QMIX", 35, 37, 12], ["MAT", 34, 27, 13],
              ["MAVEN", 30, 31, 7], ["R-MAPPO", 30, 28, 8], ["Belief-using hybrid", 90, 93, 87],
            ].map(([m, s, c, k]) => (
              <tr key={m}>
                <td style={tdLabel}>{m}</td>
                <td style={tdR}>{s}%</td>
                <td style={tdR}>{c}%</td>
                <td style={tdR}>{k}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="t-caption" style={{ marginTop: -8 }}>
        Event frequencies, averaged over five seeds of 2000 held-out episodes each.
        Conditional rates are computed within seed. The hybrid is a reference controller,
        evaluated under a different protocol.
      </p>

      <p className="t-prose">
        The learned teams lose episodes at every stage: they see the evader in only 30–44%
        of episodes, close to contact in under half of those, and convert only 7–13% of
        contacts into a capture. Against a random-walk evader the same configurations see it
        75–83% of the time, so the same final metric can hide very different failure
        patterns. POPEG’s recommendation is simple: choose conditions from the map before
        testing, and report event frequencies alongside capture afterwards.
      </p>

      <RequestFullWriteup
        paper="POPEG: Selecting pursuit tasks and characterizing controller failures"
        covers={[
          "The game, the two evaluation protocols, and why their results are not compared directly",
          "The eight reference controllers, the two scaling protocols, and the fixed-sensor reference matrix",
          "How each map cell is labelled, and the Bonferroni-adjusted intervals behind the two uncertain cells",
          "Training and evaluation details for the five learned configurations and their controls",
          "The seen–contact–capture accounting identity and what it can and cannot attribute",
          "A practical procedure for using POPEG to evaluate a new controller, and the limitations",
        ]}
      />

      <ReviewNotice>
        Submitted to AAMAS 2027; the manuscript stays off the site while it is under review.
      </ReviewNotice>
    </article>
  );
}
