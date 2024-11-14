import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import icon from "astro-icon";

export default defineConfig({
  site: "https://haryoa.github.io",
  base: "/",
  integrations: [
    react({
      include: ['**/react/*'],
      experimentalReactChildren: true
    }),
    tailwind(),
    icon(),
  ],
});