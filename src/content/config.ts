import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Behivest Team'),
  }),
});

const faqItem = z.object({
  term: z.string(),
  question: z.string(),
  answer: z.string(),
});

const faq = defineCollection({
  type: 'data',
  schema: z.object({
    group: z.string(),
    description: z.string().optional(),
    groupSlug: z.string(),
    icon: z.string(),
    order: z.number(),
    items: z.array(faqItem),
  }),
});

export const collections = { blog, faq };
