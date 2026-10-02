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
        <DotField active={!paused && !inactive} />
      </div>
      <div className="aurora-content">
        {children}
      </div>
      <button type="button" className="motion-control" onClick={toggleMotion}>
        <span className="motion-icon" aria-hidden="true" />
        {paused ? 'Resume background animation' : 'Pause background animation'}
      </button>
    </div>
  );
};

// A field of survey-like points drifting through slow interference waves.
// Points near a fine pointer brighten in the accent color. With motion paused,
// out of view, or reduced, a single still frame is drawn.
function DotField({ active }: { active: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const clock = useRef(4); // Seconds of field time; resuming continues from the still frame.
  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext('2d');
    if (!el || !ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: -1e4, y: -1e4 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let previous = 0;
    let lastDraw = 0;
    let bounds = el.getBoundingClientRect();
    const client = { x: -1e4, y: -1e4 };
    let base = '#fff';
    let accent = '#fff';

    const readColors = () => {
      const style = getComputedStyle(el);
      base = style.color;
      accent = style.getPropertyValue('--accent').trim() || base;
    };
    const draw = () => {
      const t = clock.current;
      bounds = el.getBoundingClientRect();
      pointer.x = client.x - bounds.left;
      pointer.y = client.y - bounds.top;
      const gap = width < 640 ? 22 : 26;
      ctx.clearRect(0, 0, width, height);
      let fill = '';
      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          const wave = Math.sin(x * 0.0062 + t * 0.35) * Math.cos(y * 0.0081 - t * 0.27) + Math.sin((x - y) * 0.0029 + t * 0.18);
          const n = wave * 0.25 + 0.5;
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 170);
          const size = 0.8 + n * n * 1.9 + near * 1.8;
          const color = near > 0.12 ? accent : base;
          if (color !== fill) ctx.fillStyle = fill = color;
          ctx.globalAlpha = Math.min(1, 0.05 + n * n * 0.4 + near * 0.6);
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
    };
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = el.clientWidth;
      height = el.clientHeight;
      el.width = Math.round(width * ratio);
      el.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (!frame) draw();
    };
    const loop = (ms: number) => {
      if (previous) clock.current += Math.min(ms - previous, 64) / 1000;
      previous = ms;
      // ponytail: ~30fps is plenty for a slow field; halves the paint cost.
      if (ms - lastDraw > 30) { draw(); lastDraw = ms; }
      frame = requestAnimationFrame(loop);
    };
    const onPointer = (event: PointerEvent) => { client.x = event.clientX; client.y = event.clientY; };
    const onLeave = (event: PointerEvent) => { if (!event.relatedTarget) client.x = client.y = -1e4; };
    const start = () => {
      if (frame || !active || reduced.matches) return;
      previous = 0;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => { cancelAnimationFrame(frame); frame = 0; draw(); };
    const onReducedChange = () => { if (reduced.matches) stop(); else start(); };

    readColors();
    resize();
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(el);
    const themeObserver = new MutationObserver(() => { readColors(); if (!frame) draw(); });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('pointermove', onPointer, { passive: true });
      document.addEventListener('pointerout', onLeave);
    }
    reduced.addEventListener('change', onReducedChange);
    start();
    return () => {
      cancelAnimationFrame(frame);
      frame = 0;
      sizeObserver.disconnect();
      themeObserver.disconnect();
      reduced.removeEventListener('change', onReducedChange);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('pointerout', onLeave);
    };
  }, [active]);
  return <canvas ref={canvas} className="dot-field" />;
}

export default AuroraBackground;
