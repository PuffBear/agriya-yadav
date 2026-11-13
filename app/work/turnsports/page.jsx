"use client";
import React from 'react';
import { WriteupHeader, H2, H3, P, List, DataTable, Code, RepoLink } from "@/components/Writeup";

const REPO = "https://github.com/PuffBear/turnsportsAI";
const POKER_REPO = "https://github.com/PuffBear/turnsports-poker-ai";

export default function TurnsportsPage() {
  return (
    <article className="container-prose" style={{ padding: "48px var(--s-7) 32px" }}>

      <WriteupHeader
        title="turnsports.ai: a tennis predictor in front of people, then a poker bot with a coach"
        github={REPO}
        year="2025"
        words="1,900"
        tags={["Tennis", "Poker", "ML", "Game theory"]}
        note={<>Note: turnsports has two public repositories. The first is the web application
          that serves the tennis predictions; the model-training code is not in it, so that
          modelling section is a summary. The second is the poker system, which is complete
          and has its own report. Poker numbers below come from that report.</>}
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

      <H2>The second sport: poker</H2>
      <P>
        Tennis prediction is a forecasting problem: the players do not react to the model.
        The next thing built under the turnsports name was the opposite kind of problem —
        a{" "}
        <a href={POKER_REPO} target="_blank" rel="noopener noreferrer">heads-up no-limit Texas Hold’em system</a>,
        where the opponent adapts, information is hidden, and a good strategy has to be
        deliberately unpredictable. The goal was a bot to play against and a coach that
        explains decisions in plain language while you play.
      </P>

      <H3>First attempt: deep Q-learning</H3>
      <P>
        The first bot was a DQN trained against a pool of rule-based opponents — random,
        tight-aggressive and loose-aggressive — over nine discrete actions from fold to
        all-in. It played badly, and the reason was embarrassing: the state vector held the
        pot, the stack and the street, and no cards. The bot was playing poker blind. Fixing
        the encoding to include hole cards, board, stack-to-pot ratio and position made it
        trainable, but value-based RL against fixed opponents learns to beat those
        opponents. It does not learn a strategy that is hard to exploit, which is the thing
        that matters in poker.
      </P>

      <H3>Second attempt: counterfactual regret minimisation</H3>
      <P>
        CFR is the standard method for that. It plays the game against itself, and at every
        decision point it tracks how much better each action would have done than the
        strategy it actually used — the regret — and shifts probability toward actions with
        positive regret. Averaged over many iterations, the strategy approaches a Nash
        equilibrium. I used external-sampling CFR, which explores all of the learning
        player’s actions and samples one for the opponent.
      </P>
      <P>
        Hold’em is far too large to run this on directly, so the game has to be abstracted
        in two ways.
      </P>
      <DataTable
        head={["Street", "Card buckets", "How"]}
        rows={[
          ["Preflop", "169", "Lossless: the strategically distinct starting hands"],
          ["Flop", "50", "K-means on equity distributions"],
          ["Turn", "50", "K-means on equity distributions"],
          ["River", "10", "Equity buckets"],
        ]}
        caption="Card abstraction. Bets are abstracted to five actions: fold, check/call, a third of the pot, three quarters of the pot, and pot."
      />
      <P>
        The card abstraction is where the project nearly failed. My first version bucketed
        hands by hashing the cards and taking the result modulo 50. That groups hands
        arbitrarily, so the agent learned which hash values win and nothing about poker.
        After 50,000 iterations its exploitability was around 15 big blinds per hand.
      </P>
      <P>
        The fix was to cluster hands by what they can become. For each hand and board, run
        Monte Carlo rollouts and build a histogram of outcomes, then run k-means on those
        histograms. Two hands with the same average equity can need opposite strategies: a
        made pair that is usually a little ahead, and a draw that is either far ahead or far
        behind. Clustering on the distribution keeps them apart where a single equity
        number would merge them.
      </P>

      <H3>Results</H3>
      <DataTable
        head={["Abstraction", "Iterations", "Exploitability (BB/hand)"]}
        numeric={[1, 2]}
        rows={[
          ["Hash buckets", "50,000", "≈ 15"],
          ["K-means", "5,000", "≈ 2.5"],
          ["K-means", "25,000", "0.17 best · 0.75 final"],
        ]}
        caption="Exploitability is how much a best-responding opponent would win per hand; lower is better. The 25,000-iteration run took 7.8 hours on an M1 laptop."
      />
      <P>
        Two things about that last row. Exploitability oscillated during training, so 0.17
        is the best checkpoint and 0.75 is where the run ended. And the run visited about
        46,000 information sets out of roughly 4.2 million in the abstraction, a little over
        1%. By the report’s own estimate, covering the rest would take on the order of two
        million iterations, or about a month on the same machine. This is a decent amateur
        bot, and it is nowhere near research systems like Libratus, which also re-solve
        the end of each hand in real time.
      </P>
      <P>
        Getting to 25,000 iterations at all needed the training loop to be fast. Saving and
        restoring the environment by copying only the fields that change, instead of
        deep-copying the whole object, cut that step from roughly 100 ms to 1 ms, and
        overall speed went from about 0.1 to 0.9 iterations per second.
      </P>

      <H3>The coach</H3>
      <P>
        The coach is built in two layers. The lower one is a set of tools: a Monte Carlo
        equity estimator, a pot-odds calculator, a rollout simulator that plays candidate
        actions forward against the bot, and a state summary covering stack-to-pot ratio,
        position and board texture. The upper one is a local language model (Llama 3.2
        through Ollama) that is handed those tool outputs and writes the explanation, so
        the numbers in its advice are computed and not generated.
      </P>
      <List items={[
        "Three risk profiles — conservative, moderate, aggressive — change how much equity edge over the pot odds is required before recommending a call.",
        "Opponent statistics (how often they enter pots, raise preflop, fold to a continuation bet) are tracked and fed into advice once there is enough history.",
        "In my own play the bot won 73% of sessions against me, and 58% when I was using the coach. That is one intermediate player and an informal sample, so treat it as an anecdote.",
      ]} />

      <H2>Limitations</H2>
      <List items={[
        "Accuracy is the wrong headline metric for a probability model. What matters is calibration: of the matches given a 70% chance, do about 70% go that way? I did not publish a calibration curve, and I should have.",
        "The model knows results and surfaces. It does not know about injuries, fatigue from a long previous round, or a player who has just changed coach — the things my old opinion-based answer was actually good at.",
        "Grass is the weakest surface. The season is short, so there are fewer matches to learn from, and the model is wrong more often there.",
        "Draws were entered by hand in the server code for each tournament, and the server opens a new database connection per page view instead of using a pool. Both are fine for a prototype and neither would survive real traffic.",
        "Football, basketball and cricket never got past the routing stage on the site.",
        "The poker bot’s strategy is fixed after training. It has no real-time re-solving, five bet sizes and coarse card buckets, so a strong player who finds a gap in the abstraction can keep exploiting it.",
        "The poker evaluation against humans is one player. There is no measured win rate in big blinds per 100 hands against an independent benchmark bot.",
      ]} />

      <H2>Conclusion</H2>
      <P>
        The two halves taught different lessons. On the tennis side, precomputing every
        matchup made serving almost free, and publishing probabilities before matches made
        the model accountable in a way a test-set number is not. The gap between 93% on
        held-out history and the live French Open record is the most useful result there.
      </P>
      <P>
        On the poker side, the lesson was about representation. Both failures — the DQN that
        could not see its cards and the CFR agent trained on hashed buckets — were cases of
        a sound algorithm fed a state that threw away the structure of the game. Once the
        abstraction grouped hands the way a player would, a laptop was enough to get
        something worth playing against.
      </P>

      <RepoLink href={REPO}>turnsports.ai site on GitHub</RepoLink>
      <p style={{ margin: "12px 0 0" }}>
        <a href={POKER_REPO} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-block", padding: "10px 18px", borderRadius: "var(--r-2)",
          background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-sans)",
          fontSize: 14, fontWeight: 500, textDecoration: "none",
        }}>turnsports poker AI on GitHub &nbsp;→</a>
      </p>
    </article>
  );
}
