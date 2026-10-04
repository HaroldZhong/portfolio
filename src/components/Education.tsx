import React from "react";
import SectionHead from "./SectionHead";

function Education() {
  return (
    <section className="section shell" id="education" aria-labelledby="education-title">
      <SectionHead index="05" titleId="education-title" title="Education" />
      <ol className="record-list">
        <li className="record reveal">
          <p className="record-date mono">May 2025</p>
          <div className="record-title">
            <h3>Master of Science in Information Studies</h3>
            <p>University of Texas at Austin</p>
          </div>
          <div className="record-body">
            <p>Focus on Artificial Intelligence and Data Science. Coursework included Machine Learning, Explainable AI, AI in Health, Responsible Data Management, Data Wrangling, and Prompt Engineering.</p>
          </div>
        </li>
        <li className="record reveal">
          <p className="record-date mono">May 2023</p>
          <div className="record-title">
            <h3>Bachelor of Science in Business Management, Double Major in Psychology</h3>
            <p>Stony Brook University</p>
          </div>
          <div className="record-body">
            <p>Departmental Honors in Business Management, Cum Laude. Academic Excellence Award, College of Business Leadership Award, Business Honors Program, and Dean's List.</p>
          </div>
        </li>
      </ol>
    </section>
  );
}

export default Education;
