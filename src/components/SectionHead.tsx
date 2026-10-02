import React from 'react';

interface SectionHeadProps {
  index?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  aside?: React.ReactNode;
  level?: 'h1' | 'h2';
  titleId?: string;
}

// Shared section opening: optional section number, display title, optional intro and aside.
export default function SectionHead({ index, title, intro, aside, level = 'h2', titleId }: SectionHeadProps) {
  const Heading = level;
  return <header className={index ? 'section-head' : 'section-head section-head-flush'}>
    {index && <p className="section-index"><span className="num">{index}</span></p>}
    <Heading id={titleId}>{title}</Heading>
    {intro && <p className="section-intro">{intro}</p>}
    {aside && <div className="section-aside">{aside}</div>}
  </header>;
}
