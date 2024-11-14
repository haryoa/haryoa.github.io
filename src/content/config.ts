// src/content/config.ts
import { defineCollection, z } from "astro:content";

export const collections = {
  publications: defineCollection({
    schema: z.object({
      title: z.string(),
      authors: z.array(z.string()),
      venue: z.string(),
      year: z.number(),
      type: z.enum(["journal", "conference", "preprint", "workshop"]),
      doi: z.string().optional(),
      featured: z.boolean().default(false),
      links: z
        .array(
          z.object({
            text: z.string(),
            url: z.string(),
          })
        )
        .optional(),
    }),
  }),
  education: defineCollection({
    schema: z.object({
      institution: z.string(),
      degree: z.string(),
      field: z.string(),
      start: z.string(),
      end: z.string().optional(),
      location: z.string(),
      achievements: z.array(z.string()).optional(),
    }),
  }),
  talks: defineCollection({
    schema: z.object({
      title: z.string(),
      event: z.string(),
      date: z.string(),
      location: z.string(),
      type: z.enum(["conference", "invited", "workshop"]),
      links: z
        .array(
          z.object({
            text: z.string(),
            url: z.string(),
          })
        )
        .optional(),
    }),
  }),
  experiences: defineCollection({
    schema: z.object({
      title: z.string(),
      organization: z.string(),
      start: z.string(),
      end: z.string().optional(),
      location: z.string(),
      type: z.enum(["research", "teaching", "industry"]),
      highlights: z.array(z.string()).optional(),
    }),
  }),
  professionalActivities: defineCollection({
    schema: z.object({
      role: z.string(),
      organization: z.string(),
      year: z.string(),
      type: z.enum(["reviewer", "organizer", "committee", "member", "other"]),
      description: z.string().optional(),
    }),
  }),
};
