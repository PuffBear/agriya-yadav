"use client";
import React from 'react';
import { Footnote, Eyebrow } from "@/components/Primitives";
import {
  TerminalBlock, SectionRule, PaperHeader, ReviewNotice,
  NoteBox, NoteLine,
  tableWrap, table, th, thR, td, tdR, tdLabel, tdHighlight,
} from "@/components/Paper";
import { CollapseBoundaryChart, HorizonSlideChart, LossAversionTransferChart } from "@/components/Charts";

export default function CoordinationCollapsePage() {
  return (
    <article className="container-prose" style={{ padding: "48px var(--s-7) 32px" }}>

      <PaperHeader
        eyebrow="02"
        venue="AAAI"
        status="under review"
        year="2026"
        title="Measuring coordination-collapse boundaries in reward-mixed cooperative MARL."
        authors={["A. YADAV", "ASHOKA UNIV."]}
        abstract={<>
          Cooperative MARL can settle into low-cooperation lazy-agent behavior when
          agents&rsquo; local incentives dominate the team objective. We study not only
          whether reward centralization mitigates this failure, but <em>where</em> a trained
          population crosses into a pre-specified collapse region. We sweep the local-to-team
          reward mixture w, estimate P(collapse | w), and report the midpoint w<sub>crit</sub>
          with bootstrap confidence intervals; on our primary supply-chain testbed
          w<sub>crit</sub> = 0.666 [0.635, 0.694]. Using this boundary instrument, we evaluate
          a loss-averse reward transform, separating it from value-function curvature, which
          moves the boundary in the opposite direction. Across four environment–algorithm
          combinations the loss-aversion direction persists, while longer training horizons
          move the boundary leftward.
        </>}
      />

      <p className="t-prose">
        That decentralized reward shaping cannot match centralized training is broadly
        accepted, and the lazy-agent and credit-assignment literature mitigates the
        pathology. What none of it supplies is the <em>location</em>. The closest
        phase-diagram studies place their critical points on environmental or
        opinion-dynamics axes rather than on reward structure, and none estimates a
        confidence-intervalled crossing in reward-centralization space for gradient-trained
        cooperative policies.
      </p>

      <p className="t-prose">
        So the question is twofold: does coordination collapse admit a measurable critical
        centralization threshold, and do prospect-theoretic reward transforms systematically
        shift it? The first is a measurement problem — the paper&rsquo;s primary
        contribution. The second is a question the instrument then makes answerable.
      </p>

      <SectionRule />

      {/* ── §1 instrument ────────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 1</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Building the instrument first</h2>

      <p className="t-prose">
        Within each sweep, agent i trains on the blended scalar
        x<sub>i</sub>(w) = (1−w)·r<sup>local</sup><sub>i</sub> + w·r<sup>global</sup>, so at
        w=0 the learner sees only its own reward and at w=1 only the team&rsquo;s. Turn w
        down far enough and an agent&rsquo;s private performance drowns out its
        contribution: cooperating earns no learnable signal and the lazy policy wins. Here
        w is not an optimizer hyperparameter but a structural property of the reward design.
      </p>

      <p className="t-prose">
        Three design choices make a reading trustworthy. The collapse label is a
        <em> behavioral</em> rule scored on held-out evaluation, not training reward, and it
        was pre-registered on the primary testbed — label, analysis code and probes
        committed before execution. Matched policies differ only in the scalar training
        signal, since the transform is applied after blending, outside the optimizer. And
        every w<sub>crit</sub> carries a bootstrap confidence interval.
      </p>

      <NoteBox>
        <NoteLine label="Supply chain:">collapse = 1[ S̄ &lt; 10 ∧ π̄ ≤ −127.1 ] — low/no ordering with poor profit</NoteLine>
        <NoteLine label="MPE Coop-Nav:">landmark occupancy below θ = 0.144 — agents cluster rather than cover</NoteLine>
        <NoteLine label="LBF foraging:">mean team return below θ = 0.626 — failure to cooperatively load food</NoteLine>
        <NoteLine label="Estimator:">P(collapse | w) = σ(b₀ + b₁w), w_crit = −b₀/b₁, 2,000-resample percentile bootstrap</NoteLine>
      </NoteBox>

      <p className="t-prose">
        Collapsed supply-chain runs pile up at the lazy-policy deterministic profit floor
        (≈ −128), so the profit clause is effectively a redundancy check on the base-stock
        condition rather than a tuned cutoff. Threshold robustness over estimable ±20%
        variants moves w<sub>crit</sub> by at most 0.015.
      </p>

      <p className="t-prose">
        The location is not an artifact of the logistic link. A probit link and isotonic
        (nonparametric monotone) regression reproduce w<sub>crit</sub> to within 0.02 at
        every λ on all three substrates, and the λ=1→7 shift is unchanged under all three.
        Where collapse is near-perfectly separated across adjacent w, Firth&rsquo;s
        bias-reduced logistic regression is used instead, agreeing with the bootstrap to
        within 0.019.
      </p>

      <p className="t-prose">
        One honesty note that shaped the whole framing: a fitted midpoint exists whenever
        the binary label varies with w, so &ldquo;collapse&rdquo; being a real dynamical
        regime had to be tested separately. Sarle&rsquo;s bimodality coefficient rises near
        the crossing but its CI straddles the threshold everywhere, and Hartigan&rsquo;s
        dip test never rejects unimodality (p ≥ 0.30). Neither substrate clears a formal
        multimodality test at these sample sizes — so the attractor language was dropped
        in favour of <em>threshold-defined behavioral crossing</em>
        throughout.<span className="t-fnref">¹</span>
      </p>

      <SectionRule />

      {/* ── §2 the boundary ──────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 2</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>The boundary, and the fact that it moves</h2>

      <p className="t-prose">
        At 300k steps on the supply-chain PPO substrate, collapse has a tightly estimated
        boundary at w<sub>crit</sub> = 0.666 [0.635, 0.694], with a 10–90 transition width
        of Δw = 0.199 — about a fifth of the mixture axis. A Firth slope test rejects the
        much weaker null of no relationship at all (p = 3.2 × 10⁻⁷). A resolved, non-flat
        crossing, not phase-like sharpness.
      </p>

      <CollapseBoundaryChart />

      <p className="t-prose">
        The boundary is finite-horizon, and this matters for anyone wanting to quote a
        number. It slides left log-linearly with the training budget:
      </p>

      <TerminalBlock title="Horizon slide" subtitle="supply chain · PPO · 20 seeds per w-cell">
        {(() => {
          const grid = "1fr 90px 90px 90px 90px";
          return (
            <>
              <div style={{
                display: "grid", gridTemplateColumns: grid, gap: 8,
                color: "#8A8275", fontSize: 10, letterSpacing: "0.14em",
                textTransform: "uppercase", paddingBottom: 6,
              }}>
                <span>training horizon</span>
                <span style={{ textAlign: "right" }}>150k</span>
                <span style={{ textAlign: "right" }}>300k</span>
                <span style={{ textAlign: "right" }}>450k</span>
                <span style={{ textAlign: "right" }}>900k</span>
              </div>
              <div style={{
                display: "grid", gridTemplateColumns: grid, gap: 8,
                fontVariantNumeric: "tabular-nums", alignItems: "baseline",
              }}>
                <span style={{ color: "#8A8275" }}>w_crit</span>
                <span style={{ textAlign: "right" }}>0.822</span>
                <span style={{ textAlign: "right", color: "#6FBF73" }}>0.666</span>
                <span style={{ textAlign: "right" }}>0.622</span>
                <span style={{ textAlign: "right" }}>0.573</span>
              </div>
              <div style={{ marginTop: 10, fontSize: 10, color: "#8A8275", letterSpacing: "0.06em" }}>
                w_crit = 2.44 − 0.138·ln T  (RMSE 0.027; all four CIs of width ≤ 0.073)
              </div>
            </>
          );
        })()}
      </TerminalBlock>

      <HorizonSlideChart />

      <p className="t-prose">
        Longer training rescues some runs that collapse at shorter horizons; at any fixed
        budget w<sub>crit</sub> is well-defined, so horizon dependence does not make it
        arbitrary. The log-linear fit is local to the tested range — a single order of
        magnitude — and summarizes the measured slide rather than extrapolating an
        asymptote. The slide is not a supply-chain artifact either: under MAPPO it recurs
        on MPE (0.82 → 0.68 over 2M → 8M steps) and LBF (0.33 → 0.20 over 1M → 4M), both
        with non-overlapping endpoints.
      </p>

      <SectionRule />

      {/* ── §3 decomposition ─────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 3</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Loss aversion raises it; curvature lowers it</h2>

      <p className="t-prose">
        The reward transform is prospect-theoretic in value-function form —
        v(x) = x<sup>α</sup> for gains, −λ(−x)<sup>β</sup> for losses — applied
        <em> after</em> blending, which keeps the optimizer and architecture bit-identical
        across matched conditions. The probability-weighting channel of full CPT is omitted,
        so only the scalar value transform varies.<span className="t-fnref">²</span>
      </p>

      <p className="t-prose">
        Because curvature is present in every loss-aversion condition, a curvature-only
        baseline is run so its effect is not silently folded into the λ shift. It turns out
        to matter a great deal, because the two components move the boundary in
        <em> opposite</em> directions:
      </p>

      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Condition</th>
              <th style={thR}>α, β</th>
              <th style={thR}>λ</th>
              <th style={thR}>w_crit</th>
              <th style={thR}>vs. null</th>
              <th style={thR}>vs. curv.</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Linear null (rep.)", "1, 1",       "1", "0.685", "—",       "—"],
              ["Curvature",          "0.88, 0.88", "1", "0.585", "−0.100 ✓", "—"],
              ["Loss aversion",      "0.88, 0.88", "3", "0.774", "+0.089 ✓", "+0.189 ✓"],
              ["Loss aversion",      "0.88, 0.88", "7", "0.854", "+0.169 ✓", "+0.269 ✓"],
            ].map((r, i) => (
              <tr key={i}>
                <td style={tdLabel}>{r[0]}</td>
                <td style={tdR}>{r[1]}</td>
                <td style={tdR}>{r[2]}</td>
                <td style={i === 3 ? tdHighlight : tdR}>{r[3]}</td>
                <td style={tdR}>{r[4]}</td>
                <td style={tdR}>{r[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="t-caption" style={{ marginTop: 4 }}>
        Supply chain, PPO, 300k. &ldquo;vs. null&rdquo; is the deployment shift a designer
        sees adopting the full transform; &ldquo;vs. curv.&rdquo; is the isolated
        loss-aversion effect. ✓ = difference CI excludes zero.
      </p>

      <p className="t-prose">
        This is the practical payoff of decomposing. Reported jointly as a single
        &ldquo;prospect-theoretic&rdquo; treatment the two effects partially cancel, and
        the loss-aversion effect is under-reported by roughly half — because here curvature
        <em> eases</em> coordination while loss aversion <em>hinders</em> it.
      </p>

      <p className="t-prose">
        <strong>The shift survives three matched controls.</strong> Re-centering the
        gain/loss reference from 0 to the empirical mean, median or −0.5σ preserves the
        λ=1→7 rise in every case (+0.228, +0.183, +0.193, all CIs excluding zero).
        Normalizing the transformed reward to common RMS across λ — removing the ≈4×
        magnitude growth — leaves a significant residual (+0.145 [0.107, 0.185]), so it is
        not reward amplification alone. And doubling the local or team reward moves the
        baseline boundary to 0.779 and 0.476 respectively, yet the λ direction persists in
        both arms.
      </p>

      <SectionRule />

      {/* ── §4 transfer ──────────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 4</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>The instrument travels; so does the direction</h2>

      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Setting</th>
              <th style={thR}>w_crit (λ=1)</th>
              <th style={thR}>w_crit (last)</th>
              <th style={thR}>Δ</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Supply · PPO",   "0.585 [.545, .626]", "0.854 [.837, .871]", "+0.269"],
              ["Supply · MAPPO", "0.796 [.742, .860]", "0.889 [.856, .917]", "+0.093"],
              ["MPE · MAPPO",    "0.78 [.73, .83]",    "0.89 [.84, .93]",    "+0.11"],
              ["LBF · MAPPO",    "0.26 [.20, .32]",    "0.83 [.78, .89]",    "+0.57"],
            ].map((r, i) => (
              <tr key={i}>
                <td style={tdLabel}>{r[0]}</td>
                <td style={tdR}>{r[1]}</td>
                <td style={tdR}>{r[2]}</td>
                <td style={tdHighlight}>{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="t-caption" style={{ marginTop: 4 }}>
        Within-sweep endpoints (α=β=0.88) with bootstrap 95% CIs, λ=1 → last interior
        (LBF: λ=4, which saturates against the w=1 ceiling beyond that).
      </p>

      <LossAversionTransferChart />

      <p className="t-prose">
        The loss-aversion direction transfers in every setting. Secondary structure does
        not: on MPE the curvature shift spans zero, and on LBF curvature moves the boundary
        <em> right</em> while the summary form misfits. So the portable claim is the CI&rsquo;d
        boundary and the loss-aversion direction — not the levels, the curvature sign, or
        the functional form.
      </p>

      <p className="t-prose">
        <strong>A scope condition worth stating plainly.</strong> On a discretized K=11
        action shell, value-based learners (QMIX, IQL) give a flat collapse rate — but PPO
        on the <em>same</em> shell also goes flat. So it is coarse discretization, not the
        value-based paradigm, that erases the boundary; MPE, natively discrete yet retaining
        a boundary, shows this is coarseness rather than discreteness per se. Only K=11 was
        tested, so the loss-aversion direction under value-based learners remains an open
        scope question, not a tested negative.
      </p>

      <SectionRule />

      {/* ── §5 minority node ─────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 5</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>One node can nearly set the boundary</h2>

      <p className="t-prose">
        The main sweep is homogeneous. Making a single node loss-averse while the rest stay
        risk-neutral traces a strictly monotone dose-response: w<sub>crit</sub> rises
        0.585 → 0.863 [0.846, 0.880], matching the <em>fully</em> loss-averse value
        (0.854) within noise by λ=7. Operationally, a team&rsquo;s collapse boundary is not
        an average over its agents — one node&rsquo;s reward design can nearly set it alone.
      </p>

      <p className="t-prose">
        The tempting next step is a topological story: the network is a branching DAG, so a
        node should matter more when its output reaches demand through a short path. Under
        the shared-parameter actor the observed ordering is indeed consistent with that.
        But a shared actor lets a biased node&rsquo;s gradient influence the others
        directly, so a second, independently-parameterized sweep was designed specifically
        to test it before drawing the conclusion.
      </p>

      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Position</th>
              <th style={thR}>Shared</th>
              <th style={thR}>Rank</th>
              <th style={thR}>Separate</th>
              <th style={thR}>Rank</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["node_2", "0.863 [.846, .880]", "1", "0.498 [.363, .581]", "5"],
              ["node_3", "0.800 [.780, .820]", "2", "0.714 [.683, .745]", "1"],
              ["node_5", "0.797 [.740, .857]", "3", "0.538 [.474, .591]", "4"],
              ["node_6", "0.726 [.682, .769]", "4", "0.547 [.495, .594]", "3"],
              ["node_4", "0.673 [.622, .720]", "5", "0.559 [.502, .608]", "2"],
            ].map((r, i) => (
              <tr key={i}>
                <td style={tdLabel}>{r[0]}</td>
                <td style={tdR}>{r[1]}</td>
                <td style={i === 0 ? tdHighlight : tdR}>{r[2]}</td>
                <td style={tdR}>{r[3]}</td>
                <td style={i === 0 ? tdHighlight : tdR}>{r[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="t-caption" style={{ marginTop: 4 }}>
        Position sweep, shared vs. separate actors (λ=7, n=20 per position per condition).
        Rank 1 = strongest effect on w_crit.
      </p>

      <p className="t-prose">
        The ordering does not survive. This is not a reshuffling: the previously dominant
        node drops from rank 1 to rank 5, and the previously weakest rises to rank 2. The
        coarse retail-adjacent-versus-split-path grouping fails to replicate too. So the
        position-specific ordering under a shared actor is substantially a shared-gradient
        artifact, and no topological reading is drawn from it. The dose-response itself —
        that one node can nearly set the boundary — holds regardless.
      </p>

      <SectionRule />

      {/* ── limits ───────────────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 6</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Scope</h2>

      <p className="t-prose">
        w<sub>crit</sub> is not universal. It is a measured property of an environment,
        learner, horizon, reward units and collapse label that tells a designer where
        <em> their</em> system crosses into collapse. The contribution is not the logistic
        midpoint but a comparative protocol for measuring how training choices and reward
        transformations move a system-level failure boundary, with uncertainty.
      </p>

      <NoteBox>
        <NoteLine label="Single-substrate.">
          The quantitative core belongs to one simulator; magnitudes and the summary form
          do not transfer.
        </NoteLine>
        <NoteLine label="Mechanism.">
          Sign is fixed but not magnitude — localizing w_crit from dynamics resisted two
          pre-committed probes, so a localizing observable is the clearest open problem.
        </NoteLine>
        <NoteLine label="Units.">
          The normalized incentive ratio only partially compensates for reward-unit
          dependence; a fully unit-invariant coordinate is open.
        </NoteLine>
        <NoteLine label="Dual use.">
          The minority-node result cuts both ways — hardening vs. targeted disruption —
          and is reported explicitly for auditability.
        </NoteLine>
      </NoteBox>

      <ReviewNotice>
        Under double-blind review; this page gives the question, protocol and headline
        numbers rather than the manuscript.
      </ReviewNotice>

      <div style={{
        marginTop: 36, padding: "20px 22px",
        background: "var(--paper-2)", borderRadius: "var(--r-2)",
        boxShadow: "inset 0 0 0 1px var(--rule)",
      }}>
        <Eyebrow style={{ marginBottom: 10 }}>Footnotes</Eyebrow>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Footnote n="1">
            LBF&rsquo;s raw team return does show nominally significant dip statistics at
            high w, but that traces to a ceiling effect — runs saturating at the
            metric&rsquo;s upper bound. Excluding ceiling-clipped runs removes the
            significance.
          </Footnote>
          <Footnote n="2">
            This is the difference from prior CPT-in-MARL work, which folds the transform
            into the actor–critic update and varies transform, probability weighting and
            optimizer together. Keeping it outside the optimizer is what lets a measured
            shift be attributed to the transform channel.
          </Footnote>
        </div>
      </div>
    </article>
  );
}
