# Personal Website: Astro

My personal website, live at https://haryoa.github.io/.

- `/`: front page (`src/pages/index.astro`)
- `/cv/`: CV (`src/pages/cv/index.astro`, content in `src/content/`)
- `/blogs/`: blog list (`src/pages/blogs/index.astro`, posts listed in `src/data/blogs.ts`)

## Run locally (Node 24)

```bash
npm ci
npm run dev                         # http://localhost:4321/
npm run build && npm run preview    # exactly what gets deployed
```

## Add a blog post

1. Build the post as a single HTML page (e.g. with lucid2web) and put it in `public/blogs/<slug>/index.html`,
   optionally with `main.pdf` next to it.
2. Add an entry at the top of `src/data/blogs.ts` (set `pdf: true` if there is a PDF).

Pushing to `main` deploys the site with GitHub Actions (`.github/workflows/deploy.yml`).
