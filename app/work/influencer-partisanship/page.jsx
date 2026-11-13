"use client";
import React from 'react';
import {
  TerminalBlock, SectionRule, PaperHeader, ReviewNotice, RequestFullWriteup,
} from "@/components/Paper";

export default function InfluencerPartisanshipPage() {
  return (
    <article className="container-prose" style={{ padding: "48px var(--s-7) 32px" }}>

      <PaperHeader
        backHref="/work"
        backLabel="All work"
        venue="CSCW"
        status="submitted"
        year="2026"
        title="Influencing the divide: political partisanship in Indian influencer discourse on X."
        authors={["A. YADAV AND CO-AUTHORS", "ASHOKA UNIV."]}
        abstract={<>
          This paper investigates partisan discourse on X, examining how political leaning
          of influencers shape their online communication patterns. We analyze a large-scale
          dataset of influencer tweets retweeted by Indian politicians from 2020–2023 to
          understand political polarization in social media. Our methodology combines
          influencer polarity scoring based on retweet behavior, automated aspect extraction
          using KeyBERT, and stance classification using a LoRA-adapted large language
          model. We identify politically polar aspects, and classify tweet stances toward
          them to reveal patterns in how partisanship manifests in social media discourse of
          influencers aligned to ruling and opposition alliances.
        </>}
      />

      <p className="t-prose">
        Most work on political polarisation online looks at politicians, parties and news
        outlets. This project looks one tier down, at independent influencers: people with
        large followings and no official affiliation. The question is whether you can tell
        which side an influencer is on from who amplifies them, and whether that side then
        predicts what they say about contested issues.
      </p>

      <p className="t-prose">
        Leaning is measured from behaviour and not from text. An influencer retweeted mostly
        by ruling-bloc politicians scores towards +1, and one retweeted mostly by opposition
        politicians scores towards −1. Stance is measured separately, per tweet and per
        topic, by a classifier trained on a hand-annotated set. The two measurements are
        independent, which is what makes comparing them meaningful.
      </p>

      <SectionRule />

      <TerminalBlock title="Stance classification, English held-out set" subtitle="265 samples · 3 seeds">
        {(() => {
          const grid = "1.6fr 90px 90px";
          const rows = [
            ["PyABSA",               "0.520", "0.509"],
            ["BERT",                 "0.550", "0.509"],
            ["RoBERTa",              "0.577", "0.571"],
            ["Mistral-7B, zero-shot", "0.566", "0.541"],
            ["Mistral-7B, few-shot",  "0.630", "0.609"],
            ["Mistral-7B, LoRA",      "0.775", "0.754"],
          ];
          return (
            <>
              <div style={{
                display: "grid", gridTemplateColumns: grid, gap: 8,
                color: "#8A8275", fontSize: 10, letterSpacing: "0.14em",
                textTransform: "uppercase", paddingBottom: 6,
              }}>
                <span>model</span>
                <span style={{ textAlign: "right" }}>accuracy</span>
                <span style={{ textAlign: "right" }}>macro F1</span>
              </div>
              {rows.map(([m, a, f]) => (
                <div key={m} style={{
                  display: "grid", gridTemplateColumns: grid, gap: 8,
                  fontVariantNumeric: "tabular-nums", alignItems: "baseline",
                }}>
                  <span style={{ color: m.endsWith("LoRA") ? "#F4EEE2" : "#8A8275" }}>{m}</span>
                  <span style={{ textAlign: "right", color: m.endsWith("LoRA") ? "#6FBF73" : "#F4EEE2" }}>{a}</span>
                  <span style={{ textAlign: "right", color: m.endsWith("LoRA") ? "#6FBF73" : "#F4EEE2" }}>{f}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, fontSize: 10, color: "#8A8275", letterSpacing: "0.06em" }}>
                Corpus: 7.1M retweets · 960 influencers · 2020–2023 · 35 polar aspects · 545,250 tweet–aspect pairs
              </div>
            </>
          );
        })()}
      </TerminalBlock>

      <p className="t-prose">
        The fine-tuned model is roughly twenty points more accurate than the encoder
        baselines, and close to much larger proprietary models at a fraction of the cost,
        which is what made it practical to run over the whole corpus.
      </p>

      <p className="t-prose">
        With that classifier applied to the full dataset, an influencer’s alignment is a
        statistically significant predictor of favourable stance on <strong>30 of the 35
        aspects</strong> tested. The pattern holds in both English and Hindi, and it is
        stable across the four years: 92.8% of influencers keep the same directional
        alignment over the period.
      </p>

      <RequestFullWriteup
        paper="Influencing the divide: political partisanship in Indian influencer discourse on X"
        covers={[
          "How the influencer set and the party-bloc mapping were built, and how alliance switches were handled",
          "The polarity score, its threshold, and the manual validation behind it",
          "Aspect extraction and how the seed and extended aspect sets were chosen",
          "The annotated stance dataset, all model configurations, and the out-of-distribution test on unseen aspects",
          "The Hindi pipeline: translation, the quality filter, and what it costs in dropped tweets",
          "Per-aspect results, the significance tests, and the temporal analysis",
          "Limitations, including selection effects and what retweets can and cannot tell you",
        ]}
      />

      <ReviewNotice>
        Submitted to CSCW; the manuscript, figures and data stay off the site while it is
        under review.
      </ReviewNotice>
    </article>
  );
}
