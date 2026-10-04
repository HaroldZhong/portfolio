import React from "react";
import SectionHead from "./SectionHead";

export default function About() {
  return (
    <section className="section shell" id="about" aria-labelledby="about-title">
      <SectionHead index="01" titleId="about-title" title="AI systems, held to research standards" />
      <div className="about-copy">
        <p>I build and evaluate AI systems where accuracy and accountability both matter. At Praxis AI, I own a content-safety system from requirements to launch: fine-tuning, evaluation, decision thresholds and the policy graph that gives decisions a traceable policy basis.</p>
        <p>At UT Austin, I built survey-harmonization pipelines for health-inequality research and taught doctoral statistics labs. Earlier, I worked in data engineering and customer analytics, including financial services at Broadridge. I also founded Scholia, a multi-agent AI harness for academic research and learning.</p>
        <p>Across all of it, the work comes back to the same questions: can the data be trusted, does the evaluation measure the right thing, and can a decision be traced to its basis?</p>
      </div>
    </section>
  );
}
