import React, { useState } from 'react';

export default function ProjectImage({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);
  return src && !failed ? (
    <img src={src} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} />
  ) : <div className="project-image-fallback" aria-hidden="true">{title}</div>;
}
