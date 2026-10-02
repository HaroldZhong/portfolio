import React, { useEffect, useRef, useState } from 'react';
import '../assets/styles/Aurora.scss';

const AuroraBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [paused, setPaused] = useState(false);
  const [inactive, setInactive] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try { setPaused(localStorage.getItem('portfolio-motion') === 'paused'); } catch { /* Storage may be disabled. */ }
    let inView = true;
    const updateActivity = () => setInactive(!inView || document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateActivity();
    });
    if (container.current) observer.observe(container.current);
    document.addEventListener('visibilitychange', updateActivity);
    updateActivity();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateActivity);
    };
  }, []);
  const toggleMotion = () => {
    const next = !paused;
    setPaused(next);
    try { localStorage.setItem('portfolio-motion', next ? 'paused' : 'playing'); } catch { /* The control still works for this visit. */ }
  };

  return (
    <div ref={container} className="aurora-container" data-paused={paused || inactive}>
      <div className="aurora-background" aria-hidden="true">
        <div className="aurora-layer aurora-layer-1"></div>
        <div className="aurora-layer aurora-layer-2"></div>
        <div className="aurora-layer aurora-layer-3"></div>
      </div>
      <div className="aurora-content">
        {children}
      </div>
      <button type="button" className="motion-control" onClick={toggleMotion}>
        {paused ? 'Resume background animation' : 'Pause background animation'}
      </button>
    </div>
  );
};

export default AuroraBackground;
