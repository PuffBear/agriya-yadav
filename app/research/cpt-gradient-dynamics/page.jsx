"use client";
import React from 'react';
import { Footnote, Eyebrow } from "@/components/Primitives";
import {
  TerminalBlock, SectionRule, PaperHeader, ReviewNotice,
  NoteBox, NoteLine,
  tableWrap, table, th, thR, td, tdR, tdLabel, tdHighlight,
} from "@/components/Paper";

export default function CptGradientDynamicsPage() {
  return (
    <article className="container-prose" style={{ padding: "48px var(--s-7) 32px" }}>

      <PaperHeader
        eyebrow="03"
        venue="AAMAS 2027"
        status="submitted"
        year="2027"
        title="Prospect-theoretic gradient dynamics: stability and bifurcations in multi-agent learning."
        authors={["A. YADAV", "ASHOKA UNIV."]}
        abstract={<>
          How do cumulative prospect theory preferences change the dynamics of multi-agent
          gradient learning? We study independent logistic policies in finite stochastic
          games, separating value transformation from nonlinear probability weighting. With
          linear weighting, an incompressibility mechanism excludes asymptotically stable
          finite interior equilibria, although loss aversion can eliminate risky boundary
          coordination. Nonlinear weighting changes this conclusion. For a two-agent
          coordination game evaluated through its terminal-outcome lottery, we prove every
          interior stationary point is symmetric and reduce its stability to the derivative
          of a scalar function. With power weighting w(u) = u<sup>1/4</sup>, increasing loss
          aversion creates a stable mixed policy and a saddle at the exact saddle-node
          threshold λ<sub>SN</sub> = (5 − 1/√3)/2.
        </>}
      />

      <p className="t-prose">
        Multi-agent learning depends on both the objectives agents evaluate and the dynamics
        used to improve them. Introducing reference-dependent preferences therefore raises a
        dynamical question rather than merely a valuation one: which changes merely
        <em> revalue outcomes</em>, and which change the <em>local structure of the learning
        flow</em>?
      </p>

      <p className="t-prose">
        Two agents and two actions make the phase space two-dimensional without removing
        environmental uncertainty. It also exposes a distinction that is easy to blur: a
        pure policy is a boundary point of the probability square, whereas every finite
        logit represents a strictly mixed policy. Convergence to a pure policy must be
        analyzed separately from stability of a finite logit equilibrium.
      </p>

      <SectionRule />

      {/* ── §1 obstruction ───────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 1</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>A structural obstruction</h2>

      <p className="t-prose">
        The first result is negative and surprisingly general. <strong>Lemma 2</strong>: for
        a finite stochastic game with n agents, two actions each, independent logistic
        policies, fixed outcome distributions and fixed value transformations — with
        <em> identity</em> probability weights and exact unregularized logit-gradient ascent
        — no finite interior equilibrium is asymptotically stable.
      </p>

      <p className="t-prose">
        The mechanism is volume preservation. Identity weighting makes each objective an
        expectation of transformed outcomes, which is affine in the agent&rsquo;s own action
        probability. A smooth coordinate change on the open cube maps each interval
        diffeomorphically onto ℝ and makes the transformed dynamics divergence-free. An
        asymptotically stable equilibrium would attract a compact neighborhood of positive
        volume uniformly into arbitrarily small ones — contradiction.<span className="t-fnref">¹</span>
      </p>

      <p className="t-prose">
        So loss aversion and curvature alone cannot produce interior stability. What they
        <em> can</em> do is eliminate an attracting pure coordination policy at an
        explicitly calculable threshold: with λ &lt; 3<sup>α</sup> both coordinated corners
        attract and there is one interior saddle; at λ ≥ 3<sup>α</sup> every interior start
        converges to safe coordination and risky coordination stops attracting. A meaningful
        preference-induced transition need not take the form of an interior eigenvalue
        crossing.
      </p>

      <p className="t-prose">
        The number 3 is specific to the chosen gain/loss ratio, not a universal constant.
        For a general risky lottery the threshold is λ<sub>c</sub> = [ρ/(1−ρ)]·(G/L)<sup>α</sup> —
        the mechanism is simply the transformed payoff crossing the zero mismatch payoff.
      </p>

      <SectionRule />

      {/* ── §2 scalar reduction ──────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 2</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Nonlinear weighting changes the conclusion</h2>

      <p className="t-prose">
        The main result is a complete scalar characterization. <strong>Theorem 3</strong>:
        for the specified common-payoff terminal lottery under any smooth increasing
        weighting w, every interior stationary point is symmetric (p₁ = p₂ = x), one
        eigenvalue is always negative, and the other is governed entirely by the derivative
        of a scalar function R<sub>w</sub>(x). Positive derivative gives local asymptotic
        stability; negative gives a saddle; a nondegenerate extremum gives a fold.
      </p>

      <p className="t-prose">
        <strong>Theorem 4</strong> then exhibits the fold exactly. With α=1 and quarter-power
        weighting, λ<sub>SN</sub> = (5 − 1/√3)/2 ≃ 2.211325:
      </p>

      <div style={tableWrap}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Regime</th>
              <th style={th}>Stationarity and stability</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Expected return", "One interior saddle at p₁ = p₂ = 1/3; both coordinated corners attract."],
              ["Identity, λ < 3^α", "One interior saddle; both coordinated corners attract."],
              ["Identity, λ ≥ 3^α", "No finite interior equilibrium; all interior starts approach safe coordination."],
              ["Conditional CPT", "Any fixed weights: no asymptotically stable finite interior equilibrium."],
              ["Power, 0 < λ < λ_SN", "No finite interior equilibrium."],
              ["Power, λ = λ_SN", "One nonhyperbolic saddle-node at x = 1/3."],
              ["Power, λ_SN < λ < 5/2", "One stable mixed policy and one saddle."],
              ["Power, 5/2 ≤ λ < 3", "One interior saddle; stable branch has reached the boundary."],
              ["Power, λ ≥ 3", "No finite interior equilibrium."],
            ].map((r, i) => (
              <tr key={i}>
                <td style={i >= 5 && i <= 6 ? { ...tdLabel, color: "var(--clay)" } : tdLabel}>{r[0]}</td>
                <td style={td}>{r[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="t-caption" style={{ marginTop: 4 }}>
        Proved regimes for the specified game and learning rule. &ldquo;Interior&rdquo;
        means finite logits; boundary statements refer to the closed probability square.
      </p>

      <p className="t-prose">
        The theorem creates a stable/saddle <em>pair</em> rather than changing the stability
        of one persisting equilibrium — near the fold the branches separate as
        x<sub>±</sub> = 1/3 ± √(4δ / 5√3) + O(δ). This extends exactly to a payoff family:
        with risky outcomes +G and −L against safe +S, the fold stays at x = 1/3 with
        λ<sub>SN</sub> = (G − S − S/√3)/L, and a positive-domain saddle-node requires
        G &gt; S(1 + 1/√3).
      </p>

      <SectionRule />

      {/* ── §3 lottery convention ────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 3</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>The lottery convention is load-bearing</h2>

      <p className="t-prose">
        This is the part I find most interesting, because it is a modelling choice that
        looks innocuous and is not. Under the <em>ex ante terminal-outcome</em> convention,
        the agent evaluates the reward distribution induced by the complete randomized
        policy and the environmental draw. Under the <em>conditional</em> convention, it
        evaluates each joint action&rsquo;s lottery and averages after.
      </p>

      <p className="t-prose">
        Under identity weighting the law of total expectation makes the two identical — same
        vector field, same threshold, for any fixed curvature and loss aversion. Under
        nonlinear weighting they diverge, and decisively: the conditional objective remains
        <em> bilinear</em>, so the interior obstruction of Lemma 2 still applies to it even
        with nonlinear weights. Mixed-policy stabilization depends jointly on the distortion
        <em> and</em> on evaluating the reduced lottery. It is impossible for the
        corresponding conditional objective.
      </p>

      <p className="t-prose">
        One further structural note: if agents share identical CPT parameters and reference
        point, the dynamics are Euclidean gradient ascent on a common potential, so
        dJ/dt ≥ 0 and there are no nonconstant periodic orbits — and at a smooth finite
        equilibrium the Jacobian is a symmetric Hessian, so no Hopf bifurcation. Oscillations
        cannot be obtained by tuning a shared CPT objective in this model.
      </p>

      <SectionRule />

      {/* ── §4 numerics ──────────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 4</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Numerical validation</h2>

      <p className="t-prose">
        Five objectives were integrated from a matched start under the same game and logit
        rule. Expected return, value-only and conditional CPT all have interior saddles and
        run to the boundary. Entropy-regularized expected return and terminal CPT approach
        stable mixed policies — entropy is included deliberately as a <em>positive
        control</em>, since mixed-policy attraction is not unique to CPT. The distinctive
        claim is the unregularized preference-induced fold and the contrast between lottery
        conventions, not an algorithmic performance advantage.
      </p>

      <TerminalBlock title="Matched objective baselines" subtitle="DOP853 to T=2000 · start (0.2, 0.3)">
        {(() => {
          const grid = "1.4fr 110px 1fr";
          const rows = [
            ["Expected return",   "0.33333", "interior saddle → boundary"],
            ["Value only",        "0.58824", "interior saddle → boundary"],
            ["Conditional CPT",   "0.45929", "interior saddle → boundary"],
            ["EU + entropy",      "0.59795", "stable (λ_max −0.30743)"],
            ["Terminal CPT",      "0.11604", "stable (λ_max −0.010557)"],
          ];
          return (
            <>
              <div style={{
                display: "grid", gridTemplateColumns: grid, gap: 8,
                color: "#8A8275", fontSize: 10, letterSpacing: "0.14em",
                textTransform: "uppercase", paddingBottom: 6,
              }}>
                <span>objective</span>
                <span style={{ textAlign: "right" }}>stationary p</span>
                <span style={{ textAlign: "right" }}>outcome</span>
              </div>
              {rows.map(([o, p, out]) => {
                const stable = out.startsWith("stable");
                return (
                  <div key={o} style={{
                    display: "grid", gridTemplateColumns: grid, gap: 8,
                    fontVariantNumeric: "tabular-nums", alignItems: "baseline",
                  }}>
                    <span style={{ color: o === "Terminal CPT" ? "#F4EEE2" : "#8A8275" }}>{o}</span>
                    <span style={{ textAlign: "right" }}>{p}</span>
                    <span style={{ textAlign: "right", color: stable ? "#6FBF73" : "#D85A4A" }}>{out}</span>
                  </div>
                );
              })}
              <div style={{ marginTop: 10, fontSize: 10, color: "#8A8275", letterSpacing: "0.06em" }}>
                CPT conditions: α = 1, λ = 2.3, quarter-power weights · tolerances 1e−9 / 1e−11
              </div>
            </>
          );
        })()}
      </TerminalBlock>

      <p className="t-prose">
        A score-gradient sampler with exact cumulative weights tests the mechanism beyond
        exact-gradient trajectories. For each batch size in {"{64, 256, 1024}"}, 40
        independent seeds run 20,000 updates: all 120 endpoints land within 0.02 of the
        equilibrium, with median errors 0.00446, 0.00206 and 0.00121. This is local
        finite-horizon concentration evidence — it does not establish global stochastic
        convergence, and the estimator is an oracle-weight one, not model-free CPT learning.
      </p>

      <h3 style={{ fontSize: 18, marginTop: 32, marginBottom: 10 }}>The inverse-S phase map</h3>

      <p className="t-prose">
        To test whether stabilization is specific to global concavity, 181 Prelec exponents
        × 249 loss-aversion values were swept — 45,069 cells. Stable/saddle pairs occur in
        42,926 of them, and at <em>every</em> sampled exponent some positive λ &lt; 5/2 admits
        a stable mixed policy. So the mechanism is not confined to globally concave
        weighting.
      </p>

      <p className="t-prose">
        The sweep also exposes a practical limitation worth stating, because it is the kind
        of thing that is easy to leave out. As the exponent approaches one, the fold
        approaches probabilities below double precision — roots had to be computed in
        log-probability coordinates at 80 decimal digits, and at γ = 0.95 the fold sits near
        log₁₀x = −227,696. Mathematically interior; indistinguishable from a boundary policy
        at ordinary floating-point precision.<span className="t-fnref">²</span>
      </p>

      <SectionRule />

      {/* ── limits ───────────────────────────────────────────── */}
      <Eyebrow style={{ marginBottom: 10 }}>§ 5</Eyebrow>
      <h2 style={{ fontSize: 26, marginBottom: 12 }}>Scope</h2>

      <NoteBox>
        <NoteLine label="What is proved:">
          an exact mechanism — evaluating a reduced lottery with nonlinear weights can
          create an interior attractor and saddle as loss aversion varies, while conditional
          evaluation preserves the affine-objective obstruction.
        </NoteLine>
        <NoteLine label="Not claimed:">
          an algorithmic performance advantage, a new CPT policy-gradient theorem, a new
          incompressibility principle, or a global basin classification.
        </NoteLine>
        <NoteLine label="Untested:">
          function approximation, estimated return distributions, changing state visitation,
          and deep MARL.
        </NoteLine>
        <NoteLine label="Transfer:">
          a threshold from this finite game should not be carried to another environment
          without an explicit model correspondence.
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
            This is a specialization of the score-dynamics mechanism behind recurrence
            results for regularized learning in zero-sum settings, not a new principle.
            The barrier here diverges at both endpoints, unlike the finite continuous
            regularizers usually assumed, so the interior proof is given directly rather
            than importing regret or recurrence guarantees.
          </Footnote>
          <Footnote n="2">
            Which is a nice reminder that &ldquo;exists in the interior&rdquo; and
            &ldquo;reachable by a learner in floating point&rdquo; are different
            properties.
          </Footnote>
        </div>
      </div>
    </article>
  );
}
