import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faChartLine, faCog, faBrain } from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
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
            <h1>Expertise</h1>
            <div className="skills-grid-four">
                <div className="skill">
                    <FontAwesomeIcon icon={faChartLine} size="3x"/>
                    <h3>Statistics & Methods</h3>
                    <p>I design and run rigorous quantitative analyses: causal inference, multilevel and complex survey models, and inequality metrics, with reproducible pipelines and documented assumptions.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Stack:</span>
                        {statsLabels.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faDatabase} size="3x"/>
                    <h3>Programming & Data</h3>
                    <p>I build reproducible data workflows across Python, R, and SAS, with version control and clear documentation from raw data to analysis-ready outputs.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Stack:</span>
                        {dataLabels.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faBrain} size="3x"/>
                    <h3>AI & NLP</h3>
                    <p>I design LLM applications and context systems with evaluation, safety guardrails, and human-in-the-loop review, focused on reliability rather than demos.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Stack:</span>
                        {aiLabels.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faCog} size="3x"/>
                    <h3>Research & Clinical AI</h3>
                    <p>I translate research requirements into study operations and AI tools, from Qualtrics consent flows to PMTO-informed evaluation of conversational systems.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Focus:</span>
                        {researchOpsLabels.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;
