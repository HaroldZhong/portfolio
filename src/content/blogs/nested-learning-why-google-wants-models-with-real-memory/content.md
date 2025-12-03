# Nested Learning: Why Google Wants Models With Real Memory  

You open your laptop on Monday morning.  

Your AI assistant pops up, bright and ready. On Friday you spent an hour with it: planning a product launch, sketching a reading list, settling on how you like your emails drafted. Today you ask it to pick up where you left off.  

It responds flawlessly to your prompt, but not to your life.  
It has no idea what you are talking about.  

Every conversation is a first date.  
Every morning is *Groundhog Day*.  

That is the quiet, frustrating reality of today’s large language models. They are dazzling in the moment yet trapped in an eternal present, unable to form lasting memories of you, your preferences, or your shared history.

Google’s new work on [**Nested Learning**](https://research.google/blog/introducing-nested-learning-a-new-ml-paradigm-for-continual-learning/) is, at heart, an attempt to break that spell.

![Nested Learning Concept](/images/blogs/nested-learning-why-google-wants-models-with-real-memory/NestedLearning.png)

The central claim of the paper *“Nested Learning: The Illusion of Deep Learning Architectures”* is startlingly direct:

> A deep model, its optimizer, and even the training process are all manifestations of the same fundamental phenomenon: nested associative memories that evolve across distinct temporal scales.

Instead of treating “architecture” and “optimizer” as separate pieces of machinery, Nested Learning treats a model as a **hierarchy of learners**, each with its own kind of memory, its own update rule, and its own clock.

The goal is simple to say and hard to achieve:  
**continual learning without catastrophic forgetting.**



## The eternal present: why today’s LLMs feel forgetful  

From a user’s point of view, today’s LLMs behave like a character from *Memento* or a patient with **anterograde amnesia**. They can carry on a rich conversation for a while, then forget almost everything that just happened.

Technically, they only have two kinds of “memory”:

* **Pretraining weights**  
  Long term memory baked in before you ever meet the model. This is what it “knows” from the internet.
* **Context window**  
  Short term memory inside a single interaction or session.

Once the context window clears or your session ends, the slate is wiped. That weekend trip you mentioned, the style of code comments you like, the half-finished strategy you were drafting together: gone.

Even when products add “memory” on top through retrieval augmented generation (RAG) or vector databases, it is the **outer system** that remembers, not the model itself. The weights inside the network remain unchanged, as if you had never met.

The Google team explicitly draws the analogy to anterograde amnesia. The model can use short term context, but almost none of that experience flows into long term parameters. 

Nested Learning is an attempt to fix this not with another external notebook, but at the **architectural level**: by giving the model its own internal hierarchy of memories that evolve over time.

![Figure 2](/images/blogs/nested-learning-why-google-wants-models-with-real-memory/Figure%202.png)



## A city of clocks: how Nested Learning feels  

To understand Nested Learning, it helps to start with an image rather than an equation.

Imagine a city.

In every neighborhood stands a **clock tower**:

* Some tick every second  
* Some every hour  
* Some only once a year at midnight on New Year’s Eve  

Each clock “remembers” something every time it moves:

* Fast clocks track fleeting details: rain on the pavement, morning traffic, today’s gossip  
* Slow clocks encode things that barely change: laws, customs, cultural norms  

Crucially, the slow clocks do not live in isolation. Their rare updates are **guided by statistics from the faster ones**. Enough rainy mornings, and the city invests in better drainage. Enough protests, and the law itself begins to shift.

The human brain looks a lot like this city. Different neural circuits and brain rhythms operate on different time scales. Fast oscillations support quick perception and reaction; slow processes support gradual learning, consolidation, and identity.

Nested Learning suggests that we should design neural networks in the same spirit:

* Each component (layer, optimizer, memory module) has its own **clock rate**  
* Each has its own **context flow** and **internal objective**  
* Together they form a **nested system of learners**, stacked and interacting across time  

By contrast, most current deep learning systems look like a city where nearly all the clocks tick in unison during training, then **freeze** at deployment. That is convenient for offline training, but deeply limiting for real continual learning.



## Training as memory compression: one lens for everything  

The paper uses a single unifying lens for all of this: **associative memory**.

Borrowing a simple idea from neuropsychology:

> Memory is an update caused by an input.  
> Learning is the process of acquiring useful memory.

Viewed that way, many things we usually treat as separate begin to look like variations of the same phenomenon.

* A **layer** trained by gradient descent is an **associative memory**. It learns to map inputs to their local error or “surprise” signals.
* **Pretraining** is the act of compressing an enormous training stream into parameters that summarize those surprises.

Then the authors push the idea further:

* **Optimizers** such as SGD with momentum or Adam are also associative memories, but over *gradients* rather than tokens.  
  * Momentum stores a compressed history of gradients.  
  * Adam behaves like a more expressive memory that does something close to optimal L2 compression of gradients over time.

Within the Nested Learning view:

* The **architecture** is a learner over tokens and states.  
* The **optimizer** is a learner over gradients.  
* **Meta learners** or learned optimizers sit one level above, learning across tasks or episodes.

Each level has:

* its own context flow  
* its own update rule  
* its own clock speed  

Once you accept that, familiar boxes start to blur. Architecture, optimizer, and “training procedure” all become different strata in one larger memory system.

![Nested Learning Rings](/images/blogs/nested-learning-why-google-wants-models-with-real-memory/nested_learning_rings.png)



## The illusion of depth  

The subtitle of the paper, *“The Illusion of Deep Learning Architectures”*, is not just rhetorical. The authors argue that much of the “depth” we talk about in deep learning is, in a precise sense, an illusion.

Neural networks look deep because we draw them as tall stacks of layers. But from a computational point of view, simply adding layers does not always increase **computational depth** or algorithmic power. Prior work has already shown that in many architectures, more layers do not automatically mean more sophisticated behaviors.

Nested Learning suggests that much of the real depth is hiding in **internal optimization loops**, not just in spatial stacking.

On this view, a standard Transformer turns out to be surprisingly minimal:

* **Attention** behaves like a non parametric, very fast associative memory over tokens, updating effectively at “infinite” frequency during a sequence.  
* **MLPs** act as slow, parametric memories that are only updated in the outer training loop and remain fixed during inference.

That is like giving a brain only high frequency gamma waves during childhood, then freezing its synapses forever on graduation day.

Nested Learning proposes a richer picture in which we:

* make MLP blocks themselves adaptive, using **fast weights** or similar mechanisms  
* use recurrent or **self modifying** sequence modules that learn how to update their own internal parameters  
* organize these components into **multi level systems**, each with its own time scale and objective  

Depth then becomes:

> how many levels of learning sit on top of each other over time  

not just:

> how many residual blocks we stacked in space.


## The Continuum Memory System: many clocks in one model  

To make these ideas concrete, the authors introduce the **Continuum Memory System (CMS)**.

Instead of one short term memory and one long term memory, CMS defines a **chain of MLP blocks**, each associated with a characteristic frequency:

* Each block has a **frequency label**.  
* Each block updates its parameters every **C** steps, where C depends on that frequency.  
* Together, they form a spectrum of memories, from extremely fast and plastic to extremely slow and stable.

A classic Transformer block is just the degenerate case where you keep only one such block and give it a single update rhythm.

CMS lets you do something more brain like:

* Very fast layers adapt to immediate context and recent tokens.  
* Slower layers update rarely and store more stable patterns and structure.  
* Meta levels can initialize lower ones or transfer knowledge between them through meta learning.

This is where the “city of clocks” metaphor becomes literal. Each block has its own tick rate, its own context flow, and its own role in compressing experience into parameters.

![Figure 5](/images/blogs/nested-learning-why-google-wants-models-with-real-memory/Figure%205.png)



## HOPE: a self modifying sequence model  

The Google Research blog does not stop at philosophy. To show that Nested Learning is more than wordplay, the team builds a concrete architecture called **HOPE**.

At a high level, HOPE is:

* a **self modifying sequence model** based on their Titans architecture that learns its own update rules for keys, values, queries, learning rates, and other internal components  
* followed by a **Continuum Memory System** that provides slower, persistent memory across time  

Inside HOPE, the memory matrices are updated by an internal optimization process that uses **learned learning rates** and **gating coefficients**. For each token and context, the block can decide **how aggressively to update itself**.

In experiments, HOPE based architectures:

* match or beat strong baselines such as modern Transformers and Titans on language modeling  
* perform better on long context and “needle in a haystack” style tasks  
* show improved performance on continual learning setups such as class incremental text classification  

![Comparison of performance on language modeling (perplexity; left) and common-sense reasoning (accuracy; right) tasks between different architectures: Hope, Titans, Samba and a baseline Transformer.](/images/blogs/nested-learning-why-google-wants-models-with-real-memory/NestedLearning-Performance.png)

This is not yet *the* solution to continual learning. But it is a strong proof of concept that architectures with **nested time scales** and **self modifying internal memories** can outperform flat Transformers on exactly the kinds of problems where present day models struggle.



## One story, many names: unifying old ideas  

One of the most satisfying aspects of the Nested Learning view is how many older ideas suddenly fall into place as special cases.

In this framing:

* **Meta learning**  
  Higher level learners that initialize or adapt lower level memories across episodes.

* **Optimizers**  
  Associative memories over gradients that have their own state and context flow.

* **Attention**  
  A fast, non parametric associative memory over tokens.

* **RNNs and modern recurrent memory modules**  
  Parametric associative memories that update on every step.

* **Hypernetworks**  
  Higher frequency learners that generate parameters for lower frequency models.

* **Continual learning tricks**  
  Different strategies for deciding which levels remain stable and which remain plastic.

Once everything is phrased as “nested systems of associative memories”, better questions become possible:

* Which levels actually exist in my model today  
* What is the context flow at each level  
* How often does each level update  
* How does knowledge move between levels  

That is a cleaner design space than “add another memory module and hope it helps”.


## Why this matters if you build AI products  

If you are building agents, copilots, or workflow tools today, you cannot simply import Nested Learning into your codebase next week. The research is still early and computationally heavy.

But it **should** change how you think about your stack.

A few practical takeaways:

1. **Your current system already has hidden levels**  
   Even with a plain Transformer you already have:  
   * weights as long term memory  
   * attention as context memory  
   * optimizer states as gradient memory  
   * external RAG systems as auxiliary notebooks  
   Nested Learning gives you language to treat these as one connected memory system instead of isolated hacks.

2. **Prompts and vector stores will not be enough for real continual learning**  
   If you want “this model remembers me” behavior, you will probably need architectures that can actually absorb experience into internal nested memories, not just bigger context windows and more elaborate retrieval.

3. **Architecture and optimizer should be co designed**  
   The paper emphasizes that architectures generate the pattern of gradients that optimizers see. Since optimizers themselves are memory systems, they should be chosen or learned to match the architecture’s behavior, not treated as an afterthought.

4. **Depth is a temporal design choice, not only a layer count**  
   You can add meaningful depth by stacking learning loops at different frequencies, not just by piling on more residual blocks with the same training schedule.

For product builders, Nested Learning offers a conceptual compass. It suggests that truly adaptive, personal AI systems will likely emerge from richer internal memory hierarchies rather than from another layer of infrastructure wrapped around frozen models.


## Where this might go next  

Nested Learning is still more research program than finished blueprint. Important questions remain:

* How stable are multi level systems when trained over very long horizons  
* How do we debug models in which many nested learners are adapting simultaneously  
* How do we safely expose parts of this hierarchy to users in real products  

Yet there is a familiar sense of a shift in perspective, similar to what happened when *“Attention Is All You Need”* reframed sequence modeling.

That earlier work gave us a new **spatial** primitive: attention over tokens.  
Nested Learning is trying to give us a new **temporal** axis: clocks over learning processes.

If the internet age gave us models trained once on a vast static snapshot of humanity, the next era may demand something closer to a lifelong companion. Not a parrot of web text, but a partner that actually grows with you, remembers you, and changes with your world.

To reach that future, we will need models that can learn at many speeds at once: fast enough to respond in the moment, slow enough to form something like character.

Nested Learning is one bold attempt to sketch how such models might be built.

