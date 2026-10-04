import assert from 'node:assert/strict';
import { readFile, readdir, stat, mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import vm from 'node:vm';
import { tmpdir } from 'node:os';
import { assertStaticRoutes } from './static-routes.mjs';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const out = resolve(process.env.PORTFOLIO_OUT_DIR || 'dist');
const contactSource = await readFile('src/components/Contact.tsx', 'utf8');
const handler = contactSource.slice(contactSource.indexOf('  const sendEmail ='), contactSource.indexOf('\n  return (\n'));
assert(handler.includes('emailjs.send'));
const js = ts.transpileModule(handler + '\nsendEmail({preventDefault(){}});', { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText;
async function probe(overrides = {}, reject = false) {
  const state = { sends: 0, success: false };
  const context = { name: ' Test Name ', email: ' test@example.invalid ', message: ' Test message ', sending: false, honeypot: '', formLoadTime: Date.now() - 10000, document: { getElementById: id => ({ focus: () => { state.focused = id; } }) }, ...overrides };
  for (const key of ['Name', 'Email', 'Message', 'NameError', 'EmailError', 'MessageError', 'Sending', 'Success', 'Error']) context['set' + key] = value => { state[key[0].toLowerCase() + key.slice(1)] = value; };
  context.emailjs = { send: (_service, _template, params) => { state.sends++; state.params = params; return reject ? Promise.reject(new Error('Mock delivery failure')) : Promise.resolve({ status: 200 }); } };
  vm.runInNewContext(js, context, { timeout: 1000 });
  await Promise.resolve(); await Promise.resolve();
  return state;
}
const normal = await probe();
assert.equal(normal.sends, 1); assert.equal(normal.success, true); assert.equal(normal.params.name, 'Test Name'); assert.equal(normal.params.email, 'test@example.invalid'); assert.equal(normal.params.message, 'Test message');
for (const values of [{ name: '', email: '', message: '' }, { name: ' ', email: '\t', message: '\n' }]) {
  const result = await probe(values); assert.equal(result.sends, 0); assert.equal(result.success, false); assert.equal(result.nameError, true); assert.equal(result.emailError, true); assert.equal(result.messageError, true); assert.equal(result.focused, 'contact-name');
}
for (const values of [{ honeypot: 'bot' }, { formLoadTime: Date.now() }]) {
  const result = await probe(values); assert.equal(result.sends, 0); assert.equal(result.success, false); assert(result.error.includes('not sent'));
}
const failed = await probe({}, true); assert.equal(failed.success, false); assert.equal(failed.sending, false); assert(failed.error); assert.equal(failed.name, undefined, 'Failed delivery must not clear fields');
assert.equal((await probe({ sending: true })).sends, 0);
const phone = await probe({ email: '+1 512 555 0100' });
assert.equal(phone.success, true, 'Contact still accepts a phone number');
assert.equal(phone.params.email, '', 'A phone number must not be used in Reply-To');
assert.equal(phone.params.message, 'Contact: +1 512 555 0100\n\nTest message');
assert.equal((await probe({ email: 'visitor@example.com\r\nBcc: other@example.com' })).params.email, '', 'Reply-To must never contain header lines');
assert.match(contactSource, /tabIndex=\{-1\}[^>]*aria-label="Do not fill this field"/);

// Run the actual route focus effect with a malformed fragment and a normal destination.
const appSource = await readFile('src/App.tsx', 'utf8');
const focusSource = appSource.slice(appSource.indexOf('function RouteFocus()'), appSource.indexOf('export function SiteShell'));
const focusJs = ts.transpileModule(focusSource + '\nRouteFocus();', { compilerOptions: { target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.React } }).outputText;
for (const hash of ['#projects', '#bad%fragment']) {
  const focused = [];
  vm.runInNewContext(focusJs, {
    useLocation: () => ({ hash }), useEffect: effect => effect(),
    window: { history: {}, matchMedia: () => ({ matches: true }), scrollTo() {} },
    document: { getElementById: id => id === 'projects' || id === 'main-content' ? { setAttribute() {}, focus: () => focused.push(id), scrollIntoView() {}, querySelector: () => ({}) } : null },
    MutationObserver: class { observe() {} disconnect() {} },
  });
  if (hash === '#projects') assert.deepEqual(focused, ['projects']);
}

// Exercise the actual motion control, including persistence and disabled storage.
const auroraSource = await readFile('src/components/AuroraBackground.tsx', 'utf8');
const auroraJs = ts.transpileModule(auroraSource.slice(auroraSource.indexOf('const AuroraBackground:'), auroraSource.indexOf('export default')) + '\nAuroraBackground;', { compilerOptions: { target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.React } }).outputText;
function motionProbe(storage) {
  const states = [];
  let cursor = 0;
  let mounted = false;
  let effect;
  let intersect;
  let disconnected = false;
  const listeners = new Map();
  const document = { hidden: false, addEventListener: (name, listener) => listeners.set(name, listener), removeEventListener: name => listeners.delete(name) };
  const component = vm.runInNewContext(auroraJs, {
    React, localStorage: storage, document,
    useRef: () => ({ current: {} }),
    useState: initial => { const index = cursor++; if (index === states.length) states.push(initial); return [states[index], value => { states[index] = value; }]; },
    useEffect: callback => { if (!mounted) effect = callback; },
    IntersectionObserver: class { constructor(callback) { intersect = callback; } observe() {} disconnect() { disconnected = true; } },
  });
  const render = () => { cursor = 0; return component({ children: null }); };
  render(); const cleanup = effect(); mounted = true;
  return {
    render,
    toggle: () => render().props.children.find(child => child.type === 'button').props.onClick(),
    inView: value => intersect([{ isIntersecting: value }]),
    hidden: value => { document.hidden = value; listeners.get('visibilitychange')(); },
    unmount: () => { cleanup(); assert(disconnected); assert.equal(listeners.size, 0); },
  };
}
let motionSetting;
const motionStorage = { getItem: () => motionSetting, setItem: (_key, value) => { motionSetting = value; } };
const motion = motionProbe(motionStorage);
assert.equal(motion.render().props['data-paused'], false);
motion.toggle(); assert.equal(motion.render().props['data-paused'], true); assert.equal(motionSetting, 'paused');
const restoredMotion = motionProbe(motionStorage);
assert.equal(restoredMotion.render().props['data-paused'], true);
restoredMotion.toggle(); assert.equal(restoredMotion.render().props['data-paused'], false); assert.equal(motionSetting, 'playing');
restoredMotion.inView(false); assert.equal(restoredMotion.render().props['data-paused'], true);
restoredMotion.inView(true); assert.equal(restoredMotion.render().props['data-paused'], false);
restoredMotion.hidden(true); restoredMotion.inView(true); assert.equal(restoredMotion.render().props['data-paused'], true);
restoredMotion.hidden(false); assert.equal(restoredMotion.render().props['data-paused'], false);
restoredMotion.toggle(); restoredMotion.inView(false); restoredMotion.inView(true);
assert.equal(restoredMotion.render().props['data-paused'], true, 'Returning to the hero must preserve the user pause');
assert.equal(motionSetting, 'paused', 'Automatic pausing must not overwrite the user preference');
restoredMotion.unmount();
const blockedStorage = motionProbe({ getItem() { throw Error('Disabled'); }, setItem() { throw Error('Disabled'); } });
blockedStorage.toggle(); assert.equal(blockedStorage.render().props['data-paused'], true);

// Scroll positions are relative to the viewport, including sections inside nested containers.
const navigationSource = await readFile('src/components/Navigation.tsx', 'utf8');
const scrollSource = navigationSource.slice(navigationSource.indexOf('    const handleScroll'), navigationSource.indexOf("    window.addEventListener('scroll'"));
const scrollJs = ts.transpileModule(scrollSource + '\nhandleScroll();', { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText;
for (const [top, section, expected] of [[90, 'education', 'education'], [300, 'education', ''], [0, 'home', 'home'], [-1000, 'home', '']]) {
  let active;
  vm.runInNewContext(scrollJs, { pathname: '/', window: { scrollY: 5000 }, navItems: [{ section }], setScrolled() {}, setActiveSection: value => { active = value; }, document: { getElementById: id => id === 'navigation' ? { clientHeight: 64 } : { offsetTop: 0, getBoundingClientRect: () => ({ top, bottom: top + 400 }) } } });
  assert.equal(active, expected);
}

// A subset of the owner's wording rules for public claims (written for resumes, applied to the site).
function claimGuards(html, where) {
  // Owner decision (5 Oct 2026): Praxis stays general, and unpublished research shows no figures until published.
  assert(!/49\.6%|80\.8%|0\.865|647K|599,924/.test(html), where + ': unpublished or internal figures must not appear');
  if (where.includes('praxis')) assert(!/Gemma|Vertex|A100|Neo4j|SHA-256|PEFT|LoRA/.test(html), where + ': Praxis stays general (no model or platform names)');
  for (const banned of [/separate holdout/i, /held-out cases/i, /PageIndex reasoning-based/, /\bIRB\b/, /\bpilot\b/i, /production deployment/i, /\bB\.A\./, /dual degree/i, /bilingual/i]) assert(!banned.test(html), where + ': banned claim ' + banned);
  const text = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
  for (const sentence of text.split(/(?<=[.!?])\s+/)) {
    if (sentence.includes('49.6%')) assert(sentence.includes('10,000-case'), where + ': 49.6% must share a sentence with the 10,000-case benchmark');
    if (sentence.includes('0.865')) assert(sentence.includes('holdout'), where + ': 0.865 must share a sentence with the holdout');
  }
}
const routes = ['/'];
const projectRecords = [];
const sitemap = await readFile(join(out, 'sitemap.xml'), 'utf8');
const slugs = new Set();
for (const [kind, filename] of [['blogs', 'metadata.json'], ['projects', 'data.json']]) {
  for (const folder of await readdir(`src/content/${kind}`)) {
    const data = JSON.parse(await readFile(`src/content/${kind}/${folder}/${filename}`, 'utf8'));
    if (kind === 'projects') projectRecords.push(data);
    assert.match(data.slug, /^[a-z0-9-]+$/); assert(!slugs.has(data.slug)); slugs.add(data.slug);
    const route = `/${kind === 'blogs' ? 'blog' : 'project'}/${data.slug}/`;
    routes.push(route);
    const html = await readFile(join(out, route, 'index.html'), 'utf8');
    assert(html.includes('rel="canonical" href="https://haroldzhong.github.io/portfolio' + route + '"'), route);
    assert.match(html, /<h1[^>]*>.+?<\/h1>/);
    assert(!html.includes('Loading article…'), route + ' must contain article text before JS');
    const description = html.match(/<meta name="description" content="([^"]+)"/)[1];
    assert(description.length > 30);
    assert(!/href="\/(?!portfolio(?:[/#?"]))/.test(html), route + ': internal links must retain the GitHub Pages base path');
    assert(!html.includes('utexas.edu'), route + ': the school email address must not appear; contact goes through the form');
    if (kind === 'projects') {
      claimGuards(html, route);
      for (const item of data.caseStudy?.evidence || []) assert(['Internal benchmark', 'Human-verified golden set', 'Planned evaluation'].includes(item.basis), route + ': unknown evidence basis ' + item.basis);
      assert(!JSON.stringify(data).includes('\u2014'), route + ': no em dashes in project records');
    }
    if (kind === 'blogs') {
      for (const date of [data.date, data.updated].filter(Boolean)) {
        assert.match(date, /^\d{4}-\d{2}-\d{2}$/); assert.equal(new Date(date).toISOString().slice(0, 10), date); assert(date <= new Date().toISOString().slice(0, 10));
      }
      const md = await readFile(`src/content/blogs/${folder}/content.md`, 'utf8');
      if (folder === 'how-700m-people-use-ai') { assert.equal(data.date, '2025-09-15'); assert(md.includes('[How People Use ChatGPT](https://www.nber.org/papers/w34255)')); }
      assert(!/!\[[^\]]*\]\([^\n)]* [^\n)]*\)/.test(md), folder + ': encode spaces in image URLs');
      const markup = renderToStaticMarkup(React.createElement(ReactMarkdown, { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeRaw], children: md }));
      if (folder.startsWith('nested-learning')) assert.equal((markup.match(/<img /g) || []).length, 5);
      if (folder === 'designing-your-life-gpt') assert.match(markup, /<details>\s*<summary>Read the full GPT instructions<\/summary>/);
    }
    // Inspect rendered resources, including build-generated image URLs and script/style assets.
    for (const match of html.matchAll(/(?:src|href)="(\/portfolio\/[^"#?]+)(?:[?#][^"]*)?"/g)) {
      const path = decodeURIComponent(match[1].slice('/portfolio/'.length));
      if (/\.[a-z0-9]+$/i.test(path)) await stat(join(out, path));
    }
  }
}
routes.push('/blog/', '/projects/');
assert.equal(routes.length, 29);
// The retired AI Advisory Board case study redirects to Scholia and stays out of the sitemap.
const retired = await readFile(join(out, 'project/ai-advisory-board/index.html'), 'utf8');
assert.match(retired, /http-equiv="refresh" content="0; url=\/portfolio\/project\/scholia\/"/);
assert.match(retired, /name="robots" content="noindex"/);
await assertStaticRoutes(out, [...routes, '/project/ai-advisory-board/']);
const routeProbe = await mkdtemp(join(tmpdir(), 'portfolio-route-check-'));
await assert.rejects(assertStaticRoutes(routeProbe, ['/']), /route HTML/);
await writeFile(join(routeProbe, 'index.html'), 'Current route');
await assertStaticRoutes(routeProbe, ['/']);
await mkdir(join(routeProbe, 'retired'));
await writeFile(join(routeProbe, 'retired/index.html'), 'Preserved retired route');
await assert.rejects(assertStaticRoutes(routeProbe, ['/']), /route HTML/);
assert.equal(await readFile(join(routeProbe, 'retired/index.html'), 'utf8'), 'Preserved retired route');
const listed = Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g), match => match[1]);
assert.deepEqual(listed.sort(), routes.map(route => 'https://haroldzhong.github.io/portfolio' + route).sort());
const home = await readFile(join(out, 'index.html'), 'utf8');
assert(!home.includes('mailto:'), 'Email contact goes through the form only');
claimGuards(home, 'home');
const featured = Array.from(home.matchAll(/class="project-card-link"[^>]*href="\/portfolio\/project\/([^"]+)"|href="\/portfolio\/project\/([^"]+)"[^>]*class="project-card-link"/g), match => match[1] || match[2]);
assert.deepEqual(featured, ['praxis-ai-content-safety', 'scholia', 'brat-family-therapy-chatbot']);
assert.match(home, /Explore my work/);
assert.match(home, /<title>Harold Zhong \| Applied AI Engineer &amp; Researcher<\/title>/);
const person = JSON.parse(home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
assert.equal(person.jobTitle, 'Applied AI Engineer & Researcher'); assert.equal(person.worksFor, undefined);
assert.equal((home.match(/class="experience-row[" ]/g) || []).length, 6);
assert(!home.includes('earlier-experience') && !home.includes('more-work') && !home.includes('See project evidence'));
assert.equal((home.match(/class="skill-label"/g) || []).length, 56);
assert.equal((home.match(/class="pub-status">Published/g) || []).length, 1);
assert.match(home, /href="https:\/\/doi.org\/10.1111\/cfs.70266"/);
assert.match(home, /Velasco, S\. I\., &amp; Cui, J\./);
assert.equal((home.match(/class="pub-status">Accepted/g) || []).length, 1);
assert.equal((home.match(/class="pub-status">Under review/g) || []).length, 2);
assert.match(home, /Apr 2026 – Present/); assert.match(home, /Jun 2025 – Jul 2026/); assert.match(home, /Aug 2024 – May 2026/);
assert.match(home, /Aug 2024 – May 2025/);
assert(!home.includes('Jun 2024 – May 2025'), 'GA/TA start corrected to Aug 2024 on 4 Oct 2026');
// Planned Scholia evaluations are criteria, never results.
const scholia = await readFile(join(out, 'project/scholia/index.html'), 'utf8');
assert(scholia.includes('Planned evaluation') && !scholia.includes('Internal benchmark') && !scholia.includes('Human-verified golden set'));
const contactHtml = home.slice(home.indexOf('id="contact"'), home.indexOf('</main>'));
assert(!contactHtml.includes('harold.zhong@utexas.edu'), 'Contact section must use the form instead of displaying the school address');
assert(contactHtml.includes('id="contact-email"') && contactHtml.includes('<form'), 'The EmailJS contact form must remain available');
const navLabels = Array.from(home.matchAll(/<a[^>]+class="[^"]*nav-button[^>]+>([^<]+)/g), match => match[1]);
assert.deepEqual(navLabels, ['Home', 'Projects', 'Experience', 'Expertise', 'Education', 'Publications', 'Articles', 'Contact']);
const homeLink = home.match(/<a[^>]+class="[^"]*nav-button[^>]+>Home<\/a>/)?.[0];
assert(homeLink && /href="\/portfolio"/.test(homeLink), 'Home must link to the base-path homepage');
assert.match(home, /class="about-section" id="home"/);
const collection = await readFile(join(out, 'projects/index.html'), 'utf8');
assert.match(collection, /rel="canonical" href="https:\/\/haroldzhong.github.io\/portfolio\/projects\/"/);
const cards = Array.from(collection.matchAll(/<a[^>]+class="project-card-link"[^>]*>[\s\S]*?<\/a>/g), match => match[0]);
assert.equal(cards.length, 8);
const escapedText = text => renderToStaticMarkup(React.createElement('span', null, text)).slice(6, -7);
for (const project of projectRecords) {
  const card = cards.find(html => html.includes(`/project/${project.slug}"`));
  assert(card, project.slug + ' must appear in the collection');
  for (const text of [project.title, project.role, project.status, project.summary, ...project.tags]) assert(card.includes(escapedText(text)), project.slug + ': incomplete card text');
  assert(card.includes('<img') || card.includes('project-image-fallback'));
}
assert.match(home, /tabindex="-1"[^>]*aria-label="Do not fill this field"/);
assert(!home.includes('article-content'), 'Homepage must not preload article bodies');
const mainJs = home.match(/<script[^>]+src="\/portfolio\/([^"]+)"/)[1];
const bundle = await readFile(join(out, mainJs), 'utf8');
const article = await readFile('src/content/blogs/designing-your-life-gpt/content.md', 'utf8');
assert(!bundle.includes(article.slice(0, 150)), 'Article Markdown must stay outside the home bundle');
assert(!bundle.includes('react-markdown'), 'Markdown renderer should be on the article route');
console.log('PASS: contact normal/empty/whitespace/spam/timing/phone/in-flight/failure paths; motion persistence/storage failure; nested-section navigation; 29 static routes, the retired-route redirect and base paths; complete project cards, expertise, experience and accepted publications; dates, metadata, assets, figures, sitemap and article splitting.');
