import React from 'react';
import '../assets/styles/Explainer.scss';

// Paraphrases of "How to fix your entire life in 1 day" (Dan Koe, 12 Jan 2026), checked against the article.
const cycle = [
  'You want a goal',
  'You see reality through it',
  'You notice what serves it (learning)',
  'You act and get feedback',
  'You repeat it until it is automatic (conditioning)',
  'It becomes who you are: “I am the type of person who…”',
  'You defend that identity',
  'The identity sets new goals, and the loop restarts',
];

export function IdentityCycle() {
  const point = (i: number, r: number) => {
    const angle = (-90 + i * 45) * Math.PI / 180;
    return [160 + r * Math.cos(angle), 160 + r * Math.sin(angle)];
  };
  const [bx1, by1] = point(5.5, 104), [bx2, by2] = point(5.5, 136), [tx, ty] = point(5.5, 88);
  return <figure className="explainer dk-cycle">
    <svg viewBox="0 0 320 320" role="img" aria-label="An eight-step loop. The break point sits between step 6, identity, and step 7, defending it.">
      <circle cx="160" cy="160" r="120" className="ring" />
      <line x1={bx1} y1={by1} x2={bx2} y2={by2} className="break" />
      <text x={tx} y={ty} className="break-label" textAnchor="start" dy="0.35em">break here</text>
      {cycle.map((_, i) => { const [x, y] = point(i, 120); return <g key={i} className={i === 5 || i === 6 ? 'hot' : undefined}><circle cx={x} cy={y} r="15" /><text x={x} y={y} dy="0.35em" textAnchor="middle">{i + 1}</text></g>; })}
      <text x="160" y="152" textAnchor="middle" className="center">Anatomy of</text>
      <text x="160" y="174" textAnchor="middle" className="center">identity</text>
    </svg>
    <ol>{cycle.map((step, i) => <li key={step} className={i === 5 || i === 6 ? 'hot' : undefined}>{step}</li>)}</ol>
    <figcaption>Koe’s eight steps. He argues the loop has to be broken between steps 6 and 7, and that it starts in childhood.</figcaption>
  </figure>;
}

const stages = [
  ['Impulsive', 'Impulse and action are the same thing'],
  ['Self-Protective', 'The world is unsafe, so look out for yourself'],
  ['Conformist', 'The group’s rules feel like reality'],
  ['Self-Aware', 'Your inner life stops matching the outside'],
  ['Conscientious', 'Your own principles, and you hold yourself to them'],
  ['Individualist', 'You see your principles were shaped by context'],
  ['Strategist', 'You work within systems while seeing your part in them'],
  ['Construct-Aware', 'Every framework, identity included, is a useful fiction'],
  ['Unitive', 'The line between self and life dissolves'],
];

export function MindStages() {
  return <figure className="explainer dk-stages">
    <ol>{stages.map(([name, gist], i) => <li key={name} className={i >= 3 && i <= 7 ? 'band' : undefined}>
      <span className="num mono">{i + 1}</span><strong>{name}</strong><span>{gist}</span>
    </li>)}</ol>
    <figcaption>The nine stages of ego development Koe summarizes, from Susanne Cook-Greuter’s model (which he cites as “Greuter’s”). Shaded: stages 4 to 8, where he guesses most of his readers sit.</figcaption>
  </figure>;
}

const protocol = [
  { when: 'Morning', name: 'Excavation', note: '15 to 30 minutes, pen and paper, no AI', prompts: ['Name the low-grade dissatisfaction you have learned to tolerate.', 'If nothing changes, describe an ordinary weekday five years from now, then ten.', 'Write the identity statement that would make the life you want feel natural.'] },
  { when: 'During the day', name: 'Interrupting autopilot', note: 'Questions set as phone reminders at scattered times', prompts: ['What is this activity helping me avoid?', 'Judging only by the last two hours, what do I seem to want?'] },
  { when: 'Evening', name: 'Synthesis', note: 'Turn the day’s insight into direction', prompts: ['Name the internal pattern that kept you stuck.', 'Compress the anti-vision and the vision into one sentence each.'] },
];

export function OneDayProtocol() {
  return <figure className="explainer dk-protocol">
    <ol className="dk-day">{protocol.map(part => <li key={part.when}>
      <p className="eyebrow">{part.when}</p>
      <strong>{part.name}</strong>
      <small>{part.note}</small>
      <ul>{part.prompts.map(prompt => <li key={prompt}>{prompt}</li>)}</ul>
    </li>)}</ol>
    <div className="dk-lenses">
      <p className="eyebrow">Then three lenses</p>
      <ol>
        <li><strong>One year</strong> One concrete sign the old pattern is broken</li>
        <li><strong>One month</strong> What keeps the one-year lens possible</li>
        <li><strong>Tomorrow</strong> Two or three actions to timeblock</li>
      </ol>
    </div>
    <figcaption>Sample prompts, paraphrased. The article has about thirty; read the original for the full set.</figcaption>
  </figure>;
}

const game = [
  ['Anti-vision', 'What is at stake if you lose'],
  ['Vision', 'How you win, until the game evolves'],
  ['One-year goal', 'The mission'],
  ['One-month project', 'The boss fight: skills to learn, things to build'],
  ['Daily levers', 'The quests'],
];

export function LifeGame() {
  const rings = game.reduceRight<React.ReactNode>((inner, [name, role]) => <div className="dk-ring"><p><strong>{name}</strong> {role}</p>{inner}</div>, null);
  return <figure className="explainer dk-game">
    <div className="dk-rules"><p><strong>Constraints</strong> The rules: what you will not sacrifice, limits that push creativity</p>{rings}</div>
    <figcaption>Koe’s six components, each mapped to a game element. He describes them as concentric circles, a “forcefield” against distraction; the nesting order here is mine.</figcaption>
  </figure>;
}
