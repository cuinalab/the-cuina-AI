// src/pages/blog-posts.json.ts
// Genera /blog-posts.json en build — lo usa el layout BlogPost.astro
// para mostrar artículos relacionados sin necesidad de base de datos.

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ glob }: any) => {
  // Carga todos los posts
  const allPosts = await (import.meta as any).glob('../content/blog/*.md', { eager: true });

  const posts = Object.entries(allPosts).map(([file, mod]: [string, any]) => {
    const rawSlug = file.split('/').pop()!.replace('.md', '');
    const slug    = rawSlug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
    const fm      = mod.frontmatter ?? {};

    return {
      slug,
      title:    fm.title    ?? slug,
      excerpt:  fm.excerpt  ?? '',
      category: fm.category ?? 'Article',
      date:     fm.date     ?? '',
      readTime: fm.readTime ?? '5',
      tags:     fm.tags     ?? [],
      url:      `/blog/${slug}`,
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));

  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' },
  });
};
