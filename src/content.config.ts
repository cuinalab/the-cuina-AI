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

import { defineCollection, z } from 'astro:content';

// Tu colección blog existente (no tocar)
const blog = defineCollection({ ... });

// Nueva colección landings
const landings = defineCollection({
  type: 'content',
  schema: z.object({
    title:           z.string(),
    date:            z.string(),
    excerpt:         z.string().optional(),
    metaDescription: z.string().optional(),
    image:           z.string().optional(),
    imageAlt:        z.string().optional(),
    cta:             z.string().optional(),   // texto del botón CTA
    ctaUrl:          z.string().optional(),   // enlace del CTA
    category:        z.string().optional(),
    tags:            z.array(z.string()).optional(),
  }),
});

export const collections = { blog, landings };
