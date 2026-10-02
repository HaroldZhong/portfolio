import React from 'react';

interface SectionHeadProps {
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  aside?: React.ReactNode;
  level?: 'h1' | 'h2';
  titleId?: string;
}

// Shared section opening: numbered index label, display title, optional intro and aside.
export default function SectionHead({ index, label, title, intro, aside, level = 'h2', titleId }: SectionHeadProps) {
  const Heading = level;
  return <header className="section-head">
    <p className="section-index"><span className="num">{index}</span>{label}</p>
    <Heading id={titleId}>{title}</Heading>
    {intro && <p className="section-intro">{intro}</p>}
    {aside && <div className="section-aside">{aside}</div>}
  </header>;
}
