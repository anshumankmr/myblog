import type { MetadataRoute } from 'next';
import { getAllNotes, getAllPosts } from '@/lib/content';
import { PERSON, SITE_URL } from '@/lib/identity';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, images: [`${SITE_URL}${PERSON.image}`] },
    ...['/about/', '/blogs/', '/notes/', '/now/', '/contact/'].map(pathname => ({ url: `${SITE_URL}${pathname}` })),
    ...getAllPosts().map(post => ({ url: `${SITE_URL}/article/${post.date}/${post.slug}/` })),
    ...getAllNotes().map(note => ({ url: `${SITE_URL}/notes/${note.slug}/` })),
  ];
}
