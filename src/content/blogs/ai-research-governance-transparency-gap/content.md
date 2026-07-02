# Governing AI in the Research Pipeline: The Transparency Gap

Almost every researcher I talk to has used an AI model on a manuscript in the last year. Hardly any of them disclosed it. I know this because I've asked — casually, at conferences and over coffee — and the pattern is always the same: a slight pause, a half-smile, and something like "well, I used it for editing, but that doesn't really count, right?"

That gap between using and saying is the whole story. And honestly, I get it. I've felt the same hesitation myself.

We're building governance for AI in research faster than at almost any point I can remember. Funders are writing rules. Journals are adding policies. IRB forms are sprouting new checkboxes. And yet the one thing all these mechanisms depend on — honest disclosure of how AI was actually used — is the part that's quietly failing.

I work at the intersection of academic research and applied AI, so I sit on both sides of this. I want these tools in the pipeline. I also want the pipeline to stay trustworthy. Right now those two goals are pulling apart, and the data suggests policy is not closing the gap.

## The new rules are arriving fast

The clearest signal is from funders. In July 2025, NIH released notice [NOT-OD-25-132, "Supporting Fairness and Originality in NIH Research Applications"](https://grants.nih.gov/grants/guide/notice-files/NOT-OD-25-132.html). Two things in it matter for how AI sits in the research pipeline.

First, originality. NIH [states it will not consider applications that are substantially developed by AI, or that contain sections substantially developed by AI, to be original ideas of applicants](https://grants.nih.gov/grants/guide/notice-files/NOT-OD-25-132.html). That's a direct line drawn through the drafting process: the ideas have to be yours rather than a model's.

Second, volume. The same notice [caps submissions at six new, renewal, resubmission, or revision applications from an individual PI/PD or MPI for all council rounds in a calendar year](https://grants.nih.gov/grants/guide/notice-files/NOT-OD-25-132.html) (excluding T activity codes and R13 Conference Grant Applications). My read: the cap is aimed squarely at AI-enabled mass submission, where one lab floods study sections with machine-spun proposals. It's a governance lever that doesn't require anyone to detect AI at all — it just makes the gaming strategy uneconomical.

These rules have teeth. NIH [says that if improper AI use is detected after award, it may refer the matter to the Office of Research Integrity and may take actions including cost disallowance, award withholding, grant suspension, or termination](https://grants.nih.gov/grants/guide/notice-files/NOT-OD-25-132.html). A timing detail worth getting right, because it's easy to garble: the notice was [released July 17, 2025, but applies to applications submitted for the September 25, 2025 receipt date and beyond](https://grants.nih.gov/grants/guide/notice-files/NOT-OD-25-132.html). The release date and the effective date are not the same thing.

Funders are only one layer. The other two are familiar to anyone who has shepherded a study through review:

- **IRB and ethics review.** Protocol forms are increasingly asking whether and how AI tools touch study design, participant-facing materials, or data analysis. This is governance at the front of the pipeline, before data is even collected.
- **Journal policies.** Publishers have moved quickly to require authors to declare AI use in writing and analysis, and to bar listing AI systems as authors. This is governance at the back of the pipeline, at the point of record.

On paper, that's a reasonably complete chain: funding, ethics, publication. The problem is what happens between the policy and the practice.

## The gap: policies up, disclosure flat

Here's where the most useful recent evidence comes in, and it's blunt. The paper is titled ["Academic journals' AI policies fail to curb the surge in AI-assisted academic writing"](https://arxiv.org/abs/2512.06705), by Yongyuan He and Yi Bu, first posted to arXiv in December 2025. I want to use its actual framing, not a softer one, because the title is the finding.

The scale of the analysis is what makes it worth citing. The authors report analyzing roughly [5,114 journals and over 5.2 million papers, with full-text analysis of around 164,000 publications](https://arxiv.org/abs/2512.06705). On the policy side, they find that [about 70% of journals have adopted AI policies, primarily requiring disclosure of AI use](https://arxiv.org/abs/2512.06705). So the governance layer is real and widespread, not hypothetical.

Then comes the number that should stop you. Among roughly [75,000 papers published since 2023, only 76 explicitly disclosed AI use — about 0.1%](https://arxiv.org/abs/2512.06705). I want to be careful here: that disclosure rate is drawn from the subset of papers since 2023, and the figures are as the abstract states them, not precise totals I've independently verified. But even read conservatively, the shape is unmistakable. The authors [conclude that current policies have largely failed to promote transparency or restrain AI adoption](https://arxiv.org/abs/2512.06705).

Pair that with what we know about underlying usage. A Nature survey, reported in ["How are researchers using AI? Survey reveals pros and cons for science"](https://www.nature.com/articles/d41586-025-00343-5), examined how researchers are actually using AI and the support they say they still need. (That article is behind a login, so I'm citing only its framing, not figures from it.) And on the norms themselves, Nature's ["Is it OK for AI to write science papers? Nature survey shows researchers are split"](https://www.nature.com/articles/d41586-025-01463-8) captures the core tension: the community doesn't agree on when AI involvement is acceptable or on what must be disclosed.

So stack the layers. Usage is broad and rising. Norms are contested. Policies requiring disclosure are now the majority position. And explicit disclosure remains vanishingly rare. That's not a coordination success. That's a transparency gap, and right now it's widening rather than closing.

The early Royal Society took *Nullius in verba* — "take nobody's word for it" — as its motto because even then, science ran on verification rather than trust. Three and a half centuries later, the same principle is catching up with how we disclose the way our claims were generated. We can't verify what we don't report.

## Why disclosure is so hard

It would be easy to read 0.1% as mass dishonesty. I don't think that's mostly what's happening. Disclosure is hard for structural reasons, and naming them is the first step to fixing them.

- **The line is genuinely blurry.** Grammarly-style cleanup, a literature-search assist, a model that suggested a clearer framing of one paragraph, full first drafts. These sit on a spectrum, and most policies don't tell you where disclosure starts.
- **Disclosure feels like risk.** When norms are split, as the Nature reporting shows, authors reasonably worry that admitting AI use invites extra scrutiny or stigma, while saying nothing carries little apparent downside. The incentives point at silence.
- **There's no standard format.** A funder originality rule, an IRB checkbox, and a dozen journal statements all ask differently. Without a shared template, disclosure is friction, and friction loses.
- **Enforcement is mostly invisible.** Detection tools are unreliable, and most policies rely on self-report. A rule that's hard to verify and easy to skip will be skipped, especially under deadline.

None of these are character failures. They're design failures in the governance layer, which means they're fixable with better design.

## What good practice looks like right now

I can't fix the policy machinery from where I sit, but I can control how I handle AI in my own work. This is the standard I hold to, and honestly it started as a CYA habit before it became a conviction.

1. **Keep a use log as you go.** A short running note: which tool, which task (search, drafting, editing, code, figure), which section. Reconstructing this at submission time is where honesty quietly erodes.
2. **Disclose at the task level, not the tool level.** "An AI assistant was used to edit prose in the Methods and to draft helper code for figure generation; all analysis and interpretation are the authors'" tells a reviewer far more than "AI was used."
3. **Hold the originality line yourself.** Treat the NIH standard as a personal floor even outside NIH: the ideas, the argument, the interpretation are yours. Use models to sharpen and check, not to originate. If you'd be uncomfortable explaining how a sentence came to exist, that's your signal.
4. **Verify every model claim against a source.** This is the same discipline I apply everywhere. A model's fluent sentence is a hypothesis, not a citation. I wrote up the source-grounded version of this in my [NotebookLM research workflow](/portfolio/blog/notebooklm-research-workflow), and the habit transfers directly: nothing leaves the pipeline as fact until it points back to real source text.
5. **Match disclosure to each venue's policy.** Read the specific funder, IRB, and journal language before you submit, not after. They genuinely differ, and a generic statement can still violate a specific rule.

If you want the upstream version of this — getting the model to do less inventing in the first place — my notes on [prompt engineering](/portfolio/blog/prompt-engineering-best-practices) cover the techniques I lean on most.

## Where I would and wouldn't lean on this

I want to be honest about the limits of my own position, because a token caveat would undercut the whole point.

**Where I'm confident:**

- The disclosure gap is real and large. Even discounting the He and Bu figures for the usual preprint caution and the since-2023 subset, the direction is not ambiguous.
- Originality rules and submission caps are sensible governance because they don't depend on detecting AI, which we can't do reliably.
- A personal disclosure discipline is worth adopting now, regardless of where policy lands.

**Where I wouldn't overreach:**

- I wouldn't treat the 0.1% figure as a precise, settled measurement of dishonesty. It's a reported estimate from one large study, and "explicit disclosure" is a narrow definition that almost certainly undercounts informal acknowledgment.
- I wouldn't assume the NIH approach generalizes to every funder or field. It reflects one agency's pipeline and pressures.
- I wouldn't lean on AI detection tools to close this gap. Their false-positive behavior makes them, in my view, more likely to punish honest authors than to catch dishonest ones.
- I wouldn't present any of the Nature survey internals as fact here. Those articles are behind a login, so I'm using them only for framing — that researchers are using AI widely and are split on the norms — not for numbers.

The short version: I trust the shape of the problem far more than I trust any single statistic inside it.

## Where this is heading

My guess for the next year or two: the governance layer keeps thickening — more funders adopt NIH-style originality and volume rules, more journals tighten declarations, more IRBs add AI questions. But unless disclosure gets easier and the norms get less contested, the gap the He and Bu paper documents will persist. You can't policy your way out of a problem whose root cause is friction and ambiguity.

What would actually move the number is unglamorous: a shared, task-level disclosure template that works across funders, IRBs, and journals, paired with a culture that treats disclosure as normal rather than as a confession. That's a coordination problem, not a technology problem.

**To do before your next submission:** open whatever you're currently writing and start a three-line AI use log at the top — tool, task, section. Keep it for the life of the project. When you submit, you'll have an honest, specific disclosure ready instead of a guess reconstructed under deadline. It costs you almost nothing, and it puts you on the right side of the gap before the rules force you there.

That half-smile and the "does it really count" question I keep hearing at conferences — I think we all know the answer. It counts. Write it down.
