import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ArrowDown, Github, ExternalLink, FileText } from 'lucide-react';
import { getAllProjects, getProjectBySlug, Project } from '../utils/projectLoader';
import { usePageMeta } from '../hooks/usePageMeta';
import '../assets/styles/Project.scss';
import ProjectImage from '../components/ProjectImage';
import { useScrollSpy } from '../hooks/useScrollSpy';

type Block =
  | { kind: 'text'; content: string }
  | { kind: 'list' | 'tags'; content: string[] }
  | { kind: 'decisions'; content: NonNullable<Project['caseStudy']>['decisions'] }
  | { kind: 'evidence'; note?: string; content: NonNullable<Project['caseStudy']>['evidence'] }
  | { kind: 'publication'; content: NonNullable<NonNullable<Project['caseStudy']>['publication']> };

// Featured case studies follow problem → contribution → decisions → evidence → outcomes → tradeoffs.
function buildSections(project?: Project): { id: string; title: string; block: Block }[] {
  if (!project) return [];
  const technologies = { id: 'technologies', title: 'Technologies & Tools', block: { kind: 'tags', content: project.technologies } as Block };
  const contribution = { id: 'project-contribution', title: 'My contribution', block: { kind: 'text', content: project.myRole } as Block };
  const study = project.caseStudy;
  if (study) return [
    { id: 'problem', title: 'Problem', block: { kind: 'text', content: study.problem } },
    contribution,
    { id: 'decisions', title: 'Technical & design decisions', block: { kind: 'decisions', content: study.decisions } },
    { id: 'evidence', title: 'Evidence', block: { kind: 'evidence', note: study.evidenceNote, content: study.evidence } },
    { id: 'outcomes', title: 'Deliverables & outcomes', block: { kind: 'list', content: project.outcomes } },
    { id: 'tradeoffs', title: 'Tradeoffs', block: { kind: 'list', content: study.tradeoffs } },
    ...(study.publication ? [{ id: 'publication', title: 'Related publication', block: { kind: 'publication', content: study.publication } as Block }] : []),
    technologies,
  ];
  return [
    ...(project.overview ? [{ id: 'overview', title: 'Overview', block: { kind: 'text', content: project.overview } as Block }] : []),
    contribution,
    ...(project.sections || []).map((section, index) => ({
      id: `section-${index + 1}`, title: section.title,
      block: (Array.isArray(section.content) ? { kind: 'list', content: section.content } : { kind: 'text', content: section.content }) as Block,
    })),
    technologies,
    { id: 'outcomes', title: 'Deliverables & outcomes', block: { kind: 'list', content: project.outcomes } },
  ];
}

function SectionBody({ block }: { block: Block }) {
  switch (block.kind) {
    case 'text': return <p>{block.content}</p>;
    case 'tags': return <ul className="tag-list">{block.content.map(tech => <li key={tech} className="tag">{tech}</li>)}</ul>;
    case 'list': return <ul className="case-list">{block.content.map((item, i) => <li key={i}>{item}</li>)}</ul>;
    case 'decisions': return <ol className="decision-list">{block.content.map(item => <li key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></li>)}</ol>;
    case 'evidence': return <>
      {block.note && <p className="evidence-note">{block.note}</p>}
      <ul className="evidence-list">{block.content.map(item => <li key={item.claim} data-basis={item.basis === 'Planned evaluation' ? 'planned' : 'measured'}><span className="evidence-basis">{item.basis}</span><p>{item.claim}</p></li>)}</ul>
    </>;
    case 'publication': return <p className="case-publication"><em>{block.content.title}</em>. {block.content.venue}, {block.content.year}. <a className="text-link" href={`https://doi.org/${block.content.doi}`} target="_blank" rel="noopener noreferrer">doi.org/{block.content.doi} <ArrowUpRight size={15} /></a></p>;
  }
}

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || '');
  usePageMeta(project ? `${project.title} | Harold Zhong` : undefined, project?.summary, project?.thumbnail);
  const sections = buildSections(project);
  const activeSection = useScrollSpy([...sections.map(section => section.id), ...(project?.links ? ['links'] : [])]);

  if (!project) {
    return <section className="status-page shell"><h1>Project not found</h1><Link to="/projects" className="btn btn-primary">Back to all projects</Link></section>;
  }

  const projects = getAllProjects();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
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
              <SectionBody block={section.block} />
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
