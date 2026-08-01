import { defineCollection, z } from 'astro:content';

const siteCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    date: z.string(),
    location: z.string(),
    heroImage: z.string(),
    updates: z.string(),
    rsvpCopy: z.string(),
  }),
});

export const collections = {
  site: siteCollection,
};
