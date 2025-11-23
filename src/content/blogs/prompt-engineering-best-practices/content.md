# Prompt Engineering Best Practices for Research

If you're doing research in 2025, you now have a strange new collaborator: an AI that can skim hundreds of abstracts, rewrite dense paragraphs, and even help you think through methods and analysis plans.

But here's the catch:

> The difference between "wow, this saved me two days" and "wow, this confidently made stuff up" is usually not the model – it's the **prompt**.

Recent work on large language models in scientific workflows has shown that prompt design can substantially change output quality, especially for reasoning-heavy tasks and literature synthesis. At the same time, we know these models hallucinate, oversimplify findings, and can misrepresent key details if we don't explicitly constrain them.

So for researchers, "prompt engineering" isn't a party trick. It's starting to look a lot like **methodology**.

## Why structured prompts matter in research

Large language models are now being used to summarize papers, generate hypotheses, critique study designs, and assist with coding and data analysis. Studies have found that:

* Certain prompt patterns (like step-by-step reasoning, asking for uncertainty, or explicitly prioritizing accuracy) significantly improve performance.
* Poorly specified prompts increase hallucinations and misinterpretations, especially in technical domains like medicine and law.

Industry guides echo this: OpenAI, Anthropic, and others all emphasize **clear task definitions, explicit constraints, and structured outputs** as core prompt engineering habits.

The short version: If you treat prompts like casual search queries, you'll get casual, inconsistent results. If you treat prompts like **study protocols**, you get something closer to a reliable tool.

That's where **COSTAR** comes in.

## The COSTAR Framework

COSTAR is a lightweight way to structure prompts so you and the model are on the same page:

* **C – Context**: What's the situation? What are you working on?
* **O – Objective**: What exactly do you want the model to help with?
* **S – Style**: How should the answer *feel* (e.g., concise vs. detailed; technical vs. accessible)?
* **T – Tone**: Level of formality and stance (neutral, critical, supportive, etc.).
* **A – Audience**: Who is this for – you, your PI, journal reviewers, undergrads?
* **R – Response**: The output format (bullets, table, outline, numbered steps, pseudo-code, etc.).

## Applying COSTAR to Literature Reviews

Instead of:
> "Summarize the literature on neighborhood effects and adolescent depression."

Try a COSTAR-style version:

**Context**: "You are an academic assistant helping with the introduction section of a paper in social epidemiology. The paper is about neighborhood effects on adolescent depression, with a focus on immigrant youth in the U.S."

**Objective**: "Identify 3–4 major debates or tensions in the literature on neighborhood context and adolescent mental health. For each debate, summarize: (1) the core question, (2) main positions or 'camps,' (3) representative empirical papers (with full citations), and (4) weaknesses or unresolved issues."

**Style**: "Style: academic, suitable for a peer-reviewed journal, but concise and schematic."

**Tone**: "Tone: balanced and critical, acknowledging contributions while clearly pointing out limitations."

**Audience**: "Audience: readers familiar with social determinants of health but not experts in neighborhood effects."

**Response**: "Response: return a Markdown table with columns: \`Debate\`, \`Main Positions\`, \`Flagship Papers\`, \`Unresolved Issues\`. After the table, add a short paragraph (150–200 words) proposing where a new study on immigrant youth could position itself in these debates."

## Building a reusable prompt library

One of the easiest "upgrades" you can give your research group is a **shared prompt library**: vetted templates that students can adapt for recurring tasks.

A few practical tips:

1. **Keep prompts modular** – One for "opening strategies," one for "debate-style literature review," one for "scope justification," etc.
2. **Annotate with intended use and risks** – Note: "Good for brainstorming literature structures; do **not** trust references, always verify."
3. **Version your prompts** – When you discover a tweak that improves outputs, update the library and note the change.
4. **Teach students to treat prompts as methods, not magic** – Have them justify *why* they chose a specific prompt pattern.

## Putting it all together

If you're a researcher or grad student, here's a simple way to start:

1. **Pick one recurring task** (e.g., "first-pass literature mapping")
2. **Write one COSTAR prompt for that task**
3. **Stress-test it on 2–3 different topics**
4. **Save the improved version to your shared library**
5. **Always verify** – Treat AI outputs as drafts, hypotheses, or scaffolding—not as ground truth.

Good prompt engineering won't replace critical thinking, but it *will* give your critical thinking better raw material to work with.

---

### References

* Zhang, Y. et al. *Exploring the role of large language models in the scientific ecosystem.* Nature (2025). [Nature](https://www.nature.com/articles/s44387-025-00019-5)
* Wei, J. et al. *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models.* (2022). [arXiv](https://arxiv.org/abs/2201.11903)
* Anh-Hoang, D. et al. *Survey and analysis of hallucinations in large language models.* (2025). [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC12518350/)
* OpenAI Documentation – Prompt engineering, reasoning best practices, and production guides. [OpenAI Platform](https://platform.openai.com/docs/guides/prompt-engineering)
* Anthropic – Prompt engineering overview, interactive tutorial, and context engineering guidance. [Claude Docs](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview)
* Shamim, A. *Prompt Engineering Guide for Data Scientists & ML Engineers.* (2025). [Medium](https://adilshamim8.medium.com/prompt-engineering-guide-for-data-scientists-ml-engineers-00f2ebf69d8e)
* Royal Society Open Science study on LLM oversimplification of scientific findings. [Live Science](https://www.livescience.com/technology/artificial-intelligence/ai-chatbots-oversimplify-scientific-studies-and-gloss-over-critical-details-the-newest-models-are-especially-guilty)

