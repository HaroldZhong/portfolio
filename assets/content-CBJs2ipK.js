const e=`# A Visual Reading of DeepSeek Harness's Super-agent Design

The first research agent I built failed in ways I blamed on the model, and almost none of those failures were the model's fault. That's where my post on [harnesses over models](/portfolio/blog/building-research-agents-harness-over-model/) started: most of what breaks lives in the system you build around the model.

That post was about getting one agent right: its loop, its tools, its context. On 1 November 2026 the DeepSeek Harness team published [Exploring Super-agent Design: Towards a More Autonomous Agent System](https://x.com/DeepSeekHarness/status/2116857257245987236), an essay by Yujia Qiao and colleagues that takes the argument one level up. Once you're running several agent sessions at once, they write, the limit is your attention, and the fix is architecture again.

The essay is long, so I rebuilt it as an explainer in eight chapters, most of them with a diagram you step through one beat at a time. The text is my paraphrase. The numbers are the authors', from a synthetic workload they call indicative only.

## The explainer

<super-agent-explainer>
</super-agent-explainer>

## What I take from it

The Router is the part I keep thinking about. It talks to people, dispatches work and keeps track of how tasks relate, and the design keeps it from executing any task itself. It can run without a shell. When I wrote the harness post, I found that most of the research tasks I'd automated turned out to be workflows I could draw on paper. The Router builds that discipline into the system, so the session that dispatches is set up never to do the work itself.

The result I'd quote first is the single-session design with the neutral prompt, "Use a subagent for a piece of work when appropriate…". It delegated in none of its five runs, and new messages kept interrupting the work it took on itself. A firmer, delegation-first prompt did better, delegating in four of five runs, and was still slower than Super-agent.

## Where I'd push back

The experiment measures scheduling. Coding was simulated by a tool that only burns time, so the results show tasks kept moving and say nothing about whether the work would've been any good. The authors say this themselves. I'd still repeat it before anyone cites the 15.7-minute figure as a quality result.

Cost deserves as much attention as speed. By the authors' own account, Super-agent reads more cached tokens per run than the single-session designs. A research group paying per token should make that trade on purpose.

## How the authors end it

The essay closes by saying the design proposes no new theory. It applies older ideas from computer systems to agents: two levels, event-driven triggers, full-duplex conversation, compute separated from state, and a watchdog outside the loop. Their internal instance already runs continuously. It reproduces and fixes issues, answers code reviews, and helps develop DeepSeek Harness itself. Their bet is that as each task needs less human intervention, people move up to decisions and sign-off.

When I wrote the harness post, the hard part was getting one agent to produce output I could trust. This essay treats that part as steadily improving, and moves the hard problem to the person trying to follow three to five sessions at once.

## Source and credits

The article is [Exploring Super-agent Design: Towards a More Autonomous Agent System](https://x.com/DeepSeekHarness/status/2116857257245987236), published by DeepSeek Harness on 1 November 2026. Yujia Qiao implemented the system and wrote the article, based on shared work by the DeepSeek Harness team. The original is in Chinese. I read the English machine translation of the original. The authors note that parts of the design are implemented in a prototype plugin, dsh-superagent-prototype, which isn't an official DeepSeek product.

The diagrams, the wording and any mistakes on this page are mine. Read the original for the full argument and its figures.
`;export{e as default};
