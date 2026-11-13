"use client";
import React from 'react';
import { RankedBars, Flow } from "@/components/WorkFigures";
import {
  SectionRule, PaperHeader, ReviewNotice, RequestFullWriteup,
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

      <Flow
        label="Pipeline: retweets of influencers by politicians give each influencer a polarity score; aspects are extracted from tweet text; a fine-tuned language model classifies each tweet’s stance toward an aspect; alignment is then compared with stance."
        caption="The pipeline, as described in the abstract. Leaning comes from who retweets an influencer; stance comes from what the influencer wrote."
        steps={[
          { title: "Retweets", sub: ["politicians →", "influencers"] },
          { title: "Polarity", sub: ["ruling vs", "opposition share"] },
          { title: "Aspects", sub: ["KeyBERT on", "tweet text"] },
          { title: "Stance", sub: ["LoRA-tuned LLM:", "3-way stance label"], hi: true },
          { title: "Comparison", sub: ["does alignment", "predict stance?"] },
        ]}
      />

      <SectionRule />

      <RankedBars
        label="Bar chart of stance classification accuracy on the English held-out set: PyABSA 0.520, BERT 0.550, Mistral-7B zero-shot 0.566, RoBERTa 0.577, Mistral-7B few-shot 0.630, Mistral-7B with LoRA fine-tuning 0.775."
        caption="Stance classification accuracy on the English held-out set (265 samples, mean of three seeds). Corpus: 7.1M retweets, 960 influencers, 2020–2023, 35 polar aspects, 545,250 tweet–aspect pairs."
        axisLabel="accuracy"
        rows={[
          { label: "PyABSA", v: 0.520 },
          { label: "BERT", v: 0.550 },
          { label: "Mistral-7B, zero-shot", v: 0.566 },
          { label: "RoBERTa", v: 0.577 },
          { label: "Mistral-7B, few-shot", v: 0.630 },
          { label: "Mistral-7B, LoRA", v: 0.775, hi: true },
        ]}
      />

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
