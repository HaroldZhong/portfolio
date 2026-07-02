# Deep Research Agents for Literature Review: Breakthrough or Incremental?

The first time I watched a deep research agent produce a literature review, I was impressed and uneasy in the same minute.

I gave it a narrow question — something I already knew the answer to, because I'd been reading in that area for months — walked away, and came back to a structured multi-page report with section headings, a coherent argument, and a list of citations. It looked like something a careful graduate student would hand me after a week. The structure was good. The framing was reasonable.

And then I started clicking the citations, and the unease won.

Two didn't exist. One pointed to a real paper but attributed a claim the paper never made. Another was a preprint that had been retracted. The agent had no way of knowing any of this, because it had no way of knowing what it didn't know. It just wrote with the same confidence either way.

That experience is the whole tension of this post. These tools write the literature review for you, mostly. The "mostly" is where the work still lives — and it's worth pointing out that "mostly" is doing exactly the kind of heavy lifting these agents themselves are prone to: it sounds close to "completely," and the gap between the two is where everything breaks.

## What "deep research" agents actually do

The term gets used loosely, so it helps to be precise about the pattern.

A recent survey, [Deep Research: A Survey of Autonomous Research Agents](https://arxiv.org/abs/2508.12752), describes the paradigm as LLM agents that actively plan, retrieve, and synthesize to produce comprehensive, faithful analytical reports grounded in web-based evidence. It organizes the field around four pipeline stages: planning, question developing, web exploration, and report generation.

That four-stage framing matches what I see in practice. The agent breaks your question into sub-questions, goes out and reads sources, and then writes a synthesized report instead of dumping links. The survey covers the breadth of these systems along with optimization techniques, benchmarks, and open challenges.

One caution up front: the survey is a general overview of deep-research agents as a class. It doesn't name or benchmark specific commercial products, and the abstract reports no quantitative metrics. So when I talk about the four-stage pipeline, treat that as a description of the paradigm, not a scoreboard.

## Where these agents are genuinely strong

I want to be fair before I get critical, because the strengths are real and easy to undersell.

- **Coverage at speed.** The agent reads more sources, faster, than I would in a first sitting. For mapping an unfamiliar field, that breadth is genuinely useful.
- **Structure for free.** It returns an organized report with sections and a through-line instead of a pile of abstracts. That's a real head start.
- **Decomposition.** Splitting one broad question into retrievable sub-questions is a step I often do sloppily by hand, and the planning stage does it consistently.
- **A defensible starting scaffold.** As a first pass, the output gives me an outline and a candidate source set I can interrogate.

My read: for the *orientation* phase of a literature review — when you mostly need to know what exists and roughly how it fits together — these agents earn their place. That's not a small thing. Good librarianship has always started with knowing what's out there before deciding what matters. These agents are genuinely good at the first part.

## The synthesis and citation gap

Here's where I stop being impressed and go back to clicking links.

The clearest signal that this is hard comes from benchmark work. [DeepResearch Bench](https://arxiv.org/abs/2506.11763) is a benchmark of 100 PhD-level research tasks, each crafted by domain experts across 22 distinct fields. What I find telling is *how* the authors decided to evaluate these agents. They propose two human-aligned approaches: a reference-based method with adaptive criteria for report quality, and a separate framework that assesses information retrieval through effective citation count and overall citation accuracy.

Read that design choice carefully. Citation accuracy is a first-class axis of evaluation here, treated as distinct from whether the prose reads well. That tells you the field already knows report quality and citation reliability are two different problems, and that the second one isn't solved. The benchmark and framework are open-sourced, which I appreciate.

The most pointed assessment I've read comes from a medical-AI viewpoint in JMIR, and the title says the quiet part out loud: [Deep Research Agents: Major Breakthrough or Incremental Progress for Medical AI?](https://www.jmir.org/2026/1/e88195). The authors argue that deep research agents "represent an incremental evolution rather than a paradigm shift" in medical AI, and frame them as assistive research tools rather than pseudoexperts.

On citations specifically, the JMIR viewpoint flags accuracy as a common concern, including references to nonexistent articles and incorrect attribution of fictitious articles to real researchers. It reports that citation fidelity remains inconsistent across models, with subtle misinterpretations or unreliable references still common. The authors note that for some commercial systems the failure rate is strikingly high: roughly 47% to 50% of references produced by Google Gemini 2.5 Pro Deep Research and Perplexity AI Deep Research had fabricated authors or titles.

Two honest caveats on that figure, because they matter:

1. That fabrication-rate figure is the JMIR authors' characterization of specific commercial systems (Gemini and Perplexity Deep Research), not an independently reproduced benchmark result of my own. Attribute it to the viewpoint, and note it doesn't generalize to every deep research agent.
2. The JMIR article is scoped to medical AI and clinical workflows, not literature review in general. Its conclusions are sharpest for clinicians. I'm borrowing its framing, not claiming it audited general-purpose literature review.

With those caveats in place, the through-line still holds across all three sources. A benchmark that makes citation accuracy a separate evaluation axis. A survey that lists faithfulness and open challenges as live problems. A viewpoint calling the whole thing incremental and flagging citation reliability as inconsistent. The synthesis can look complete while the evidence underneath is shakier than the prose suggests.

That's the gap. Not that the output is wrong everywhere, but that you can't tell *where* it's wrong without checking — and the polish actively discourages you from checking. The JMIR authors name this directly as automation bias, warning that overreliance on AI-generated syntheses "risks eroding clinicians' critical appraisal skills" and framing these agents as assistive tools, not pseudoexperts. I think that warning generalizes well beyond medicine.

## How I use one without outsourcing judgment

I do use these agents. I just refuse to let the agent's report be the deliverable. It's an input to my process, never the output of it.

Here's the workflow I actually run:

1. **Scope narrow first.** I give the agent a tight, answerable question, not "review the literature on X." A bounded question produces a checkable report; a broad one produces confident mush.
2. **Treat the report as a lead list.** I read it once for structure and candidate sources, then set the prose aside. The value is the map, not the conclusions.
3. **Verify every load-bearing citation by hand.** I open the actual source for any claim my argument depends on. If a reference doesn't exist, or the source doesn't say what the report claims, the claim is gone. After reading the JMIR viewpoint, this is non-negotiable for me.
4. **Re-derive the synthesis myself.** I don't copy the agent's argument. I rebuild it from the sources I verified, which usually changes the emphasis and surfaces conflicts the agent smoothed over.
5. **Keep an explicit uncertainty list.** Anything I couldn't verify gets written down as unverified, not silently dropped or silently kept.

The principle underneath all five steps: the agent is allowed to accelerate retrieval and structure. It isn't allowed to make the judgment calls. Good prompting helps at the scoping step, and I've written separately on [prompt engineering practices](/portfolio/blog/prompt-engineering-best-practices) that apply directly to writing the initial research question.

## Where I would and wouldn't use this

I want this section to be real, because the honest answer is "it depends," and the dependencies are specific.

**Where I'd use a deep research agent:**

- Early-stage orientation in an unfamiliar field, where I need breadth fast and will verify later anyway.
- Generating a candidate source set and a first structural outline I'll then tear apart.
- Sanity-checking that I haven't missed an obvious cluster of work before I commit to a framing.

**Where I wouldn't rely on one:**

- Anything where a wrong or fabricated citation carries real cost: clinical, legal, or anything going into a manuscript's reference list unchecked. The JMIR viewpoint's citation-accuracy concerns make this a hard line for me.
- High-stakes synthesis where the *argument* is the contribution. Re-deriving it myself is the work, and the agent can't do that part credibly yet.
- Any setting where I don't have the time or access to verify citations. If I can't check it, I can't use it — and a polished unverifiable report is worse than no report because it tempts me to trust it.
- Situations where automation bias is already a risk, such as a team under deadline pressure that will treat the output as finished.

The pattern: I trust these agents for *finding* and *structuring*, and I don't trust them for *concluding*.

## Completing the trilogy

This is the third tool I've written about for the same underlying job, and the comparison clarifies where each one earns its keep.

I've covered my [NotebookLM research workflow](/portfolio/blog/notebooklm-research-workflow), which is source-grounded and verifiable precisely because you control the corpus and every claim points back to text you uploaded. Deep research agents trade that control for reach: they go find sources you didn't give them, which is powerful for coverage and exactly why citation verification becomes non-negotiable. The structural-memory questions I wrote about in [nested learning](/portfolio/blog/nested-learning-why-google-wants-models-with-real-memory) sit underneath all of this, since faithful long-horizon synthesis is partly a memory problem these architectures haven't fully solved.

So: breakthrough or incremental? I land where the JMIR authors do. The retrieval and structuring are a meaningful step forward and worth using today. The synthesis and citation reliability are an incremental evolution rather than a paradigm shift — and the benchmark designs treating citation accuracy as its own axis confirm the field knows it.

## One exercise before you trust one

Pick one narrow question you already know the answer to. Run a deep research agent on it, then verify every citation in the report by hand and count how many are accurate, missing, or misattributed.

That number — on a topic where you can grade the output — will tell you exactly how much to trust the tool on a topic where you can't. Do that once before you let one of these agents anywhere near a reference list that matters. It's the same instinct I described at the top — clicking the citations — except now you're doing it systematically instead of discovering the problem by accident.
