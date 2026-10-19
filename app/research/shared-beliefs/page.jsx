"use client";
import React from 'react';
import { Footnote, Eyebrow } from "@/components/Primitives";
import {
  TerminalBlock, SectionRule, PaperHeader, ReviewNotice,
  NoteBox, NoteLine,
  tableWrap, table, th, thR, td, tdR, tdLabel, tdHighlight,
} from "@/components/Paper";
import { PrecisionUtilityChart, PolicyMatchedChart } from "@/components/Charts";

export default function SharedBeliefsPage() {
  return (
    <article className="container-prose" style={{ padding: "48px var(--s-7) 32px" }}>

      <PaperHeader
        eyebrow="04"
        venue="AAMAS 2027"
        status="submitted"
        year="2027"
        title="When more accurate shared beliefs hurt: memory, diversity, and multi-agent capture geometry."
        authors={["A. YADAV", "ASHOKA UNIV."]}
        abstract={<>
          Pooling noisy observations improves estimation precision, but the resulting
          agreement also changes how a team explores. Can a more accurate shared belief
          reduce collective task performance? We study this through rotating-field particle
          collection and a tractable capture-geometry model. We derive an exact decomposition
          of unique capture opportunity into individual opportunities minus redundancy, and
          prove that lag and angular alignment alone do not determine capture reward. An
          explicit four-collector construction realizes the paradox with an identical
          movement rule: pooling lowers angular MSE at both zero and positive lag, while its
          capture advantage reverses. An audit of the earlier experiments identifies
          different action rules in the shared and independent arms, separating those
          observations from evidence about communication alone.
        </>}
      />

      <p className="t-prose">
        Averaging independent observations reduces estimation variance, which makes a shared
        estimate an attractive input to every agent&rsquo;s policy. But statistical
        improvement does not by itself order team rewards. If several agents act on the same
        estimate their errors become correlated; if the estimate summarizes the past, that
        agreement can concentrate the whole team on an obsolete direction.
      </p>

      <p className="t-prose">
        The question is whether pooling can retain its estimation advantage while losing its
        task advantage — that is, whether MSE<sub>S</sub> &lt; MSE<sub>I</sub> and
        J<sub>S</sub> &lt; J<sub>I</sub> can hold simultaneously. It matters in search and
        collection because a particle captured by two trajectories still contributes only
        one unit of reward. A reduction in individual error need not compensate for lost
        opportunities elsewhere.
      </p>

      <SectionRule />

      {/* ── §1 decomposition ─────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 1</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Opportunity minus redundancy</h2>

      <p className="t-prose">
        Fix the pre-transition history. For each surviving particle let I<sub>nm</sub>
        indicate contact with collector m along its candidate reflected path, before
        exclusive ownership, and K<sub>n</sub> = Σ<sub>m</sub> I<sub>nm</sub>. Since
        1{"{K ≥ 1}"} = K − (K−1)<sub>+</sub>, conditional expectation gives an exact
        identity:
      </p>

      <TerminalBlock title="Exact reward decomposition" subtitle="no independence between contact events required">
        <div style={{ lineHeight: 2 }}>
          <div><span style={{ color: "#8A8275" }}>j_t</span> = U_t − Q_t</div>
          <div><span style={{ color: "#6FBF73" }}>U_t</span> = Σ_n Σ_m Pr(I_nm = 1 | H_t)
            <span style={{ color: "#8A8275" }}>&nbsp;&nbsp;← individual opportunity</span></div>
          <div><span style={{ color: "#D85A4A" }}>Q_t</span> = Σ_n E[(K_n − 1)_+ | H_t]
            <span style={{ color: "#8A8275" }}>&nbsp;&nbsp;← redundancy, all orders of overlap</span></div>
        </div>
      </TerminalBlock>

      <p className="t-prose">
        Redundancy here is in capture units and includes every order of overlap; pairwise
        overlaps are only the leading inclusion–exclusion approximation, and dropping higher
        terms need not be accurate. This is the frame the rest of the paper argues in,
        because it separates &ldquo;how much the team could catch&rdquo; from &ldquo;how
        much of that it wastes catching the same thing twice.&rdquo;
      </p>

      <p className="t-prose">
        <strong>Proposition 4.1</strong> then closes off the tempting shortcut: lag and
        angular alignment alone do <em>not</em> determine unique capture reward, even for
        deterministic straight paths and a single stationary particle. The proof is a
        two-line translation argument — fix all headings, hence lag and alignment, place the
        particle inside one swept disc for one capture, then translate every collector so
        the discs miss it for zero. Identical angular variables, different rewards. Alignment
        is not coverage.<span className="t-fnref">¹</span>
      </p>

      <SectionRule />

      {/* ── §2 construction ──────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 2</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>The four-collector reversal</h2>

      <p className="t-prose">
        The existence result is proved directly from contact geometry, with no linear reward
        ansatz. Four collectors start co-located, use the same fixed centroid direction and
        the same blend, and move along straight paths; a stationary target sits at the end
        of the nominal path. Each agent holds an equal-magnitude noisy historical upstream
        vector. Independent agents use their own; shared agents normalize the arithmetic
        average. <em>Same policy map in both arms.</em>
      </p>

      <p className="t-prose">
        <strong>Theorem 4.2</strong>: shared estimation MSE is strictly smaller at both zero
        lag and lag d, while the capture ordering reverses between them.
      </p>

      <PrecisionUtilityChart />

      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Lag</th>
              <th style={thR}>MSE shared</th>
              <th style={thR}>MSE indep.</th>
              <th style={thR}>J shared</th>
              <th style={thR}>J indep.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdLabel}>β = 0 (fresh)</td>
              <td style={tdHighlight}>0.099315</td>
              <td style={tdR}>0.36</td>
              <td style={tdHighlight}>6/16</td>
              <td style={tdR}>0</td>
            </tr>
            <tr>
              <td style={tdLabel}>β = d (stale)</td>
              <td style={tdHighlight}>0.459315</td>
              <td style={tdR}>0.72</td>
              <td style={tdR}>1/16</td>
              <td style={tdHighlight}>15/16</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="t-caption" style={{ marginTop: 4 }}>
        Exact finite-distribution evaluations over all 2⁴ input configurations — not sampled
        estimates, so confidence intervals would be inappropriate. Shared MSE is lower in
        both rows; the reward ordering flips.
      </p>

      <p className="t-prose">
        The intuition the algebra encodes: at zero lag, independent headings always miss and
        only the pooled heading lands. At stale lag, an independent collector hits whenever
        its own error happens to point the right way, so the team succeeds unless all four
        err together — while the shared heading hits only in the single configuration where
        every error agrees. Pooling converts a team that <em>contains</em> an
        exactly-directed collector into a team that misses together.
      </p>

      <p className="t-prose">
        A small probability that at least one collector takes a useful direction can
        outweigh a reduction in every collector&rsquo;s mean squared error. That is the
        whole phenomenon. It proves possibility under a frozen scene and a discrete
        historical-summary distribution — not typicality in the canonical reset
        distribution.
      </p>

      <SectionRule />

      {/* ── §3 audit ─────────────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 3</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Auditing the inherited evidence</h2>

      <p className="t-prose">
        An earlier study reported a memory-dependent shared-minus-independent reward
        difference, and it motivated this work. Auditing its implementation turned up a
        confound that changes what it can support: the shared arm blends an upstream
        estimate with local particle density, while the independent arm follows its velocity
        estimate directly. The arms differ in <em>action rule</em>, not only in information.
      </p>

      <p className="t-prose">
        A second issue is quoting discipline. The often-cited ratio comes from the last
        <em> significant</em> window, which is a sample-size-dependent quantity, and the
        windows where expected reward changes sign are different ones — at the faster
        rotation rate the two differ by roughly an order of magnitude. A deterministic
        rotating field also has oscillatory correlation, not exponential decorrelation, so
        the natural timescale is not a decorrelation time.
      </p>

      <p className="t-prose">
        A shared-memory effect can act through at least three routes: marginal direction
        error, dependence among commands changing redundant opportunity, or simply a
        different controller. The legacy contrast mixes the third with the first two.
        Identical random forcing removes environmental sampling differences but cannot
        remove a policy difference. So the old data is retained as motivation and relabelled
        <em> legacy</em>, rather than presented as a communication-only intervention.
      </p>

      <SectionRule />

      {/* ── §4 new diagnostics ───────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 4</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Policy-matched diagnostics</h2>

      <p className="t-prose">
        The replacement comparison holds the policy map fixed — both arms use the identical
        blend, density fallback and cancellation convention, and only the historical
        velocity input is pooled. Two rotation rates, six window lengths, 32 matched seeds
        per cell, fixed before outcomes were inspected.
      </p>

      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>ω</th>
              <th style={thR}>L</th>
              <th style={thR}>Captures (S − I)</th>
              <th style={thR}>Angular MSE (S − I)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1.5", "1",  "+1.44 [0.32, 2.56]",  "−0.88 [−0.94, −0.82]"],
              ["1.5", "10", "+0.38 [−0.60, 1.35]", "−0.41 [−0.46, −0.36]"],
              ["1.5", "67", "+0.41 [−0.65, 1.46]", "−0.19 [−0.23, −0.14]"],
              ["5",   "3",  "+1.75 [0.86, 2.64]",  "−0.87 [−0.91, −0.83]"],
              ["5",   "45", "−0.28 [−1.16, 0.60]", "−0.16 [−0.27, −0.05]"],
              ["5",   "67", "−0.47 [−1.40, 0.46]", "−0.01 [−0.14, 0.13]"],
            ].map((r, i) => (
              <tr key={i}>
                <td style={tdLabel}>{r[0]}</td>
                <td style={tdR}>{r[1]}</td>
                <td style={tdR}>{r[2]}</td>
                <td style={tdR}>{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="t-caption" style={{ marginTop: 4 }}>
        Selected cells from the 12-cell grid, n = 32 paired seeds each; brackets are
        pointwise 95% paired-t intervals. MSE in rad².
      </p>

      <PolicyMatchedChart />

      <p className="t-prose">
        The precision and synchronization predictions hold up: shared MSE is lower with
        entirely negative intervals in 11 of 12 cells, and action alignment is higher with
        entirely positive intervals in all 12. The reward reversal does <em>not</em>
        resolve. No tested cell has both an entirely negative reward interval and an
        entirely negative MSE-difference interval, so this grid does not establish the
        conjunction in the canonical system — even though the geometric construction
        establishes it exactly in its own stated model.
      </p>

      <p className="t-prose">
        Negative point estimates are not promoted to a confirmed failure regime, and because
        the grid does not define a validated transferable critical lag, no universal
        crossing is fitted and the legacy coefficient is not reported as a theory
        prediction.<span className="t-fnref">²</span>
      </p>

      <h3 style={{ fontSize: 18, marginTop: 32, marginBottom: 10 }}>Intervening on correlation, not just noise</h3>

      <p className="t-prose">
        Adding independent perturbations to a shared direction changes both action diversity
        and individual command error, so a reward change under that intervention alone
        cannot isolate inter-agent correlation. The fix is to compare two interventions with
        matching per-agent perturbation distributions but different cross-agent dependence:
        one where each collector gets its own draw, one where all get the same. On a fixed
        state their individual opportunity is equal in expectation, so the decomposition
        gives a direct prediction — the capture difference <em>is</em> the redundancy
        difference.
      </p>

      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>L</th>
              <th style={th}>Contrast</th>
              <th style={thR}>Mean [95% interval]</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["3",  "diverse − shared",  "+0.09 [−0.41, 0.60]"],
              ["3",  "common − shared",   "−0.12 [−0.60, 0.35]"],
              ["3",  "diverse − common",  "+0.22 [−0.19, 0.63]"],
              ["20", "diverse − shared",  "−0.31 [−0.78, 0.16]"],
              ["20", "common − shared",   "−0.31 [−0.80, 0.18]"],
              ["20", "diverse − common",  "+0.00 [−0.48, 0.48]"],
            ].map((r, i) => (
              <tr key={i}>
                <td style={tdLabel}>{r[0]}</td>
                <td style={td}>{r[1]}</td>
                <td style={tdR}>{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="t-caption" style={{ marginTop: 4 }}>
        Closed-loop perturbation contrasts, ω = 1.5, n = 32 paired seeds. All contrasts are
        reported, including those that do not resolve a sign.
      </p>

      <p className="t-prose">
        Neither perturbation comparison resolves a capture benefit at either tested memory.
        The anticipated stale-memory diversity rescue is not established by these runs. A
        diversity-rescue claim would need a positive diverse-minus-shared effect in a
        separately established stale failure regime; a correlation-specific one would
        additionally need a positive diverse-minus-common effect or direct frozen-state
        redundancy evidence. Those are distinct criteria, and the point estimates alone do
        not meet either.
      </p>

      <SectionRule />

      {/* ── limits ───────────────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 5</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>What is settled and what is not</h2>

      <p className="t-prose">
        The construction answers the conceptual question affirmatively: a team can possess a
        more accurate shared estimate and collect less. Precision and coordination improve
        different aspects of the system — pooling concentrates the estimate, while the task
        rewards a <em>union</em> of capture events. The full particle system needs a more
        qualified reading: the new diagnostics remove the action-map confound and support
        the precision and synchronization links, but do not resolve a reward reversal or a
        diversity rescue in the canonical regime.
      </p>

      <NoteBox>
        <NoteLine label="Settled:">
          existence, exactly, under the stated frozen-scene model — and the obstruction to
          a universal two-variable (lag, alignment) closure.
        </NoteLine>
        <NoteLine label="Open:">
          a causal explanation of failure in the canonical parameter regime; validating the
          spatial closure, effective observation age, and intervention response.
        </NoteLine>
        <NoteLine label="Design implication:">
          assess freshness and induced behavior jointly — a shared estimator can be kept
          while the policy controls command correlation through offsets, task allocation, or
          local information.
        </NoteLine>
      </NoteBox>

      <ReviewNotice>
        Submitted to AAMAS 2027; this page gives the question, results and scope rather
        than the manuscript.
      </ReviewNotice>

      <div style={{
        marginTop: 36, padding: "20px 22px",
        background: "var(--paper-2)", borderRadius: "var(--r-2)",
        boxShadow: "inset 0 0 0 1px var(--rule)",
      }}>
        <Eyebrow style={{ marginBottom: 10 }}>Footnotes</Eyebrow>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Footnote n="1">
            There is still a geometric basis for a first angular harmonic in a dilute
            unbounded approximation — but diffusion, nonuniform survivor density,
            boundaries, and the canonical drift-to-speed ratio make that linearization a
            motivation to test rather than a calibrated law.
          </Footnote>
          <Footnote n="2">
            A missing positive result is not a negative result. Stating that explicitly was
            the point of fixing the diagnostic grid before looking at its outcomes.
          </Footnote>
        </div>
      </div>
    </article>
  );
}
