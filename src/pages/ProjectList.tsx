import React from 'react';
import { ProjectCard } from '../components/Project';
import SectionHead from '../components/SectionHead';
import { getAllProjects } from '../utils/projectLoader';
import { usePageMeta } from '../hooks/usePageMeta';

export default function ProjectList() {
  usePageMeta('Projects | Harold Zhong', 'AI systems, research methods, and data workflows by Harold Zhong. Explore all projects and case studies.');
  const projects = getAllProjects();

  return <div className="page-head shell">
    <SectionHead level="h1" title="All Projects"
      intro="AI systems, research methods, and the workflows that connect them." />
    <div className="projects-grid">
      {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
    </div>
  </div>;
}
