import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Project as ProjectType, getAllProjects } from '../utils/projectLoader';
import '../assets/styles/Project.scss';

const ProjectCard: React.FC<{ project: ProjectType; index: number }> = ({ project, index }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Link to={`/project/${project.slug}`} className="project-card-link">
      <motion.div
        className="project-card-container"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 50 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      >
        <div className="project-card">
          <div className="project-thumbnail">
            <img src={project.thumbnail} alt={project.title} />
          </div>
          <div className="project-card-content">
            <h3>{project.title}</h3>
            <p className="project-role">{project.role}</p>
            <p className="project-summary">{project.summary}</p>
            <div className="project-tags">
              {project.tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="tag">{tag}</span>
              ))}
            </div>
            <div className="view-details-hint">Click to view details →</div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

function Project() {
  const projects = getAllProjects();

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
