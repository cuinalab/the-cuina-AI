// content.config.ts  ← va en la RAÍZ del proyecto, junto a astro.config.mjs
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title:    z.string(),
    date:     z.coerce.string(),
    category: z.string().default('Article'),
    excerpt:  z.string().default(''),
    author:   z.string().default('The Cuina AI'),
    tags:     z.array(z.string()).default([]),
    readTime: z.coerce.string().default('5'),
    image:       z.string().optional(),
    imageAlt:    z.string().default(''),
    authorImage: z.string().optional(),  // ruta desde public/, ej: /assets/images/team/marco.jpg
  }),
});

export const collections = { blog };
