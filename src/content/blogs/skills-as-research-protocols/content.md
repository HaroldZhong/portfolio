# SKILL.md as a Portable Research Protocol

The last time I onboarded a research assistant onto a literature screening task, I spent forty minutes explaining the method — inclusion criteria, search strings, the order things run in, what to do with ambiguous records. Two weeks later, I onboarded a different assistant and spent forty minutes explaining the same method, slightly differently.

If you've ever written a methods section, you already write protocols. Inclusion criteria, search strings, screening rules, the order you run things in. You write them so a reader can follow your reasoning and, ideally, reproduce it.

The problem is that the protocol lives in a PDF and the work lives in your head. When you sit down with an AI assistant, you re-explain the method from scratch every session, slightly differently each time. The protocol is documentation. The execution is improvisation.

Agent Skills close that gap. A skill turns the method you would have written into something the assistant can actually load and run. Same idea as a protocol — except it's executable, versioned, and shareable. For people who already standardize methods for a living, this maps onto existing habits almost too neatly.

## What an Agent Skill actually is

The format is deliberately boring, which is the point. Anthropic describes a skill as a directory built around a SKILL.md file — organized instructions, scripts, and resources that give agents additional capabilities ([Anthropic, 2025-10-16](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)). A folder. One Markdown file. Optional supporting files.

The published [Agent Skills specification](https://agentskills.io/specification) is more precise: a skill is a directory containing, at minimum, a SKILL.md file, with optional `scripts/`, `references/`, and `assets/` subdirectories. The SKILL.md file itself is YAML frontmatter followed by Markdown content. The only required frontmatter fields are `name` and `description`; optional ones include `license`, `compatibility`, `metadata`, and an experimental `allowed-tools`. After the frontmatter, the Markdown body holds the instructions with no format restrictions, and the spec recommends step-by-step instructions, input/output examples, and common edge cases.

The mechanism that makes this scale is progressive disclosure. The spec describes three stages: metadata of roughly 100 tokens (just `name` and `description`) loaded at startup, the full SKILL.md body (under 5,000 tokens recommended) loaded only when the skill is activated, and the resource files loaded only when actually needed ([Agent Skills specification](https://agentskills.io/specification)). Think of the three levels as a table of contents, then chapters, then an appendix.

A note on those numbers: the spec presents them as recommendations, and implementations may vary. I wouldn't treat "100 tokens" or "5,000 tokens" as hard limits. They're sizing guidance, not a contract.

## Why this maps onto reproducible research

Here's the part that made me pay attention. A good research protocol has three properties: it's versioned, it's shareable, and it's auditable. A skill, structured as a folder of plain text, has the same three for free.

- **Versioned.** Drop a skill folder in a Git repo and every change to your screening logic is a diff with a date and an author. That's closer to how a registered protocol amendment should work than anything I get from pasting prompts into a chat window.
- **Shareable.** Hand a collaborator the directory, and they get the exact method, byte for byte. The same artifact that documents the method also executes it, which removes the usual drift between what the protocol says and what someone actually did.
- **Auditable.** Because the instructions are Markdown and the scripts are real files, a reviewer can read the method without running anything. The frontmatter, the steps, the edge cases — all inspectable text.

There's a lineage here that goes back further than AI. The methods section itself was an invention — an agreement that science wouldn't be credible unless you wrote down exactly what you did, in enough detail that someone else could check. A skill is a methods section that also runs. The protocol and the execution are finally the same object.

That's my read, not a claim from the sources: the value here is less about raw capability and more about discipline. A skill forces you to write the method down in one place before you run it. Researchers already know this discipline pays off. The skill just closes the gap between the document and the doing.

## A worked example: literature screening

Concretely, here's how I'd lay out a skill for first-pass screening in a review:

```
literature-screening/
  SKILL.md
  references/
    inclusion-criteria.md
    exclusion-criteria.md
  assets/
    decision-log-template.csv
```

The SKILL.md frontmatter stays minimal (`name` and `description` are the only required fields):

```yaml
---
name: literature-screening
description: First-pass title/abstract screening against
  pre-registered inclusion and exclusion criteria. Use when
  triaging search results before full-text review.
---
```

The Markdown body holds the actual protocol — the same content you'd put in a methods section, written as steps the assistant follows:

1. For each record, read only the title and abstract. Do not infer beyond what is stated.
2. Apply the criteria in `references/inclusion-criteria.md` and `references/exclusion-criteria.md` in that order.
3. Emit one row per record into the decision log: record ID, decision (include / exclude / uncertain), the single criterion that drove it, and a one-line justification.
4. Flag anything ambiguous as `uncertain` rather than guessing. Uncertain records go to a human.
5. Never collapse two records into one judgment, and never decide from the title alone.

Progressive disclosure does quiet work here. At startup the assistant only sees the description. The full screening steps load when I invoke the skill. The criteria files load only when step 2 needs them. So the detailed inclusion rules (which can be long) don't sit in the context window during unrelated work.

What I get out of this: a screening pass that runs the same way every time, writes its own audit trail, and refuses to bluff on ambiguous records. Compare that to the forty-minute onboarding I described at the top — same method, but now it's a folder instead of a conversation.

## The portability angle

A skill isn't locked to one chat window. Anthropic supports skills across its chat interface, Claude Code, the Agent SDK, and its developer platform ([Anthropic, 2025-10-16](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)). The same folder moves between the chat interface, a coding agent, and an SDK pipeline.

There's also an open specification and a public reference repo. The [agentskills.io specification](https://agentskills.io/specification) documents the format, and the [anthropics/skills repository](https://github.com/anthropics/skills) holds the spec, a skill template, and example skills organized by category.

For research, portability matters more than it first appears. A method that only runs in one vendor's chat box isn't really reproducible. A method that's a plain folder against a documented spec can outlive the tool you wrote it in. The open-standard framing is what lets a skill behave like a protocol rather than a saved prompt.

## Where I would, and wouldn't, rely on this

A skill is a container for a method. It is not evidence that the method is any good, and that distinction matters more than the convenience does.

**Where I'd use one:**
- Repetitive, rule-governed stages: title/abstract screening, extraction into a fixed schema, formatting checks, consistency passes.
- Anywhere I want a written, diffable method that a collaborator can run identically.
- Tasks where the failure mode is drift and inconsistency, which a fixed protocol directly attacks.

**Where I'd be careful:**
- A skill can standardize a flawed method just as cleanly as a sound one. If your inclusion criteria are biased, a skill will apply that bias uniformly and at speed. Reproducible is not the same as correct.
- Skills don't remove the need for evaluation. I still need to check outputs against held-out gold judgments before trusting a screening or extraction skill. [DeepResearch Bench](https://arxiv.org/abs/2506.11763), an arXiv preprint from June 2025, built a benchmark of 100 PhD-level research tasks across 22 distinct fields. It targets full research agents rather than individual skills, but it's a useful reminder that capability claims need a yardstick, not a vibe.
- Judgment-heavy stages — interpreting conflicting findings, weighing study quality, deciding what a result means — are exactly where I don't want a rote protocol pretending to settle things. I keep those human, and my screening skills are built to hand ambiguity back rather than resolve it.
- A skill doesn't verify itself. The same discipline I apply to any AI output — checking citations, spot-checking decisions, keeping an uncertainty list — still applies. A fast, consistent skill raises the stakes on verification, because a silent error now propagates uniformly. My broader take on writing instructions that hold up is in my [prompt engineering notes](/portfolio/blog/prompt-engineering-best-practices).

## Try this in one afternoon

Pick the most repetitive, rule-bound step in your current project. Then:

1. Make a folder named for that step.
2. Write a SKILL.md with `name`, a one-line `description`, and your existing criteria as numbered steps.
3. Move the long reference material into a `references/` subfolder so it loads only when needed.
4. Run it on ten records you've already judged by hand, and compare.
5. Fix the steps where it disagreed with you, and commit the folder to version control.

That last step is the whole point. The moment your method is a versioned folder instead of a remembered habit, the protocol and the execution are the same object — which is what I was trying to get at with those two forty-minute onboarding sessions. The method didn't change between them. Both times, it lived in my head instead of in a file. Skills don't make your method correct, but they make it written down, repeatable, and reviewable, which is most of what reproducibility was ever asking for.
