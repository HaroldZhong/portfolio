import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Link, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import HomePage from './pages/HomePage';
import BlogList from './pages/BlogList';
import ProjectList from './pages/ProjectList';
import './index.scss';

const BlogPost = lazy(() => import('./pages/BlogPost'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

function RouteFocus() {
  const location = useLocation();
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    const focusDestination = () => {
      let id = location.hash.slice(1);
      try { id = decodeURIComponent(id); } catch { /* Keep malformed fragments from breaking the page. */ }
      const destination = document.getElementById(id || 'main-content');
      if (!destination) return;
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
      if (id) destination.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      else window.scrollTo(0, 0);
    };
    focusDestination();
    // A lazy route may finish after the route effect. Its content then supplies the heading.
    const main = document.getElementById('main-content');
    const observer = new MutationObserver(() => {
      if (main?.querySelector('h1, #projects')) { focusDestination(); observer.disconnect(); }
    });
    if (main && !main.querySelector('h1, #projects')) observer.observe(main, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [location]);
  return null;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  // The inline script in index.html applies the theme before paint; React mirrors it after hydration.
  const [mode, setMode] = useState('dark');
  const { pathname } = useLocation();
  const firstPath = useRef(pathname);
  useEffect(() => { setMode(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'); }, []);
  const toggleTheme = () => setMode(current => {
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('portfolio-theme', next); } catch { /* Selection still works for this visit. */ }
    return next;
  });
  return <div className="main-container">
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <Navigation parentToChild={{ mode }} modeChange={toggleTheme} />
    <main id="main-content" tabIndex={-1}>{/* Animate route changes, but not the first paint of a prerendered page. */}
      <div className={pathname === firstPath.current ? 'page-frame' : 'page-frame page-enter'} key={pathname}>{children}</div></main>
    <Footer />
    <BackToTop />
  </div>;
}

const notFound = <section className="status-page shell">
  <p className="eyebrow"><span className="num">404</span> Not found</p>
  <h1>This page has moved or never existed.</h1>
  <Link to="/" className="btn btn-primary">Return home</Link>
</section>;


export default function App() {
  const initialPost = JSON.parse(document.getElementById('article-content')?.textContent || 'null');
  return <BrowserRouter basename="/portfolio">
    <RouteFocus />
    <SiteShell>
      <Suspense fallback={<p className="status-page shell" role="status">Loading page…</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/blog/:slug" element={<BlogPost initialPost={initialPost || undefined} />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="*" element={notFound} />
        </Routes>
      </Suspense>
    </SiteShell>
  </BrowserRouter>;
}
