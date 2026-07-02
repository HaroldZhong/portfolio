# Asking Better Questions: What Stanford's STORM Taught Me About Research

Three months into a literature review on AI governance, I realized I had been reading the wrong papers for two weeks.

Not wrong in the sense of low quality — they were fine papers, well-cited, relevant to the topic I'd typed into my search bar. The problem was upstream. I had framed the whole review around one community's assumptions, which meant I was systematically finding work that confirmed a narrow angle and missing everything that challenged it. The review didn't fail because I missed a search result. It failed because I never asked the question that would have surfaced the disagreement.

I think most researchers have been there. You know the feeling — forty papers in and something nags at you, and then a colleague from a different subfield says one sentence that cracks the whole frame open. You realize the bottleneck was never retrieval. It was knowing what to ask.

That is why [STORM](https://arxiv.org/abs/2402.14207) caught my attention. The headline — "AI writes Wikipedia articles" — honestly made me scroll past it the first time. What stuck was the claim hiding underneath: that the pre-writing stage, figuring out *what to ask*, is a problem you can actually engineer.

## What STORM actually does

STORM stands for **Synthesis of Topic Outlines through Retrieval and Multi-perspective Question asking**. The paper behind it ([Shao, Jiang, Kanell, Xu, Khattab, and Lam, NAACL 2024](https://arxiv.org/abs/2402.14207)) targets the research step most tools skip entirely: the scoping and outlining you do *before* the first paragraph.

The system works in three stages, described on the [Stanford project page](https://storm-project.stanford.edu/research/storm/):

1. **Discover perspectives.** Survey existing articles on related topics to find the different angles people use to write about a subject.
2. **Simulate conversations.** Have writers carrying those different perspectives interview a "topic expert" grounded in internet search.
3. **Curate an outline.** Organize what the conversations surfaced into a structured outline, then draft from it.

You can run the whole thing yourself — the code is open source at [stanford-oval/storm](https://github.com/stanford-oval/storm) (`pip install knowledge-storm`) — or try the hosted [research preview](https://storm.genie.stanford.edu/) by typing in a topic.

## The real insight: one questioner is not enough

Here's the thing that reorganized how I think about early-stage research.

The Stanford team found that **directly prompting a language model to ask questions does not work well**. Ask a model "what questions should I research about X," and you get a flat, competent, thoroughly obvious list — the same questions anyone would ask, which means the same blind spots everyone has.

Their fix is the "multi-perspective" part. Instead of one neutral questioner, STORM derives several *personas* from how a topic is actually written about, and lets each persona drive its own line of questioning against a source-grounded expert. A policy angle asks different questions than an economic angle, which asks different questions than a historical angle. The conversations collide, and that collision is where real coverage comes from.

This is not a new idea in scholarship — journalists have always known you need sources with different stakes to triangulate a story, and qualitative researchers deliberately sample for maximum variation. The contribution here is automating that instinct and proving it outperforms the naive alternative.

It also matches something I had already learned the hard way and written about in my [NotebookLM research workflow](/portfolio/blog/notebooklm-research-workflow): when every source agrees, it is usually because they all come from the same ecosystem, not because the question is settled. STORM attacks the same problem one step earlier — at the question stage rather than the source stage.

## The numbers, honestly

I try not to repeat benchmark figures without saying what they measure, so here's the honest version.

On the FreshWiki evaluation, the paper reports that STORM-generated articles scored about **25% higher on organization and roughly 10% better on coverage** than a retrieval-augmented baseline. That is a real, peer-reviewed result, and it is specifically about how well the generated articles were organized and how much ground they covered — not about factual reliability.

The honest part of the paper is the part I trust most. When experienced Wikipedia editors reviewed the output, they flagged problems the automatic metrics miss, including **source bias being transferred** into the generated text. Better organization is not the same as better judgment. A well-structured article built on a lopsided source set is a well-structured lopsided article.

My reading is narrow on purpose: STORM is strong evidence that *multi-perspective question generation broadens what you investigate* — a different claim from the output being trustworthy without verification. The paper is careful about that difference. I try to be too.

## Co-STORM: the version I find more honest

The follow-up, [Co-STORM](https://arxiv.org/abs/2408.15232) (*"Into the Unknown Unknowns,"* EMNLP 2024), is the version that feels closer to how research actually works. Instead of running the whole pipeline autonomously, Co-STORM lets you **observe and occasionally steer** a conversation between multiple language-model agents, while it maintains a running mind map of what has been found.

The framing I keep coming back to is "unknown unknowns" — the things you didn't know to ask about. A solo search only returns answers to questions you already had. Watching agents with different perspectives talk surfaces the questions you would not have thought to type.

The reported human-evaluation numbers — roughly **70% of participants preferring Co-STORM over a search engine and 78% over a RAG chatbot** for this kind of open-ended discovery — are encouraging, but I read them as preference data from a study, not a universal verdict. Useful signal, modest sample, specific task. If someone quotes those numbers at you as proof that search engines are obsolete, push back.

## The one move I actually use

You do not need to install anything to borrow the core idea. Before a literature review or a landscape scan, I now do a deliberate **perspective pass**:

1. Write down 3 to 5 perspectives that would each write about the topic differently — a methodologist, a practitioner, a critic, a policy reader, someone from an adjacent discipline.
2. Generate questions *from each perspective separately*, one list per persona. The methodologist asks about identification and confounders. The critic asks what the framing leaves out. The practitioner asks what breaks in deployment.
3. Look for where the question sets disagree or barely overlap. Those gaps are usually where your own blind spots live.
4. Only then do I start retrieving and reading.

Honestly, it feels slow for the first ten minutes. Then it saves me weeks, because I stop discovering halfway through that I framed the whole review around one community's assumptions. That's the scenario from the top of this post: two weeks of reading the wrong things. This is the specific habit that fixed it.

If STORM handles the *pre-writing* question generation, a source-grounded tool like NotebookLM handles the *verification* of the answers. I treat them as two halves of one workflow.

## Where it fits, and where it doesn't

I'd reach for STORM or Co-STORM when:

- I am entering an unfamiliar topic and want a broad, structured starting map.
- I want to stress-test my own framing by seeing perspectives I would not have generated.
- The output is an internal scaffold I will rework anyway.

I would not lean on them when:

- The question is contested in ways that need expert judgment about *which* sources are credible — the system can structure a biased corpus just as neatly as a balanced one.
- I need verified, citation-checked claims for something external. STORM's job ends before verification begins.
- The primary evidence is not on the open web, which is what the simulated expert searches.

## Try it this week

Pick a topic you are about to research. Before you open a single paper:

1. Run it through the [STORM research preview](https://storm.genie.stanford.edu/) and read the outline it produces — especially the sections you would not have included.
2. Separately, do the manual perspective pass and compare your question set to STORM's.
3. Note every question that appears in one list but not the other. That difference is the part of the topic you were about to miss.

Most research tools help you find sources. STORM's contribution is the step before that — figuring out what to ask, from whose point of view — and it turns out that step is where reviews go sideways. I know, because mine did, until I stopped treating question generation as something that takes care of itself.
