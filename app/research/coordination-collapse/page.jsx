"use client";
import React from 'react';
import {
  SectionRule, PaperHeader, ReviewNotice, RequestFullWriteup,
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
        pathology. What none of it supplies is the <em>location</em>. The question here is
        twofold: does coordination collapse admit a measurable critical centralization
        threshold, and do prospect-theoretic reward transforms systematically shift it? The
        first is a measurement problem — the paper&rsquo;s primary contribution. The second
        is a question the instrument then makes answerable.
      </p>

      <SectionRule />

      <CollapseBoundaryChart />

      <p className="t-prose">
        At a fixed training budget the boundary is tightly estimated, with a 10–90 transition
        width of about a fifth of the mixture axis — a resolved, non-flat crossing rather
        than phase-like sharpness. Three independent estimators agree to within 0.02.
      </p>

      <HorizonSlideChart />

      <p className="t-prose">
        It is also finite-horizon, which matters for anyone wanting to quote a number: the
        boundary slides left log-linearly with the training budget, and the same slide
        recurs in both transfer environments under a centralized critic. At any fixed budget
        w<sub>crit</sub> is well-defined, so horizon dependence does not make it arbitrary —
        but a threshold without its budget is meaningless.
      </p>

      <LossAversionTransferChart />

      <p className="t-prose">
        Loss aversion moves the boundary right and value curvature moves it left, which is
        why the two are decomposed rather than reported as one prospect-theoretic treatment:
        folded together they partially cancel, under-reporting the loss-aversion effect by
        roughly half. The direction transfers across all four environment–algorithm
        combinations; the levels, the curvature sign and the functional form do not.
      </p>

      <RequestFullWriteup
        paper="Measuring coordination-collapse boundaries in reward-mixed cooperative MARL"
        covers={[
          "The instrument: pre-registered collapse labels, the estimator, and the bootstrap and Firth CI machinery",
          "Why the attractor language was dropped — the bimodality and dip tests that failed to reject unimodality",
          "The curvature / loss-aversion decomposition table, and the three matched controls it survives",
          "Transfer across supply chain, MPE and LBF, and the action-granularity scope condition",
          "The minority-node result: one loss-averse node nearly setting the team boundary",
          "The deconfounded position sweep that rules out a topological reading of it",
        ]}
      />

      <ReviewNotice>
        Under double-blind review, so the manuscript itself stays off the site for now.
      </ReviewNotice>
    </article>
  );
}
