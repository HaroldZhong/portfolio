import React from 'react';
import { ProjectCard } from '../components/Project';
import { getAllProjects } from '../utils/projectLoader';
import { usePageMeta } from '../hooks/usePageMeta';

export default function ProjectList() {
  usePageMeta('Projects | Harold Zhong', 'AI systems, research methods, and data workflows by Harold Zhong. Explore all projects and case studies.');

  return <div className="projects-page">
    <h1>All Projects</h1>
    <p className="projects-intro">AI systems, research methods, and the workflows that connect them.</p>
    <div className="projects-grid">
      {getAllProjects().map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
    </div>
  </div>;
}
