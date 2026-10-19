"use client";
import React from 'react';
import { Footnote, Eyebrow } from "@/components/Primitives";
import InfoGainAnimation from "@/components/InfoGainAnimation";
import {
  FigureBlock, TerminalBlock, SectionRule, PaperHeader, ReviewNotice,
  NoteBox, NoteLine,
  tableWrap, table, th, thR, td, tdR, tdLabel, tdHighlight,
} from "@/components/Paper";

export default function PopegPage() {
  return (
    <article className="container-prose" style={{ padding: "48px var(--s-7) 32px" }}>

      <PaperHeader
        eyebrow="01"
        venue="AAAI"
        status="under review"
        year="2026"
        title="When does partial observability bind in pursuit–evasion? The POPEG benchmark and a policy-class audit."
        authors={["A. YADAV", "w/ Prof. D. GUPTA", "ASHOKA UNIV."]}
        abstract={<>
          Partial observability is common in multi-agent reinforcement learning, but it is
          not always the source of task difficulty: structured coverage may succeed without
          estimating hidden state. We ask when partial observability becomes <em>binding</em> —
          when structured posterior-free policies fail while privileged state information
          remains useful. We introduce POPEG, a controlled pursuit–evasion benchmark, and
          audit random pursuit, posterior-free strategies, a belief-using controller, and a
          privileged full-observability reference. Against a random-walk evader, structured
          coverage closes the observability gap, indicating only apparent hardness. Against
          an evasive evader, the strongest audited posterior-free policy captures 68.6% of
          episodes versus 99.3% for the privileged reference, and the gap grows with grid
          size under fixed sensing. A belief-using three-regime controller reaches 71.5%
          under the same local observations, a statistically significant margin at the
          canonical grid size, but this advantage does not persist at larger fixed-sensor
          grids. A seen–contact–capture diagnostic localizes the failure.
        </>}
      />

      <p className="t-prose">
        The premise most pursuit benchmarks quietly assume is that if a task is partially
        observable and a method does well on it, the method must be reasoning about hidden
        state. That does not follow. A lawnmower sweep estimates nothing at all and still
        captures a random-walk evader every single time. So a high capture rate is not, by
        itself, evidence of anything interesting.<span className="t-fnref">¹</span>
      </p>

      <SectionRule />

      {/* ── §1 benchmark ─────────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 1</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>The benchmark</h2>

      <p className="t-prose">
        POPEG is played on a square grid of side W by N<sub>p</sub> pursuers against
        N<sub>e</sub> evaders over a finite horizon T. Capture is <em>exact cell
        co-occupancy</em> — not field-of-view overlap — and the episode terminates at the
        first capture. Each pursuer senses an L<sub>∞</sub> ball of radius r, a
        (2r+1)×(2r+1) patch, with exact noiseless detection inside it. The team pools its
        positions and detections into a single centralized observation and acts on the
        observation–action history.
      </p>

      <p className="t-prose">
        The arena is deliberately plain: no obstacles, no continuous dynamics, no
        platform constraints. That is the point. Classical pursuit models entangle sensing
        limits with geometry, noise and vehicle models; stripping those away lets r and the
        evader policy vary without changing anything else, so difficulty attributable to
        hidden state can be isolated from difficulty attributable to the map.
      </p>

      <p className="t-prose">
        Information matters before the first sighting, which is the part that makes this a
        control problem rather than a filtering one. A non-detection is evidence: a swept
        empty region should lower the posterior mass there while the target keeps moving.
        Each action therefore both moves the team and determines what gets sensed next.
      </p>

      <NoteBox>
        <NoteLine label="Canonical point:">W=25, r=2, N<sub>p</sub>=3, N<sub>e</sub>=2, T=208, ε=0.05</NoteLine>
        <NoteLine label="Horizon:">T = ⌊W²/3⌋ ∈ {"{208, 408, 833}"} for W ∈ {"{25, 35, 50}"}</NoteLine>
        <NoteLine label="Headline protocol:">fixed sensor — r=2 at every W, team and target count held</NoteLine>
        <NoteLine label="Sensitivity:">density-controlled — r grows with W to hold α_obs constant</NoteLine>
      </NoteBox>

      <p className="t-prose">
        The two scaling protocols answer different questions and are not interchangeable.
        Under fixed sensing the physical sensor stays put while the number of possible
        evader locations grows as W² — the harder and more honest comparison, and the one
        every scaling claim in the paper uses. They coincide at the canonical point by
        construction, since the density-controlled schedule is anchored at r=2, W=25.
      </p>

      <p className="t-prose">
        Against a fixed evader policy the team can maintain the exact posterior
        B<sub>t</sub>: predict through the evader&rsquo;s transition kernel, then condition
        on the detection outcome — a detection pins the cell, a non-detection rules out
        everything currently in view. <strong>Proposition 1</strong> gives belief
        sufficiency: against a fixed, known Markov evader, the triple (p<sub>t</sub>,
        B<sub>t</sub>, T−t) is a sufficient statistic for optimal pursuer control. That is
        an exact-joint-posterior statement, and the implemented hybrid is only a measured
        factorized approximation to it — one tracker per evader — so its performance is
        empirical, not derived.<span className="t-fnref">²</span>
      </p>

      <SectionRule />

      {/* ── §2 the ladder ────────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 2</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>A three-level policy ladder</h2>

      <p className="t-prose">
        The audit fixes eight policy classes organized by <em>information regime</em> rather
        than by sophistication. P<sub>RW</sub>, an independent lazy random walk, is the
        zero-information anchor v₀. Five audited posterior-free policies — reactive
        greedy-on-visible, coverage sweep, last-seen tracking, randomized-phase sweep, and
        a stride-tuned sweep whose waypoint spacing matches the sensing footprint — may use
        current detections and finite memory but maintain no posterior; the strongest of
        them at each grid size sets v<sub>B</sub>. P<sub>FO</sub> is a privileged greedy
        reference that receives the evader&rsquo;s exact cell directly, giving
        v<sub>F</sub>.
      </p>

      <p className="t-prose">
        P<sub>FO</sub> is mechanically the simplest rule of the eight. It ranks highest
        only because it has more information, which is precisely why it works as a
        reference — and why it is reported as a reproducible privileged baseline rather
        than a claim of full-observability optimality.
      </p>

      <p className="t-prose">
        An instance is certified <strong>strategically hard</strong> when random walk
        fails, the audited posterior-free class fails, the privileged reference succeeds,
        and the gap Δ<sub>priv</sub> = v<sub>F</sub> − v<sub>B</sub> clears a conservative
        3-sigma significance test. At the canonical point this is not a close call:
        v₀ = 0.000, v<sub>B</sub> = 0.686, v<sub>F</sub> = 0.993, giving Δ<sub>priv</sub> =
        0.307 against c·SE ≈ 0.032.
      </p>

      <SectionRule />

      {/* ── §3 results ───────────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 3</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Fake hardness and real hardness</h2>

      <p className="t-prose">
        The same arena produces both regimes depending only on the evader. Against a
        random-walk evader every audited posterior-free policy closes most of the gap and
        three of the five match the privileged reference exactly — this regime is
        <em> fake-hard</em>. Against the ε-greedy evader random walk captures nothing and
        every posterior-free policy falls well short: <em>strategically hard</em>.
      </p>

      <TerminalBlock title="Fixed-sensor baseline matrix" subtitle="2000 episodes/cell · r=2 at every W">
        {(() => {
          const grid = "1.5fr 60px 60px 60px 12px 60px 60px 60px";
          const rows = [
            ["P_RW (random walk)",        "0.607", "0.574", "0.579", "0.000", "0.001", "0.000"],
            ["P¹ (greedy visible)",       "0.926", "0.911", "0.861", "0.207", "0.123", "0.058"],
            ["P² (coverage sweep)",       "1.000", "1.000", "1.000", "0.453", "0.369", "0.312"],
            ["P³ (last seen)",            "0.940", "0.908", "0.859", "0.220", "0.107", "0.063"],
            ["P⁴ (randomized sweep)",     "1.000", "0.999", "1.000", "0.609", "0.596", "0.169"],
            ["P⁵ (stride-tuned sweep)",   "1.000", "1.000", "1.000", "0.686", "0.594", "0.524"],
            ["P_FO (full obs)",           "1.000", "1.000", "1.000", "0.993", "1.000", "1.000"],
          ];
          return (
            <>
              <div style={{
                display: "grid", gridTemplateColumns: grid, gap: 8,
                color: "#8A8275", fontSize: 10, letterSpacing: "0.1em",
                textTransform: "uppercase", paddingBottom: 2,
              }}>
                <span></span>
                <span style={{ textAlign: "right", gridColumn: "2 / 5" }}>vs. random walk</span>
                <span></span>
                <span style={{ textAlign: "right", gridColumn: "6 / 9" }}>vs. ε-greedy</span>
              </div>
              <div style={{
                display: "grid", gridTemplateColumns: grid, gap: 8,
                color: "#8A8275", fontSize: 10, letterSpacing: "0.1em",
                paddingBottom: 6, borderBottom: "1px solid rgba(244,238,226,0.1)", marginBottom: 6,
              }}>
                <span>pursuer</span>
                <span style={{ textAlign: "right" }}>25</span>
                <span style={{ textAlign: "right" }}>35</span>
                <span style={{ textAlign: "right" }}>50</span>
                <span></span>
                <span style={{ textAlign: "right" }}>25</span>
                <span style={{ textAlign: "right" }}>35</span>
                <span style={{ textAlign: "right" }}>50</span>
              </div>
              {rows.map((r) => (
                <div key={r[0]} style={{
                  display: "grid", gridTemplateColumns: grid, gap: 8,
                  fontVariantNumeric: "tabular-nums", alignItems: "baseline",
                }}>
                  <span style={{ color: r[0].startsWith("P_FO") ? "#F4EEE2" : "#8A8275" }}>{r[0]}</span>
                  {[1, 2, 3].map(i => (
                    <span key={i} style={{ textAlign: "right" }}>{r[i]}</span>
                  ))}
                  <span></span>
                  {[4, 5, 6].map(i => (
                    <span key={i} style={{
                      textAlign: "right",
                      color: parseFloat(r[i]) >= 0.68 ? "#6FBF73" : parseFloat(r[i]) < 0.1 ? "#D85A4A" : "#F4EEE2",
                    }}>{r[i]}</span>
                  ))}
                </div>
              ))}
              <div style={{ marginTop: 10, fontSize: 10, color: "#8A8275", letterSpacing: "0.06em" }}>
                Δ_priv grows with scale under a fixed sensor: 0.307, 0.404, 0.476 at W = 25, 35, 50
              </div>
            </>
          );
        })()}
      </TerminalBlock>

      <p className="t-prose">
        Pinning the sensor at r=2 rather than growing it with the grid is materially harder
        at scale. The privileged reference stays near 1.000 while the strongest audited
        posterior-free value falls from 0.686 to 0.524 — the strategically hard regime
        <em> deepens</em>. P⁴&rsquo;s non-monotonicity is a phase-randomization coverage
        artifact rather than a scaling effect.
      </p>

      <SectionRule />

      {/* ── §4 the hybrid ────────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 4</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>A belief-using positive control</h2>

      <p className="t-prose">
        To establish that a stronger in-class controller <em>exists</em>, the audit includes
        a belief-using three-regime hybrid. It maintains one factorized Bayesian tracker per
        evader and selects its regime each step from the minimum per-evader belief entropy
        against two fixed thresholds: <em>sweep</em> when belief is fully diffuse,
        <em> info-optimal</em> when partially concentrated, <em>capture-optimal</em> —
        Manhattan-stepping toward the peak-probability cell — when concentrated.
      </p>

      <p className="t-prose">
        At the canonical point it reaches V = 0.7147 [0.7058, 0.7235], a z = 4.43 margin
        over the strongest posterior-free policy that clears the paper&rsquo;s own c=3
        threshold. It closes only about 9.3% of the gap to the privileged reference,
        leaving 0.278 as the target for learned architectures. And the advantage is
        scale-limited: under fixed sensing the hybrid falls to 0.580 and 0.290 at W=35 and
        W=50, <em>below</em> the strongest posterior-free policy at both. The positive
        control establishes a significant in-class improvement at one point, not
        scalability.
      </p>

      <InfoGainAnimation />

      <FigureBlock
        src="/research/figures/info_gain_canonical.png"
        alt="Mean summed entropy, chosen joint info gain, mean info regret, and capture rate on the canonical W=25 grid"
        caption="Information efficiency on the canonical 25×25 grid, across the random walk, greedy-visible, coverage sweep, last-seen and full-observability baselines."
      />

      <FigureBlock
        src="/research/figures/three_regime_sweep.png"
        alt="Heatmap of capture rate and information regret over a grid of entropy thresholds"
        caption="Three-regime threshold sweep. The high entropy threshold governs the transition from pure sweep into belief-driven pursuit and dominates the performance surface; the low threshold barely matters."
      />

      <FigureBlock
        src="/research/figures/regime_conditioned_ir.png"
        alt="Regime-conditioned information regret split by diffuse and concentrated belief bands"
        caption="Regime-conditioned analysis. Information regret falls sharply in the diffuse band as the sweep threshold rises, while the concentrated band stays essentially flat — the whole performance gap lives in diffuse-belief steps."
      />

      <SectionRule />

      {/* ── §5 learned audit ─────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 5</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Do learned methods close it?</h2>

      <p className="t-prose">
        Five representative MARL architectures were trained at the canonical point for
        20,000 episodes per seed and evaluated on 2,000 held-out episodes: on-policy
        actor–critic (MAPPO, R-MAPPO), value decomposition (QMIX), autoregressive
        coordination (MAT), and latent-committed exploration (MAVEN), with oracle-belief
        and structural controls. This is a coverage argument over the tested design space,
        not a leaderboard.
      </p>

      <TerminalBlock title="Architecture sweep at the strategic operating point" subtitle="W=25 · 5 seeds · 2000 held-out eps">
        {(() => {
          const grid = "1.6fr 130px 130px";
          const rows = [
            ["MAPPO (feedforward)",      "0.0265 ± 0.0156", "0.7428 ± 0.1143"],
            ["R-MAPPO (recurrent)",      "0.0079 ± 0.0035", "0.4001 ± 0.0862"],
            ["QMIX (value decomp.)",     "0.0353 ± 0.0546", "0.3460 ± 0.0688"],
            ["MAT (autoregressive)",     "0.0129 ± 0.0078", "0.4178 ± 0.0581"],
            ["MAVEN (latent explor.)",   "0.0105 ± 0.0147", "0.3213 ± 0.0873"],
            ["R-MAPPO + oracle belief",  "0.0005",          "0.48"],
            ["three-regime hybrid",      "0.7147",          "1.000"],
          ];
          return (
            <>
              <div style={{
                display: "grid", gridTemplateColumns: grid, gap: 8,
                color: "#8A8275", fontSize: 10, letterSpacing: "0.14em",
                textTransform: "uppercase", paddingBottom: 6,
              }}>
                <span>method</span>
                <span style={{ textAlign: "right" }}>vs. ε-greedy</span>
                <span style={{ textAlign: "right" }}>vs. random walk</span>
              </div>
              {rows.map(([m, a, b]) => {
                const hero = m === "three-regime hybrid";
                return (
                  <div key={m} style={{
                    display: "grid", gridTemplateColumns: grid, gap: 8,
                    fontVariantNumeric: "tabular-nums", alignItems: "baseline",
                  }}>
                    <span style={{ color: hero ? "#F4EEE2" : "#8A8275" }}>{m}</span>
                    <span style={{ textAlign: "right", color: hero ? "#6FBF73" : "#D85A4A" }}>{a}</span>
                    <span style={{ textAlign: "right" }}>{b}</span>
                  </div>
                );
              })}
              <div style={{ marginTop: 10, fontSize: 10, color: "#8A8275", letterSpacing: "0.06em" }}>
                Two bands, one split: 0.3213–0.7428 vs. random walk; 0.0079–0.0353 vs. the evasive evader
              </div>
            </>
          );
        })()}
      </TerminalBlock>

      <p className="t-prose">
        No tested architecture or paradigm family comes within an order of magnitude of the
        engineered controller&rsquo;s 0.7147. Worse, four of the five sit <em>below the
        zero-information floor</em> against random walk: P<sub>RW</sub> itself reaches
        0.607, above R-MAPPO, QMIX, MAT and MAVEN&rsquo;s 0.321–0.418. Only MAPPO exceeds
        it.
      </p>

      <p className="t-prose">
        That is not a search failure. All four reach a seen-rate comparable to
        MAPPO&rsquo;s — 75–82% against MAPPO&rsquo;s 83% — so the team finds the evader
        about as often as the one architecture that converts the sighting. Direct
        inspection localizes the deficit downstream, with a different mechanism per
        paradigm: the value-decomposition Q-networks assign near-uniform values across the
        five actions (spread of order 0.03 on Q-values of order −1.5), so the greedy policy
        defaults to one action most of the time; the recurrent actor&rsquo;s entropy
        collapses to near zero early and never recovers; the autoregressive
        architecture&rsquo;s entropy never collapses at all, never committing.
      </p>

      <p className="t-prose">
        <strong>Mundane explanations were ruled out.</strong> Learning curves against the
        strategic evader are flat from early training, a shared-observation audit found no
        interface bug, and learning-rate and width sweeps for QMIX and R-MAPPO left the
        same near-zero band. Substituting the <em>exact</em> team Bayesian posterior for the
        learned belief does not help either — R-MAPPO with oracle belief reaches 0.0005,
        which is evidence against belief quality being the bottleneck under these
        implementations. Potential-based reward shaping, tested as a control against sparse
        terminal reward, improved none of the four.<span className="t-fnref">³</span>
      </p>

      <SectionRule />

      {/* ── §6 funnel ────────────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 6</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>The seen → contact → capture funnel</h2>

      <p className="t-prose">
        Since r ≥ 1, Capture ⊆ Contact ⊆ Seen, so capture factors exactly into
        Pr(Seen) · Pr(Contact | Seen) · Pr(Capture | Contact). Instrumenting the three
        stages localizes where in the chain a policy fails, and the two conditional rates
        isolate each stage&rsquo;s conversion efficiency from the marginals, which otherwise
        conflate a stage&rsquo;s difficulty with how often the policy even reaches it.
      </p>

      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Method</th>
              <th style={thR}>S</th>
              <th style={thR}>C|S</th>
              <th style={thR}>K|C</th>
              <th style={thR}>S</th>
              <th style={thR}>C|S</th>
              <th style={thR}>K|C</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["QMIX",     "35±14", "37±20", "12±16", "75±4",  "72±5",  "64±9"],
              ["MAVEN",    "30±10", "31±17", "7±3",   "76±4",  "72±3",  "59±15"],
              ["MAT",      "34±4",  "27±4",  "13±6",  "79±4",  "78±4",  "67±3"],
              ["R-MAPPO",  "34±4",  "28±3",  "8±3",   "82±10", "76±6",  "63±4"],
              ["MAPPO",    "44±9",  "48±22", "11±4",  "83±8",  "92±3",  "97±2"],
              ["hybrid",   "89",    "100",   "80.4",  "100",   "100",   "100"],
            ].map((r, i) => (
              <tr key={i}>
                <td style={r[0] === "hybrid" ? { ...tdLabel, color: "var(--clay)" } : tdLabel}>{r[0]}</td>
                {r.slice(1).map((c, j) => (
                  <td key={j} style={r[0] === "hybrid" ? tdHighlight : tdR}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="t-caption" style={{ marginTop: 4 }}>
        Funnel stage rates (%), 20,000 training episodes/seed, n=2000 held-out eps × 5 seeds, mean ± 95% CI.
        Left three columns: vs. ε-greedy evader. Right three: vs. random walk.
        S = Seen; C|S = Pr(Contact | Seen); K|C = Pr(Capture | Contact).
      </p>

      <p className="t-prose">
        Against the strategic evader the largest absolute attrition is <em>before first
        sighting</em>: only 30–44% of episodes contain a sighting at all, against the
        hybrid&rsquo;s 89%. But downstream conversion is also poor and cannot be waved
        away as secondary — conditional on sighting, only 27–48% progress to contact
        (hybrid: 100%), and conditional on contact only 7–13% convert to capture
        (hybrid: 80%). Against random walk the pattern mostly inverts: sighting and
        closing are high while terminal conversion is the weak stage for four of five
        architectures, MAPPO excepted at 97 ± 2%.
      </p>

      <p className="t-prose">
        Two distinct gaps, so two published architectures were selected to target them —
        MAT for the random-walk closing gap via its causal-masked decoder, MAVEN for the
        strategic-evader search gap via episode-committed latents. Neither closed its
        targeted gap.
      </p>

      <SectionRule />

      {/* ── limits ───────────────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 7</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>What this does and does not show</h2>

      <p className="t-prose">
        Random-walk evaders create fake hardness that structured coverage closes; lightly
        randomized evasion exposes a large, scale-growing gap between posterior-free
        policies and a privileged reference. Across the tested configurations, learned
        policies do not approach the engineered controller. The funnel shows why:
        competence in easier encounters does not certify competence at creating, closing
        and converting encounters under hidden state.
      </p>

      <NoteBox>
        <NoteLine label="Limit 1.">
          P_FO is a privileged greedy reference, not a proof of the optimal
          full-observability value; the failure of tested configurations is a statement
          about those configurations and budgets, not an impossibility claim.
        </NoteLine>
        <NoteLine label="Limit 2.">
          Fixed-sensor and density-controlled scaling answer different questions and are
          not interchangeable.
        </NoteLine>
        <NoteLine label="Limit 3.">
          The engineered controller&rsquo;s advantage is itself scale-limited
          (0.7147 → 0.580 → 0.290), so the positive control does not certify scalability.
        </NoteLine>
      </NoteBox>

      <ReviewNotice>
        Under double-blind review; this page gives the question, protocol and headline
        numbers rather than the manuscript.
      </ReviewNotice>

      {/* ── footnotes ────────────────────────────────────────── */}
      <div style={{
        marginTop: 36, padding: "20px 22px",
        background: "var(--paper-2)", borderRadius: "var(--r-2)",
        boxShadow: "inset 0 0 0 1px var(--rule)",
      }}>
        <Eyebrow style={{ marginBottom: 10 }}>Footnotes</Eyebrow>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Footnote n="1">
            Which is the actual thesis, and it cuts against work I&rsquo;d have liked to
            report more favourably. Measuring first is cheaper than being wrong later.
          </Footnote>
          <Footnote n="2">
            The deterministic ε=0 evader is unsuitable as a difficulty knob: even a
            full-observability team never captures it, so it cannot separate policies.
            ε=0.05 is the smallest tested stochasticity at which the privileged reference
            is near-saturated.
          </Footnote>
          <Footnote n="3">
            Ng, Harada &amp; Russell (1999) shaping preserves optimal policies under the
            potential-based condition — a belief-entropy potential for the oracle-belief
            variant, a pursuer–evader-distance potential for the rest.
          </Footnote>
        </div>
      </div>
    </article>
  );
}
