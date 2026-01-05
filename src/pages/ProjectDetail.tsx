import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, FileText, Mail } from 'lucide-react';
import { getProjectBySlug } from '../utils/projectLoader';
import '../assets/styles/Project.scss';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || '');
  const navigate = useNavigate();

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const handleBackClick = () => {
    navigate('/');
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleRequestAccess = () => {
    const user = 'haocong.zhong.research';
    const domain = 'gmail.com';
    const email = `${user}@${domain}`;
    const subject = encodeURIComponent(`Inquiry about ${project.title} Architecture`);
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  return (
    <div className="project-detail-page">
      <button onClick={handleBackClick} className="back-button">
        <ArrowLeft size={20} /> Back to Projects
      </button>

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

        {project.sections?.map((section, idx) => (
          <section key={idx} className="project-section">
            <h2>{section.title}</h2>
            {Array.isArray(section.content) ? (
              <ul>
                {section.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{section.content}</p>
            )}
          </section>
        ))}

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

        {project.links && (
          <section className="project-section">
            <h2>Links & Resources</h2>
            <div className="project-links">
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="link-button">
                  <ExternalLink size={18} /> Live Demo
                </a>
              )}
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="link-button">
                  <Github size={18} /> GitHub Repo
                </a>
              )}
              {project.links.paper && (
                <a href={project.links.paper} target="_blank" rel="noopener noreferrer" className="link-button">
                  <FileText size={18} /> Read Paper
                </a>
              )}
              {project.links.availableOnRequest && (
                <button onClick={handleRequestAccess} className="link-button request-access">
                  <Mail size={18} /> Code Available on Request
                </button>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
