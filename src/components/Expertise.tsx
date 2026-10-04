import React from "react";
import SectionHead from "./SectionHead";

const groups = [
  {
    title: 'AI & Machine Learning',
    text: 'I build and evaluate LLM applications end to end, from fine-tuning and context design to retrieval and multi-agent orchestration, with evaluation pipelines and guardrails that make their behavior measurable.',
    labels: ["LLM Application Design", "Prompt & Context Design", "RAG", "Multi-agent Orchestration", "Plan-and-execute & ReAct", "LLM Evaluation", "LLM-as-a-Judge", "Fine-tuning (PEFT / LoRA)", "PyTorch", "Hugging Face", "NLP", "Knowledge Graphs (Neo4j / Cypher)", "Safety Guardrails", "Human-in-the-loop", "Role-play Systems", "LangSmith", "Agenta", "OpenRouter"],
  },
  {
    title: 'Data Quality & Governance',
    text: 'I make data trustworthy before it is used: codebooks and data standards, automated validation and drift checks, and governance controls that keep LLM use auditable and decisions traceable.',
    labels: ["Data Dictionaries & Codebooks", "Data Standards", "Data-quality Validation", "Drift & Missing-data Checks", "Customer Data Management (CRM)", "Data-security Controls for LLMs", "Audit Trails", "Decision Traceability", "Reproducible Pipelines"],
  },
  {
    title: 'Research Methods & Statistics',
    text: 'I design and run rigorous quantitative analyses: causal inference, multilevel and complex survey models, and inequality metrics, with reproducible pipelines and documented assumptions.',
    labels: ["Causal Inference", "Propensity Score Matching", "Multilevel Modeling", "Complex Survey Analysis", "Survey Harmonization", "SII / RII", "Longitudinal Trends", "Multiple Imputation", "Statistical Modeling", "Qualtrics", "PMTO-informed Evaluation", "Conversational Fidelity"],
  },
  {
    title: 'Engineering & Deployment',
    text: 'I ship reproducible pipelines and services in Python, SQL, R and SAS, deploy them with FastAPI, Docker, Azure and GCP Vertex AI, and report through Tableau and Power BI.',
    labels: ["Python", "SQL", "R", "SAS", "SPSS", "JavaScript", "TypeScript", "FastAPI", "Docker", "Git", "Azure", "GCP Vertex AI", "PostgreSQL", "Tableau", "Power BI", "Excel VBA"],
  },
];

function Expertise() {
  return (
    <section className="section shell" id="expertise" aria-labelledby="expertise-title">
      <SectionHead index="04" titleId="expertise-title" title="Expertise" />
      <div className="skills-grid">
        {groups.map((group, index) => (
          <article key={group.title} className="skill reveal">
            <p className="skill-num mono">{String(index + 1).padStart(2, '0')}</p>
            <h3>{group.title}</h3>
            <p className="skill-text">{group.text}</p>
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
