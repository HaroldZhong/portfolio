# Working with NHIS/NHANES: A Data Harmonization Guide

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