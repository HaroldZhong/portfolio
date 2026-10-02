import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, FileText, Mail } from 'lucide-react';
import { getProjectBySlug } from '../utils/projectLoader';
import { usePageMeta } from '../hooks/usePageMeta';
import '../assets/styles/Project.scss';
import ProjectImage from '../components/ProjectImage';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || '');
  usePageMeta(project ? `${project.title} | Harold Zhong` : undefined, project?.summary, project?.thumbnail);

  if (!project) {
    return <div className="project-detail-page"><h1>Project not found</h1><Link to="/projects">Back to all projects</Link></div>;
  }

  const handleRequestAccess = () => {
    const user = 'harold.zhong';
    const domain = 'utexas.edu';
    const email = `${user}@${domain}`;
    const subject = encodeURIComponent(`Inquiry about ${project.title} Architecture`);
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  return (
    <div className="project-detail-page">
      <nav className="project-breadcrumbs" aria-label="Project navigation">
        <Link to="/projects" className="back-button"><ArrowLeft size={20} /> All projects</Link>
        <Link to="/#projects">Home: selected work</Link>
      </nav>

      <div className="project-header">
        <h1>{project.title}</h1>
        <p className="project-role">{project.role}</p>
        <p className="project-status">{project.status}</p>
        <p className="project-summary">{project.summary}</p>
        <div className="project-evidence">
          {project.links?.demo && <a href={project.links.demo}>Visit project website →</a>}
          {project.links?.github && <a href={project.links.github}>Explore source code →</a>}
          {project.links?.paper && <a href={project.links.paper}>Read paper →</a>}
          {!project.links?.demo && !project.links?.github && !project.links?.paper && <a href="#project-contribution">Read my contribution ↓</a>}
        </div>
      </div>

      {project.thumbnail && <div className="project-header"><div className="project-thumbnail-large">
        <ProjectImage src={project.thumbnail} title={project.title} />
      </div></div>}
      <div className="project-content">
        <section className="project-section">
          <h2>Overview</h2>
          <p>{project.overview}</p>
        </section>

        <section className="project-section">
          <h2 id="project-contribution" tabIndex={-1}>My contribution</h2>
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
          <h2>Deliverables & outcomes</h2>
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
                  <ExternalLink size={18} /> Website
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
