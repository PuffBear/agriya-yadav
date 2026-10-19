"use client";
import React from 'react';
import {
  SectionRule, PaperHeader, ReviewNotice, RequestFullWriteup,
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
        agreement can concentrate the whole team on an obsolete direction. A particle
        captured by two trajectories still contributes only one unit of reward.
      </p>

      <SectionRule />

      <PrecisionUtilityChart />

      <p className="t-prose">
        The existence result is proved directly from contact geometry, with the same policy
        map in both arms — so the difference is the pooling, not the controller. Pooling
        wins on the estimator at both lags and loses badly on the task when the estimate is
        stale, because a small probability that <em>one</em> collector points usefully can
        outweigh lowering every collector&rsquo;s mean squared error. Alignment is not
        coverage: lag and angular alignment alone provably do not determine capture reward.
      </p>

      <PolicyMatchedChart />

      <p className="t-prose">
        The canonical system needs a more qualified reading, and the paper gives it one.
        After auditing an action-rule confound in the inherited experiment, a policy-matched
        grid supports the precision and synchronization predictions — but the reward
        reversal does not resolve, and neither does the anticipated diversity rescue. The
        construction proves the phenomenon is possible; it is not claimed to be typical.
      </p>

      <RequestFullWriteup
        paper="When more accurate shared beliefs hurt: memory, diversity, and multi-agent capture geometry"
        covers={[
          "The exact opportunity-minus-redundancy decomposition, and the obstruction to a two-variable closure",
          "Theorem 4.2 in full: the four-collector construction and its exact finite-distribution values",
          "The audit of the legacy experiment, and why its often-cited ratio does not identify a critical lag",
          "The policy-matched diagnostic grid across both rotation rates and all six memory lengths",
          "The correlation-versus-noise intervention, and the frozen-state identity behind it",
          "What would be needed to validate a transferable threshold — stated as open, not done",
        ]}
      />

      <ReviewNotice>
        Submitted to AAMAS 2027; the manuscript stays off the site while it is under review.
      </ReviewNotice>
    </article>
  );
}
