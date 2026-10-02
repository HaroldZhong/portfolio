# Harold Zhong’s portfolio

React, TypeScript, and Vite; published as a static GitHub Pages site under `/portfolio/`.

## Development and checks

Use Node.js 24 or newer (ESLint 10 requires a supported modern Node release).

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm test
```

`npm run build` builds the client and renders all known routes with the existing React components. Every route receives its own `index.html`, title, description, canonical URL, and sharing metadata. The sitemap is generated from the same records. Article Markdown is loaded on demand in the browser; article HTML is already present for direct visits and crawlers. Unknown URLs use a real 404 page.

The build preserves existing output files. For an isolated check without touching `dist`, use a new output directory:

```sh
PORTFOLIO_OUT_DIR=/private/tmp/portfolio-check npm run build
PORTFOLIO_OUT_DIR=/private/tmp/portfolio-check npm test
```

The build and test both reject unexpected or missing route HTML. This blocks the normal predeploy step if a removed or renamed route remains in the output. Existing files are preserved. After a route removal or rename, preserve the old output as a backup and build into a fresh directory. The temporary server rendering bundle is kept in the system temporary directory. Neither the build nor tests deploys the site. `npm run deploy` is a separate publication action requiring owner authorization.

The dependency-free test runner uses Node assertions and the installed TypeScript/Markdown packages. It executes the real contact handler with a mocked EmailJS service, including failure paths; checks motion persistence, navigation, complete project cards, content records, dates, local assets, figures, and 28 static routes; and verifies that article bodies stay out of the homepage bundle. It never sends email. Browser checks are still needed for layout, keyboard navigation, and actual hosting behavior.

## Content

- Projects: `src/content/projects/*/data.json`, imported through `src/utils/projectLoader.ts`.
- Articles: `src/content/blogs/*/metadata.json` and `content.md`. Dates are `YYYY-MM-DD`; optional `updated` is displayed separately from the original publication date. Add new metadata/image imports in `blogLoader.ts`; article bodies load through the existing content glob.
- Featured work: the three slugs in `src/components/Project.tsx`. The complete collection reuses the same cards at `/portfolio/projects/`; existing `/portfolio/project/:slug/` case-study URLs stay valid.
- Résumé/CV controls are intentionally absent until the owner supplies public files.
- Original large thumbnails remain available; cards use the smaller JPEG derivatives.

Public project descriptions are not permission to publish private study artifacts, confidential code, or participant data. Confirm scholarly statuses, proprietary metrics, and public-safe screenshots with the owner before adding stronger evidence claims.
