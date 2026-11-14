"use client";
import React from 'react';
import { ExploitabilityDots, Flow, RankedBars, PairedBars } from "@/components/WorkFigures";
import { WriteupHeader, H2, H3, P, List, DataTable, Code, RepoLink } from "@/components/Writeup";

const REPO = "https://github.com/PuffBear/turnsportsAI";
const TENNIS_REPO = "https://github.com/aayanjain2772/IML_PROJECT_TENNIS-PREDICTION";
const POKER_REPO = "https://github.com/PuffBear/turnsports-poker-ai";

export default function TurnsportsPage() {
  return (
    <article className="container-prose" style={{ padding: "48px var(--s-7) 32px" }}>

      <WriteupHeader
        title="turnsports.ai: a tennis predictor in front of people, then a poker bot with a coach"
        github={REPO}
        year="2025"
        words="3,300"
        tags={["Tennis", "Poker", "ML", "Game theory"]}
        note={<>Note: turnsports spans three public repositories: the tennis modelling, the web
          application that serves predictions, and the poker system. Tennis numbers below
          are taken from the modelling notebooks and recomputed from the ratings file in
          that repository; poker numbers come from that project’s report.</>}
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

      <H2>The data</H2>
      <P>
        The modelling was a group project for a machine-learning course, and lives in{" "}
        <a href={TENNIS_REPO} target="_blank" rel="noopener noreferrer">its own repository</a>.
        The data is Jeff Sackmann’s public ATP match archive for 2010 to 2024: 42,514
        tour-level matches after cleaning, each with the tournament, surface, both players’
        rankings and ages, the score, and each player’s serve statistics for that match.
      </P>
      <List items={[
        <><strong>Split by time, not at random.</strong> Matches up to the end of 2022 are for training (36,505) and 2023–2024 is the test set (6,009). A random split would let the model see a player’s future form while predicting their past.</>,
        <><strong>Mirrored rows.</strong> The archive always lists the winner first, so every row would have the same label. Each match is duplicated with the two players swapped and the label flipped, giving 73,010 training rows and 12,018 test rows, exactly half of them wins.</>,
        <><strong>Difference features.</strong> Each feature is player A’s value minus player B’s, so swapping the players just flips the sign.</>,
      ]} />

      <H2>TennisElo: what you can know before the match</H2>
      <P>
        The first model is a rating system. Elo gives every player a number, predicts each
        match from the gap between the two numbers, and then moves both numbers according to
        how surprising the result was:
      </P>
      <Code>{`expected_A = 1 / (1 + 10^((R_B − R_A) / 400))
R_A  ←  R_A + K · (result_A − expected_A)`}</Code>
      <P>
        The tennis-specific part is in how K, the size of each update, is chosen, and in
        keeping a separate rating per surface for every player.
      </P>
      <DataTable
        head={["Adjustment", "Rule"]}
        rows={[
          ["Starting rating", "1500 on every surface for a new player"],
          ["Experience", "K = 64 for a player’s first ten matches, 32 after"],
          ["Established top players", "K capped at 24 for a top-50 player with more than 50 matches"],
          ["Lower-ranked players", "K × 1.2 outside the top 100"],
          ["Surface", "Grass × 1.2, clay × 1.1, hard × 1.0"],
          ["Tournament", "Grand Slam × 1.3, Masters × 1.2, down to × 0.9 for the lowest tier"],
          ["Margin of victory", "Scaled by log₂ of games won over games lost"],
          ["Ceiling", "K never exceeds 64"],
        ]}
        caption="How the update size K is set. Bigger K means the rating moves faster."
      />
      <P>
        Run over all fifteen seasons, TennisElo picks the winner of <strong>64.0%</strong>{" "}
        of matches using only what was known beforehand. That is the honest pre-match
        number, and it is not a strong one: simply backing the higher-ranked player gets
        65.7% over the same matches. A hand-tuned rating with eight adjustment rules did not
        beat the official rankings.
      </P>
      <RankedBars
        label="Bar chart of TennisElo pre-match accuracy by surface: hard 65.2 percent over 24,789 matches, clay 63.1 percent over 13,142 matches, grass 60.7 percent over 4,517 matches."
        caption="TennisElo’s pre-match accuracy by surface, 2010–2024. Grass has the fewest matches and the worst accuracy."
        axisLabel="share of winners picked"
        fmt={(v) => `${(v * 100).toFixed(1)}%`}
        rows={[
          { label: "Hard · 24,789 matches", v: 0.652 },
          { label: "Clay · 13,142 matches", v: 0.631 },
          { label: "Grass · 4,517 matches", v: 0.607, hi: true },
        ]}
      />
      <P>
        Its probabilities are at least roughly honest. When TennisElo makes someone a
        favourite, they win a little less often than it says, and the gap grows with its
        confidence.
      </P>
      <PairedBars
        legend={["TennisElo said", "Actually won"]}
        yLabel="how often the favourite wins"
        label="Bar chart comparing TennisElo's stated probability for the favourite with how often the favourite won, in five confidence bands. 50 to 60 percent: said 55, won 55. 60 to 70: said 65, won 62. 70 to 80: said 75, won 72. 80 to 90: said 85, won 81. 90 to 100: said 94, won 91."
        caption="Calibration of TennisElo over all 42,514 matches, grouped by how confident it was. It is slightly overconfident, by about three points at the top end."
        groups={[
          { label: "50–60%\n15,574 matches", a: 0.547, aText: "55%", b: 0.545, bText: "55%" },
          { label: "60–70%\n11,507", a: 0.648, aText: "65%", b: 0.623, bText: "62%" },
          { label: "70–80%\n8,282", a: 0.747, aText: "75%", b: 0.718, bText: "72%" },
          { label: "80–90%\n5,150", a: 0.845, aText: "85%", b: 0.805, bText: "81%" },
          { label: "90–100%\n2,001", a: 0.936, aText: "94%", b: 0.909, bText: "91%" },
        ]}
      />

      <H2>The classifiers: what the box score tells you</H2>
      <P>
        The second family of models uses the match statistics: the difference between the
        two players in aces, double faults, first serves in, first-serve points won, service
        games, break points faced and saved, plus ranking and age. Logistic regression was
        written from scratch and trained by gradient descent; the random forest was also
        built by hand; the neural networks are small multilayer perceptrons.
      </P>
      <RankedBars
        label="Bar chart of accuracy on the 2023 to 2024 test matches. Using only pre-match information: TennisElo 62.3 percent, higher-ranked player 63.5 percent. Using the match's own statistics: Bayesian logistic regression 87.3, logistic regression 89.7, random forest 91.5, neural network with ReLU 93.7, neural network with tanh 93.8."
        caption="Accuracy on the 6,009 test matches from 2023–2024. Red bars use only what is known before the match. Grey bars read that match’s own serve statistics."
        axisLabel="accuracy"
        fmt={(v) => `${(v * 100).toFixed(1)}%`}
        rows={[
          { label: "TennisElo", v: 0.623, hi: true },
          { label: "Higher-ranked player", v: 0.635, hi: true },
          { label: "Bayesian logistic reg.", v: 0.873 },
          { label: "Logistic regression", v: 0.897 },
          { label: "Random forest", v: 0.915 },
          { label: "Neural net (ReLU)", v: 0.937 },
          { label: "Neural net (tanh)", v: 0.938 },
        ]}
      />
      <P>
        These numbers need to be read for what they are. The serve statistics are recorded
        during the match being classified. A model that sees how many break points each
        player faced is being told most of the result, so 90–94% measures how well the box
        score explains who won. It is not a forecast, and it is not comparable with the 64%
        above. The 93% figure that turnsports advertised came from this family: a
        logistic regression with two more serve features reached 93.27%, on a random split.
      </P>
      <P>
        The coefficients say the same thing. With every feature standardised, the model
        leans almost entirely on break points and first-serve points:
      </P>
      <DataTable
        head={["Feature (A minus B)", "Weight", "Reading"]}
        numeric={[1]}
        rows={[
          ["Break points faced", "−2.10", "Facing more break points is the strongest sign of losing"],
          ["First-serve points won", "+1.70", "Winning more points behind the first serve"],
          ["First serves in", "−0.97", "Mostly a proxy for playing more service points"],
          ["Break points saved", "+0.91", "Escaping the break points you do face"],
          ["Service games", "+0.44", ""],
          ["Ranking", "−0.36", "The only pre-match signal that carries real weight"],
          ["Double faults", "−0.33", ""],
          ["Aces", "+0.09", ""],
          ["Age", "−0.02", ""],
          ["Surface", "0.00", "Cancels out exactly, because every match appears mirrored"],
        ]}
        caption="Logistic regression weights on standardised features (89.7% test accuracy)."
      />

      <H3>From box score to forecast</H3>
      <P>
        To predict a match that has not been played, something has to stand in for
        statistics that do not exist yet. The live predictor used each player’s recent
        averages for those same statistics, took the difference, and passed it through the
        trained weights.
      </P>
      <Flow
        label="Two uses of the same weights. In training, the differences in one match's serve statistics go into the logistic regression with the known result. In live use, each player's recent average statistics are differenced and passed through the same weights to produce a win probability."
        caption="The same weights are used two ways. Training sees one match’s real statistics; live prediction feeds in averages as a stand-in, which is a different and much noisier input."
        steps={[
          { title: "Player averages", sub: ["recent serve stats", "per player"] },
          { title: "Differences", sub: ["A minus B,", "standardised"] },
          { title: "Trained weights", sub: ["fitted on real", "match statistics"], hi: true },
          { title: "Win probability", sub: ["for each player"] },
          { title: "Stored", sub: ["one row per", "matchup"] },
        ]}
      />
      <P>
        This is a reasonable trick, and it is also where the accuracy has to fall. A model
        trained on what happened in a match is being asked about what usually happens to
        each player, and no held-out number from the box-score models describes how well
        that works. Only live results do.
      </P>

      <H3>What did not work</H3>
      <List items={[
        <><strong>A 100% model.</strong> A logistic regression given the raw winner and loser columns, instead of differences, scored 100% on train and test. It had learned which columns belong to the winner. That is what forced the mirrored, difference-based setup.</>,
        <><strong>Adding Elo to the classifier.</strong> In the notebook that adds the rating gap as a feature, the gap is not sign-flipped for the mirrored rows, so it cannot carry any signal. The jump to 93% there comes from the two extra serve features and the random split, not from Elo.</>,
        <><strong>The Bayesian prior.</strong> Logistic regression with a Gaussian prior on the weights scored 87.3%, below the plain version. With 73,010 rows and thirteen features there is nothing to regularise.</>,
        <><strong>Bigger networks.</strong> A grid search over network sizes chose a single hidden layer of 64 units over the deeper options, and all four activation functions landed within 0.15 points of each other.</>,
      ]} />
      <P>
        A side experiment clustered active players into six playing styles with k-means on
        fifteen per-player features (serve and return rates, surface mix, height, handedness,
        rating). It produced a readable map of the tour and was not used in prediction.
      </P>

      <H2>Serving it</H2>
      <P>
        The design decision that shaped everything else was to do no inference at request
        time. Predictions are computed offline and written to a database, and the web
        server only looks them up.
      </P>

      <Flow
        label="Serving pipeline: match history feeds the rating and classifier models offline; every matchup’s probabilities are written to a MySQL table; at request time the Express server only looks rows up and renders match cards."
        caption="Everything left of the table happens offline. A page view touches only the last two boxes."
        steps={[
          { title: "Match history", sub: ["ATP results", "by surface"] },
          { title: "Model", sub: ["trained weights", "+ player averages"] },
          { title: "MySQL table", sub: ["120k+ matchups", "precomputed"] },
          { title: "Express", sub: ["one lookup", "per match"], hi: true },
          { title: "Match card", sub: ["two names,", "two probabilities"] },
        ]}
      />
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
        model had 7 misses, about 85%, and the site’s footer carried that record on every
        page. That is far above the 64% a rating alone manages, and I do not think it should
        be taken at face value: forty-seven matches is a small sample, and early rounds of a
        Grand Slam are full of heavy favourites. It is the only genuinely out-of-sample
        evidence the project has, and there is not enough of it to say how good the
        forecasts are.
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
      <ExploitabilityDots />
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
      <Flow
        label="Coach: the game state goes to a set of tools — equity, pot odds, rollouts and a state summary — whose outputs are passed to a local language model that writes the advice shown to the player."
        caption="The coach. The tools compute; the language model only explains."
        steps={[
          { title: "Game state", sub: ["cards, pot,", "stacks, position"] },
          { title: "Tools", sub: ["equity · pot odds", "rollouts vs the bot", "board texture"], hi: true },
          { title: "Language model", sub: ["Llama 3.2", "run locally"] },
          { title: "Advice", sub: ["action + reasons,", "by risk profile"] },
        ]}
      />
      <List items={[
        "Three risk profiles — conservative, moderate, aggressive — change how much equity edge over the pot odds is required before recommending a call.",
        "Opponent statistics (how often they enter pots, raise preflop, fold to a continuation bet) are tracked and fed into advice once there is enough history.",
        "In my own play the bot won 73% of sessions against me, and 58% when I was using the coach. That is one intermediate player and an informal sample, so treat it as an anecdote.",
      ]} />

      <H2>Limitations</H2>
      <List items={[
        "The headline accuracy describes the wrong task. The 90–94% models classify a finished match from its own statistics; the pre-match rating gets 64%, and does not beat the official rankings. Any accuracy quoted for turnsports should say which of the two it is.",
        "The live predictor was never properly evaluated. There is no backtest of the averages-as-stand-in method over past seasons, which would have been easy to run and would have given a real pre-match number for the classifier.",
        "TennisElo is slightly overconfident, and its adjustment rules were set by hand, not fitted. Several of them may be doing nothing.",
        "The model knows results and surfaces. It does not know about injuries, fatigue from a long previous round, or a player who has just changed coach — the things my old opinion-based answer was actually good at.",
        "Grass is the weakest surface: 60.7% pre-match accuracy against 65.2% on hard courts. The season is short, so there are a fifth as many matches to learn from.",
        "Draws were entered by hand in the server code for each tournament, and the server opens a new database connection per page view instead of using a pool. Both are fine for a prototype and neither would survive real traffic.",
        "Football, basketball and cricket never got past the routing stage on the site.",
        "The poker bot’s strategy is fixed after training. It has no real-time re-solving, five bet sizes and coarse card buckets, so a strong player who finds a gap in the abstraction can keep exploiting it.",
        "The poker evaluation against humans is one player. There is no measured win rate in big blinds per 100 hands against an independent benchmark bot.",
      ]} />

      <H2>Conclusion</H2>
      <P>
        The two halves taught different lessons. On the tennis side, the lesson was to ask what a
        feature knows. The models that scored above 90% were reading the match they were
        scoring, and the one model that only used the past scored 64% and lost to the
        rankings. Publishing probabilities before matches was the right instinct, because
        it is the only test that cannot leak; the next step would have been a proper
        backtest of the live method before quoting any number at all.
      </P>
      <P>
        On the poker side, the lesson was about representation. Both failures — the DQN that
        could not see its cards and the CFR agent trained on hashed buckets — were cases of
        a sound algorithm fed a state that threw away the structure of the game. Once the
        abstraction grouped hands the way a player would, a laptop was enough to get
        something worth playing against.
      </P>

      <RepoLink href={TENNIS_REPO}>Tennis modelling on GitHub</RepoLink>
      <p style={{ margin: "12px 0 0" }}>
        <a href={REPO} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-block", padding: "10px 18px", borderRadius: "var(--r-2)",
          background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-sans)",
          fontSize: 14, fontWeight: 500, textDecoration: "none",
        }}>turnsports.ai site on GitHub &nbsp;→</a>
      </p>
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
