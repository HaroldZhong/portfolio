import React from "react";
import ProjectImage from "./ProjectImage";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Project as ProjectType, getAllProjects } from '../utils/projectLoader';
import '../assets/styles/Project.scss';

export const ProjectCard: React.FC<{ project: ProjectType; index: number }> = ({ project, index }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Link to={`/project/${project.slug}`} className="project-card-link">
      <motion.div
        className="project-card-container"
        initial={false}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      >
        <div className="project-card">
          <div className="project-thumbnail">
            <ProjectImage src={project.thumbnail} title={project.title} />
          </div>
          <div className="project-card-content">
            <h3>{project.title}</h3>
            <p className="project-role">{project.role}</p>
            <p className="project-status">{project.status}</p>
            <p className="project-summary">{project.summary}</p>
            <div className="project-tags">
              {project.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <div className="view-details-hint">Read case study →</div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

function Project() {
  const projects = getAllProjects();
  const featuredSlugs = ['brat-family-therapy-chatbot', 'nhis-nhanes-health-inequality', 'research-atlas'];
  const featured = featuredSlugs.map(slug => projects.find(project => project.slug === slug)!);

  return (
    <div className="projects-container" id="projects">
      <motion.div
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2>Selected Work</h2>
        <p className="projects-intro">
          AI systems, research methods, and the workflows that connect them.
        </p>
      </motion.div>

      <div className="projects-grid">
        {featured.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
      <Link to="/projects" className="view-all-btn">View all projects →</Link>
    </div>
  );
}

export default Project;
