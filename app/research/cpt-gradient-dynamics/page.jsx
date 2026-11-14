"use client";
import React from 'react';
import {
  SectionRule, PaperHeader, ReviewNotice, RequestFullWriteup, TerminalBlock,
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
        title="Probability weighting traps risk-sensitive learners in multi-agent coordination."
        authors={["A. YADAV", "ASHOKA UNIV."]}
        abstract={<>
          Learning agents are increasingly made risk-sensitive by design, trained on
          prospect-theoretic or distortion objectives instead of expected reward. We show
          that this choice can change where multi-agent learning ends up, not only how it gets
          there. In a coordination game with one risky and one safe action, independent
          policy-gradient learners that maximise expected reward coordinate from almost every
          start. Learners with cumulative prospect theory (CPT) preferences can instead be
          trapped: past an exact loss-aversion threshold, a stable outcome appears in which
          both agents keep randomising and earn less in expectation than under either
          coordinated outcome. The trap is a mixed equilibrium of the agents’ own CPT game,
          not an artefact of the learning rule, and it is caused by probability weighting
          rather than loss aversion. For <em>n</em> agents we prove that every candidate trap
          is symmetric and that its stability reduces to the sign of one scalar derivative.
          This gives an exact scaling law: under power weighting w(u) = u<sup>γ</sup> a trap
          exists if and only if γ &lt; 1/n, so larger teams need stronger distortion. For two
          agents with w(u) = u<sup>1/4</sup> the trap is born in a saddle-node at
          λ<sub>SN</sub> = (5 − 1/√3)/2.
        </>}
      />

      <p className="t-prose">
        The setting is deliberately small so the question is sharp. Two agents each choose a
        risky action or a safe one, and are paid only if they match: matching on the risky
        action pays +6 or −2 with equal chance, matching on the safe one pays +1. Each agent
        adjusts its probability of playing risky by gradient ascent on its own objective.
      </p>

      <p className="t-prose">
        Agents that maximise expected reward end up coordinating from almost every starting
        point. Agents with prospect-theoretic preferences need not. Past an exact
        loss-aversion threshold, a third stable outcome appears in which both keep
        randomising forever. It pays less in expectation than either way of coordinating,
        and at λ = 2.3 it captures more than half of all starting points. These agents are
        not irrational; they are optimising exactly the objective they were given.
      </p>

      <SectionRule />

      <SaddleNodeChart />

      <p className="t-prose">
        The mechanism is specific, which is the useful part. Loss aversion on its own cannot
        produce the trap: with undistorted probabilities, the learning flow preserves volume
        and so admits no stable mixed outcome. What creates it is nonlinear
        <em> probability weighting</em>, and only when the agent evaluates the lottery over
        final outcomes. Evaluating each joint action’s lottery separately removes the trap.
      </p>

      <TerminalBlock title="When does a trap exist?" subtitle="power weighting w(u) = u^γ">
        {(() => {
          const grid = "1.3fr 1fr 1.4fr";
          const rows = [
            ["identity weighting", "any n", "never (volume preserved)"],
            ["γ = 1/4", "n = 2", "yes, from λ = 2.2113"],
            ["γ = 1/4", "n = 3", "yes, from λ = 2.0751"],
            ["γ = 1/4", "n ≥ 4", "no, since γ ≥ 1/n"],
            ["general γ", "n agents", "if and only if γ < 1/n"],
          ];
          return (
            <>
              <div style={{
                display: "grid", gridTemplateColumns: grid, gap: 8,
                color: "#8A8275", fontSize: 10, letterSpacing: "0.14em",
                textTransform: "uppercase", paddingBottom: 6,
              }}>
                <span>weighting</span><span>team</span><span style={{ textAlign: "right" }}>stable trap?</span>
              </div>
              {rows.map(([w, n, r]) => (
                <div key={w + n} style={{ display: "grid", gridTemplateColumns: grid, gap: 8, alignItems: "baseline" }}>
                  <span style={{ color: "#8A8275" }}>{w}</span>
                  <span>{n}</span>
                  <span style={{ textAlign: "right", color: r.startsWith("yes") ? "#D85A4A" : r.startsWith("if") ? "#F4EEE2" : "#6FBF73" }}>{r}</span>
                </div>
              ))}
            </>
          );
        })()}
      </TerminalBlock>

      <p className="t-prose">
        Three things follow for anyone designing risk-sensitive cooperative learners. Where
        the distortion is applied matters: weighting the final-outcome lottery creates the
        trap, while weighting each joint action’s lottery cannot. The trap can be ruled out
        before training, from the weighting exponent and the team size alone. And persistent
        randomisation is not under-training: the trap is an equilibrium, so more gradient
        steps will not leave it.
      </p>

      <RequestFullWriteup
        paper="Probability weighting traps risk-sensitive learners in multi-agent coordination"
        covers={[
          "The model, the CPT objective, and why the terminal-outcome lottery convention matters",
          "The volume-preservation lemma that rules out a trap under identity weighting",
          "The scalar reduction of stability for n agents, and the exact γ < 1/n scaling law",
          "The saddle-node at λ_SN, global convergence, and why heterogeneous preferences cannot oscillate",
          "Validation: matched baselines, sampled gradients, payoff perturbations, an inverse-S Prelec map and a three-agent test",
          "Practical implications and limitations",
        ]}
      />

      <ReviewNotice>
        Submitted to AAMAS 2027; the manuscript stays off the site while it is under review.
      </ReviewNotice>
    </article>
  );
}
