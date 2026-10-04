import React from "react";
import SectionHead from "./SectionHead";

const figures = [
  { value: '80.8%', label: 'Content-moderation accuracy on a 10,000-case internal benchmark, up from 49.6%' },
  { value: '647K+', label: 'NHIS records harmonized across 16 survey years for a health-inequality study' },
  { value: '30% → 95%', label: 'Usable customer records after restructuring 40,000+ legacy CRM records' },
];

export default function About() {
  return (
    <section className="section shell" id="about" aria-labelledby="about-title">
      <SectionHead index="01" titleId="about-title" title="AI systems, held to research standards" />
      <div className="about-grid">
        <div className="about-copy">
          <p>I build and evaluate AI systems where accuracy and accountability both matter. At Praxis AI, I own a content-safety system from requirements to launch: fine-tuning, evaluation, decision thresholds and the policy graph that gives decisions a traceable policy basis.</p>
          <p>At UT Austin, I built survey-harmonization pipelines for health-inequality research and taught doctoral statistics labs. Earlier, I worked in data engineering and customer analytics, including financial services at Broadridge. I also founded Scholia, a multi-agent AI harness for academic research and learning.</p>
          <p>Across all of it, the work comes back to the same questions: can the data be trusted, does the evaluation measure the right thing, and can a decision be traced to its basis?</p>
          <p className="about-languages mono"><span>Languages</span>English (professional working proficiency) · Mandarin Chinese / Putonghua (native)</p>
        </div>
        <dl className="about-figures">
          {figures.map(figure => (
            <div key={figure.value} className="reveal">
              <dt>{figure.value}</dt>
              <dd>{figure.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
