"use client";
import React from 'react';
import { WriteupHeader, H2, H3, P, List, DataTable, Code, RepoLink } from "@/components/Writeup";

const REPO = "https://github.com/PuffBear/ASX_colab";

export default function OrderMatchingEnginePage() {
  return (
    <article className="container-prose" style={{ padding: "48px var(--s-7) 32px" }}>

      <WriteupHeader
        title="Building an order matching engine to understand how a market actually works"
        github={REPO}
        year="2025 — 2026"
        words="1,300"
        tags={["Trading", "Data structures", "Systems"]}
        note={<>Note: this describes the code in the public repository, which lists three
          symbols and runs one market-making bot per symbol. It is a learning project
          written in Python, not a low-latency system.</>}
      />

      <H2>First, what happens when you press “buy”</H2>
      <P>
        You open a trading app and buy ten shares at 213. A moment later the app says the
        order is filled. Between those two events, some piece of software decided who you
        bought from, at what price, and in what order relative to everyone else who wanted
        the same thing at the same time.
      </P>
      <P>
        That software is the matching engine. It is the part of an exchange that everything
        else exists to feed. I had only ever seen order books from the outside — reading
        depth, placing limit orders — and had never written one. This project was the fix
        for that.
      </P>

      <H2>Motivation</H2>
      <P>
        Most of what I knew about market microstructure was descriptive. I could say what
        price-time priority means, but I could not have said which data structure makes it
        cheap, or what goes wrong when two threads touch the same price level. Writing the
        engine forces answers to those questions, because the rules of a continuous double
        auction are simple to state and unforgiving to implement:
      </P>
      <List ordered items={[
        "The best price goes first: the highest bid and the lowest ask.",
        "At the same price, the earliest order goes first.",
        "A trade happens whenever the best bid is at or above the best ask.",
        "Orders can be partly filled, and the remainder keeps its place in the queue.",
      ]} />

      <H2>Design</H2>
      <P>
        The book has two sides, and each side needs two different kinds of ordering at once:
        by price across levels, and by arrival time within a level. I used a separate
        structure for each.
      </P>

      <H3>Price levels: a skip list</H3>
      <P>
        Each side of the book is a skip list keyed on price. A skip list is a sorted linked
        list with extra “express lane” pointers: each node is promoted to the next lane
        with probability one half, up to 32 levels. Search, insert and delete are
        O(log n) on average, like a balanced tree, but there is no rebalancing to get wrong,
        and each node can carry its own lock.
      </P>
      <P>
        Every node in the list is one price level, and holds the queue of orders resting at
        that price.
      </P>

      <H3>Orders at a level: a FIFO queue</H3>
      <P>
        Within a price level the orders sit in a doubly linked list. New orders go on the
        tail and matching takes from the head, which is time priority. The list is doubly
        linked so that a cancel can unlink an order from the middle in O(1); a dictionary
        from order ID to order finds it without a scan.
      </P>
      <DataTable
        head={["Operation", "Structure", "Cost"]}
        rows={[
          ["Find or create a price level", "Skip list", "O(log n) expected"],
          ["Best ask", "Skip list head", "O(1)"],
          ["Add an order at a level", "Linked-list tail", "O(1)"],
          ["Take the oldest order at a level", "Linked-list head", "O(1)"],
          ["Look up an order to cancel", "ID → order dictionary", "O(1)"],
          ["Unlink a cancelled order", "Doubly linked list", "O(1)"],
        ]}
      />

      <H3>The matching loop</H3>
      <P>
        When an order arrives it is placed on its side of the book, and the engine then
        matches until the book no longer crosses:
      </P>
      <Code>{`while best_bid >= best_ask:
    bid = oldest order at best_bid
    ask = oldest order at best_ask
    qty = min(bid.quantity, ask.quantity)
    execute_trade(bid, ask, qty)      # records the trade, updates last traded price
    remove whichever order is now fully filled
    drop the price level if its queue is empty`}</Code>
      <P>
        A partly filled order stays at the head of its queue with a smaller quantity, so it
        keeps its time priority. Each execution is recorded as a trade and updates the
        symbol’s last traded price. Order IDs come from a single shared counter, so they are
        unique across symbols and strictly increasing.
      </P>

      <H3>Many symbols, many threads</H3>
      <P>
        A wrapper keeps one independent order book per listed symbol. A small Flask API sits
        in front of it with two endpoints: one to place a limit order, one to read a
        symbol’s current bids and asks. The server is threaded, and every price level
        carries its own lock, so two orders at different prices do not wait on each other.
      </P>

      <H2>Giving it a market to match</H2>
      <P>
        An empty book is not much to look at, so each symbol gets a market-making bot on its
        own thread. Each symbol is first seeded with a one-share buy and sell at its opening
        price, which sets the last traded price. Then every one to three seconds each bot
        either:
      </P>
      <List items={[
        "places a new limit order of 1 to 20 shares, priced to hit the best quote on the other side so that trades actually happen (it keeps at most ten orders resting), or",
        "cancels one of its own resting orders.",
      ]} />
      <P>
        Human orders arrive through the same API and are matched against the bots and each
        other with no special treatment. The front end is a Next.js app with a live order
        book view, an order ticket, a price chart, and listing, portfolio and account pages.
      </P>

      <H2>What I got wrong, and what I learned</H2>
      <List items={[
        <><strong>The best bid is not O(1).</strong> Both sides use the same ascending skip list. The best ask is the first node. The best bid is the <em>last</em> node, and the code finds it by walking the bottom lane to the end, which is O(n) in the number of price levels. The bid side should be keyed in descending order, or keep a tail pointer. With a few dozen levels it does not matter; on a real book it would.</>,
        <><strong>Locks per level are not enough.</strong> A lock on each price level protects that level’s queue. It does not protect the skip list’s own pointers while a level is being inserted or removed, and it does not make “read best bid, read best ask, then trade” one atomic step. Real engines avoid the problem by running matching for a symbol on a single thread and putting the concurrency at the edges. I understand why now.</>,
        <><strong>Python’s interpreter lock hides bugs.</strong> Only one thread runs Python bytecode at a time, so many races that would corrupt the book in C++ simply do not show up. The design looked safer in testing than it is.</>,
        <><strong>Only limit orders exist.</strong> The API accepts limit orders only. Market, stop and fill-or-kill orders are sketched in the comments and not implemented.</>,
        <><strong>The tests are thin.</strong> There is a unit test for FIFO execution at a single level. Partial fills, cancels and empty-level cleanup are exercised by the bots, not by assertions.</>,
      ]} />

      <H2>Conclusion</H2>
      <P>
        The engine does what a continuous double auction is supposed to do: it keeps price
        priority across levels and time priority within them, handles partial fills, and
        serves several symbols to human and automated traders at once. The more useful
        outcome was finding out exactly where my mental model was thin — that the two sides
        of a book are not symmetric for a sorted structure, and that the sensible way to
        make matching thread-safe is mostly to not share it between threads.
      </P>
      <P>
        If I rebuilt it, matching would be single-threaded per symbol with a queue in front,
        the bid side would be ordered descending, and the tests would be property-based:
        generate random order streams and assert that the book never crosses and that no
        order is filled ahead of an earlier one at the same price.
      </P>

      <RepoLink href={REPO}>Order matching engine on GitHub</RepoLink>
    </article>
  );
}
