import React from "react";
import SectionHead from "./SectionHead";

const groups = [
  {
    title: 'Statistics & Methods',
    text: 'I design and run rigorous quantitative analyses: causal inference, multilevel and complex survey models, and inequality metrics, with reproducible pipelines and documented assumptions.',
    labels: ["Causal Inference", "Propensity Score Matching", "Multilevel Modeling", "Complex Survey Analysis", "SII / RII", "Longitudinal Trends", "Multiple Imputation", "SAS", "SPSS", "R"],
  },
  {
    title: 'Programming & Data',
    text: 'I build reproducible data workflows across Python, R, and SAS, with version control and clear documentation from raw data to analysis-ready outputs.',
    labels: ["Python", "R", "SAS", "SQL", "JavaScript", "TypeScript", "Git", "Tableau", "PostgreSQL"],
  },
  {
    title: 'AI & NLP',
    text: 'I design LLM applications and context systems with evaluation, safety guardrails, and human-in-the-loop review, focused on reliability rather than demos.',
    labels: ["LLM Application Design", "Prompt & Context Design", "RAG", "Model Evaluation", "Safety Guardrails", "Human-in-the-loop", "LangSmith", "Agenta", "OpenRouter"],
  },
  {
    title: 'Research & Clinical AI',
    text: 'I translate research requirements into study operations and AI tools, from Qualtrics consent flows to PMTO-informed evaluation of conversational systems.',
    labels: ["Reproducible Pipelines", "Qualtrics", "Consent Workflows", "Data QA", "PMTO-informed Evaluation", "Conversational Fidelity", "Role-play Systems"],
  },
];

function Expertise() {
  return (
    <section className="section shell" id="expertise" aria-labelledby="expertise-title">
      <SectionHead index="03" label="Expertise" titleId="expertise-title" title="Expertise" />
      <div className="skills-grid">
        {groups.map((group, index) => (
          <article key={group.title} className="skill reveal">
            <p className="skill-num mono">{String(index + 1).padStart(2, '0')}</p>
            <h3>{group.title}</h3>
            <p className="skill-text">{group.text}</p>
            <p className="eyebrow chip-title">Methods &amp; tools</p>
            <ul className="tag-list">
              {group.labels.map(label => <li key={label} className="skill-label">{label}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Expertise;
