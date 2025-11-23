import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getProjectBySlug } from '../utils/projectLoader';
import '../assets/styles/Project.scss';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || '');

  if (!project) {
    return <Navigate to="/#projects" replace />;
  }

  return (
    <div className="project-detail-page">
      <Link to="/#projects" className="back-button">
        <ArrowLeft size={20} /> Back to Projects
      </Link>
      
      <div className="project-header">
        <div className="project-thumbnail-large">
          <img src={project.thumbnail} alt={project.title} />
        </div>
        <h1>{project.title}</h1>
        <p className="project-role">{project.role}</p>
      </div>

      <div className="project-content">
        <section className="project-section">
          <h2>Overview</h2>
          <p>{project.overview}</p>
        </section>

        <section className="project-section">
          <h2>My Role</h2>
          <p>{project.myRole}</p>
        </section>

        <section className="project-section">
          <h2>Technologies & Tools</h2>
          <div className="tech-tags">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="tag">{tech}</span>
            ))}
          </div>
        </section>

        <section className="project-section">
          <h2>Key Outcomes</h2>
          <ul>
            {project.outcomes.map((outcome, idx) => (
              <li key={idx}>{outcome}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ProjectDetail;

