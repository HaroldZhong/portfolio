import React, { Suspense } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Routes, Route } from 'react-router-dom';
import { SiteShell } from './App';
import HomePage from './pages/HomePage';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import ProjectDetail from './pages/ProjectDetail';
import ProjectList from './pages/ProjectList';
import { getAllPosts, loadPostContent } from './utils/blogLoader';
import { getAllProjects, projectRedirects } from './utils/projectLoader';
import { pageMetadata } from './hooks/usePageMeta';

// Retired URLs get a static redirect page so old links keep working on GitHub Pages.
export const redirects = Object.entries(projectRedirects).map(([from, to]) => ({ path: `/project/${from}`, to: `/portfolio/project/${to}/` }));

export async function renderPages() {
  const routes = [
    { path: '/', meta: pageMetadata('/') },
    { path: '/blog', meta: pageMetadata('/blog', 'Articles | Harold Zhong', 'Essays and notes on research methods, applied AI, and health data by Harold Zhong.') },
    { path: '/projects', meta: pageMetadata('/projects', 'Projects | Harold Zhong', 'AI systems, research methods, and data workflows by Harold Zhong. Explore all projects and case studies.') },
    ...getAllProjects().map(project => ({ path: `/project/${project.slug}`, meta: pageMetadata(`/project/${project.slug}`, `${project.title} | Harold Zhong`, project.summary, project.thumbnail) })),
    ...getAllPosts().map(post => ({ path: `/blog/${post.slug}`, meta: pageMetadata(`/blog/${post.slug}`, `${post.title} | Harold Zhong`, post.excerpt, post.thumbnail) })),
  ];
  return Promise.all(routes.map(async route => {
    const slug = route.path.startsWith('/blog/') ? route.path.split('/').pop()! : '';
    const initialPost = slug ? { slug, content: await loadPostContent(slug) } : undefined;
    const html = renderToString(<StaticRouter basename="/portfolio" location={`/portfolio${route.path}`}><SiteShell><Suspense fallback={null}><Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/projects" element={<ProjectList />} />
      <Route path="/project/:slug" element={<ProjectDetail />} />
      <Route path="/blog/:slug" element={<BlogPost initialPost={initialPost} />} />
    </Routes></Suspense></SiteShell></StaticRouter>);
    return { ...route, html, initialPost };
  }));
}
