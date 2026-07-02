# Evals Are Measurement: A Researcher's Take on the Hottest New AI Skill

The first time someone told me that "AI evals" were the hottest new skill in tech, I felt a small flash of impostor syndrome — then a much larger flash of recognition.

I had spent years worrying about whether a survey item actually measured what I claimed it measured. Sweating over inter-rater reliability. Arguing with reviewers about construct validity. And now the same discipline had a new name, a new price tag, and a booming conference circuit.

Evaluating an AI system is a measurement problem. If you have ever built a scale, validated an instrument, or argued with a reviewer about whether your proxy actually tracks your construct, you already own most of the muscles you need. The vocabulary is new. The discipline is not.

The framing of evals as "the hottest new skill for product builders" comes from Lenny Rachitsky's interview with Hamel Husain and Shreya Shankar ([Lenny's Newsletter](https://www.lennysnewsletter.com/p/why-ai-evals-are-the-hottest-new-skill)). I want to take that framing seriously and translate it into language a social scientist or empirical researcher will recognize.

## Why evals matter at all

You cannot improve what you cannot measure. For stochastic systems, that slogan is the daily operating condition. A language model does not fail the way a deterministic function fails; it fails partially, contextually, and differently across reruns. If your only signal is a vibe ("the new prompt feels better"), you have no instrument, and without an instrument you are collecting anecdotes.

Evals are the instrument. They turn "feels better" into something you can defend, version, and hand to a skeptical colleague.

The measurement problem itself is old. Psychometrics has been wrestling with it since Galton and Pearson — how do you measure something you can't directly observe, in a way that's reliable and valid? What's new is that a large population of builders now has to confront it without measurement training, and that gap is the opportunity for anyone who already thinks this way.

## Error analysis comes first

The single most useful idea I've absorbed from the practitioner literature is that you do error analysis *before* you build automated graders.

The [Evals FAQ](https://hamel.dev/blog/posts/evals-faq/) puts it bluntly: build evaluators for the errors you actually discover in real traces, not the ones you imagine in advance. It calls error analysis the most important activity in evals and recommends reviewing real user interactions before building any automated evaluation infrastructure.

If you're a researcher, this should feel obvious and slightly embarrassing, because it's exactly how we're supposed to develop a measure. You don't write survey items from the armchair and ship them. You ground the instrument in observed respondent behavior: cognitive interviews, pilot data, real transcripts. Error analysis is the cognitive interview of the AI world. You read the actual traces, label what actually went wrong, and only then operationalize those failure modes into something you can score at scale.

My read: skipping this step is the most common reason eval suites end up measuring the wrong thing. People rush to a number and never check whether it tracks the failures users actually experience. I've made this mistake myself.

## Three graders, and what each is for

Once you know what you're measuring, you decide how to grade it. Anthropic's "Building Evals" cookbook lays out three approaches, clean enough to memorize ([Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook/blob/main/misc/building_evals.ipynb)):

- **Code-based grading** — deterministic checks like exact-match string comparison. Cheap, fast, and unambiguous when the right answer is well-defined.
- **Model-based grading** — using a model as a grader via a grader prompt. This is "LLM-as-judge," and it's how you score things that resist exact matching.
- **Human grading** — for open-ended questions where neither code nor model is trustworthy yet.

Two points from that notebook stuck with me. First, on automation: grading is a cost you pay every single time you re-run an eval — and you will re-run it constantly — so often the only thing standing between you and an automatable eval is clever design. Second, on volume: the notebook advises preferring a higher volume of lower-effort questions over a tiny set of painstakingly crafted ones ([Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook/blob/main/misc/building_evals.ipynb)).

That volume point will feel wrong to anyone trained to obsess over a handful of perfectly-worded items. But think about statistical power: a larger, noisier sample often estimates a difference more reliably than a tiny, pristine one. The golden set you build by hand is the calibration sample, not the whole experiment.

## LLM-as-judge and its biases

Model-based grading should make a measurement person nervous, in a productive way. When you use a model to judge a model, the judge is itself an instrument with measurement error — and the error is biased rather than random.

The patterns I'd worry about before trusting a judge: position bias (favoring the first or last option), verbosity bias (rating longer answers higher), and self-preference (rating its own style more generously). I flag these as known failure modes to design against; none of them comes with an effect size I can stand behind.

Here's the thing, though: the researcher's instinct is the right one. Treat the judge as a rater whose reliability you must establish. Check its agreement against human labels on your golden set before you let it run free — exactly as you would report inter-rater reliability before trusting two human coders. If the judge can't agree with careful humans on the cases you already understand, its score on the cases you don't understand is worthless.

## Capability over time, measured properly

Now zoom out from grading one system to measuring how the whole field moves. Two recent efforts are worth a researcher's attention, with caveats I'll state loudly.

METR frames capability progress as a measurement on a calibrated scale rather than a single pass/fail score. They define a model's "time horizon" as the task length, in human time, at which the model completes tasks with 50% reliability, and they report that the length of tasks AI can complete has been doubling approximately every 7 months over roughly the prior six years ([METR](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/)).

I'll be honest — I love this move, because it replaces a vague "models are getting smarter" with a quantity on a defined scale. But the caveats matter: those time-horizon figures are point estimates with wide confidence intervals, and "approximately every 7 months" is a trend description, not a law of nature.

The follow-up is itself a lesson in instrument design. In Time Horizon 1.1, METR expanded its task suite by 34% (228 tasks versus 170), doubled the number of tasks that are eight hours or longer (31 versus 14), and migrated its evaluation infrastructure from the in-house Vivaria to Inspect, an open-source framework from the UK AI Security Institute, reportedly with minimal impact on results ([METR](https://metr.org/blog/2026-1-29-time-horizon-1-1/)). That is what you do when the thing you measure outgrows your ruler. The honesty I respect most: only 5 of those 31 long tasks have measured human baselines, so the long-horizon estimates are especially uncertain ([METR](https://metr.org/blog/2026-1-29-time-horizon-1-1/)).

OpenAI's GDPval comes at measurement from the validity side. It's a benchmark of real-world, economically valuable tasks spanning 44 occupations across 9 GDP sectors, built from real work products like a legal brief, an engineering blueprint, or a nursing care plan, and vetted by experienced professionals ([GDPval](https://openai.com/index/gdpval/)). The full set is roughly 1,320 tasks, of which a 220-task "gold" subset was open-sourced ([GDPval](https://openai.com/index/gdpval/)). The validity ambition — grounding tasks in real work products instead of synthetic puzzles — is the part I value. I'm deliberately not attaching a speed or cost multiplier, because no specific number is supported on the page.

## The translation table I keep in my head

Here's where the two disciplines snap together:

- **Construct validity** asks whether your eval measures the thing you actually care about. "Is this output helpful?" is a construct; an exact-match score on a trivia set is a convenient proxy. The error-analysis-first discipline is really a construct-validity discipline: derive the measure from observed behavior so the proxy stays tied to the construct.
- **Criterion validity** asks whether your eval predicts an external outcome you care about, like user task success or expert agreement. An LLM judge has criterion validity only insofar as it agrees with the human criterion on your golden set.
- **Reliability** asks whether you get consistent results across reruns and raters. With stochastic models and biased judges, this is not free; you have to measure it.

None of this is exotic. It's the same scaffolding you'd apply to any new measure, and it's the empirical backbone under my [prompt engineering notes](/portfolio/blog/prompt-engineering-best-practices): a prompt change you cannot measure is a change you cannot defend.

## Where I would and wouldn't lean on this

I'd use this framing whenever I'm building or comparing AI systems and the cost of being wrong is real: choosing between two prompts or models, tracking regressions across versions, or claiming a system actually improved. I'd also use it to read public benchmarks more skeptically — knowing that METR's numbers are point estimates with wide intervals, or that GDPval's public subset is a fraction of the full set, is the difference between citing a benchmark and being fooled by one.

I wouldn't pretend an eval suite is a substitute for the thing it measures. A high score on your golden set is supporting evidence, nothing stronger. I wouldn't over-invest in heavy automated infrastructure before doing the cheap, unglamorous error analysis — that's the order of operations people most often get backwards. And I wouldn't treat any single capability benchmark as ground truth for "how good are models now." These are instruments under active revision by their own authors, which is healthy, but it means today's headline number is provisional.

## Start small

If you want to feel the difference, do this in the next few days:

1. Take one AI workflow you actually run and collect 20 to 50 real traces from it.
2. Read them by hand and label what went wrong, in your own words, before writing any grader.
3. Cluster those labels into three or four recurring failure modes.
4. Write the cheapest possible grader for the easiest failure mode — code-based if you can, model-based if you must.
5. If you go model-based, check the judge against your own labels on a handful of cases before you trust it.

That is a complete, if tiny, measurement instrument: you scoped the construct from real data, operationalized it, and checked your rater. It will already tell you more than a month of "feels better."

Evals are not a new skill so much as an old discipline at a new doorstep. The same worry I felt years ago about whether my survey items measured what I claimed — that is still the worry, just wearing different clothes. Treat an AI system the way you'd treat any other measure, with the rigor you give a survey instrument, and you are most of the way there.
