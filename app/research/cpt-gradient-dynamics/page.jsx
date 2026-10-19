"use client";
import React from 'react';
import {
  SectionRule, PaperHeader, ReviewNotice, RequestFullWriteup,
} from "@/components/Paper";
import { SaddleNodeChart } from "@/components/Charts";

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

      <SectionRule />

      <SaddleNodeChart />

      <p className="t-prose">
        Two results sit either side of that picture. Under <em>identity</em> probability
        weighting, a volume-preservation argument rules out any asymptotically stable finite
        interior equilibrium — loss aversion and curvature alone cannot create one. Under
        nonlinear weighting the conclusion changes: a complete scalar reduction shows every
        interior stationary point is symmetric, with stability governed entirely by the
        derivative of one scalar function, and quarter-power weighting then exhibits the fold
        exactly.
      </p>

      <p className="t-prose">
        The bifurcation creates a stable/saddle <em>pair</em> rather than destabilizing an
        existing equilibrium — below the threshold there is no finite interior equilibrium
        at all. And the lottery convention turns out to be load-bearing rather than
        cosmetic: the same preferences evaluated conditionally keep a bilinear objective, so
        the interior obstruction still applies to them. Mixed-policy stabilization depends
        jointly on the distortion <em>and</em> on evaluating the reduced lottery.
      </p>

      <RequestFullWriteup
        paper="Prospect-theoretic gradient dynamics: stability and bifurcations in multi-agent learning"
        covers={[
          "The incompressibility lemma and its coordinate-change proof, with the boundary-transition threshold",
          "Theorem 3: the full scalar reduction of interior stationarity under general weighting",
          "Theorem 4 and the payoff-family extension, including when a positive-domain fold exists at all",
          "Why the terminal and conditional lottery conventions diverge, and what that rules out",
          "Numerical validation: matched objective baselines, the entropy positive control, and sampled score gradients",
          "The 80-digit inverse-S Prelec phase map, and the reachability caveat it exposes",
        ]}
      />

      <ReviewNotice>
        Submitted to AAMAS 2027; the manuscript stays off the site while it is under review.
      </ReviewNotice>
    </article>
  );
}
