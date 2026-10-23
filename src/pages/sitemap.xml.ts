// /sitemap.xml: the site's pages plus every blog post in src/data/blogs.ts (the posts are static
// files in public/, so Astro does not know about them on its own).
import type { APIRoute } from "astro";
import { blogs } from "../data/blogs";

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL("https://haryoa.github.io");
  const pages = [
    { path: "/", lastmod: blogs[0]?.date },
    { path: "/cv/" },
    { path: "/blogs/", lastmod: blogs[0]?.date },
    ...blogs.map((b) => ({ path: `/blogs/${b.slug}/`, lastmod: b.date })),
  ];
  const urls = pages
    .map(({ path, lastmod }) =>
      `  <url><loc>${new URL(path, base)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`)
    .join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } },
  );
};
