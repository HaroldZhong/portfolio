import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { chapters, ablation, batching, Scene } from './superAgentChapters';
import '../assets/styles/Explainer.scss';

function Diagram({ scene }: { scene: Scene }) {
  const [step, setStep] = useState(0);
  const beat = scene.beats[step];
  const byId = new Map(scene.nodes.map(node => [node.id, node]));
  const last = scene.beats.length - 1;
  const go = (next: number) => setStep(Math.min(last, Math.max(0, next)));
  const hotLabels = beat.hot.map(id => byId.get(id)?.label).join(', ');

  return <div className="sa-diagram" onKeyDown={event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); go(step + (event.key === 'ArrowRight' ? 1 : -1)); }
  }}>
    <div className="sa-stage" role="img" aria-label={`Diagram with ${scene.nodes.map(node => node.label).join(', ')}. Highlighted: ${hotLabels}.`}>
      <svg aria-hidden="true">
        {scene.edges.map(edge => {
          const from = byId.get(edge.from)!, to = byId.get(edge.to)!;
          const hot = beat.hotEdges?.includes(`${edge.from}>${edge.to}`);
          return <line key={edge.from + edge.to} x1={`${from.x}%`} y1={`${from.y}%`} x2={`${to.x}%`} y2={`${to.y}%`} className={hot ? 'hot' : undefined} strokeDasharray={edge.dashed ? '4 4' : undefined} />;
        })}
      </svg>
      {scene.nodes.map(node => <span key={node.id} aria-hidden="true" className={['sa-node', node.human && 'human', beat.hot.includes(node.id) && 'hot'].filter(Boolean).join(' ')} style={{ left: `${node.x}%`, top: `${node.y}%` }}>
        <strong>{node.label}</strong>{node.sub && <small>{node.sub}</small>}
      </span>)}
    </div>
    <p className="sa-caption" aria-live="polite">{beat.caption}</p>
    <div className="sa-steps">
      {/* aria-disabled, not disabled, so focus and arrow keys survive reaching either end. */}
      <button type="button" className="sa-icon" onClick={() => go(step - 1)} aria-disabled={step === 0} aria-label="Previous step"><ArrowLeft size={16} /></button>
      <span className="mono">Step {step + 1} of {scene.beats.length}</span>
      <button type="button" className="sa-icon" onClick={() => go(step + 1)} aria-disabled={step === last} aria-label="Next step"><ArrowRight size={16} /></button>
      <span className="sa-hint mono">← → also step</span>
    </div>
  </div>;
}

function Evidence() {
  return <div className="sa-evidence">
    <div className="table-scroll"><table>
      <caption>End-to-end ablation, five runs per design</caption>
      <thead><tr><th scope="col">Design</th><th scope="col">Task completion</th><th scope="col">Delegated</th><th scope="col">Cache-read tokens</th></tr></thead>
      <tbody>{ablation.map(row => <tr key={row.design}><th scope="row">{row.design}</th><td>{row.time}</td><td>{row.delegation}</td><td>{row.tokens}</td></tr>)}</tbody>
    </table></div>
    <div className="table-scroll"><table>
      <caption>Router batching, real Router model with mock Workers</caption>
      <thead><tr><th scope="col">Triggers needing a decision</th><th scope="col">About 1 per minute</th><th scope="col">About 40 per minute</th></tr></thead>
      <tbody>{batching.map(row => <tr key={row.measure}><th scope="row">{row.measure}</th><td>{row.low}</td><td>{row.high}</td></tr>)}</tbody>
    </table></div>
  </div>;
}

export default function SuperAgentExplainer() {
  const [index, setIndex] = useState(0);
  const [single, setSingle] = useState(false);
  const chapter = chapters[index];
  const scene = single && chapter.alt ? chapter.alt : chapter.scene;
  const open = (next: number) => { setIndex(next); setSingle(false); };

  return <figure className="explainer sa">
    <nav className="explainer-tabs" aria-label="Explainer chapters">
      {chapters.map((item, i) => <button key={item.id} type="button" aria-current={i === index ? 'step' : undefined} onClick={() => open(i)}>
        <span className="num">{String(i + 1).padStart(2, '0')}</span> {item.short}
      </button>)}
    </nav>
    <div className="sa-body">
      <header aria-live="polite">
        <p className="eyebrow"><span className="num">{String(index + 1).padStart(2, '0')}</span> {chapter.short}</p>
        <p className="sa-title">{chapter.title}</p>
        <p className="sa-lede">{chapter.lede}</p>
      </header>
      {chapter.alt && <div className="sa-toggle" role="group" aria-label="Architecture">
        <button type="button" aria-pressed={!single} onClick={() => setSingle(false)}>Two levels</button>
        <button type="button" aria-pressed={single} onClick={() => setSingle(true)}>Single session</button>
      </div>}
      {scene && <Diagram key={chapter.id + single} scene={scene} />}
      {chapter.id === 'evidence' && <Evidence />}
      <dl className="sa-points">
        {chapter.points.map(point => <div key={point.title}><dt>{point.title}</dt><dd>{point.body}</dd></div>)}
      </dl>
    </div>
    <div className="explainer-pager">
      <button type="button" className="btn" aria-disabled={index === 0} onClick={() => index > 0 && open(index - 1)}><ArrowLeft size={16} /> {index > 0 ? chapters[index - 1].short : 'Start'}</button>
      <button type="button" className="btn btn-primary" aria-disabled={index === chapters.length - 1} onClick={() => index < chapters.length - 1 && open(index + 1)}>{index < chapters.length - 1 ? chapters[index + 1].short : 'End'} <ArrowRight size={16} /></button>
    </div>
  </figure>;
}
