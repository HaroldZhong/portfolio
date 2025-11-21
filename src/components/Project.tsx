import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import '../assets/styles/Project.scss';

interface ProjectData {
  title: string;
  role: string;
  summary: string;
  fullDescription: string;
  tags: string[];
}

const ProjectCard: React.FC<{ project: ProjectData; index: number }> = ({ project, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Detect touch capability
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleInteraction = () => {
    if (isTouch) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <motion.div
      className="project-card-container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={handleInteraction}
      onHoverStart={() => !isTouch && setIsFlipped(true)}
      onHoverEnd={() => !isTouch && setIsFlipped(false)}
    >
      <motion.div
        className="project-card"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        {/* Front of card */}
        <div className="project-card-front">
          <h3>{project.title}</h3>
          <p className="project-role">{project.role}</p>
          <p className="project-summary">{project.summary}</p>
          <div className="project-tags">
            {project.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="tag">{tag}</span>
            ))}
          </div>
          <div className="hover-hint">{isTouch ? 'Tap for details →' : 'Hover for details →'}</div>
        </div>

        {/* Back of card */}
        <div className="project-card-back">
          <h3>{project.title}</h3>
          <p className="project-description">{project.fullDescription}</p>
          <div className="project-tags">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

function Project() {
  const projects: ProjectData[] = [
    {
      title: "BRAT – Family Therapy Chatbot",
      role: "Lead, product & technical design",
      summary: "Parents rehearse tough conversations with a realistic virtual child before trying at home.",
      fullDescription: "Parents in our study often struggle with tough conversations at home, so BRAT lets them rehearse with a realistic virtual 'child' first. It's a multi-agent LLM system used in an IRB-approved study. I co-designed the agents, workflows, and Azure/OpenAI setup so it's safe, research-grade, and actually usable.",
      tags: ["Multi-agent LLM", "IRB workflows", "Azure/OpenAI", "Whisper ASR", "RAG", "Qualtrics"]
    },
    {
      title: "NHIS/NHANES Health Inequality Analysis",
      role: "Data workflow & harmonization lead",
      summary: "Producing equity metrics and reproducible findings from multi-year national health survey data.",
      fullDescription: "Our team studies how health outcomes differ by income and other factors over time. I build SAS workflows that produce equity metrics like SII/RII and ridit scores for our manuscripts.",
      tags: ["SAS", "SPSS", "Complex Survey Design", "Data Harmonization", "Public Health", "Equity Metrics"]
    },
    {
      title: "Clinical Prompt Systems",
      role: "Prompt engineer & system designer",
      summary: "Turning expert psychiatric workflows into structured prompts with safety rules for AI systems.",
      fullDescription: "Clinicians know what they want to ask; AI often doesn't. I turn real-world expert psychiatric and care-planning workflows into structured prompts, templates with standardized variables library I designed, plus clear safety and formatting rules for downstream systems.",
      tags: ["Prompt Engineering", "Clinical AI", "HIPAA-aligned", "System Design", "JSON", "Safety Constraints"]
    }
  ];

  return (
    <div className="projects-container" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h1>Projects & Collaborations</h1>
        <p className="projects-intro">
          Work bridging data, AI, and real-world impact across healthcare, social work, and product development.
        </p>
      </motion.div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Project;
