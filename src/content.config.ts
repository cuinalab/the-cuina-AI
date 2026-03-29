// content.config.ts  
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title:       z.string(),
    date:        z.coerce.string(),
    category:    z.string().default('Article'),
    excerpt:     z.string().default(''),
    author:      z.string().default('The Cuina AI'),
    tags:        z.array(z.string()).default([]),
    readTime:    z.coerce.string().default('5'),
    image:       z.string().optional(),
    imageAlt:    z.string().default(''),
    authorImage: z.string().optional(),
  }),
});

const landings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/IA' }),
  schema: z.object({
    title:           z.string(),
    date:            z.coerce.string(),
    excerpt:         z.string().default(''),
    metaDescription: z.string().optional(),
    image:           z.string().optional(),
    imageAlt:        z.string().default(''),
    cta:             z.string().optional(),
    ctaUrl:          z.string().optional(),
    category:        z.string().optional(),
    tags:            z.array(z.string()).default([]),
  }),
});

export const collections = { blog, landings };
