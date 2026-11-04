// Content for the Super-agent explainer, checked against "Exploring Super-agent Design" (DeepSeek Harness, 1 Nov 2026).
export type Node = { id: string; x: number; y: number; label: string; sub?: string; human?: boolean };
export type Beat = { caption: string; hot: string[]; hotEdges?: string[] };
export type Scene = { nodes: Node[]; edges: { from: string; to: string; dashed?: boolean }[]; beats: Beat[] };
export type Chapter = { id: string; short: string; title: string; lede: string; points: { title: string; body: string }[]; scene?: Scene; alt?: Scene };

const ceiling: Scene = {
  nodes: [
    { id: 'model', x: 28, y: 24, label: 'Model', sub: 'one hard task' },
    { id: 'you', x: 72, y: 24, label: 'You', sub: 'the scheduler', human: true },
    { id: 's1', x: 14, y: 72, label: 'Session A' },
    { id: 's2', x: 38, y: 72, label: 'Session B' },
    { id: 's3', x: 62, y: 72, label: 'Session C' },
    { id: 's4', x: 86, y: 72, label: 'Session D', sub: 'offline' },
  ],
  edges: [{ from: 'model', to: 's1' }, { from: 'you', to: 's1' }, { from: 'you', to: 's2' }, { from: 'you', to: 's3' }, { from: 'you', to: 's4' }],
  beats: [
    { caption: 'A single hard task is limited by the model, and models need less and less step-by-step supervision.', hot: ['model', 's1'], hotEdges: ['model>s1'] },
    { caption: 'Sessions are isolated from one another. Start a second task and you switch between them by hand, remembering what each one contains.', hot: ['you', 's2'], hotEdges: ['you>s2'] },
    { caption: 'In the authors’ experience, a person can follow only three to five active sessions. Past that, multitasking is limited by attention, not by the model.', hot: ['you', 's1', 's2', 's3'], hotEdges: ['you>s1', 'you>s2', 'you>s3'] },
    { caption: 'CLIs, MCP and connectors let a local agent receive messages, but it still runs one synchronous session, mixes task contexts, and stops when the device goes offline.', hot: ['you', 's4'], hotEdges: ['you>s4'] },
  ],
};

const traits: Scene = {
  nodes: [
    { id: 'core', x: 50, y: 50, label: 'Super-agent' },
    { id: 'cont', x: 50, y: 15, label: 'Continuous', sub: 'one agent' },
    { id: 'prod', x: 82, y: 50, label: 'Productive', sub: 'in parallel' },
    { id: 'pro', x: 50, y: 85, label: 'Proactive', sub: 'acts unprompted' },
    { id: 'pers', x: 18, y: 50, label: 'Persistent', sub: 'always online' },
  ],
  edges: [{ from: 'core', to: 'cont' }, { from: 'core', to: 'prod' }, { from: 'core', to: 'pro' }, { from: 'core', to: 'pers' }],
  beats: [
    { caption: 'Continuous: you meet it where you already work, in chat or a pull-request comment, and it is always the same agent. Ask for plan A in chat, switch to plan B on the PR, and it adjusts.', hot: ['core', 'cont'], hotEdges: ['core>cont'] },
    { caption: 'Productive: it answers quickly and runs several complex tasks in parallel, each to a high standard. It takes the next instruction before the last one finishes.', hot: ['core', 'prod'], hotEdges: ['core>prod'] },
    { caption: 'Proactive: it watches events in its environment, acts on what is worth handling, and stays quiet otherwise.', hot: ['core', 'pro'], hotEdges: ['core>pro'] },
    { caption: 'Persistent: always online, connected to real working environments, and able to recover from anomalies on long runs. No single ReAct loop gives all four; the architecture around it has to.', hot: ['core', 'pers'], hotEdges: ['core>pers'] },
  ],
};

const levels: Scene = {
  nodes: [
    { id: 'im', x: 18, y: 13, label: 'IM' },
    { id: 'gh', x: 50, y: 13, label: 'GitHub' },
    { id: 'ci', x: 82, y: 13, label: 'CI' },
    { id: 'router', x: 50, y: 40, label: 'Router', sub: 'no shell' },
    { id: 'w1', x: 82, y: 64, label: 'Worker C', sub: 'one task' },
    { id: 'w2', x: 50, y: 64, label: 'Worker B', sub: 'one task' },
    { id: 'w3', x: 18, y: 64, label: 'Worker A', sub: 'idle' },
    { id: 'you', x: 50, y: 87, label: 'You', sub: 'one voice', human: true },
  ],
  edges: [
    { from: 'im', to: 'router' }, { from: 'gh', to: 'router' }, { from: 'ci', to: 'router' },
    { from: 'router', to: 'w1' }, { from: 'router', to: 'w2' }, { from: 'router', to: 'w3' },
    { from: 'ci', to: 'w1', dashed: true }, { from: 'router', to: 'you' },
  ],
  beats: [
    { caption: 'A new request is a cold start, and cold starts go to the Router, the long-lived layer that talks to people, dispatches work, and keeps the global thread. The authors run it as a single session.', hot: ['gh', 'router'], hotEdges: ['gh>router'] },
    { caption: 'The Router does not execute tasks and can run without a Bash tool at all. A Worker with an isolated context and a full set of tools takes the task.', hot: ['router', 'w1'], hotEdges: ['router>w1'] },
    { caption: 'The next event on the same pull request skips the Router. The Worker subscribed to that thread, so code passes the event straight through.', hot: ['ci', 'w1'], hotEdges: ['ci>w1'] },
    { caption: 'A second task arrives while the first is running. The Router tracks how tasks relate at a high level; it does not break each one down the way a team lead would.', hot: ['im', 'router', 'w2'], hotEdges: ['im>router', 'router>w2'] },
    { caption: 'Peer Workers usually do not message each other. If they share a pull request, they share that thread’s events and can spot conflicts themselves.', hot: ['w1', 'w2'] },
    { caption: 'Workers report conclusions to the Router, which handles every reply. You hear one agent; sessions stay an implementation detail.', hot: ['router', 'you'], hotEdges: ['router>you'] },
  ],
};

const single: Scene = {
  nodes: [
    { id: 'you', x: 50, y: 16, label: 'You', sub: 'every message', human: true },
    { id: 'session', x: 50, y: 46, label: 'One session', sub: 'one step at a time' },
    { id: 'a', x: 18, y: 78, label: 'Task A', sub: 'blocked' },
    { id: 'b', x: 50, y: 78, label: 'Task B', sub: 'interleaved' },
    { id: 'c', x: 82, y: 78, label: 'Task C', sub: 'waiting' },
  ],
  edges: [{ from: 'you', to: 'session' }, { from: 'session', to: 'a' }, { from: 'session', to: 'b' }, { from: 'session', to: 'c' }],
  beats: [
    { caption: 'Send every event to one session and its context stays complete. Throughput suffers, though, because a ReAct loop can only take one step after another.', hot: ['you', 'session'], hotEdges: ['you>session'] },
    { caption: 'The details of different tasks interleave in one context, which degrades the results.', hot: ['session', 'a', 'b', 'c'], hotEdges: ['session>a', 'session>b', 'session>c'] },
    { caption: 'Give every event its own session instead and throughput goes up, but tasks lose a shared context and several sessions reply to you separately.', hot: ['you', 'a', 'c'] },
    { caption: 'A single session with a subagent tool leaves delegation to the model’s judgment. With a neutral prompt, it never delegated in the authors’ test.', hot: ['session', 'b'], hotEdges: ['session>b'] },
  ],
};

const triggers: Scene = {
  nodes: [
    { id: 'stream', x: 50, y: 11, label: 'Triggers', sub: 'the environment' },
    { id: 'code', x: 22, y: 33, label: 'Code filter', sub: 'fast path' },
    { id: 'model', x: 78, y: 33, label: 'Model filter', sub: 'slow path' },
    { id: 'router', x: 78, y: 60, label: 'Router', sub: 'cold starts' },
    { id: 'worker', x: 30, y: 62, label: 'Worker', sub: 'subscribed' },
    { id: 'recall', x: 18, y: 88, label: 'Recall', sub: 'id to id' },
    { id: 'draft', x: 58, y: 88, label: 'Quiet draft', sub: 'may be discarded' },
  ],
  edges: [
    { from: 'stream', to: 'code' }, { from: 'code', to: 'model' }, { from: 'model', to: 'router' }, { from: 'router', to: 'worker' },
    { from: 'code', to: 'worker', dashed: true }, { from: 'worker', to: 'recall' }, { from: 'worker', to: 'draft' },
  ],
  beats: [
    { caption: 'The input is no longer someone typing. Group chat, email, calendar reminders, review comments and CI results are Triggers, and most of them need no action.', hot: ['stream', 'code'], hotEdges: ['stream>code'] },
    { caption: 'Code drops noise first, by source, group and allowlist, before any model is called. Only candidates that need semantic judgment reach the model, which applies policies written as prompts.', hot: ['code', 'model'], hotEdges: ['code>model'] },
    { caption: 'An event with no subscriber goes to the Router. For the first event on a thread (a PR, an IM topic, an email chain) the Router creates a Worker, and the Worker subscribes to that thread.', hot: ['model', 'router', 'worker'], hotEdges: ['model>router', 'router>worker'] },
    { caption: 'Follow-ups on a subscribed thread pass straight to the Worker in code. The Router still sees every event but only decides the unsubscribed ones. Subscriptions are many-to-many.', hot: ['code', 'worker'], hotEdges: ['code>worker'] },
    { caption: 'Treat the context window as a cache. Inline an id and a short snippet, and spill the rest behind a pointer. Objects inline their neighbours’ ids, so an old task can be recalled hop by hop.', hot: ['worker', 'recall'], hotEdges: ['worker>recall'] },
    { caption: 'Speculative execution: start before you know the result will be used. Their internal group runs a “silently reproduce and fix” policy, and the agent speaks only after it confirms the issue and finds a simple fix.', hot: ['worker', 'draft'], hotEdges: ['worker>draft'] },
  ],
};

const duplex: Scene = {
  nodes: [
    { id: 'you', x: 16, y: 30, label: 'You', human: true },
    { id: 'loop', x: 50, y: 30, label: 'Loop', sub: 'ReAct' },
    { id: 'tool', x: 84, y: 30, label: 'Tool', sub: 'slow' },
    { id: 'im', x: 30, y: 76, label: 'IM', sub: '100-word cap' },
    { id: 'gh', x: 70, y: 76, label: 'GitHub', sub: 'dense, structured' },
  ],
  edges: [{ from: 'you', to: 'loop' }, { from: 'loop', to: 'tool' }, { from: 'loop', to: 'im' }, { from: 'loop', to: 'gh' }],
  beats: [
    { caption: 'In a classic ReAct loop, a synchronous run() call blocks the session until the tool returns its final result. Until then it cannot respond to you.', hot: ['loop', 'tool'], hotEdges: ['loop>tool'] },
    { caption: 'Replace long calls with start() and stop(). start() returns “Started” immediately, and stop() can end a command that runs too long.', hot: ['loop', 'tool'], hotEdges: ['loop>tool'] },
    { caption: 'The foreground conversation stays open. New input is handled when the current inference step ends, not when the background tool finishes.', hot: ['you', 'loop'], hotEdges: ['you>loop'] },
    { caption: 'When the tool finishes, its result arrives as a new event. DeepSeek Harness implements this, but it is not yet enabled by default.', hot: ['tool', 'loop'], hotEdges: ['loop>tool'] },
    { caption: 'Match the channel. In chat, act like a colleague: notify people only when a decision or sign-off is needed, ask only direct questions, give short conclusions, and cap each reply at 100 words.', hot: ['loop', 'im'], hotEdges: ['loop>im'] },
    { caption: 'On GitHub, email and documents, write the dense version: problem background, the change, and how it was verified, in the project’s own conventions.', hot: ['loop', 'gh'], hotEdges: ['loop>gh'] },
  ],
};

const persist: Scene = {
  nodes: [
    { id: 'box', x: 50, y: 15, label: 'One laptop', sub: 'all three jobs' },
    { id: 'compute', x: 18, y: 48, label: 'Compute', sub: 'stateless cloud' },
    { id: 'state', x: 50, y: 48, label: 'State', sub: 'database' },
    { id: 'env', x: 82, y: 48, label: 'Workspace', sub: 'repos, tools, keys' },
    { id: 'dog', x: 18, y: 84, label: 'Watchdog', sub: 'outside the loop' },
    { id: 'daemon', x: 82, y: 84, label: 'Daemon', sub: 'your machine', human: true },
  ],
  edges: [{ from: 'box', to: 'compute' }, { from: 'box', to: 'state' }, { from: 'box', to: 'env' }, { from: 'env', to: 'daemon' }, { from: 'dog', to: 'compute', dashed: true }],
  beats: [
    { caption: 'A local agent ties three things to one device: the compute running the loop, the session state, and the execution environment. When the laptop sleeps, the agent stops.', hot: ['box'] },
    { caption: 'First split: run the loop in stateless cloud containers that can scale, restart or be replaced.', hot: ['box', 'compute'], hotEdges: ['box>compute'] },
    { caption: 'Only session state has to persist. It lives in a database, so a replacement container continues the same sessions and tasks.', hot: ['box', 'state'], hotEdges: ['box>state'] },
    { caption: 'Do not rebuild the machine in the cloud. Uncommitted changes, private credentials, intranet services and specific hardware are expensive to sync and easy to miss.', hot: ['box', 'env'], hotEdges: ['box>env'] },
    { caption: 'A lightweight daemon on each machine keeps no session state; it runs commands and returns results. When an intermittently online device reconnects, its queued tasks start.', hot: ['env', 'daemon'], hotEdges: ['env>daemon'] },
    { caption: 'A separate Watchdog session, woken on a schedule, checks infrastructure and asks whether each Worker is still making progress. Maintainers can ask it in plain language why something failed.', hot: ['dog', 'compute'], hotEdges: ['dog>compute'] },
  ],
};

export const chapters: Chapter[] = [
  {
    id: 'ceiling', short: 'The ceiling', scene: ceiling,
    title: 'One task is limited by the model. Many tasks are limited by you.',
    lede: 'Agents need less and less supervision on a single task, but today’s designs still make you the scheduler across tasks.',
    points: [
      { title: 'The unit of work is still a session', body: 'Agents finish complex work with less supervision and coordinate other agents better, so people move up toward decisions and sign-off. The session did not move with them.' },
      { title: 'Sessions cannot see each other', body: 'Running several tasks means switching between them by hand and remembering which chat knows what.' },
      { title: 'Connectors keep the same limits', body: 'A CLI, MCP server or connector can deliver messages to a local single-session agent. It still blocks on long operations, mixes task contexts, and goes dark with the device.' },
    ],
  },
  {
    id: 'traits', short: 'Four traits', scene: traits,
    title: 'One agent across every chat and pull request.',
    lede: 'The authors call an agent that keeps its context across sessions, and runs several complex tasks without them interfering, a Super-agent.',
    points: [
      { title: 'Continuous', body: 'You never wonder whether session X has fact Y. Wherever you pick it up, it is one colleague.' },
      { title: 'Productive', body: 'It answers fast and works on several hard tasks at once without lowering the bar on any of them.' },
      { title: 'Proactive', body: 'Their internal instance watches public group chats and, with no @-mention, finds root causes and opens pull requests to fix them.' },
      { title: 'Persistent', body: 'Always online, connected to real environments, and self-recovering. The authors map these traits onto five modules: two levels, triggers, full duplex, separated compute and state, and a watchdog.' },
    ],
  },
  {
    id: 'levels', short: 'Two levels', scene: levels, alt: single,
    title: 'Continuity and throughput pull in opposite directions.',
    lede: 'One session sees everything and works slowly. A fresh session per event works fast and loses the plot. So split the job across two layers.',
    points: [
      { title: 'Router', body: 'Long-lived and global: the system’s sequence point, coordination point and memory. It talks to people and dispatches work, and never executes tasks. Events that arrive during one turn are batched into the next.' },
      { title: 'Workers', body: 'Isolated context, full tools, one task each, usually the most capable model. They never reply to people directly; they report to the Router. A Worker can itself use subagents or be an agent team.' },
      { title: 'How it differs from an agent team', body: 'A team lead breaks one tightly coupled task into steps. The Router only tracks how separate tasks relate. Making users manage sessions, the authors argue, is a habit carried over from low-level model APIs.' },
    ],
  },
  {
    id: 'triggers', short: 'Triggers', scene: triggers,
    title: 'Events from the environment become the input.',
    lede: 'Proactive means event-driven. Most events are noise, so much of the design is about what to ignore and where to send the rest.',
    points: [
      { title: 'Filter: code first, then the model', body: 'Deterministic code admits or drops events by source, group and allowlist. Only candidates reach the model. Policies stay editable in natural language, which is the extension point for people.' },
      { title: 'Route: subscribe, then pass through', body: 'If every follow-up went back through the Router, that one node would slow everything down. Once a Worker owns a thread, code delivers later events to it directly.' },
      { title: 'Inline, spill, recall', body: 'Too much context dilutes attention; too little means endless tool calls. Inline what is likely needed next, spill the rest behind a pointer, and let objects point at each other so recall is a walk, hop by hop.' },
      { title: 'Act ahead', body: 'On a meeting invitation, check calendar conflicts and draft a reply in the background. On a bug report, try to reproduce and fix it quietly, and deliver only a result that holds.' },
    ],
  },
  {
    id: 'duplex', short: 'Full duplex', scene: duplex,
    title: 'Asynchronous tool calls keep the conversation open.',
    lede: 'Continuous memory is not enough. The conversation itself has to stay open, and each reply has to fit its channel.',
    points: [
      { title: 'start() instead of run()', body: 'An asynchronous ReAct loop returns immediately and receives the tool’s result later as an event, so you can keep talking the whole time.' },
      { title: 'Workers keep the noise in', body: 'Verbose reasoning and tool calls stay inside each Worker. The Router handles all external replies, so parallel work does not become several voices talking over each other.' },
      { title: 'Norms per channel', body: 'Chat: interrupt rarely, ask only direct questions, cap replies at 100 words. GitHub, email and documents: structured and information-dense.' },
    ],
  },
  {
    id: 'persist', short: 'Always on', scene: persist,
    title: 'Moving the agent loop off the laptop.',
    lede: 'Staying online is a systems problem: separate compute, state, and the place where the work actually lives.',
    points: [
      { title: 'Compute leaves the device', body: 'The loop runs in stateless, elastic containers. Sessions and other persistent state live in a database.' },
      { title: 'The environment stays', body: 'Rebuilding your machine in a cloud sandbox misses local changes, credentials, intranet dependencies and hardware, and moving all work to the cloud is too costly a migration for many users. So reach the environment instead of moving it.' },
      { title: 'A thin daemon on each machine', body: 'Each machine runs a thin daemon that executes and returns. Anthropic’s “Decoupling the brain from the hands” takes the same approach for managed sandboxes; this design starts from personal machines that are only sometimes online (bring your own machine).' },
      { title: 'A watchdog outside the loop', body: 'Many anomalies are not crashes: the process is up, but the model is stuck in a loop or drifting from the goal. An independent Watchdog session monitors task progress as well as liveness, and can adjust prompts or trigger rules while the system runs.' },
    ],
  },
  {
    id: 'evidence', short: 'Evidence',
    title: 'Early numbers: steadier completion times, paid for in tokens.',
    lede: 'A synthetic workload with five runs per design. Coding was simulated by a tool that only consumes time, so this measures scheduling and coordination, not task quality. The authors call the results indicative only.',
    points: [
      { title: 'What they ran', body: 'About 300 group-chat and CI messages per run, about 20 of them real work requests. Four designs ran side by side, and the authors note that parts of the setup could be more rigorous.' },
      { title: 'Structure versus prompt', body: 'With the neutral prompt “Use a subagent for a piece of work when appropriate…”, the single session never delegated, and new messages kept interrupting the work it did itself. A delegation-first prompt delegated in 4 of 5 runs and was still slower than Super-agent.' },
      { title: 'The token trade', body: 'Running several sessions costs Super-agent more cached-token reads per run than either single-session design. In return it finishes tasks sooner and more consistently.' },
      { title: 'One Router is enough, for now', body: 'With the Router on a real model and mock Workers, a bigger backlog lowered the time per decision, up to a limit set by context length and how many triggers the model can judge in one turn. At their team size, sharding the Router is not yet needed.' },
    ],
  },
  {
    id: 'open', short: 'Still open',
    title: 'What the authors have not solved.',
    lede: 'The system stays simple partly because the engineering and the supported scenarios are simplified. Four areas remain open.',
    points: [
      { title: 'Scaling both layers', body: 'When to shard the Router and how finely, when Workers should talk directly, and whether to train models for Router work. After months of running, long-term memory becomes the main bottleneck.' },
      { title: 'Products without sessions', body: 'Once interface conversations stop mapping to sessions, how should tasks be shown? Work may move into domain interfaces such as GitHub issues, and people still need to step into background work midway.' },
      { title: 'Context boundaries', body: 'Choosing which teams share one instance is choosing which context is shared. Instances on different permission boundaries will need secure agent-to-agent collaboration.' },
      { title: 'Security and privacy', body: 'A wider event stream is more untrusted input. If a prompt injection compromises the cloud loop, every connected machine could be taken over, and credentials can leak through the model’s context. The agent needs to use credentials without ever seeing them.' },
    ],
  },
];

// Numbers from section 7 of the article. Values the text does not state are marked as such.
export const ablation = [
  { design: 'Super-agent', time: '12.4 min p50, 15.7 min p95', delegation: 'Router never executes', tokens: '23.2M cache-read tokens; more than single-session designs' },
  { design: 'Super-agent without pass-through', time: 'About the same as Super-agent', delegation: 'Router never executes', tokens: '31.8M (about 37% more); about 30% more Router decisions' },
  { design: 'Single session, neutral prompt', time: '29.5 min p95', delegation: '0 of 5 runs', tokens: 'Fewer than Super-agent' },
  { design: 'Single session, delegation-first prompt', time: 'Shorter than neutral, longer than Super-agent', delegation: '4 of 5 runs', tokens: 'Fewer than Super-agent' },
];

export const batching = [
  { measure: 'Average batch size', low: '1.0', high: '2.8' },
  { measure: 'Time per request', low: '2.5 s', high: '3.9 s' },
  { measure: 'Time per decision (amortized)', low: '6.4 s', high: '1.6 s' },
];
