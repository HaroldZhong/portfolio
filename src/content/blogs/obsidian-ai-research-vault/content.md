# Your Vault Is the Source of Truth: Adding AI to Obsidian Without Losing the Plot

I keep two kinds of AI workspace, and the day I confused them taught me more than any plugin tutorial.

One is where I think out loud: a chat window, a [NotebookLM](/portfolio/blog/notebooklm-research-workflow) session, an analysis I run and throw away. It's fast, conversational, and disposable. Nothing in it is load-bearing.

The other is my Obsidian vault: a folder of plain Markdown files, linked together, sitting on my own disk. That is the source of truth. When the two disagree, the vault wins, because the vault is the thing I can still read, search, and trust in five years.

The interesting question, the one I've spent the last year navigating, is what happens when you put AI *inside* the second workspace. Over the durable vault, not just in the disposable chat. Done carelessly, it quietly erodes the properties that made the vault trustworthy in the first place. Done well, it makes a research vault genuinely better.

This post is about where the line is.

## Why boring technology matters here

Obsidian's whole premise is boring on purpose: your notes are plain Markdown files in a local folder. No database, no proprietary format, no server. I used to think that boringness was a limitation. Now I think it's the reason a vault is a good *foundation* for AI rather than just another place to dump model output:

- **It's plain text**, so any tool — including a model — can read and write it without lock-in.
- **It's linked**, so the relationships between ideas are explicit, not implied.
- **It's local and owned**, so you decide what, if anything, leaves your machine.

There's a long tradition behind this. Scholars kept commonplace books for centuries — personal collections of quotes, ideas, and references organized by the keeper's own logic. The appeal was the same: a durable, portable, trusted record that belonged to the person who built it. An Obsidian vault is a commonplace book with backlinks. The question is whether adding AI breaks the trust that makes the whole thing work.

The distinction I care about: the vault is where verified, durable knowledge lives. AI is a tool that operates *on* it. The moment AI output gets written back into the vault as if it were established fact, you have a provenance problem — and provenance problems compound silently until the day you cite something and can't tell whether past-you wrote it or a model did.

## Local-first is the part I won't compromise

For a research vault that may hold unpublished work, notes on participants, or half-formed ideas I'm not ready to share, where the computation happens is not a detail. It is the whole decision.

This is the part of the Obsidian AI ecosystem that has matured most. [Smart Connections](https://github.com/brianpetro/obsidian-smart-connections) builds semantic links between your notes using embeddings, and its design is explicitly local-first: "Embeddings are created locally by default. Your notes stay on your machine." [Copilot for Obsidian](https://github.com/logancyang/obsidian-copilot) takes a similar stance on data ownership — "Your data is 100% yours: Local search and storage" — and can be pointed at self-hosted models so vault content never leaves your machine.

I treat the cloud-versus-local choice as a per-vault policy, not a per-session whim. If a vault contains anything sensitive, it runs against local models only, full stop. The convenience of a frontier model is real, but it's not worth quietly streaming a research vault to someone else's servers.

## What AI is genuinely good at over a vault

Two capabilities have earned a permanent place in how I work:

**Semantic surfacing.** Smart Connections shows me notes that are *about the same thing* as what I'm writing, even when they share no keywords. For a vault that has grown past the point where I remember everything in it, this is the difference between a living graph and an abandoned archive. The win is not "AI wrote my notes." It's "AI helped me find the note I forgot I wrote." That distinction matters more than it sounds.

**Grounded question-answering over my own corpus.** Copilot's Vault QA lets me ask questions and get answers drawn from my own notes. Used as a retrieval-and-pointer tool (find the relevant notes, then I read them), it is excellent. Used as an oracle that summarizes my vault and is believed without checking, it's the same trap as any other RAG system. The difference between those two uses is entirely in how much you trust the answer before opening the source.

A [2025 ACM position paper](https://dl.acm.org/doi/10.1145/3688828.3699647) frames this shift as personal knowledge management moving from the passive "second brain" toward something more like an active companion. That's the right direction, but "active" has to mean *assists my thinking*, not *replaces my record of what is true*.

## Five rules for not corrupting the vault

These are the guardrails I've settled on. They're not elaborate, and that's deliberate — if the rules are complicated, I won't follow them under deadline pressure, which is exactly when they matter most.

1. **AI-generated notes are quarantined and labeled.** Anything a model writes goes into a clearly marked area with a property like `source: ai-generated` and a timestamp. It's a draft until I've verified and rewritten it. It never silently becomes a "fact note."
2. **Provenance survives.** If a note makes a claim, it links to where the claim came from. AI can help me find the source; it doesn't get to *be* the source.
3. **Links are mine.** I let Smart Connections *suggest* connections, but I decide which ones become real `[[wikilinks]]`. Auto-linking everything produces a hairball.
4. **Retrieval, not belief.** When I ask a question over the vault, I treat the answer as a pointer to notes I then open and read.
5. **The vault stays portable.** No plugin gets to store essential knowledge in a format I can't read as plain text. Plugins come and go; the Markdown has to outlive them.

That last rule isn't paranoia. Obsidian AI plugins come and go quickly, and not every project is maintained forever — [Smart Composer](https://github.com/glowingjade/obsidian-smart-composer), for instance, is largely a single-developer effort. Building your knowledge on top of plain Markdown means a plugin going quiet is only an inconvenience.

## How this differs from a NotebookLM session

Because the tools overlap, let me draw the split explicitly — especially since I've [written about NotebookLM before](/portfolio/blog/notebooklm-research-workflow):

- **NotebookLM (or any chat) is the analysis session.** I upload a bounded source set, interrogate it, extract what I need, and the session is disposable. It's optimized for *this question, right now*.
- **The Obsidian vault is the durable layer.** Verified findings, my own synthesis, and the links between projects accumulate across months and years. It's optimized for *future me*.

The mistake is using one for the other. Treating a chat session as a permanent record, or treating the vault as a scratchpad. AI belongs in both, but it plays a different role in each. In the session it's the engine of analysis. In the vault it's a librarian — surfacing, connecting, retrieving — never the author of record.

## A weekend setup

You don't need an elaborate system. Start small and local:

1. Install [Smart Connections](https://github.com/brianpetro/obsidian-smart-connections) and let it index your vault locally. Spend a week just noticing which related notes it surfaces while you write.
2. Add a `source` property to your note template, so you can distinguish human-written notes from AI-assisted ones from day one.
3. If you want chat over your notes, add [Copilot](https://github.com/logancyang/obsidian-copilot) and, if the vault is at all sensitive, configure it against a local model.
4. Keep an `_ai-inbox` folder. Anything a model generates lands there first and only graduates into the real vault after you've checked and rewritten it.

The point is to keep the vault *trustworthy* while letting AI do the two things it's genuinely good at: helping you find what you already know, and helping you ask better questions of it.

The chat window is where I think. The vault is what I trust. AI is welcome in both — as long as it never gets to blur the difference. That's the line I drew the day I confused my two workspaces, and I haven't moved it since.
