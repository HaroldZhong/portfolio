import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

// Check the exact set of generated route pages without deleting existing output.
export async function assertStaticRoutes(outDir, routes) {
  const actual = [];
  async function visit(folder, prefix = '') {
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      const relative = prefix + entry.name;
      if (entry.isDirectory()) await visit(join(folder, entry.name), relative + '/');
      else if (entry.name === 'index.html') actual.push(relative);
    }
  }
  await visit(outDir);
  const expected = routes.map(route => `${route.replace(/^\/+|\/+$/g, '')}${route === '/' ? '' : '/'}index.html`);
  assert.deepEqual(actual.sort(), expected.sort(), 'Unexpected or missing route HTML. Existing files were preserved. Build into a fresh output directory before publication.');
}
