import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ProjectImage from "./ProjectImage";
import SectionHead from "./SectionHead";
import { Project as ProjectType, getAllProjects } from '../utils/projectLoader';
import '../assets/styles/Project.scss';

export const ProjectCard: React.FC<{ project: ProjectType; index: number; variant?: 'feature' | 'grid' }> = ({ project, index, variant = 'grid' }) => (
  <Link to={`/project/${project.slug}`} className="project-card-link" data-variant={variant}>
    <article className="project-card">
      <div className="project-thumbnail">
        <ProjectImage src={project.thumbnail} title={project.title} />
        <span className="project-cue" aria-hidden="true"><ArrowUpRight size={22} strokeWidth={1.5} /></span>
      </div>
      <div className="project-card-content">
        <p className="project-index mono">{String(index + 1).padStart(2, '0')}</p>
        <h3>{project.title}</h3>
        <dl className="project-meta">
          <div><dt>Role</dt><dd className="project-role">{project.role}</dd></div>
          <div><dt>Status</dt><dd className="project-status">{project.status}</dd></div>
        </dl>
        <p className="project-summary">{project.summary}</p>
        <ul className="tag-list">
          {project.tags.map(tag => <li key={tag} className="tag">{tag}</li>)}
        </ul>
        <span className="view-details-hint">Read case study <ArrowUpRight size={16} /></span>
      </div>
    </article>
  </Link>
);

const featuredSlugs = ['praxis-ai-content-safety', 'scholia', 'brat-family-therapy-chatbot'];

function Project() {
  const projects = getAllProjects();
  const featured = featuredSlugs.map(slug => projects.find(project => project.slug === slug)!);

  return (
    <section className="section shell" id="projects" aria-labelledby="projects-title">
      <SectionHead index="02" titleId="projects-title" title="Selected Work"
        intro="AI systems, research methods, and the workflows that connect them."
        aside={<Link to="/projects" className="text-link view-all-btn">View all {projects.length} projects <ArrowUpRight size={16} /></Link>} />
      <div className="projects-feature">
        {featured.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} variant="feature" />
        ))}
      </div>
    </section>
  );
}

export default Project;
