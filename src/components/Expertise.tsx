import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPython, faReact } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faChartLine, faCog, faBrain } from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const aiMLLabels = [
    "ChatGPT", "LLaMA", "ChatGLM", "CrewAI", "LangChain", "RAG", "Chroma", "Pinecone", 
    "Agenta", "LangSmith", "LightGBM", "scikit-learn", "NLP", "Prompt Engineering"
];

const dataLabels = [
    "Python", "pandas", "scikit-learn", "SQL", "Tableau", "SPSS", "SAS"
];

const productLabels = [
    "AI Product Design", "Requirements & Roadmap", "A/B Testing", 
    "Agile (Jira, Notion)", "Stakeholder Communication"
];

const domainLabels = [
    "Healthcare AI", "HIPAA Risk Frameworks", "User Research", 
    "Social & Behavioral Analytics"
];

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Expertise</h1>
            <div className="skills-grid-four">
                <div className="skill">
                    <FontAwesomeIcon icon={faBrain} size="3x"/>
                    <h3>AI & Machine Learning</h3>
                    <p>I build LLM applications, multi-agent systems, and RAG pipelines with evaluation frameworks and optimization tools.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Stack:</span>
                        {aiMLLabels.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faChartLine} size="3x"/>
                    <h3>Data & Analytics</h3>
                    <p>I work with NHIS/NHANES and other survey data to understand health inequality, building clean, reusable workflows in SAS and SPSS.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Stack:</span>
                        {dataLabels.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faCog} size="3x"/>
                    <h3>Product & Delivery</h3>
                    <p>I design prompt systems and agentic workflows that let therapists, researchers, and job seekers use AI without fighting the tool.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Stack:</span>
                        {productLabels.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faReact} size="3x"/>
                    <h3>Domain Knowledge</h3>
                    <p>I care most about the space where <strong>data, behavior, and technology</strong> meet — especially when it affects families, health, and opportunity.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Focus:</span>
                        {domainLabels.map((label, index) => (
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
