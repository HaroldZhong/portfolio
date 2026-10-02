import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const contact = document.getElementById('contact');
      setIsVisible(window.scrollY > 400 && (!contact || contact.getBoundingClientRect().top > window.innerHeight));
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    document.querySelector<HTMLAnchorElement>('.nav-brand')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <button type="button" onClick={scrollToTop} className={`back-to-top-button${isVisible ? ' visible' : ''}`} aria-label="Back to top" tabIndex={isVisible ? 0 : -1} aria-hidden={!isVisible}>
      {/* The ring tracks page scroll where CSS scroll timelines are supported. */}
      <svg className="progress-ring" viewBox="0 0 52 52" aria-hidden="true">
        <circle className="track" cx="26" cy="26" r="24" pathLength={100} />
        <circle className="bar" cx="26" cy="26" r="24" pathLength={100} />
      </svg>
      <ArrowUp className="arrow" size={18} strokeWidth={1.75} />
    </button>
  );
};

export default BackToTop;
