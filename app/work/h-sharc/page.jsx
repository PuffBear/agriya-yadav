"use client";
import React from 'react';
import { SeverityCurves, Flow } from "@/components/WorkFigures";
import { WriteupHeader, H2, H3, P, List, DataTable, Code, RepoLink } from "@/components/Writeup";

const REPO = "https://github.com/PuffBear/ShARC";

export default function HSharcPage() {
  return (
    <article className="container-prose" style={{ padding: "48px var(--s-7) 32px" }}>

      <WriteupHeader
        title="h-ShARC: teaching a routing policy to care about its worst days"
        github={REPO}
        year="2025 — 2026"
        kind="Research project"
        words="1,500"
        tags={["RL", "Combinatorial optimisation", "Risk"]}
        note={<>Note: this is work in progress. The results below are from one setting — 60
          instances, two vehicles — and the comparison against classical solvers under shift
          is not finished. I use “policy” and “model” interchangeably.</>}
      />

      <H2>First, a real-world scenario</H2>
      <P>
        A city plans its snow-clearing or waste-collection routes the night before. Each
        street that needs service is an <em>arc</em>, each truck has a capacity, and some
        streets matter more than others: the hospital road is cleared before the cul-de-sac.
        The plan is built from yesterday’s numbers.
      </P>
      <P>
        Then the day happens. There is more snow than forecast, so every street takes longer
        and fills the truck faster. Traffic makes travel between streets slower. A couple of
        streets are closed. All three change at once, and they are correlated — a bad storm
        moves all of them in the bad direction together.
      </P>
      <P>
        A route that is optimal on the forecast can be very poor on the day. And for a
        service like this, the average day is not what the operator worries about. They
        worry about the days when the last truck gets back hours late.
      </P>

      <H2>Motivation</H2>
      <P>
        Neural solvers for routing problems are almost all trained to minimise expected cost
        on instances drawn from one fixed distribution. That leaves two gaps. They are tested
        on the distribution they were trained on, and they are scored on the mean. I wanted a
        policy that is trained on perturbed instances and scored on its tail.
      </P>
      <P>
        Arc routing makes this more interesting than the usual node-routing benchmarks,
        because the hierarchical version has priority classes baked into the objective, and
        because as far as I could find nobody had put a risk-sensitive neural policy on it.
        ShARC is the attempt: <em>shift-robust arc routing</em>, with the h for the
        hierarchical problem.
      </P>

      <H2>The problem</H2>
      <P>
        The hierarchical capacitated arc routing problem (HCARP) gives a graph, a depot, a
        fleet of capacity-limited vehicles, and a set of required arcs, each with a demand, a
        service time and a priority class from 1 to 3. Each class has a completion time —
        the moment the last arc of that class is served. The objective is lexicographic:
        finish class 1 as early as possible, then class 2, then class 3. In the environment
        that becomes a single reward with widely separated weights:
      </P>
      <Code>{`reward = −(1e4·T₁ + 1e2·T₂ + 1·T₃)`}</Code>

      <H3>The shift model</H3>
      <P>
        Each episode draws a shift along several axes at once, scaled by a severity φ
        between 0 and 1:
      </P>
      <DataTable
        head={["Axis", "Effect", "Range at φ = 1"]}
        rows={[
          ["Demand", "Scales how much each arc fills the vehicle", "± 30%"],
          ["Travel cost", "Scales time between arcs", "± 30%"],
          ["Service time", "Scales time spent on each arc", "± 30%"],
          ["Availability", "Each required arc survives with probability p", "p as low as 0.7"],
        ]}
        caption="Training samples shifts in both directions. Evaluation uses a harder mode where demand, cost and service time only ever get worse."
      />
      <P>
        Because the axes move together, the set of possible worlds is not a simple box
        around the nominal instance. That is what makes the theory hard, and it is also why
        a policy cannot hedge one axis at a time.
      </P>

      <H2>The method</H2>
      <P>There are three pieces.</P>

      <Flow
        label="Architecture: the arcs of an instance go through a transformer encoder; a pointer decoder, which also receives the shift vector and the running budget, picks the next arc; the choice updates the environment and the loop repeats."
        caption="The policy. The decoder is the only part that sees the shift and the running budget, and it is trained on the worst tenth of rollouts."
        note="repeat until every required arc is served → reward → CVaR-REINFORCE update"
        steps={[
          { title: "Instance", sub: ["required arcs,", "demands, priorities"] },
          { title: "Encoder", sub: ["transformer", "3 layers · 8 heads"] },
          { title: "Decoder", sub: ["pointer + mask", "+ shift φ", "+ budget βₜ"], hi: true },
          { title: "Next arc", sub: ["sampled in training,", "greedy at test"] },
          { title: "Environment", sub: ["vehicle time,", "capacity updated"] },
        ]}
      />
      <H3>1. A policy that is told how bad things are</H3>
      <P>
        The policy is a transformer encoder over the arcs and a pointer decoder that picks
        the next arc to serve, with infeasible choices masked out so it cannot overfill a
        vehicle or violate the priority order. The shift vector — demand, cost and
        availability perturbation — is projected to a small embedding and appended to the
        decoder’s context at every step. The same weights can then route conservatively when
        the shift is large and tightly when it is not.
      </P>

      <H3>2. A running budget signal</H3>
      <P>
        The decoder also sees β<sub>t</sub>, the largest vehicle time so far in the current
        episode. It is a cheap proxy for how close this rollout is to becoming one of the
        bad ones, available while there is still time to do something about it.
      </P>

      <H3>3. CVaR-REINFORCE</H3>
      <P>
        Ordinary REINFORCE averages the gradient over every rollout in the batch. The CVaR
        version, following Tamar et al. (2015), keeps only the worst α fraction — here the
        worst 10% — and updates the policy on those alone:
      </P>
      <Code>{`∇ CVaR_α ≈ 1/(α·B) · Σ  (Rᵢ − bᵢ) · ∇ log π(τᵢ)
              i : Rᵢ ≤ VaR_α`}</Code>
      <P>
        The baseline b<sub>i</sub> is a greedy rollout of the same policy on the same
        instance, so the advantage measures routing quality and not how hard that particular
        graph happened to be. Shift magnitude follows a curriculum, growing linearly from
        zero to full over the first 1,000 training steps.
      </P>

      <H2>Experimental setup</H2>
      <List items={[
        <><strong>Instances.</strong> Arc routing instances generated from OpenStreetMap road graphs. Evaluation uses 60 held-out instances with two vehicles.</>,
        <><strong>Policies.</strong> ShARC (CVaR objective, α = 0.1) against a risk-neutral REINFORCE policy with the same architecture and the same shift conditioning. The only difference is the objective.</>,
        <><strong>Model.</strong> 3 encoder layers, 8 heads, width 128, shift embedding of size 8. Batch size 32, learning rate 1e-4.</>,
        <><strong>Protocol.</strong> Severity swept over φ ∈ {"{0, 0.2, 0.4, 0.6, 0.8, 1.0}"}, five seeds per level.</>,
        <><strong>Metrics.</strong> Mean T<sub>max</sub> (the makespan — when the last vehicle finishes) and CVaR<sub>0.1</sub>(T<sub>max</sub>), the mean of the worst 10% of outcomes. Lower is better for both.</>,
      ]} />

      <H2>Results</H2>
      <DataTable
        head={["φ", "ShARC mean", "RN mean", "ShARC CVaR₀.₁", "RN CVaR₀.₁"]}
        numeric={[1, 2, 3, 4]}
        rows={[
          ["0.0", "46.38", "43.93", "82.02", "96.28"],
          ["0.2", "47.37", "45.41", "83.62", "98.81"],
          ["0.4", "48.37", "47.08", "85.46", "100.43"],
          ["0.6", "49.35", "47.30", "87.42", "103.19"],
          ["0.8", "50.40", "48.70", "89.64", "104.72"],
          ["1.0", "51.43", "49.96", "91.72", "106.27"],
        ]}
        caption="Makespan by shift severity, 60 instances × 5 seeds. RN is the risk-neutral policy. Standard deviations across seeds are under 1.1 for the means and under 3.5 for CVaR."
      />
      <SeverityCurves />
      <P>The pattern is the same at every severity:</P>
      <List items={[
        <>ShARC’s tail is <strong>about 14% better</strong>: CVaR<sub>0.1</sub> is 14.8% lower with no shift and 13.7% lower at full shift.</>,
        <>It pays for that on the average day: mean makespan is <strong>5.6% higher</strong> with no shift, narrowing to 2.9% at full shift.</>,
        "The tail advantage is already there at φ = 0. Training against shifts teaches the policy to keep vehicle loads balanced, which helps on hard instances even when nothing has been perturbed.",
      ]} />
      <P>
        The absolute gap between the two tails is roughly constant, around 14 to 16 time
        units, across the sweep. I had expected it to widen with severity. It does not, at
        least in this setting, and I would rather report that than the story I expected.
      </P>

      <H2>What did not work</H2>
      <List items={[
        <><strong>Normalising the advantage inside the tail.</strong> With a batch of 32 and α = 0.1 the tail is about three rollouts. Standardising across those three pushes half of them up and half down, even when all three did worse than the greedy baseline, and training stalled. The fix was to standardise across the whole batch and then apply the tail mask.</>,
        <><strong>The first evaluation.</strong> The first severity sweep applied only the demand shift and had a bug that made cost go <em>down</em> as φ went up. Those numbers were thrown away; the table above is from the corrected sweep across all axes.</>,
        <><strong>The exact solver.</strong> A Gurobi MILP baseline times out on these instance sizes, so there is no exact reference, only heuristics.</>,
        <><strong>Pure Python reward loops.</strong> Computing rewards and local search in Python was too slow to train against. Numba-compiling those loops gave more than a 10× speed-up.</>,
      ]} />

      <H2>Limitations and what is next</H2>
      <List items={[
        "One setting only: 60 instances, two vehicles. Larger instances and more vehicles are queued.",
        "The classical baselines (iterated local search, ant colony, an evolutionary algorithm) have only been run on unshifted instances so far. Until they are run under the same shifts, I cannot say how ShARC compares with them where it matters.",
        "The policy is given the shift vector as input. In a real deployment it would have to be estimated online from what the vehicles observe.",
        "The ablations — removing the shift context, the budget signal, the curriculum, and varying α — are implemented but not yet reported, so I cannot yet say how much each piece contributes.",
        "Whether the method transfers beyond arc routing is open. A CVRP environment with the same interface exists for testing exactly that.",
        "There is no guarantee behind the tail behaviour. Constraint satisfaction at the CVaR level under jointly-moving shifts is, as far as I can tell, an open theoretical question.",
      ]} />

      <H2>Conclusion</H2>
      <P>
        Changing nothing but the training objective — from the average rollout to the worst
        tenth — buys roughly a 14% better tail for a 3 to 6% worse mean on this problem. For
        a service where the bad days are what people remember, that is a trade worth having
        available. Whether it survives larger instances, stronger baselines and other
        routing problems is what the remaining experiments are for.
      </P>

      <RepoLink href={REPO}>ShARC on GitHub</RepoLink>
    </article>
  );
}
