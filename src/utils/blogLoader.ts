import openaiAnthropicImg from '../images/openai-anthropic.jpg';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  thumbnail: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'how-700m-people-use-ai',
    title: 'How 700M+ People Are Really Using AI: OpenAI vs Anthropic',
    date: '2025-11-21',
    category: 'AI Research',
    excerpt: 'OpenAI and Anthropic released major research on how people actually use AI in the real world, covering 700M+ weekly ChatGPT users and millions of Claude conversations.',
    thumbnail: openaiAnthropicImg,
    content: `# How 700M+ People Are Really Using AI: OpenAI vs Anthropic

Recently, both OpenAI and Anthropic released major research on how people actually use AI in the real world.

- OpenAI's study was published as an NBER working paper, using usage data from more than **700 million weekly ChatGPT users** (around 1 in 10 people globally). It's one of the first large-scale looks at what people actually do with a general-purpose chatbot.  

  - Paper: ["The Global Diffusion of Generative AI"](https://www.nber.org/system/files/working_papers/w34255/w34255.pdf)

- Anthropic's latest **AI Economic Index** (third update) analyzes millions of Claude conversations, links them to the O*NET task database, and adds new views on country/region differences and enterprise API use.  

  - Index: [Anthropic AI Economic Index](https://www.anthropic.com/economic-index#global-usage)

Together, they offer a rich snapshot of how AI is landing in both **everyday life** and **workflows**.

## 1. Different lenses on AI usage

**Anthropic** focuses on work: it maps Claude conversations to economic activities and asks whether AI is **augmenting** human work or **automating** tasks.

**OpenAI** looks across all use cases: work, learning, personal tasks, curiosity, and more, capturing how AI shows up in everyday life beyond the workplace.

In short:

- Anthropic → zooms in on **workflows**

- OpenAI → zooms out to **daily life**

## 2. From "work tool" to "life assistant"

OpenAI's data shows a clear shift over time:

- Early users were much more likely to use ChatGPT for work.

- Today, a large majority of consumer usage is **non-work** (roughly 70–73% of messages), with only about 27–30% clearly work-related.

This suggests that AI is evolving from a **professional tool** into an **everyday assistant** used for:

- learning and tutoring,

- writing and translation,

- life admin and practical guidance.

Newer users are even less likely than early adopters to use ChatGPT primarily for work, reinforcing the trend toward **mass consumer adoption**.

## 3. Automation vs augmentation at work

Anthropic highlights two core modes of AI use:

- **Augmentation** – AI as a co-pilot that helps people think, draft, or iterate.

- **Automation** – AI independently completes tasks with limited human oversight.

Their latest findings suggest that automation-heavy use cases are **growing**, enabled by improvements in model reasoning and accuracy. At the same time, augmentation remains critical for complex, collaborative, and high-stakes tasks.

Industry patterns:

- Usage is rising in **research-heavy fields** like science, education, and math.

- Some **business analysis and consulting** use cases show relative decline, possibly reflecting Claude's strengths in reasoning, coding, and technical work.

## 4. The geography of AI adoption

The Anthropic index also points to clear geographic and economic divides:

- **Richer countries and tech hubs** show higher AI adoption.

- Within the US, states with **higher education levels and more tech workers** (e.g., Washington, Utah, California, North Carolina) are ahead of the national average.

This mirrors long-standing findings in economic geography: advanced regions tend to adopt new technologies faster, which can widen existing inequalities if not addressed.

## 5. What enterprises actually do with AI APIs

Anthropic's inclusion of enterprise API usage offers a rare window into company behavior:

- Around **44%** of calls are for **programming tasks** (code generation, refactoring, debugging).

- Around **15%** are tied to **office automation** (workflow optimization, documentation, routine tasks).

Compared with consumer usage, enterprises lean more heavily toward **automation**, driven by efficiency, cost savings, and scalability.

## 6. OpenAI's behavioral insights

OpenAI's paper and related blog highlights a few broad patterns in ChatGPT interactions:

- The dominant interaction type is **asking questions** (information, advice, explanation).

- The next major type is **doing tasks** (writing, coding, editing).

- Purely emotional or expressive conversations are a small minority.

Age and cohort also matter: younger users use ChatGPT heavily but not always for formal work, while some older users are more likely to connect it directly to their job tasks.

## 7. Why this matters

Taken together, these studies show that:

- AI has moved well beyond niche expert tooling into **mainstream consumer use**.

- Adoption is **uneven across regions, sectors, and user groups**, which could reshape existing inequalities.

- Enterprise and individual behavior are diverging: companies focus on **automation and efficiency**, while individuals often look for **augmentation, learning, and guidance**.

As more local ecosystems (including China's) build their own large language model infrastructure, **behavior-level studies on local users** will be critical. They can help policymakers, companies, and educators understand:

- who benefits from AI,

- who is being left behind,

- and where we need targeted interventions to avoid a new "AI divide."`
  },
  {
    slug: 'prompt-engineering-best-practices',
    title: 'Prompt Engineering Best Practices for Research',
    date: '2025-11-20',
    category: 'Prompt Engineering',
    excerpt: 'A practical guide to structuring prompts for research workflows, from literature review to data analysis planning.',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    content: `# Prompt Engineering Best Practices for Research

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
* Royal Society Open Science study on LLM oversimplification of scientific findings. [Live Science](https://www.livescience.com/technology/artificial-intelligence/ai-chatbots-oversimplify-scientific-studies-and-gloss-over-critical-details-the-newest-models-are-especially-guilty)`
  },
  {
    slug: 'ai-healthcare-ethics',
    title: 'AI in Healthcare: Balancing Innovation and Ethics',
    date: '2025-10-14',
    category: 'AI Ethics',
    excerpt: 'Exploring the ethical considerations when deploying AI systems in healthcare settings, from HIPAA compliance to clinical safety.',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    content: `# AI in Healthcare: Balancing Innovation and Ethics

AI in healthcare is having a moment.

On one side, we have models that can summarize complex notes in seconds, flag patients at high risk, and even support clinical decision-making in ways that were basically science fiction ten years ago. On the other side, we have very real risks: privacy violations, biased algorithms, opaque black boxes making recommendations about people's lives, and tools that feel impressive in demos but quietly create harm once they're live.

I work in the messy middle of that Venn diagram—between data, care, and real-world constraints. The question I keep coming back to is:

> **How do we move fast enough to build useful tools, without cutting corners on ethics, privacy, and safety?**

In this post, I'll walk through two pillars I think about constantly when building or evaluating AI in healthcare:

1. **HIPAA compliance and privacy** – how we handle data, not just on paper, but in day-to-day design decisions.
2. **Clinical safety and validation** – how we make sure the AI actually helps care, instead of quietly degrading it.

## HIPAA Compliance and Privacy: more than a checkbox

When you're building AI for clinical settings, **privacy is not a feature, it's the environment**. If you get it wrong, you don't just break trust—you potentially break the law.

### Start with: "What counts as PHI here?"

HIPAA defines *protected health information (PHI)* as individually identifiable health information held or transmitted by a covered entity or its business associates. That includes obvious fields like name and medical record number, but also combinations of dates, locations, and other identifiers that could reasonably link data back to a person.

For AI systems, that means:

* Free-text notes sent to an LLM can be PHI.
* "Anonymized" CSVs with dates, ZIP codes, and rare conditions can easily become re-identifiable.
* Log files and prompts are part of the risk surface, not just your main database.

### Design with data minimization and purpose limitation

The HIPAA Privacy Rule effectively creates a federal floor for how PHI can be used and disclosed; it expects that entities only use what's necessary to accomplish a legitimate purpose.

When I'm working on an AI workflow, I've found these questions helpful:

* **Do we actually need this field?** If the model doesn't need exact date of birth to perform well, use age band instead.
* **Can we move to de-identified or limited data?** De-identification and use of limited data sets can reduce risk when full PHI isn't required.
* **Where does this data travel?** Every hop—ETL, feature store, model input, logging, analytics—should have an explicit reason, access control, and retention policy.

### HIPAA Security Rule: not just IT's problem

The HIPAA Security Rule sets national standards to protect ePHI—things like access controls, audit logs, transmission security, and integrity controls.

For AI systems, that translates into:

* **Role-based access control** – Who can see prompts, outputs, and underlying PHI?
* **Segregated environments** – Dev/test vs. production, especially when you're using synthetic vs. real data.
* **Auditability** – Can you reconstruct who accessed what, which model version ran, and what the output was?
* **Vendor posture** – If you're using a cloud LLM or third-party API, do you have a BAA, clear data handling terms, and assurance that your data is not used for model training?

## Clinical Safety and Validation: "Does this make care better?"

Once you're past basic privacy and security, the bigger ethical question is: **Does this thing actually help patients and clinicians in the real world?**

### Validation is not "we got 92% accuracy on a Kaggle-style dataset"

A responsible validation strategy usually has at least three layers:

1. **Technical performance** – How does the model perform on held-out data that genuinely resembles the deployment environment?

2. **Clinical validity and usefulness** – Does this prediction or summary actually support better decisions, or just add noise?

3. **External validity and bias** – Does performance hold up across subgroups (age, race/ethnicity, language, insurance status, etc.)?

### Monitoring: AI is not fire-and-forget

Unlike a static device, many AI systems are updated, tuned, or retrained over time. Even for internal tools, it's worth:

* Versioning your models and prompts
* Tracking key safety and performance indicators over time
* Having a rollback plan if a new version behaves badly
* Providing an easy path for clinicians to report "this recommendation was wrong or unsafe"

## Beyond compliance: ethics, equity, and human roles

HIPAA and FDA guidance give us a floor, not a ceiling. A lot of the real ethical work sits in questions like:

* **Who is accountable when the AI is wrong?**
* **Do patients and clinicians understand the role AI is playing in their care?**
* **Are we amplifying inequities or closing gaps?**

### Augmented, not automated, intelligence

The American Medical Association deliberately leans on the term **"augmented intelligence"**—AI that enhances, not replaces, human clinical judgment.

In practice, that means:

* Keeping clinicians *in the loop* for decisions with high stakes or high uncertainty.
* Designing interfaces that clearly show *why* the system is suggesting something.
* Making it easy to override or ignore AI suggestions without penalty.

If clinicians feel like they're fighting the tool—or worse, being second-guessed by it—you've created moral distress, not augmentation.

## A practical way to move forward

When I'm evaluating or designing an AI tool for healthcare, I've found this short checklist useful:

1. **Data & Privacy** – What PHI are we using, and can we reduce or de-identify it?
2. **Safety & Evidence** – What problem are we actually solving, and how will we measure success clinically?
3. **Equity & Governance** – Who benefits the most from this tool, and who might be left out or harmed?

AI in healthcare doesn't have to be a choice between "move fast and break things" and "never ship anything." The real work is in building **boring, robust, ethically grounded infrastructure** around these powerful models—so that innovation and ethics are not in competition, but tightly coupled.

---

### References

* U.S. Department of Health & Human Services – HIPAA Privacy & Security Rules. [HHS Privacy](https://www.hhs.gov/hipaa/for-professionals/privacy/index.html) | [HHS Security](https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html)
* World Health Organization – *Ethics and Governance of Artificial Intelligence for Health* (2021) and guidance on large multimodal models in health. [WHO AI Ethics](https://www.ncdirindia.org/Downloads/WHO_AI_Ethics.pdf)
* U.S. FDA – Discussion papers and Action Plan on AI/ML-Based Software as a Medical Device (SaMD) and total product lifecycle framework. [FDA AI/ML Discussion Paper](https://www.fda.gov/files/medical%20devices/published/US-FDA-Artificial-Intelligence-and-Machine-Learning-Discussion-Paper.pdf)
* American Medical Association – Policies and principles on augmented intelligence in health care. [AMA H-480.939](https://policysearch.ama-assn.org/policyfinder/detail/H-480.939)
* UNESCO – AI ethics guidance emphasizing human rights, safety, privacy, and multi-stakeholder governance. [UNESCO](https://www.unesco.org/en/artificial-intelligence/recommendation-ethics)`
  },
  {
    slug: 'working-with-nhis-nhanes',
    title: 'Working with NHIS/NHANES: A Data Harmonization Guide',
    date: '2025-09-11',
    category: 'Data Science',
    excerpt: 'Practical insights on harmonizing multi-year NHIS and NHANES datasets for health inequality research.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    content: `# Working with NHIS/NHANES: A Data Harmonization Guide

If you work on health inequality, chances are you've met two old friends: **NHIS** (National Health Interview Survey) and **NHANES** (National Health and Nutrition Examination Survey).

They're powerful on their own. But the moment you say, *"Let's look at trends over 20+ years, and maybe stratify by race × gender × income × nativity…"* you've entered the harmonization zone:

* Survey designs change.
* Question wording shifts.
* Categories get split, merged, or retired.
* Weights and variance structures need careful handling.

In our intersectionality and inequality trends projects, we've spent a lot of time in this zone—building multi-decade pooled NHIS datasets and multi-cycle NHANES files for intersectional analyses. This post is the guide I wish I'd had when I started.

## Understanding survey design (before you touch a merge)

Both NHIS and NHANES use **complex, multistage probability samples** of the non-institutionalized U.S. population. That means:

* Stratification
* Clustering (PSUs)
* Unequal selection probabilities
* Design-specific **weights**

You don't have the option to "ignore the weights and just run a regression" without paying a price in bias and incorrect standard errors.

### NHIS in a nutshell

* **What it is:** A continuous, cross-sectional household interview survey, with core questions plus rotating supplements.
* **Design:** Multistage area probability sample, redesigned about every 10 years; a new design in 2016 and a major questionnaire redesign in 2019.
* **Structure (1997–2018):** Household → Family → Person → Sample Adult / Sample Child.

The **2019 redesign** changed content, structure, and some sample design aspects. Analysts must treat pre-2019 and post-2019 data as different eras and be cautious about long trends that cross this boundary.

### NHANES in a nutshell

* **What it is:** A continuous health survey with both interviews *and* physical examinations and lab data.
* **Design:** Complex, multistage probability sample, fielded in **2-year cycles** (e.g., 1999–2000, 2001–2002).
* **Oversampling:** Key groups (e.g., older adults, certain racial/ethnic groups) are oversampled to improve precision.

## Variable harmonization strategies (where most of the pain lives)

Once the survey design is under control, the real grind begins: **variables**.

Across decades, variables:

* Change names
* Change categories
* Change universe (who gets asked)
* Move from supplement to core or vice versa

### Step 1: Build a harmonization table (not just code)

I strongly recommend a spreadsheet or database with, at minimum:

* **Concept** (e.g., "self-rated health", "poverty ratio", "race/ethnicity")
* **Year(s)**
* **Original variable name(s)**
* **Original categories and codes**
* **Universe** (who's in denominator)
* **Harmonized variable name**
* **Harmonized categories & codes**
* **Notes** (quirks, changes, caveats)

This table becomes your **single source of truth** so future-you (or future students) doesn't have to reverse-engineer why "EDUC_3CAT_V3" exists.

### Step 2: Classify variables by comparability

I usually group variables into:

1. **Fully comparable** – Same question wording, categories, universe across all years.
2. **Partially comparable (recoding needed)** – Categories change, or extra detail appears.
3. **Not comparable** – Question changes substance (not just detail).

### Step 3: Be obsessed with universes and denominators

Some of the nastiest bugs in inequality work come from **quiet changes in who gets asked**:

* Income questions asked only of adults vs. all persons
* Health insurance questions limited to civilians, or changed in age eligibility
* Sample Adult vs. Person-level variables in NHIS

Always record: minimum age, whether it's person-level, sample-adult–only, or subsample, and any branching logic.

## Survey design in practice: weights, strata, and domains

### Weights and pooling

General pattern:

* **NHIS**: Use person/sampling weights appropriate to your file and outcome. When pooling multiple years within a design period: **divide the annual weight by the number of years pooled**.
* **NHANES**: Use outcome-appropriate weights: interview weights vs. MEC exam weights vs. subsample weights.

### Domain analysis, not dropping cases

For intersectionality and small-group work, a common pitfall is dropping everyone who is not in your subgroup, then re-defining the survey design, which can mangle the design structure.

Instead, most survey methods texts recommend **domain analysis**: keep the full survey design, but define your subpopulation with an indicator variable.

## Validation: how to know your harmonized file is "good enough"

Before you rush into fancy inequality indices (SII/RII) or intersectional decomposition, pause and run **boring checks**:

1. **Replicate simple published estimates** – Prevalence of smoking, obesity, or insurance coverage
2. **Check weighted totals against known population controls**
3. **Look for impossible jumps** – If self-rated poor health doubles between adjacent years, suspect issues
4. **Stress-test intersectional cells** – Tabulate unweighted Ns and weighted prevalence for key groups

## A practical checklist

If you're about to build your first multi-year NHIS/NHANES dataset:

1. Clarify your time frame and design periods
2. Read the official analytic guidelines
3. Set up survey design objects correctly
4. Build a harmonization table
5. Classify variables by comparability
6. Standardize missing/top-codes
7. Validate against published estimates
8. Treat harmonization as part of your methods section

If you treat NHIS/NHANES harmonization like an actual sub-project, not a side-quest, you get something powerful: a reusable, well-documented dataset that can support multiple papers, student projects, and future updates.

---

### References

* National Center for Health Statistics. **NHANES Analytic and Reporting Guidelines** and related analytic notes. [CDC NHANES Guidelines](https://wwwn.cdc.gov/nchs/nhanes/analyticguidelines.aspx)
* National Center for Health Statistics. **Guidelines for Analysis of Trends Using NCHS Data** (Series 2, No. 179). [CDC Trends Guidelines](https://www.cdc.gov/nchs/data/series/sr_02/sr02_179.pdf)
* CDC / NCHS. **NHIS Survey Descriptions, Redesign Notes, and 2019 Questionnaire Redesign Documentation.** [CDC NHIS](https://www.cdc.gov/nchs/nhis/about/2019-questionnaire-redesign.html)
* IPUMS NHIS. **User notes on pooling, weights, and variance estimation.** [IPUMS Weights](https://nhis.ipums.org/nhis/userNotes_weights.shtml)
* Kindratt TB. *Big Data for Epidemiology* chapters on NHIS and NHANES survey methods. [UTA Pressbooks NHANES](https://uta.pressbooks.pub/bigdataforepidemiology/chapter/chapter10-nhanes/)
* Harari L et al. "Intersectionality in Quantitative Health Disparities Research." *Annual Review of Public Health* (2021). [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8119321/)
* Olisaeloka L et al. "Intersectional disparities in mental healthcare utilization by sex and race/ethnicity among U.S. adults: An NHANES study." (2025). [PLOS](https://journals.plos.org/globalpublichealth/article?id=10.1371%2Fjournal.pgph.0004682)
* Taylor CL et al. "Critical data at the crossroads: the National Health and Nutrition Examination Survey." *American Journal of Clinical Nutrition* (2023). [AJCN](https://ajcn.nutrition.org/article/S0002-9165%2823%2946262-4/fulltext)`
  }
];

export const getAllPosts = (): BlogPost[] => {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getRecentPosts = (count: number = 3): BlogPost[] => {
  return getAllPosts().slice(0, count);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const formatDate = (dateString: string): string => {
  // Parse date components to avoid timezone issues
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};
