# Silicon Sampling: The Promise and Peril of LLMs as Survey Respondents

The idea hit me in a meeting. A colleague mentioned she had simulated a pilot sample overnight — not recruited respondents, not sent out a Qualtrics link, but prompted an LLM to role-play 200 personas and answer her draft survey battery. "The distributions looked good," she said. My first thought was "that's brilliant." My second, arriving about three seconds later, was "that's terrifying."

Both reactions turned out to be right, and the distance between them is the whole story of silicon sampling.

Imagine a survey panel that costs almost nothing, answers instantly, never drops out at item 47, and never gets tired. You can re-run it a hundred times. You can ask it to be a 68-year-old retiree in rural Ohio or a 22-year-old graduate student in Seoul, and it will answer in character. That panel exists now. People are building it out of large language models, and the practice has a name: silicon sampling. The pitch is obvious enough that I understand why social scientists are tempted.

My worry is that the pitch is exactly the kind of thing that should make a careful researcher slow down. So I want to lay out what this actually is, the honest case for it, the fairly strong evidence against treating it as a replacement for human data, and what I think responsible use looks like right now.

## What silicon sampling is

Silicon sampling is the practice of prompting an LLM to role-play human respondents, then treating the model's outputs as if they were survey or experimental data. You give the model a persona — demographics, attitudes, a backstory — ask it the same questions you would ask a person, and collect its answers. Do this across many personas and you get a synthetic dataset that looks, on the surface, like a sample of people.

The broader research program here is sometimes called LLM social simulation. A 2025 position paper by Anthis and colleagues, [LLM Social Simulations Are a Promising Research Method](https://arxiv.org/abs/2504.02234), argues that the promise is real but contingent on solving a set of tractable challenges. I want to be precise about what that paper is: it's an argument and a review of existing empirical comparisons, not a new benchmark study of its own. Its abstract states that results to date have been limited and that few social scientists have adopted the method. That's a notable framing coming from authors who are optimistic about the technique.

## The honest case for it

I don't think silicon sampling is silly. There are real reasons it draws interest.

- **Hard-to-reach populations.** Some groups are expensive or nearly impossible to recruit at scale. A synthetic stand-in is at least something to look at before you commit to costly fieldwork.
- **Cheap pilots.** Before you spend money fielding a real instrument, you can use a model to pressure-test question wording, check whether a manipulation produces any movement at all, and catch obviously broken items.
- **Speed and iteration.** You can explore a design space in an afternoon that would take weeks with human panels.

The Anthis paper lands in roughly this zone. It suggests that LLM social simulations can already be used for pilot and exploratory studies, and that wider use may become possible as model capabilities advance ([Anthis et al., 2025](https://arxiv.org/abs/2504.02234)). That positioning — pilot and exploratory — is the part I agree with, and it's doing a lot of quiet work. It sits a long way from saying the model can replace your respondents.

## The evidence against treating it as data

This is where I think the literature is genuinely sobering, and where the hype gets dangerous.

The data always look great until you look at the data — and silicon sampling plays that old line straight.

**Coefficients flip, not just shift.** The clearest warning comes from Bisbee and colleagues in *Political Analysis*, [Synthetic Replacements for Human Survey Data? The Perils of Large Language Models](https://www.cambridge.org/core/journals/political-analysis/article/synthetic-replacements-for-human-survey-data-the-perils-of-large-language-models/B92267DC26195C7F36E63EA04A47D2FE). They prompted ChatGPT 3.5 Turbo to adopt personas and give feeling-thermometer scores for 11 sociopolitical groups, benchmarked against American National Election Study (ANES) data. The headline averages looked fine. The structure underneath did not: they report that 48% of coefficients estimated from the ChatGPT responses were statistically significantly different from their ANES counterparts, and among those, the sign of the effect flipped 32% of the time. A flipped sign is not a rounding error. It's the model telling you a relationship runs the opposite direction from reality.

I want to be careful here: that study examined ChatGPT 3.5 Turbo specifically, a 2023-vintage model, so I wouldn't treat the 48% / 32% figures as a fixed property of every LLM. But the failure mode it exposes — plausible averages hiding structural distortion — is the kind that should worry you regardless of model.

**Excess consistency manufactures false confidence.** The same study found that synthetic responses had far smaller standard deviations than human responses ([Bisbee et al., 2024](https://www.cambridge.org/core/journals/political-analysis/article/synthetic-replacements-for-human-survey-data-the-perils-of-large-language-models/B92267DC26195C7F36E63EA04A47D2FE)). Models are too consistent. Real people disagree with themselves and each other in ways the model smooths over. The authors note that this excess consistency creates overconfidence that would underestimate the required sample size by nearly an order of magnitude. So you're not just getting wrong answers — you're getting wrong answers with artificially tight error bars, which is the worst combination for anyone trying to make an inference.

**The same prompt is not stable over time.** Bisbee and colleagues also report that the same prompt produced substantially different distributions between April and July 2023, because the underlying model changed outside the researchers' control. If your "sample" can shift because a vendor pushed an update, reproducibility isn't something you can promise.

**Analytic flexibility makes fidelity a choice, not a finding.** Even if you fix the model, you still have to choose sampling parameters, prompt format, and how much demographic context to inject. Cummins, in [The threat of analytic flexibility in using large language models to simulate human data](https://arxiv.org/abs/2509.13397), shows how much those choices matter. In one study he generated 252 silicon-sample configurations for a controlled case using two social-psychological scales; the configurations varied substantially in how well they recovered participant rankings, response distributions, and between-scale correlations, and a configuration that looked good on one dimension often performed poorly on another. In a second study, re-examining Study 3 of Argyle et al. (2023) with 66 alternative configurations, the correlations between the human and silicon association structures ranged from r = .23 to r = .84 ([Cummins, 2025](https://arxiv.org/abs/2509.13397)). That range is the whole ballgame. With enough defensible knobs to turn, you can land almost anywhere, and a motivated researcher will find the configuration that "validates" the method.

Put those together and here's my read: the danger of silicon sampling isn't that it's obviously useless. It's that it's plausible. The averages look right, so people stop checking, and the structural errors — sign flips, compressed variance, configuration-dependent fidelity — hide underneath a clean-looking surface.

## What responsible use looks like

I don't think the answer is "never touch it." I think the answer is to use it only where it can't quietly corrupt a conclusion, and to wrap it in the same discipline you'd apply to any other method. Concretely:

1. **Treat it as exploratory by default.** Use it to generate hypotheses, screen question wording, and scope studies. Don't let a synthetic result stand in for a human-subjects finding in anything you'd publish as a substantive claim.
2. **Preregister the configuration.** Because analytic flexibility is the core threat, fix and disclose the model version, sampling parameters, prompt template, and persona construction *before* you look at outcomes. Cummins's work is essentially an argument for why this matters ([Cummins, 2025](https://arxiv.org/abs/2509.13397)).
3. **Always benchmark against humans.** If you can't validate the synthetic output against at least some real human data for the specific task, you have no basis for trusting it. Bisbee and colleagues show the averages can match while the relationships diverge, so benchmark the *structure*, not just the means.
4. **State explicit scope conditions.** Name the population, the construct, and the model where you found correspondence, and resist generalizing beyond that.
5. **Lean on emerging methods guidance.** There's now a published primer on evaluating LLMs in social-science research, Abdurahman and colleagues' [A Primer for Evaluating Large Language Models in Social-Science Research](https://journals.sagepub.com/doi/10.1177/25152459251325174) in *AMPPS*, framed around replicable, robust, and valid use, including considerations for reviewers.

## The IRB and ethics reality is starting to catch up

This is no longer only a methods debate. In September 2025, Northeastern University's Department of Human Research [announced a new form for research projects that use AI systems in human-subjects research](https://dhr.research.northeastern.edu/new-form-ai-systems-used-in-human-subjects-research-9-8-2025/). The form prompts investigators to explain issues unique to AI, such as risks related to bias or hallucinations, and how participants will be informed about AI use.

To be fair about what this is: a governance and disclosure development, an institutional IRB announcement rather than peer-reviewed evidence that silicon sampling fails. But it tells you which way the wind is blowing.

## Where I would and wouldn't use this

I'd use silicon sampling for early hypothesis generation where being wrong is cheap, pretesting question wording before fielding, and rough scoping of whether an effect is even plausible enough to fund a real study.

I wouldn't use it for producing estimates that stand in for human data in a substantive empirical claim. I wouldn't use it for anything involving hard-to-reach or marginalized populations where the model's known biases could misrepresent real people. I wouldn't use it for any design where I can't benchmark against human data. And I wouldn't use it for work that needs stable reproducibility, given that the same prompt drifted across a few months on a single model ([Bisbee et al., 2024](https://www.cambridge.org/core/journals/political-analysis/article/synthetic-replacements-for-human-survey-data-the-perils-of-large-language-models/B92267DC26195C7F36E63EA04A47D2FE)).

The honest boundary, for me, is whether a wrong answer would quietly survive — which brings me back to watching my colleague's overnight pilot. A panel that costs almost nothing is wonderful for exploration. But if a silicon result can slip into a conclusion without anyone noticing it was synthetic, I don't use it there.

## My bottom line

Silicon sampling is a real tool with a narrow, legitimate use: a fast, cheap way to explore and pretest, not a replacement for asking people. The optimistic position paper says as much when you read it carefully — pilot and exploratory ([Anthis et al., 2025](https://arxiv.org/abs/2504.02234)). The critical literature explains why the boundary matters: sign flips, manufactured confidence, and fidelity that depends on which knobs you turned ([Bisbee et al., 2024](https://www.cambridge.org/core/journals/political-analysis/article/synthetic-replacements-for-human-survey-data-the-perils-of-large-language-models/B92267DC26195C7F36E63EA04A47D2FE); [Cummins, 2025](https://arxiv.org/abs/2509.13397)).

If you want to try this responsibly this week, do one thing: take a study you've already run with real people, regenerate it as a silicon sample, and compare the *coefficients*, not the averages. Look specifically for signs that flip and for error bars that are suspiciously tight. That single exercise will teach you more about where the technique can be trusted than any blog post, including this one. And it pairs naturally with the source-grounded verification habits I wrote about in my [NotebookLM research workflow](/portfolio/blog/notebooklm-research-workflow): treat the model's output as a draft to be checked against ground truth, never as the ground truth itself.
