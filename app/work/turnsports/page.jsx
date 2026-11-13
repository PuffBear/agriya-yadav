"use client";
import React from 'react';
import { WriteupHeader, H2, H3, P, List, DataTable, Code, RepoLink } from "@/components/Writeup";

const REPO = "https://github.com/PuffBear/turnsportsAI";

export default function TurnsportsPage() {
  return (
    <article className="container-prose" style={{ padding: "48px var(--s-7) 32px" }}>

      <WriteupHeader
        title="turnsports.ai: putting a tennis prediction model in front of people"
        github={REPO}
        year="2025"
        words="950"
        tags={["Tennis", "ML", "Full-stack"]}
        note={<>Note: the linked repository is the web application that serves the
          predictions. The model-training code is not in it, so the modelling section here
          is a summary and the serving section is the detailed one.</>}
      />

      <H2>First, a question I kept getting asked</H2>
      <P>
        During any tournament, the question a tennis player gets asked most is “who’s
        going to win?” The usual answer is an opinion: you know the players, the surfaces,
        who is carrying an injury. It can be a well-informed opinion, and still nobody
        keeps score of how often it is right.
      </P>
      <P>
        turnsports.ai started as an attempt to replace the opinion with a number: for any
        two players on the ATP tour, the probability that each one wins, published before
        the match so that it can be checked afterwards.
      </P>

      <H2>Motivation</H2>
      <P>
        Tennis is a good sport for this. Every match has exactly two outcomes, the results
        are public and go back decades, and there is a well-understood baseline in Elo
        ratings. It also has structure that a plain rating misses and a former player knows
        matters: the surface. A player’s clay results say much less about their grass
        results than a single rating number assumes.
      </P>
      <P>
        I also wanted the discipline of shipping it. A model evaluated in a notebook can be
        quietly re-run until the number looks good. A probability shown on a public page the
        morning of a match cannot.
      </P>

      <H2>The model, briefly</H2>
      <List items={[
        <><strong>Ratings.</strong> A custom Elo variant — TennisElo — with K-factors that depend on the surface, so that a result on clay moves a player’s clay rating more than their grass rating.</>,
        <><strong>Classifier.</strong> A match-outcome classifier on top of the ratings that outputs a win probability for each player.</>,
        <><strong>Held-out result.</strong> 93.26% accuracy on a test set of 12,018 matches the model had not seen.</>,
      ]} />
      <P>
        That headline number deserves a caveat. Accuracy on a random held-out set of past
        matches includes a lot of lopsided matches that almost any rating gets right. The
        harder and more honest test is a live tournament, which is the reason for building
        the site.
      </P>

      <H2>Serving it</H2>
      <P>
        The design decision that shaped everything else was to do no inference at request
        time. Predictions are computed offline and written to a database, and the web
        server only looks them up.
      </P>

      <H3>Precompute, then look up</H3>
      <P>
        A MySQL table holds one row per matchup with both win probabilities.
        More than 120,000 matchups are precomputed. A request for a tournament page turns
        into one indexed lookup per match in the draw:
      </P>
      <Code>{`SELECT player1_name, player2_name,
       prob_player1_wins, prob_player2_wins
FROM   model_matches
WHERE  player1_name = ? AND player2_name = ?
LIMIT  1`}</Code>
      <P>
        This keeps the server trivially simple and fast, and it means the model can be
        retrained or replaced without touching the application. The cost is that the table
        has to be regenerated whenever ratings change, and a matchup that is not in the
        table has no prediction at all.
      </P>

      <H3>The application</H3>
      <P>
        The server is a small Express app that renders pages with EJS templates. The draw
        for each tournament is a list of player pairs; for each pair the server fetches the
        row and renders a card with both names and both probabilities. If a pair is missing
        from the table, the card shows a dash and no number, so a gap in the data is visible
        on the page.
      </P>
      <DataTable
        head={["Route", "What it serves"]}
        rows={[
          ["/home", "Landing page."],
          ["/tennis", "Match cards for the current tournaments, switchable by event."],
          ["/football, /basketball, /cricket", "Placeholders. The routes and templates exist; there are no models behind them."],
          ["/account", "Account page."],
        ]}
      />
      <P>
        The version in the repository covers two grass-court events from June 2025 — the
        Halle Open and the HSBC Championships in London — with 21 first-round matches
        between them. Under simulated load the lookup path held a median of about 150 ms at
        2,000 queries per second.
      </P>

      <H2>How it did live</H2>
      <P>
        The first real test was the 2025 French Open. Across 47 published predictions the
        model had 7 misses, and the site’s footer carried that record on every page.
        Forty-seven matches is a small sample, and it is well below the held-out figure,
        which is what you would expect: a Grand Slam draw has far fewer lopsided matches
        than a random sample of tour history.
      </P>

      <H2>Limitations</H2>
      <List items={[
        "Accuracy is the wrong headline metric for a probability model. What matters is calibration: of the matches given a 70% chance, do about 70% go that way? I did not publish a calibration curve, and I should have.",
        "The model knows results and surfaces. It does not know about injuries, fatigue from a long previous round, or a player who has just changed coach — the things my old opinion-based answer was actually good at.",
        "Grass is the weakest surface. The season is short, so there are fewer matches to learn from, and the model is wrong more often there.",
        "Draws were entered by hand in the server code for each tournament, and the server opens a new database connection per page view instead of using a pool. Both are fine for a prototype and neither would survive real traffic.",
        "The other sports never got past the routing stage.",
      ]} />

      <H2>Conclusion</H2>
      <P>
        The model was the easy part to be pleased with and the site was the part that taught
        me something. Precomputing every matchup made serving almost free, and publishing
        probabilities before matches made the model accountable in a way a test-set number
        does not. The gap between 93% on held-out history and the live French Open record
        is the most useful result in the project: it is the difference between predicting
        tennis matches in general and predicting the ones people actually want to know
        about.
      </P>

      <RepoLink href={REPO}>turnsports.ai on GitHub</RepoLink>
    </article>
  );
}
