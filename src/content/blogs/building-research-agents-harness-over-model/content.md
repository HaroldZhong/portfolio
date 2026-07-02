# The Harness, Not the Model: Building Research Agents That Hold Up

The first time I built a small "research agent" — something to pull papers, extract claims, and draft a summary — I blamed every failure on the model. Wrong extraction? Bad model. Hallucinated citation? Bad model. Lost the thread halfway through? Bad model.

Almost none of that was true.

When I went back and looked, the failures were in the parts I built around the model: how I fed it context, how I defined its tools, how it kept track of what it had already done, and whether anything checked its output before I trusted it. The model was fine. The **harness** was the problem.

That word — harness — is the most useful reframe I've picked up from the last year of agent-engineering writing. And I keep coming back to it because the instinct to blame the model is strong, comfortable, and almost always wrong. Psychologists would call it a kind of fundamental attribution error — blaming the actor when the situation is the cause. Turns out we do it with software too.

## What "harness" actually means

Here's how I think about it now. The **harness** is everything around the model that turns a single text completion into a system that does work. Tools and how they're described. What goes into the context window and what gets left out. How state and memory persist across steps. The control flow that decides what happens next. The checks that catch bad output.

Anthropic describes its [Claude Agent SDK as a general-purpose agent harness](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — which is a clarifying way to see it. The model is the engine. The harness is the car. You can put a great engine in a car with no steering and no brakes, and you will still end up in a ditch.

For researchers, this matters because the interesting work is almost always in the harness. A frontier model can read a methods section. Whether your *system* reliably pulls the right methods section, extracts the right fields, refuses to invent a citation, and lets you audit how it got there — that is engineering, and it is yours to get right or get wrong.

## Start simpler than the hype suggests

The strongest, most repeated advice in this space is also the least glamorous: **do not build an agent until you have ruled out something simpler.**

Anthropic's [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) draws a clean line between two things people lump together:

- **Workflows**: LLMs and tools following predefined code paths you wrote.
- **Agents**: LLMs dynamically deciding their own steps and tool use.

Their explicit recommendation: "find the simplest solution possible, and only increasing complexity when needed." When the [Hacker News thread on that piece](https://news.ycombinator.com/item?id=44301809) hit 543 points in mid-2025, the practitioner consensus was blunter still: start with direct API calls, be skeptical of heavyweight frameworks, and reserve autonomous agents for genuinely open-ended tasks.

I'll be honest — this was a hit to my ego the first time I internalized it. I had built something I was calling an "agent" and it was really a workflow with extra steps and extra failure modes. Most research tasks I've automated turned out to be **workflows, not agents**. "Extract these six fields from each PDF" is a routing-and-parallelization workflow. "Draft a section, then critique it, then revise" is an evaluator-optimizer loop. Neither needs an autonomous agent making its own plan.

The test I use now: if I can draw the control flow on paper, it's a workflow, and I should just write that flow in code. I only reach for an actual agent when I genuinely cannot predict the steps in advance. That line has saved me from a lot of accidental complexity.

## Context engineering is the real skill

If there's one part of the harness that decides whether a research agent works or falls apart, it's what goes into the context window.

Anthropic's [Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) (September 2025) names it directly: context engineering is the craft of "curating what will go into the limited context window" out of everything that could conceivably go in. That's a step up from prompt engineering, which is mostly about wording. Context engineering is about *selection*: which sources, which prior steps, which tool outputs, in what order, and what to leave out.

LangChain's [Context Engineering for Agents](https://www.langchain.com/blog/context-engineering-for-agents) (July 2025) gives a four-part breakdown I keep reaching for: you **write** context (save it outside the window), **select** it (retrieve only what's relevant now), **compress** it (summarize when it grows), and **isolate** it (split work across sub-agents so each has a clean window).

For research specifically, this is the whole game. I've watched a literature agent fail because it had fifty papers' worth of text crammed into one window and quietly lost the plot around paper thirty. The model didn't get tired; the context got full. The fix is just-in-time retrieval, summarizing old steps, and giving each sub-task its own clean context.

## Tools are interface design

The other half of the harness is tools, and Anthropic's [Writing Effective Tools for Agents](https://www.anthropic.com/engineering/writing-tools-for-agents) (September 2025) makes a point that took me too long to internalize: a tool definition is a piece of interface design, and you should engineer the tool description and its outputs the same way you would a prompt. Return human-readable context rather than raw dumps. Keep the tool set small and unambiguous.

A "search papers" tool that returns clean, structured, relevant snippets makes the model look smart. The same tool returning raw HTML makes the same model look broken.

That difference is harness work. It always is.

## When the work runs long

Some research jobs genuinely span hours or days — building a dataset, refactoring an analysis pipeline, working through a long checklist. Anthropic's [Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) (November 2025) is the most concrete primary source I've found on this, and the techniques are refreshingly low-tech:

- **Structured setup** so the agent starts from a known environment.
- **A long, explicit feature list as the spec** — in their example, 200+ items, every one starting as failing — so the agent cannot declare victory early.
- **Git history plus a progress file as memory**, so a fresh session can recover what happened. As they put it, the model could use git to "revert bad code changes and recover working states."
- **One feature per session, committed incrementally**, keeping each context window small.
- **Real testing** — including browser automation — instead of trusting self-reported success.

The community has since distilled similar ideas into simpler patterns — the Ralph loop being the most prominent, where an agent runs in a simple loop with a fresh context each pass, files and git as memory, until a checklist is done. The mechanism is sound, the hype around it is louder than the evidence, and the same harness principles apply: durable state, mechanizable verification, and an escape hatch when things go wrong.

## Where I wouldn't use this

The honest limits, which matter more for research than for a demo:

- **If the output is consequential and hard to verify, do not automate the judgment.** Automate the fetching and formatting; keep the inference under review. This is the same discipline I described in my [NotebookLM research workflow](/portfolio/blog/notebooklm-research-workflow): the verification step does not get delegated.
- **Autonomy is rarely the bottleneck; reliability is.** A workflow you can read beats an agent you can't predict, for anything you will defend later.
- **More framework is not more capability.** Most of what made my research tooling reliable came from removing abstraction. That's a sentence I would have argued with a year ago.

## Build the smallest possible version this week

If you want to feel the difference between blaming the model and fixing the harness, try this:

1. **Pick a bounded task** with a checkable output — "extract study design, sample size, and primary outcome from each paper into a table."
2. **Write the control flow yourself** (a loop over papers, a fixed extraction step). Do not start with an agent framework.
3. **Design one good tool**: a function that returns clean, relevant text from a paper instead of the raw file.
4. **Keep each call's context small**: one paper at a time, summarize as you go.
5. **Add one verifier**: a second pass that checks each extracted field against the source text and flags anything it cannot ground.
6. **Persist state to disk**: write the table and a short progress log after every paper, so a crash loses nothing.

That's a harness. It's boring, and that is the point. A year ago I would have built something more elaborate and blamed the model when it didn't work. Now I know: the model was never the hard part. The scaffolding that makes its output trustworthy is the work — and it's the part worth getting good at.
