// src/pages/blog-posts.json.ts
// Genera /blog-posts.json en build — lo usa BlogPost.astro
// para mostrar artículos relacionados sin base de datos.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const allPosts = await getCollection('blog');

  const posts = allPosts
    .map(p => ({
      slug:     p.id,
      title:    p.data.title,
      excerpt:  p.data.excerpt,
      category: p.data.category,
      date:     p.data.date,
      readTime: p.data.readTime,
      tags:     p.data.tags,
      url:      `/blog/${p.id}`,
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' },
  });
};
