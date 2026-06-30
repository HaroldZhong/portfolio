import React from "react";
import '../assets/styles/Education.scss';

function Education() {
  return (
    <div className="container" id="education">
      <div className="education-container">
        <h2>Education</h2>

        <div className="edu-list">
          <div className="edu-item">
            <div className="edu-head">
              <h3>M.S., Information Studies</h3>
              <span className="edu-date">May 2025</span>
            </div>
            <h4>University of Texas at Austin</h4>
            <p>
              Focus on Artificial Intelligence and Data Science. Coursework included Machine Learning, Explainable AI, AI in Health, Responsible Data Management, Data Wrangling, and Prompt Engineering.
            </p>
          </div>

          <div className="edu-item">
            <div className="edu-head">
              <h3>B.S., Business Management; B.A., Psychology</h3>
              <span className="edu-date">May 2023</span>
            </div>
            <h4>Stony Brook University</h4>
            <p>
              Honors: Academic Excellence Award, College of Business Leadership Award, Business Honors Program, and Dean's List.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
