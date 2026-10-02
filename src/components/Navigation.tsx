import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, Menu, Moon, Sun, X } from 'lucide-react';

interface NavItem {
  label: string;
  to: string;
  section: string;
}

const navItems: NavItem[] = [
  { label: 'Home', to: '/', section: 'home' },
  { label: 'Projects', to: '/projects', section: 'projects' },
  { label: 'Experience', to: '/#history', section: 'history' },
  { label: 'Expertise', to: '/#expertise', section: 'expertise' },
  { label: 'Education', to: '/#education', section: 'education' },
  { label: 'Publications', to: '/#publications', section: 'publications' },
  { label: 'Articles', to: '/blog', section: 'blog' },
  { label: 'Contact', to: '/#contact', section: 'contact' }
];

interface NavigationProps {
  parentToChild: {
    mode: string;
  };
  modeChange: () => void;
}

function Navigation({ parentToChild, modeChange }: NavigationProps) {
  const { mode } = parentToChild;
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, '') || '/';

  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const menu = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navigation");
      const offset = (navbar?.clientHeight || 64) + 32;
      setScrolled(window.scrollY > offset);

      if (pathname === '/') {
        const current = navItems.find(item => {
          const bounds = document.getElementById(item.section)?.getBoundingClientRect();
          return bounds && bounds.top <= offset && bounds.bottom > offset;
        });
        setActiveSection(current?.section || '');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [pathname]);

  // Close the menu on navigation, including Back/Forward.
  useEffect(() => { menu.current?.close(); }, [location]);

  const isActive = (item: NavItem): boolean => {
    if (pathname === '/') return activeSection === item.section;
    if (pathname === '/projects' || pathname.startsWith('/project/')) return item.section === 'projects';
    return (pathname === '/blog' || pathname.startsWith('/blog/')) && item.section === 'blog';
  };
  const currentLocation = (item: NavItem) => isActive(item) ? pathname === '/' ? 'location' as const : 'page' as const : undefined;
  const closeMenu = () => menu.current?.close();
  const themeButton = <button type="button" className="icon-button theme-toggle" onClick={() => modeChange()} aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
    {mode === 'dark' ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
  </button>;

  return (
    <>
      <header id="navigation" className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner shell">
          <Link to="/" className="nav-brand" aria-label="Harold Zhong, home">
            <span className="brand-mark" aria-hidden="true">H</span>
            <span>Harold Zhong</span>
          </Link>
          <nav aria-label="Primary">
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className={`nav-button${isActive(item) ? ' active' : ''}`} aria-current={currentLocation(item)}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header-actions">
            {themeButton}
            <button type="button" className="icon-button menu-button" aria-label="Open navigation" aria-haspopup="dialog" aria-controls="mobile-navigation" onClick={() => menu.current?.showModal()}>
              <Menu size={20} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      <dialog ref={menu} id="mobile-navigation" className="mobile-menu" aria-label="Site navigation">
        <div className="shell mobile-menu-top">
          <Link to="/" className="nav-brand" onClick={closeMenu}>
            <span className="brand-mark" aria-hidden="true">H</span>
            <span>Harold Zhong</span>
          </Link>
          <div className="header-actions">
            {themeButton}
            <button type="button" className="icon-button" aria-label="Close navigation" onClick={closeMenu}>
              <X size={20} strokeWidth={1.75} />
            </button>
          </div>
        </div>
        <nav className="shell" aria-label="Mobile">
          <ol>
            {navItems.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="menu-link" onClick={closeMenu} aria-current={currentLocation(item)}>{item.label}</Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="shell mobile-menu-foot">
          <a className="icon-button" href="https://github.com/HaroldZhong" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20} strokeWidth={1.75} /></a>
          <a className="icon-button" href="https://linkedin.com/in/haocong-zhong" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20} strokeWidth={1.75} /></a>
        </div>
      </dialog>
    </>
  );
}

export default Navigation;
