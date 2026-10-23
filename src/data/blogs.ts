// The list of blog posts, newest first. Used by the front page and by /blogs/.
// Each post is a self-contained page in public/blogs/<slug>/ (generated with lucid2web).

export interface BlogPost {
  slug: string;        // folder name in public/blogs/
  title: string;
  date: string;        // YYYY-MM-DD
  summary: string;
  tags: string[];
  pdf?: boolean;       // true if public/blogs/<slug>/main.pdf exists
}

export const blogs: BlogPost[] = [
  {
    slug: "distillation-part-1",
    title: "Play Around with Distillation, Part 1: Forward vs. Reverse KL, On vs. Off Policy, and Hard vs. Soft!",
    date: "2026-10-23",
    summary:
      "What do forward and reverse KL, on- and off-policy, and hard and soft targets actually do? A casual, hands-on tour with toy problems, gentle proofs, and a demo where you can watch the student learn.",
    tags: ["Knowledge Distillation", "KL Divergence", "On-Policy", "Toy Problems"],
    pdf: true,
  },
];

export const formatDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
