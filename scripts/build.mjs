import { build } from 'vite';
import { assertStaticRoutes } from './static-routes.mjs';
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';

const outDir = resolve(process.env.PORTFOLIO_OUT_DIR || 'dist');
// Preserve existing output; the route census below blocks stale pages from publication.
await build({ build: { outDir, emptyOutDir: false } });
const serverDir = await mkdtemp(join(tmpdir(), 'portfolio-render-'));
await build({
  ssr: { noExternal: true },
  build: { ssr: 'src/entry-server.tsx', outDir: serverDir, emptyOutDir: false, copyPublicDir: false, minify: false },
});
const { renderPages } = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href);
const pages = await renderPages();
const template = await readFile(join(outDir, 'index.html'), 'utf8');
const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
for (const page of pages) {
  let html = template.replace(/<title>.*?<\/title>/, `<title>${escape(page.meta.title)}</title>`);
  for (const [key, value] of Object.entries({ description: page.meta.description, 'og:title': page.meta.title, 'og:description': page.meta.description, 'og:url': page.meta.canonical, 'og:image': page.meta.image, 'og:type': page.meta.type, 'twitter:title': page.meta.title, 'twitter:description': page.meta.description, 'twitter:image': page.meta.image })) {
    html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*("[^>]*>)`), (_match, start, end) => start + escape(value) + end);
  }
  html = html.replace(/(<link rel="canonical" href=")[^"]*("[^>]*>)/, (_match, start, end) => start + escape(page.meta.canonical) + end);
  html = html.replace('<div id="root"></div>', () => `<div id="root">${page.html}</div>`);
  if (page.initialPost) html = html.replace('</body>', () => `<script id="article-content" type="application/json">${JSON.stringify(page.initialPost).replace(/</g, '\\u003c')}</script></body>`);
  const folder = join(outDir, page.path);
  await mkdir(folder, { recursive: true });
  await writeFile(join(folder, 'index.html'), html);
}
await writeFile(join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(page => `<url><loc>${escape(page.meta.canonical)}</loc></url>`).join('')}</urlset>\n`);
await assertStaticRoutes(outDir, pages.map(page => page.path));
console.log(`Rendered ${pages.length} static pages in ${outDir}`);
