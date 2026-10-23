import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import icon from "astro-icon";
import fs from "node:fs";

// The dev server does not serve public/<folder>/index.html for "/<folder>/" (GitHub Pages does),
// so the blog posts in public/blogs/<slug>/ would 404 locally. This rewrites those URLs in dev only.
const publicFolderIndex = {
  name: "public-folder-index",
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const path = req.url.split("?")[0];
      if (path.startsWith("/blogs/") && path !== "/blogs/") {
        const dir = path.endsWith("/") ? path : path + "/";
        if (fs.existsSync(new URL(`./public${dir}index.html`, import.meta.url))) req.url = `${dir}index.html`;
      }
      next();
    });
  },
};

export default defineConfig({
  site: "https://haryoa.github.io",
  integrations: [
    react({
      include: ['**/react/*'],
      experimentalReactChildren: true,
    }),
    tailwind(),
    icon(),
  ],
  vite: { plugins: [publicFolderIndex] },
});