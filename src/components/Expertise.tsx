import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faChartLine, faCog, faBrain } from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/Expertise.scss';

const statsLabels = [
    "Causal Inference", "Propensity Score Matching", "Multilevel Modeling", "Complex Survey Analysis",
    "SII / RII", "Longitudinal Trends", "Multiple Imputation", "SAS", "SPSS", "R"
];

const dataLabels = [
    "Python", "R", "SAS", "SQL", "JavaScript", "TypeScript", "Git", "Tableau", "PostgreSQL"
];

const aiLabels = [
    "LLM Application Design", "Prompt & Context Design", "RAG", "Model Evaluation",
    "Safety Guardrails", "Human-in-the-loop", "LangSmith", "Agenta", "OpenRouter"
];

const researchOpsLabels = [
    "Reproducible Pipelines", "Qualtrics", "Consent Workflows", "Data QA",
    "PMTO-informed Evaluation", "Conversational Fidelity", "Role-play Systems"
];

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h2>Expertise</h2>
            <div className="skills-grid-four">
                <div className="skill">
                    <FontAwesomeIcon icon={faChartLine} size="2x"/>
                    <h3>Statistics & Methods</h3>
                    <p>I design and run rigorous quantitative analyses: causal inference, multilevel and complex survey models, and inequality metrics, with reproducible pipelines and documented assumptions.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Methods & tools:</span>
                        {statsLabels.map((label, index) => (
                            <span key={index} className="skill-label">{label}</span>
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faDatabase} size="2x"/>
                    <h3>Programming & Data</h3>
                    <p>I build reproducible data workflows across Python, R, and SAS, with version control and clear documentation from raw data to analysis-ready outputs.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Methods & tools:</span>
                        {dataLabels.map((label, index) => (
                            <span key={index} className="skill-label">{label}</span>
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faBrain} size="2x"/>
                    <h3>AI & NLP</h3>
                    <p>I design LLM applications and context systems with evaluation, safety guardrails, and human-in-the-loop review, focused on reliability rather than demos.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Methods & tools:</span>
                        {aiLabels.map((label, index) => (
                            <span key={index} className="skill-label">{label}</span>
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faCog} size="2x"/>
                    <h3>Research & Clinical AI</h3>
                    <p>I translate research requirements into study operations and AI tools, from Qualtrics consent flows to PMTO-informed evaluation of conversational systems.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Methods & tools:</span>
                        {researchOpsLabels.map((label, index) => (
                            <span key={index} className="skill-label">{label}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;
