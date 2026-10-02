import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ArrowDown, Github, ExternalLink, FileText, Mail } from 'lucide-react';
import { getAllProjects, getProjectBySlug } from '../utils/projectLoader';
import { usePageMeta } from '../hooks/usePageMeta';
import '../assets/styles/Project.scss';
import ProjectImage from '../components/ProjectImage';
import { useScrollSpy } from '../hooks/useScrollSpy';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || '');
  usePageMeta(project ? `${project.title} | Harold Zhong` : undefined, project?.summary, project?.thumbnail);
  const sectionIds = project ? ['overview', 'project-contribution', ...(project.sections || []).map((_, index) => `section-${index + 1}`), 'technologies', 'outcomes', ...(project.links ? ['links'] : [])] : [];
  const activeSection = useScrollSpy(sectionIds);

  if (!project) {
    return <section className="status-page shell"><h1>Project not found</h1><Link to="/projects" className="btn btn-primary">Back to all projects</Link></section>;
  }

  const projects = getAllProjects();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const sections = [
    { id: 'overview', title: 'Overview', content: project.overview as string | string[] },
    { id: 'project-contribution', title: 'My contribution', content: project.myRole },
    ...(project.sections || []).map((section, index) => ({ id: `section-${index + 1}`, title: section.title, content: section.content })),
    { id: 'technologies', title: 'Technologies & Tools', content: project.technologies, tags: true },
    { id: 'outcomes', title: 'Deliverables & outcomes', content: project.outcomes },
  ];

  const handleRequestAccess = () => {
    const user = 'harold.zhong';
    const domain = 'utexas.edu';
    const email = `${user}@${domain}`;
    const subject = encodeURIComponent(`Inquiry about ${project.title} Architecture`);
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  return (
    <article className="case-study">
      <header className="case-hero shell">
        <nav className="project-breadcrumbs mono" aria-label="Project navigation">
          <Link to="/projects" className="back-button"><ArrowLeft size={16} /> All projects</Link>
          <span aria-hidden="true">/</span>
          <Link to="/#projects">Selected work</Link>
        </nav>
        <p className="eyebrow"><span className="num">Case study</span></p>
        <h1>{project.title}</h1>
        <p className="case-summary">{project.summary}</p>
        <dl className="case-meta">
          <div><dt>Role</dt><dd className="project-role">{project.role}</dd></div>
          <div><dt>Status</dt><dd className="project-status">{project.status}</dd></div>
          <div><dt>Focus</dt><dd>{project.tags.slice(0, 3).join(', ')}</dd></div>
          <div className="project-evidence">
            <dt>Evidence</dt>
            <dd>
              {project.links?.demo && <a href={project.links.demo} className="text-link">Visit project website <ArrowUpRight size={15} /></a>}
              {project.links?.github && <a href={project.links.github} className="text-link">Explore source code <ArrowUpRight size={15} /></a>}
              {project.links?.paper && <a href={project.links.paper} className="text-link">Read paper <ArrowUpRight size={15} /></a>}
              {!project.links?.demo && !project.links?.github && !project.links?.paper && <a href="#project-contribution" className="text-link">Read my contribution <ArrowDown size={15} /></a>}
            </dd>
          </div>
        </dl>
      </header>

      {project.thumbnail && <figure className="case-cover shell">
        <div className="project-thumbnail-large"><ProjectImage src={project.thumbnail} title={project.title} /></div>
      </figure>}

      <div className="case-body shell">
        <nav className="case-toc" aria-label="Case study sections">
          <p className="eyebrow">Contents</p>
          <ol>
            {sections.map(section => <li key={section.id}><a href={`#${section.id}`} aria-current={activeSection === section.id ? 'location' : undefined}>{section.title}</a></li>)}
            {project.links && <li><a href="#links" aria-current={activeSection === 'links' ? 'location' : undefined}>Links & Resources</a></li>}
          </ol>
        </nav>

        <div className="project-content">
          {sections.map(section => (
            <section key={section.id} className="project-section">
              <h2 id={section.id} tabIndex={-1}>{section.title}</h2>
              {'tags' in section ? (
                <ul className="tag-list">{(section.content as string[]).map(tech => <li key={tech} className="tag">{tech}</li>)}</ul>
              ) : Array.isArray(section.content) ? (
                <ul className="case-list">{section.content.map((item, i) => <li key={i}>{item}</li>)}</ul>
              ) : (
                <p>{section.content}</p>
              )}
            </section>
          ))}

          {project.links && (
            <section className="project-section">
              <h2 id="links" tabIndex={-1}>Links & Resources</h2>
              <div className="project-links">
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn">
                    <ExternalLink size={17} /> Website
                  </a>
                )}
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn">
                    <Github size={17} /> GitHub Repo
                  </a>
                )}
                {project.links.paper && (
                  <a href={project.links.paper} target="_blank" rel="noopener noreferrer" className="btn">
                    <FileText size={17} /> Read Paper
                  </a>
                )}
                {project.links.availableOnRequest && (
                  <button type="button" onClick={handleRequestAccess} className="btn request-access">
                    <Mail size={17} /> Code Available on Request
                  </button>
                )}
              </div>
            </section>
          )}
        </div>
      </div>

      <nav className="case-next shell" aria-label="Next project">
        <Link to={`/project/${next.slug}`}>
          <span className="eyebrow">Next project</span>
          <span className="case-next-title">{next.title} <ArrowUpRight size={36} strokeWidth={1.25} /></span>
        </Link>
      </nav>
    </article>
  );
};

export default ProjectDetail;
