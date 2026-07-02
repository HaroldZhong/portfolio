# Stop Orchestrating, Start Looping? An Honest Look at the Ralph Loop

The claim that made me stop scrolling: a twenty-line shell loop, wrapped around a coding agent, allegedly out-ships the elaborate orchestration frameworks people spend weeks wiring together. No graph of agents. No router. No supervisor model deciding who does what. Just a loop, a checklist, and git.

My first reaction was reflexive skepticism. I've read enough agent-framework launch posts to be wary of anything that sounds this clean. But the idea kept circulating, and the more I looked at the actual mechanism, the more I realized the interesting part isn't the loop. It's *why* the loop works when it works — and exactly where it stops working. That ceiling is the whole story, and most of the excitement skips past it.

So this is my honest read, hard limit included.

## What the Ralph loop actually is

The name comes from Geoffrey Huntley, who frames modern software development as an iterative looping process rather than the traditional brick-by-brick build ([Huntley, "everything is a ralph loop," 17 Jan 2026](https://ghuntley.com/loop/)). His framing is deliberately minimal: Ralph is monolithic — a single process working autonomously in a single repository, performing one task per loop. You allocate backing specifications, give the loop a goal, and let it iterate, treating the LLM as a programmable computer that self-corrects.

The clearest reference implementation I found is [snarktank/ralph](https://github.com/snarktank/ralph), which runs a coding agent in a loop until every item in a Product Requirements Document (PRD) is complete. Its per-iteration flow:

1. Spawn a fresh agent instance with clean context.
2. Pick the highest-priority incomplete user story.
3. Implement it.
4. Run typecheck and tests.
5. Commit if the checks pass.
6. Mark that story complete in `prd.json`.
7. Append what was learned to an append-only `progress.txt`.
8. Repeat until all stories pass or a maximum iteration count is hit.

Memory persists across iterations through three plain artifacts: git history for committed work, `progress.txt` as a running log, and `prd.json` tracking which stories pass ([snarktank/ralph](https://github.com/snarktank/ralph)). It's one of a pair of 20k-plus-star repositories that grew up around the pattern, so the idea has clearly resonated — though stars measure attention rather than results.

That's the whole thing. No orchestration layer. The loop *is* the orchestration.

## Why it works when it works

Strip away the hype and three design choices are doing the real work. None of them is novel on its own. The combination is what matters.

**Fresh context every pass.** Each iteration starts a clean agent instance rather than carrying a growing conversation forward ([snarktank/ralph](https://github.com/snarktank/ralph)). Long agent runs degrade as the context window fills with stale output, half-finished reasoning, and dead ends. Resetting on every loop sidesteps that decay. The cost of forgetting is paid back by reading the durable artifacts at the start of the next pass.

**Files and git as memory.** Instead of an in-memory state object, the loop writes state to disk: commits, a progress log, a status file. This is sturdier than it looks. Git history is an auditable record of what changed and when, and it doubles as an undo mechanism. The agent can revert a bad change and recover a working state rather than reasoning its way out of a hole.

**A checklist as the spec.** The PRD isn't documentation — it's the termination condition. The loop runs until every story is marked passing. A machine-checkable list of "done" items keeps the agent from declaring victory early and gives the loop something concrete to grind against pass after pass.

My read: the magic people attribute to "the loop" is really the discipline of externalizing state and verification into durable files. The loop is just the cheapest possible scheduler on top of that discipline.

## This isn't a fringe trick

What convinced me the mechanism is sound, rather than a fad, is how closely it mirrors independent engineering work that wasn't selling a loop at all.

Anthropic's writeup on long-running agents lands on nearly the same primitives ([Justin Young, "Effective harnesses for long-running agents," 26 Nov 2025](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)). Their harness uses a feature list as the spec: an initializer agent creates a JSON file listing 200+ features all marked "failing," which prevents the agent from prematurely declaring the project complete. Memory lives in git commit history plus a progress file, and each session begins by reviewing those artifacts. They run one feature per session to reduce context-window exhaustion. On recovery, they describe the model using git to "revert bad code changes and recover working states."

Fresh context per unit of work. A failing-checklist spec. Git plus a progress file as memory. One item at a time. Two efforts arriving at the same shape without citing each other is the strongest signal I have that the shape is real.

The [12-factor-agents](https://github.com/humanlayer/12-factor-agents) project pushes a related principle: *own your control flow*. Keep explicit control over decision logic instead of outsourcing it to a prompt-driven agent loop. It also urges owning your context window and unifying execution state with business state.

At first glance that reads as the opposite of "just loop it." I think they actually agree more than they conflict. The Ralph loop *is* an owned control flow: the loop, the checklist, and the commit gate are simple code you can inspect, not a framework's hidden prompt graph. Where the loop violates the 12-factor spirit is when people treat it as a magic box and stop owning what the spec and the verification step actually contain. The principle that survives: keep the parts you can read and check in your own hands.

## The honest ceiling

Here's the part the excited threads skip.

The Ralph loop is only as good as its verification step, and that ceiling doesn't move with tuning.

Every loop I described gates its commit on something checkable: typecheck and tests in the reference implementation, browser automation in Anthropic's harness ([snarktank/ralph](https://github.com/snarktank/ralph); [Anthropic](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)). The loop makes progress because each pass produces a signal it can trust: did the check go from red to green? Remove that signal and the loop is just an agent confidently marking its own homework.

This is the same principle that runs through the entire history of quality control — Deming's plan-do-check-act cycle, the scientific method's insistence on falsifiable predictions, peer review as a verification gate. The pattern keeps showing up because it works: the rigor of any iterative process lives in the check step, not in the iteration itself. A loop without verification isn't a system. It's a random walk with commit messages.

So the real precondition is whether the loop can mechanically tell that each unit of work is correct — a different question from whether an agent can write the code. Where that question has a clean yes, the loop compounds small verified wins into something substantial. Where it doesn't, the checklist becomes a list of unfalsifiable claims, and a fresh context every pass means no human is watching the reasoning that produced them.

I want to be clear about what I'm *not* claiming: none of the four sources I'm working from report a throughput number, a success rate, or a productivity multiplier for this pattern, so I won't invent one. I've also seen cost and ROI figures attached to the Ralph loop online — a cheap MVP for a few hundred dollars, that genre. I couldn't verify any of them in the primary sources, so treat them as marketing until someone shows the receipts. The mechanism is real. The dollar claims are not something I can stand behind.

## Who should try it, and who shouldn't

**I'd reach for a Ralph-style loop when:**

- The work decomposes into small, independently verifiable units.
- Correctness is machine-checkable: tests, typecheck, a build, an end-to-end script.
- The task is well-specified enough that a checklist genuinely captures "done."
- The blast radius is contained — ideally a single repository where git can cleanly revert a bad pass.
- The cost of a wrong-but-plausible result is low, because you'll review the diff before it matters.

**I wouldn't use it for:**

- Consequential or irreversible work, where a confidently-wrong commit causes real harm before review.
- Anything whose correctness can't be verified mechanically: research judgment, design taste, ambiguous requirements, claims about the world.
- Tasks that need cross-system coordination beyond a single repo.
- Situations where the spec itself is the hard part. If you can't write the checklist, the loop has nothing honest to grind against.

For the unverifiable cases I still borrow the *artifacts*. Externalizing state into files and keeping a git-backed audit trail is good practice whether or not you automate the loop. But I keep a human in the decision seat — the same way I don't let a source-grounded tool flatten disagreement on its own in my [NotebookLM workflow](/portfolio/blog/notebooklm-research-workflow).

## If you want to try it

If you want to feel the difference rather than argue about it, take one small, well-tested project:

1. Write the spec as a checklist of machine-checkable items, each one a test that currently fails.
2. Make a tiny loop: pick the top failing item, implement it, run the checks, commit only if they pass.
3. Append one or two lines of "what I learned" to a progress file each pass, and let git history be your memory.
4. Watch the verification step closely. That's the part that determines whether the loop is producing real progress or confident noise.

If the loop stalls or starts marking things done that aren't, the idea is telling you the truth: your verification wasn't strong enough, which is exactly the thing you needed to know. For thinking about how to write the spec and the per-pass instructions clearly, the same habits from [prompt engineering](/portfolio/blog/prompt-engineering-best-practices) apply directly.

Coming back to where I started — a twenty-line shell loop allegedly out-shipping orchestration frameworks. My honest take after digging in: the loop doesn't out-ship anything. The *discipline underneath it* does. Externalizing state, mechanizing verification, starting fresh each pass, and having the honesty to stop when the checks can't tell you whether you're right. That discipline is real and worth borrowing, loop or not.
